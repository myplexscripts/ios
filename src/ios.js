const motionOK = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const uid = (prefix = 'ios') => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export function refreshIcons(root = document) {
  if (window.lucide?.createIcons) window.lucide.createIcons({ root });
}

export function pulse(element) {
  if (!element || !motionOK()) return;
  element.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(.97)' }, { transform: 'scale(1)' }],
    { duration: 180, easing: 'cubic-bezier(.2,.8,.2,1)' }
  );
}

export class IOSRouter {
  constructor(root, options = {}) {
    this.root = typeof root === 'string' ? document.querySelector(root) : root;
    this.options = { edgeSwipe: true, edgeSize: 24, ...options };
    this.screens = new Map();
    this.stack = [];
    this.current = null;
    this.animating = false;
    this.edgeGesture = null;

    if (!this.root) throw new Error('IOSRouter root not found');

    this.root.querySelectorAll('[data-ios-route]').forEach(screen => {
      const route = screen.dataset.iosRoute;
      this.screens.set(route, screen);
      screen.dataset.iosScreenState = 'inactive';
    });

    window.addEventListener('popstate', event => {
      const route = event.state?.iosRoute;
      if (!route || route === this.current) return;
      if (this._gesturePopping?.route === route) {
        const { from, to } = this._gesturePopping;
        from.dataset.iosScreenState = 'inactive';
        from.setAttribute('aria-hidden', 'true');
        to.dataset.iosScreenState = 'active';
        to.removeAttribute('aria-hidden');
        const idx = this.stack.lastIndexOf(route);
        this.stack = idx >= 0 ? this.stack.slice(0, idx + 1) : [route];
        this.current = route;
        this._gesturePopping = null;
        to.dispatchEvent(new CustomEvent('ios:screenchange', { bubbles: true, detail: { route, direction: 'back' } }));
        return;
      }
      this._show(route, 'back', false);
    });

    this.root.addEventListener('click', event => {
      const link = event.target.closest('[data-ios-link]');
      if (!link) return;
      const route = link.dataset.iosLink;
      if (!this.screens.has(route)) return;
      event.preventDefault();
      this.push(route);
    });

    if (this.options.edgeSwipe) this._bindEdgeSwipe();
  }

  start(route) {
    const initial = route || location.hash.replace(/^#/, '') || [...this.screens.keys()][0];
    if (!this.screens.has(initial)) throw new Error(`Unknown iOS route: ${initial}`);
    this.current = initial;
    this.stack = [initial];
    const screen = this.screens.get(initial);
    screen.dataset.iosScreenState = 'active';
    screen.removeAttribute('aria-hidden');
    history.replaceState({ iosRoute: initial }, '', `#${initial}`);
    screen.scrollTop = 0;
    refreshIcons(screen);
    return this;
  }

  push(route) {
    if (!this.screens.has(route) || route === this.current || this.animating) return;
    this.stack.push(route);
    history.pushState({ iosRoute: route }, '', `#${route}`);
    return this._show(route, 'forward', false);
  }

  back() {
    if (this.animating || this.stack.length <= 1) return false;
    history.back();
    return true;
  }

  async _show(route, direction = 'forward', updateHistory = false) {
    if (this.animating || route === this.current) return;
    const from = this.screens.get(this.current);
    const to = this.screens.get(route);
    if (!to) return;

    this.animating = true;
    const duration = motionOK() ? 420 : 1;

    if (direction === 'back') {
      const idx = this.stack.lastIndexOf(route);
      this.stack = idx >= 0 ? this.stack.slice(0, idx + 1) : [route];
    }

    to.dataset.iosScreenState = 'active';
    to.removeAttribute('aria-hidden');
    to.scrollTop = 0;

    from.classList.add(direction === 'forward' ? 'ios-exit-forward' : 'ios-exit-back');
    to.classList.add(direction === 'forward' ? 'ios-enter-forward' : 'ios-enter-back');

    await wait(duration);

    from.classList.remove('ios-exit-forward', 'ios-exit-back');
    to.classList.remove('ios-enter-forward', 'ios-enter-back');
    from.dataset.iosScreenState = 'inactive';
    from.setAttribute('aria-hidden', 'true');
    this.current = route;
    this.animating = false;

    if (updateHistory) history.pushState({ iosRoute: route }, '', `#${route}`);
    refreshIcons(to);
    to.dispatchEvent(new CustomEvent('ios:screenchange', { bubbles: true, detail: { route, direction } }));
  }

  _bindEdgeSwipe() {
    const state = { tracking: false, startX: 0, x: 0, width: 1, from: null, to: null };

    const reset = (complete) => {
      if (!state.tracking) return;
      state.tracking = false;
      const from = state.from;
      const to = state.to;
      const x = state.x;
      const width = state.width;
      const shouldPop = complete ?? x / width > .33;
      const duration = motionOK() ? 240 : 1;

      from.style.transition = `transform ${duration}ms cubic-bezier(.2,.8,.2,1)`;
      to.style.transition = `transform ${duration}ms cubic-bezier(.2,.8,.2,1), opacity ${duration}ms ease`;
      from.style.transform = shouldPop ? 'translate3d(100%,0,0)' : 'translate3d(0,0,0)';
      to.style.transform = shouldPop ? 'translate3d(0,0,0)' : 'translate3d(-8%,0,0)';
      to.style.opacity = shouldPop ? '1' : '.94';

      setTimeout(() => {
        [from, to].forEach(el => {
          el.style.transition = '';
          el.style.transform = '';
          el.style.opacity = '';
          el.style.position = '';
          el.style.inset = '';
        });
        if (shouldPop) {
          this._gesturePopping = { route: this.stack[this.stack.length - 2], from, to };
          history.back();
        } else {
          to.dataset.iosScreenState = 'inactive';
        }
      }, duration + 16);
    };

    this.root.addEventListener('pointerdown', event => {
      if (this.animating || this.stack.length <= 1 || event.clientX > this.options.edgeSize || event.pointerType === 'mouse') return;
      const previousRoute = this.stack[this.stack.length - 2];
      const from = this.screens.get(this.current);
      const to = this.screens.get(previousRoute);
      if (!from || !to) return;

      state.tracking = true;
      state.startX = event.clientX;
      state.x = 0;
      state.width = innerWidth;
      state.from = from;
      state.to = to;
      to.dataset.iosScreenState = 'active';
      to.style.position = 'fixed';
      to.style.inset = '0';
      to.style.transform = 'translate3d(-8%,0,0)';
      to.style.opacity = '.94';
      from.setPointerCapture(event.pointerId);
    });

    this.root.addEventListener('pointermove', event => {
      if (!state.tracking) return;
      const dx = clamp(event.clientX - state.startX, 0, state.width);
      state.x = dx;
      const progress = dx / state.width;
      state.from.style.transform = `translate3d(${dx}px,0,0)`;
      state.to.style.transform = `translate3d(${(-8 + progress * 8)}%,0,0)`;
      state.to.style.opacity = String(.94 + progress * .06);
    });

    this.root.addEventListener('pointerup', () => reset());
    this.root.addEventListener('pointercancel', () => reset(false));
  }
}

export function bindSwipeRows(root = document) {
  let openRow = null;

  root.querySelectorAll('[data-ios-swipe-row]').forEach(row => {
    if (row.dataset.iosSwipeBound) return;
    row.dataset.iosSwipeBound = 'true';
    const content = row.querySelector('.ios-swipe-row__content');
    const actions = row.querySelector('.ios-swipe-row__actions');
    if (!content || !actions) return;

    let startX = 0;
    let startY = 0;
    let dx = 0;
    let dragging = false;
    const actionWidth = () => actions.getBoundingClientRect().width;

    const close = () => {
      content.style.transform = 'translate3d(0,0,0)';
      row.dataset.iosSwipeOpen = 'false';
      if (openRow === row) openRow = null;
    };

    content.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (openRow && openRow !== row) openRow.dispatchEvent(new CustomEvent('ios:swipeclose'));
      startX = event.clientX;
      startY = event.clientY;
      dx = 0;
      dragging = true;
      content.style.transition = 'none';
      content.setPointerCapture(event.pointerId);
    });

    content.addEventListener('pointermove', event => {
      if (!dragging) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        dragging = false;
        return;
      }
      const base = row.dataset.iosSwipeOpen === 'true' ? -actionWidth() : 0;
      dx = clamp(base + deltaX, -actionWidth(), 12);
      content.style.transform = `translate3d(${dx}px,0,0)`;
    });

    const finish = () => {
      if (!dragging) return;
      dragging = false;
      content.style.transition = '';
      const open = Math.abs(dx) > actionWidth() * .38;
      content.style.transform = open ? `translate3d(${-actionWidth()}px,0,0)` : 'translate3d(0,0,0)';
      row.dataset.iosSwipeOpen = String(open);
      openRow = open ? row : null;
    };

    content.addEventListener('pointerup', finish);
    content.addEventListener('pointercancel', finish);
    row.addEventListener('ios:swipeclose', close);
  });

  document.addEventListener('click', event => {
    if (openRow && !openRow.contains(event.target)) openRow.dispatchEvent(new CustomEvent('ios:swipeclose'));
  });
}

export function bindSegmentedControls(root = document) {
  root.querySelectorAll('[data-ios-segmented]').forEach(group => {
    if (group.dataset.iosSegmentedBound) return;
    group.dataset.iosSegmentedBound = 'true';
    group.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      group.querySelectorAll('button').forEach(item => item.setAttribute('aria-selected', item === button ? 'true' : 'false'));
      group.dispatchEvent(new CustomEvent('ios:change', { bubbles: true, detail: { value: button.value || button.dataset.value } }));
      pulse(button);
    });
  });
}

function lockBackground(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
  document.body.style.overflow = locked ? 'hidden' : '';
}

export function presentSheet(sheet, options = {}) {
  const el = typeof sheet === 'string' ? document.querySelector(sheet) : sheet;
  if (!el) throw new Error('Sheet not found');
  const { dismissible = true } = options;

  let backdrop = document.querySelector(`.ios-backdrop[data-for="${el.id}"]`);
  if (!el.id) el.id = uid('sheet');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'ios-backdrop';
    backdrop.dataset.for = el.id;
    document.body.append(backdrop);
  }

  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.dataset.iosOpen = 'true';
  backdrop.dataset.iosOpen = 'true';
  lockBackground(true);

  requestAnimationFrame(() => {
    el.dataset.iosOpen = 'true';
    backdrop.dataset.iosOpen = 'true';
    el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus({ preventScroll: true });
  });

  const close = () => dismissSheet(el);
  if (dismissible) backdrop.addEventListener('click', close, { once: true });
  el.querySelectorAll('[data-ios-dismiss]').forEach(button => button.addEventListener('click', close, { once: true }));
  bindSheetDrag(el, close);
  return el;
}

export async function dismissSheet(sheet) {
  const el = typeof sheet === 'string' ? document.querySelector(sheet) : sheet;
  if (!el) return;
  const backdrop = document.querySelector(`.ios-backdrop[data-for="${el.id}"]`);
  el.dataset.iosOpen = 'false';
  if (backdrop) backdrop.dataset.iosOpen = 'false';
  await wait(motionOK() ? 280 : 1);
  lockBackground(false);
  backdrop?.remove();
  el.dispatchEvent(new CustomEvent('ios:dismiss'));
}

function bindSheetDrag(el, onDismiss) {
  if (el.dataset.iosDragBound) return;
  el.dataset.iosDragBound = 'true';
  const handle = el.querySelector('.ios-sheet__grabber, [data-ios-sheet-handle]');
  if (!handle) return;
  let startY = 0;
  let dy = 0;
  let dragging = false;

  handle.addEventListener('pointerdown', event => {
    dragging = true;
    startY = event.clientY;
    dy = 0;
    el.style.transition = 'none';
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener('pointermove', event => {
    if (!dragging) return;
    dy = Math.max(0, event.clientY - startY);
    el.style.transform = `translate3d(${innerWidth >= 768 ? '-50%' : '0'},${dy}px,0)`;
  });
  const finish = () => {
    if (!dragging) return;
    dragging = false;
    el.style.transition = '';
    el.style.transform = '';
    if (dy > 110) onDismiss();
  };
  handle.addEventListener('pointerup', finish);
  handle.addEventListener('pointercancel', finish);
}

export function showToast({ title, message = '', icon = 'check-circle-2', duration = 2600 } = {}) {
  const existing = document.querySelector('.ios-toast');
  existing?.remove();

  const toast = document.createElement('div');
  toast.className = 'ios-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <div class="ios-toast__icon"><i data-lucide="${icon}"></i></div>
    <div class="ios-toast__body">
      <div class="ios-toast__title"></div>
      ${message ? '<div class="ios-toast__message"></div>' : ''}
    </div>`;
  toast.querySelector('.ios-toast__title').textContent = title || 'Done';
  toast.querySelector('.ios-toast__message')?.replaceChildren(document.createTextNode(message));
  document.body.append(toast);
  refreshIcons(toast);
  requestAnimationFrame(() => { toast.dataset.iosOpen = 'true'; });
  setTimeout(async () => {
    toast.dataset.iosOpen = 'false';
    await wait(motionOK() ? 320 : 1);
    toast.remove();
  }, duration);
  return toast;
}

export function presentActionSheet({ title = '', message = '', actions = [] } = {}) {
  const sheet = document.createElement('section');
  sheet.className = 'ios-sheet';
  sheet.id = uid('action-sheet');
  sheet.innerHTML = `
    <div class="ios-sheet__grabber"></div>
    <div class="ios-sheet__body">
      <div class="ios-action-sheet">
        <div class="ios-action-sheet__group">
          ${title ? `<div style="padding:14px 16px 4px;text-align:center;font-size:13px;font-weight:600"></div>` : ''}
          ${message ? `<div style="padding:4px 16px 12px;text-align:center;color:var(--ios-label-secondary);font-size:13px"></div>` : ''}
          <div data-ios-actions></div>
        </div>
        <button class="ios-action-sheet__action ios-action-sheet__action--cancel" data-ios-dismiss>Cancel</button>
      </div>
    </div>`;
  if (title) sheet.querySelector('.ios-action-sheet__group > div:nth-child(1)').textContent = title;
  if (message) {
    const nodes = [...sheet.querySelectorAll('.ios-action-sheet__group > div')];
    nodes.find(node => node !== sheet.querySelector('[data-ios-actions]') && !node.textContent)?.replaceChildren(document.createTextNode(message));
  }
  const actionRoot = sheet.querySelector('[data-ios-actions]');
  actions.forEach(action => {
    const button = document.createElement('button');
    button.className = `ios-action-sheet__action${action.destructive ? ' ios-action-sheet__action--destructive' : ''}`;
    button.textContent = action.label;
    button.addEventListener('click', async () => {
      await dismissSheet(sheet);
      sheet.remove();
      action.onSelect?.();
    });
    actionRoot.append(button);
  });
  document.body.append(sheet);
  presentSheet(sheet);
  sheet.addEventListener('ios:dismiss', () => setTimeout(() => sheet.remove(), 0), { once: true });
  return sheet;
}

export function bindPullToRefresh(element, handler, options = {}) {
  const root = typeof element === 'string' ? document.querySelector(element) : element;
  if (!root || root.dataset.iosPullBound) return;
  root.dataset.iosPullBound = 'true';
  const threshold = options.threshold || 74;
  let startY = 0;
  let dy = 0;
  let active = false;

  const indicator = document.createElement('div');
  indicator.className = 'ios-pull-indicator';
  indicator.innerHTML = '<div class="ios-pull-indicator__inner"><div class="ios-spinner"></div></div>';
  root.prepend(indicator);

  root.addEventListener('touchstart', event => {
    if (root.scrollTop > 0 || active) return;
    startY = event.touches[0].clientY;
    dy = 0;
  }, { passive: true });

  root.addEventListener('touchmove', event => {
    if (!startY || active) return;
    dy = Math.max(0, event.touches[0].clientY - startY);
    indicator.dataset.iosActive = String(dy > 18);
    indicator.firstElementChild.style.transform = `translateY(${-44 + clamp(dy * .42, 0, 46)}px) scale(${clamp(.8 + dy / 320, .8, 1)})`;
  }, { passive: true });

  root.addEventListener('touchend', async () => {
    if (!startY) return;
    startY = 0;
    if (dy >= threshold) {
      active = true;
      indicator.dataset.iosActive = 'true';
      await handler?.();
      active = false;
    }
    indicator.dataset.iosActive = 'false';
    indicator.firstElementChild.style.transform = '';
    dy = 0;
  }, { passive: true });
}

export function bindPressStates(root = document) {
  root.addEventListener('click', event => {
    const target = event.target.closest('[data-ios-press]');
    if (target) pulse(target);
  });
}

export function initIOSFramework(root = document) {
  bindSwipeRows(root);
  bindSegmentedControls(root);
  bindPressStates(root);
  refreshIcons(root);
  document.documentElement.classList.add('ios-ready');
  return { bindSwipeRows, bindSegmentedControls, presentSheet, dismissSheet, presentActionSheet, showToast };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initIOSFramework(), { once: true });
} else {
  initIOSFramework();
}
