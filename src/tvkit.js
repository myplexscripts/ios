import { renderLucide } from './lucide.js';

export const TVKIT_VERSION = '0.1.0';

const FOCUS_SELECTOR = [
  '[data-tv-focusable]:not([disabled]):not([aria-disabled="true"])',
  '.tv-card:not([disabled])',
  '.tv-nav-item:not([disabled])',
  '.tv-action:not([disabled])',
  '.tv-segment:not([disabled])',
  '.tv-brand-card:not([disabled])',
  '.tv-icon-button:not([disabled])',
  '.tv-pill-button:not([disabled])',
  '.tv-menu__item:not([disabled])',
  '.tv-profile-option:not([disabled])'
].join(',');

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const prefersReducedMotion = () => matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const finePointer = () => matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;

function visible(node) {
  if (!(node instanceof HTMLElement)) return false;
  if (node.hidden || node.closest('[hidden]')) return false;
  const style = getComputedStyle(node);
  if (style.visibility === 'hidden' || style.display === 'none') return false;
  const rect = node.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function centre(rect) {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function directionScore(fromRect, toRect, direction) {
  const a = centre(fromRect);
  const b = centre(toRect);
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (direction === 'left' && dx >= -2) return Infinity;
  if (direction === 'right' && dx <= 2) return Infinity;
  if (direction === 'up' && dy >= -2) return Infinity;
  if (direction === 'down' && dy <= 2) return Infinity;

  const primary = direction === 'left' || direction === 'right' ? Math.abs(dx) : Math.abs(dy);
  const cross = direction === 'left' || direction === 'right' ? Math.abs(dy) : Math.abs(dx);
  const overlap = direction === 'left' || direction === 'right'
    ? Math.max(0, Math.min(fromRect.bottom, toRect.bottom) - Math.max(fromRect.top, toRect.top))
    : Math.max(0, Math.min(fromRect.right, toRect.right) - Math.max(fromRect.left, toRect.left));
  const maxCross = direction === 'left' || direction === 'right'
    ? Math.max(fromRect.height, toRect.height)
    : Math.max(fromRect.width, toRect.width);
  const alignmentBonus = overlap > 0 ? Math.min(.52, overlap / Math.max(1, maxCross) * .52) : 0;
  const angularPenalty = cross / Math.max(primary, 1);
  return primary + cross * (1.65 + angularPenalty * .75) - primary * alignmentBonus;
}

export class TVKitFocusEngine {
  constructor(app) {
    this.app = app;
    this.current = null;
    this.lastByRoute = new Map();
    this.boundKeydown = event => this.onKeydown(event);
    this.boundFocus = event => this.onFocus(event);
  }

  init() {
    this.app.root.addEventListener('keydown', this.boundKeydown);
    this.app.root.addEventListener('focusin', this.boundFocus);
    return this;
  }

  destroy() {
    this.app.root.removeEventListener('keydown', this.boundKeydown);
    this.app.root.removeEventListener('focusin', this.boundFocus);
  }

  candidates(scope = this.app.activeLayer()) {
    if (!scope) return [];
    return [...scope.querySelectorAll(FOCUS_SELECTOR)].filter(visible);
  }

  onFocus(event) {
    const focusable = event.target.closest?.(FOCUS_SELECTOR);
    if (!focusable) return;
    if (this.current && this.current !== focusable) this.current.classList.remove('is-focused');
    this.current = focusable;
    focusable.classList.add('is-focused');
    const route = this.app.currentRoute;
    if (route) this.lastByRoute.set(route, focusable);
    this.app.handleSidebarFocus(focusable);
  }

  focus(node, { preventScroll = false } = {}) {
    if (!visible(node)) return false;
    node.focus?.({ preventScroll });
    if (document.activeElement !== node) {
      node.tabIndex = node.tabIndex < 0 ? 0 : node.tabIndex;
      node.focus?.({ preventScroll });
    }
    this.ensureVisible(node);
    return true;
  }

  restore(route = this.app.currentRoute) {
    const remembered = this.lastByRoute.get(route);
    if (remembered?.isConnected && visible(remembered)) return this.focus(remembered, { preventScroll: true });
    const scope = this.app.activeLayer();
    const preferred = scope?.querySelector('[data-tv-autofocus]');
    return this.focus(preferred || this.candidates(scope)[0], { preventScroll: true });
  }

  ensureVisible(node) {
    const rail = node.closest('.tv-rail, .tv-brand-strip');
    if (rail) {
      const r = rail.getBoundingClientRect();
      const n = node.getBoundingClientRect();
      const pad = 34;
      if (n.left < r.left + pad) rail.scrollBy({ left: n.left - r.left - pad, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      else if (n.right > r.right - pad) rail.scrollBy({ left: n.right - r.right + pad, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }

    const scroll = node.closest('.tv-scroll');
    if (scroll) {
      const r = scroll.getBoundingClientRect();
      const n = node.getBoundingClientRect();
      const topSafe = 72;
      const bottomSafe = 74;
      if (n.top < r.top + topSafe) scroll.scrollBy({ top: n.top - r.top - topSafe, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      else if (n.bottom > r.bottom - bottomSafe) scroll.scrollBy({ top: n.bottom - r.bottom + bottomSafe, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  }

  move(direction) {
    const scope = this.app.activeLayer();
    const items = this.candidates(scope);
    if (!items.length) return false;

    const current = items.includes(document.activeElement) ? document.activeElement : this.current;
    if (!current || !items.includes(current)) return this.focus(items[0]);

    const fromRect = current.getBoundingClientRect();
    let best = null;
    let bestScore = Infinity;
    for (const candidate of items) {
      if (candidate === current) continue;
      const score = directionScore(fromRect, candidate.getBoundingClientRect(), direction);
      if (score < bestScore) {
        best = candidate;
        bestScore = score;
      }
    }

    if (!best && direction === 'left' && !current.closest('.tv-sidebar') && this.app.sidebar) {
      const nav = this.app.sidebar.querySelector('.tv-nav-item[aria-current="page"]') || this.app.sidebar.querySelector('.tv-nav-item');
      if (nav) best = nav;
    }

    return best ? this.focus(best) : false;
  }

  onKeydown(event) {
    const target = event.target;
    const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
    if (typing && !['Escape', 'Enter'].includes(event.key)) return;

    const directions = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down'
    };
    if (directions[event.key]) {
      event.preventDefault();
      this.move(directions[event.key]);
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && !typing) {
      const focused = document.activeElement?.closest?.(FOCUS_SELECTOR) || this.current;
      if (focused) {
        event.preventDefault();
        focused.click?.();
      }
      return;
    }

    if (event.key === 'Escape' || event.key === 'Backspace') {
      if (typing && event.key === 'Backspace' && target.value) return;
      event.preventDefault();
      this.app.back();
    }
  }
}

export class TVKitCarousel {
  constructor(root, options = {}) {
    this.root = root;
    this.interval = Math.max(3500, Number(options.interval || root.dataset.tvInterval || 8000));
    this.slides = [...root.querySelectorAll('.tv-hero__slide')];
    this.dots = [...root.querySelectorAll('.tv-page-dot')];
    this.index = Math.max(0, this.slides.findIndex(slide => slide.classList.contains('is-active')));
    this.timer = 0;
    this.paused = false;
    this.boundVisibility = () => document.hidden ? this.stop() : this.start();
  }

  init() {
    this.dots.forEach((dot, index) => dot.addEventListener('click', () => this.go(index, { user: true })));
    this.root.addEventListener('focusin', () => { this.paused = true; this.stop(); });
    this.root.addEventListener('focusout', event => {
      if (!this.root.contains(event.relatedTarget)) {
        this.paused = false;
        this.start();
      }
    });
    this.root.addEventListener('pointerenter', () => { if (finePointer()) this.stop(); });
    this.root.addEventListener('pointerleave', () => { if (!this.paused) this.start(); });
    document.addEventListener('visibilitychange', this.boundVisibility);
    this.go(this.index, { immediate: true });
    this.start();
    return this;
  }

  start() {
    this.stop();
    if (this.paused || document.hidden || this.slides.length < 2 || prefersReducedMotion()) return;
    this.timer = window.setInterval(() => this.go((this.index + 1) % this.slides.length), this.interval);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = 0;
  }

  go(index, { user = false } = {}) {
    if (!this.slides.length) return;
    this.index = (index + this.slides.length) % this.slides.length;
    this.slides.forEach((slide, i) => slide.classList.toggle('is-active', i === this.index));
    this.dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === this.index)));
    this.root.dispatchEvent(new CustomEvent('tvkit:slidechange', { bubbles: true, detail: { index: this.index } }));
    if (user) this.start();
  }

  destroy() {
    this.stop();
    document.removeEventListener('visibilitychange', this.boundVisibility);
  }
}

export class TVKitApp {
  constructor(options = {}) {
    this.root = typeof options.root === 'string' ? document.querySelector(options.root) : options.root || document.querySelector('[data-tv-app]');
    if (!this.root) throw new Error('TVKitApp requires a root element');
    this.options = options;
    this.sidebar = this.root.querySelector('.tv-sidebar');
    this.stage = this.root.querySelector('.tv-stage') || this.root;
    this.currentRoute = '';
    this.routeHistory = [];
    this.scrollPositions = new Map();
    this.carousels = new Set();
    this.focus = new TVKitFocusEngine(this);
    this.initialized = false;
    this.sidebarCloseTimer = 0;
    this.toastTimer = 0;
    this.boundClick = event => this.onClick(event);
    this.boundHash = () => this.syncFromLocation({ direction: 'back' });
    this.boundPointerMove = event => this.onPointerMove(event);
    this.boundPointerLeave = event => this.onPointerLeave(event);
  }

  init() {
    if (this.initialized) return this;
    this.initialized = true;
    this.root.dataset.tvkitVersion = TVKIT_VERSION;
    this.root.addEventListener('click', this.boundClick);
    window.addEventListener('hashchange', this.boundHash);
    this.root.addEventListener('pointermove', this.boundPointerMove, { passive: true });
    this.root.addEventListener('pointerleave', this.boundPointerLeave, { passive: true });
    this.focus.init();
    this.enhance(this.root);

    const requested = this.pathFromLocation();
    const fallback = this.root.querySelector('.tv-screen[data-tv-route]')?.dataset.tvRoute || '/home';
    this.navigate(requested || fallback, { replace: true, immediate: true });
    return this;
  }

  destroy() {
    this.root.removeEventListener('click', this.boundClick);
    window.removeEventListener('hashchange', this.boundHash);
    this.root.removeEventListener('pointermove', this.boundPointerMove);
    this.root.removeEventListener('pointerleave', this.boundPointerLeave);
    this.focus.destroy();
    this.carousels.forEach(carousel => carousel.destroy());
    this.carousels.clear();
    this.initialized = false;
  }

  emit(name, detail = {}) {
    const event = new CustomEvent(`tvkit:${name}`, { bubbles: true, detail });
    this.root.dispatchEvent(event);
    this.options.on?.[name]?.(detail, this);
    return event;
  }

  pathFromLocation() {
    return decodeURIComponent(location.hash.replace(/^#/, '') || '');
  }

  routeScreen(path) {
    return [...this.root.querySelectorAll('.tv-screen[data-tv-route]')].find(screen => {
      const route = screen.dataset.tvRoute;
      if (route === path) return true;
      if (!route?.includes(':')) return false;
      const pattern = new RegExp(`^${route.replace(/:[^/]+/g, '[^/]+')}$`);
      return pattern.test(path);
    }) || null;
  }

  routeParams(screen, path) {
    const route = screen?.dataset.tvRoute || '';
    const keys = [...route.matchAll(/:([^/]+)/g)].map(match => match[1]);
    const pattern = new RegExp(`^${route.replace(/:[^/]+/g, '([^/]+)')}$`);
    const match = path.match(pattern);
    return Object.fromEntries(keys.map((key, index) => [key, decodeURIComponent(match?.[index + 1] || '')]));
  }

  captureScroll(route = this.currentRoute) {
    if (!route) return;
    const screen = this.routeScreen(route);
    const scroll = screen?.querySelector('.tv-scroll');
    if (scroll) this.scrollPositions.set(route, { top: scroll.scrollTop, left: scroll.scrollLeft });
  }

  restoreScroll(route, direction) {
    const screen = this.routeScreen(route);
    const scroll = screen?.querySelector('.tv-scroll');
    if (!scroll) return;
    const saved = this.scrollPositions.get(route);
    if (direction === 'back' && saved) {
      scroll.scrollTop = saved.top;
      scroll.scrollLeft = saved.left;
    } else if (!saved || direction !== 'back') {
      scroll.scrollTop = 0;
      scroll.scrollLeft = 0;
    }
  }

  navigate(path, options = {}) {
    const target = this.routeScreen(path);
    if (!target) return false;
    const previousRoute = this.currentRoute;
    const previous = this.routeScreen(previousRoute);
    const direction = options.direction || (options.replace ? 'replace' : 'forward');
    if (previousRoute === path && !options.force) return true;

    this.captureScroll(previousRoute);
    this.closeMenu({ restoreFocus: false });
    this.root.dataset.sidebarExpanded = 'false';

    if (previous && previous !== target) {
      previous.classList.remove('is-active');
      previous.classList.toggle('is-exiting-back', direction === 'back');
      setTimeout(() => previous.classList.remove('is-exiting-back'), 420);
    }

    if (direction === 'back') {
      target.classList.add('is-entering-back');
      requestAnimationFrame(() => requestAnimationFrame(() => target.classList.remove('is-entering-back')));
    }
    target.classList.add('is-active');

    this.currentRoute = path;
    const params = this.routeParams(target, path);
    target.dataset.tvCurrentPath = path;
    this.syncNav(path);
    this.restoreScroll(path, direction);
    this.enhance(target);
    this.emit('routechange', { from: previousRoute, to: path, direction, screen: target, params });

    if (!options.fromHash) {
      const url = `#${encodeURI(path)}`;
      if (options.replace) history.replaceState({ tvkit: true, path }, '', url);
      else history.pushState({ tvkit: true, path }, '', url);
    }

    if (!options.immediate) requestAnimationFrame(() => this.focus.restore(path));
    else queueMicrotask(() => this.focus.restore(path));
    return true;
  }

  syncFromLocation({ direction = 'back' } = {}) {
    const path = this.pathFromLocation();
    if (path && path !== this.currentRoute) this.navigate(path, { fromHash: true, direction });
  }

  back() {
    if (this.closeTopLayer()) return true;
    if (history.length > 1) {
      history.back();
      return true;
    }
    return this.navigate('/home', { replace: true, direction: 'back' });
  }

  syncNav(path) {
    this.root.querySelectorAll('.tv-nav-item[data-tv-route]').forEach(item => {
      const route = item.dataset.tvRoute;
      const current = path === route || (route !== '/home' && path.startsWith(`${route}/`));
      item.setAttribute('aria-current', current ? 'page' : 'false');
    });
  }

  handleSidebarFocus(node) {
    clearTimeout(this.sidebarCloseTimer);
    const inSidebar = Boolean(node.closest('.tv-sidebar'));
    this.root.dataset.sidebarExpanded = String(inSidebar);
    if (!inSidebar) {
      this.sidebarCloseTimer = setTimeout(() => {
        if (!document.activeElement?.closest?.('.tv-sidebar')) this.root.dataset.sidebarExpanded = 'false';
      }, 80);
    }
  }

  activeLayer() {
    const open = this.root.querySelector('.tv-player.is-open, .tv-profile-picker.is-open, .tv-menu-layer.is-open');
    return open || this.routeScreen(this.currentRoute) || this.root;
  }

  enhance(scope = this.root) {
    renderLucide(scope);
    const carousels = [];
    if (scope.matches?.('[data-tv-carousel]')) carousels.push(scope);
    scope.querySelectorAll?.('[data-tv-carousel]').forEach(node => carousels.push(node));
    carousels.forEach(node => {
      if (node.__tvkitCarousel) return;
      node.__tvkitCarousel = new TVKitCarousel(node).init();
      this.carousels.add(node.__tvkitCarousel);
    });

    scope.querySelectorAll?.(FOCUS_SELECTOR).forEach(node => {
      if (!node.hasAttribute('tabindex')) node.tabIndex = 0;
    });
  }

  onClick(event) {
    const route = event.target.closest('[data-tv-route]');
    if (route && !route.classList.contains('tv-screen')) {
      event.preventDefault();
      this.navigate(route.dataset.tvRoute);
      return;
    }

    const back = event.target.closest('[data-tv-back]');
    if (back) {
      event.preventDefault();
      this.back();
      return;
    }

    const menu = event.target.closest('[data-tv-menu-trigger]');
    if (menu) {
      event.preventDefault();
      this.openMenu(menu.dataset.tvMenuTrigger, menu);
      return;
    }

    const dismiss = event.target.closest('[data-tv-dismiss]');
    if (dismiss) {
      event.preventDefault();
      this.closeTopLayer();
      return;
    }

    const profile = event.target.closest('[data-tv-profile-picker]');
    if (profile) {
      event.preventDefault();
      this.openProfilePicker();
      return;
    }
  }

  openMenu(name, trigger = document.activeElement) {
    const layer = this.root.querySelector('.tv-menu-layer');
    const menu = layer?.querySelector(`[data-tv-menu="${CSS.escape(name)}"]`);
    if (!layer || !menu) return false;
    layer.querySelectorAll('.tv-menu').forEach(item => item.hidden = item !== menu);
    menu.hidden = false;
    layer.__tvkitTrigger = trigger;

    const rect = trigger?.getBoundingClientRect?.();
    if (rect) {
      const width = 300;
      const left = clamp(rect.right - width, 24, window.innerWidth - width - 24);
      const top = clamp(rect.bottom + 10, 24, window.innerHeight - 300);
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
    }

    layer.classList.add('is-open');
    layer.removeAttribute('aria-hidden');
    queueMicrotask(() => this.focus.focus(menu.querySelector(FOCUS_SELECTOR), { preventScroll: true }));
    this.emit('menuopen', { name, menu, trigger });
    return true;
  }

  closeMenu({ restoreFocus = true } = {}) {
    const layer = this.root.querySelector('.tv-menu-layer.is-open');
    if (!layer) return false;
    layer.classList.remove('is-open');
    layer.setAttribute('aria-hidden', 'true');
    if (restoreFocus && layer.__tvkitTrigger) queueMicrotask(() => this.focus.focus(layer.__tvkitTrigger, { preventScroll: true }));
    return true;
  }

  openProfilePicker() {
    const picker = this.root.querySelector('.tv-profile-picker');
    if (!picker) return false;
    picker.__tvkitTrigger = document.activeElement;
    picker.classList.add('is-open');
    picker.removeAttribute('aria-hidden');
    queueMicrotask(() => this.focus.focus(picker.querySelector(FOCUS_SELECTOR), { preventScroll: true }));
    return true;
  }

  closeProfilePicker() {
    const picker = this.root.querySelector('.tv-profile-picker.is-open');
    if (!picker) return false;
    picker.classList.remove('is-open');
    picker.setAttribute('aria-hidden', 'true');
    if (picker.__tvkitTrigger) queueMicrotask(() => this.focus.focus(picker.__tvkitTrigger, { preventScroll: true }));
    return true;
  }

  openPlayer(options = {}) {
    const player = this.root.querySelector('.tv-player');
    if (!player) return false;
    player.__tvkitTrigger = document.activeElement;
    player.querySelector('[data-tv-player-title]')?.replaceChildren(document.createTextNode(options.title || 'Now Playing'));
    player.querySelector('[data-tv-player-subtitle]')?.replaceChildren(document.createTextNode(options.subtitle || ''));
    const progress = player.querySelector('.tv-player__progress');
    if (progress) progress.style.setProperty('--player-progress', `${clamp(Number(options.progress ?? 36), 0, 100)}%`);
    player.classList.add('is-open');
    player.removeAttribute('aria-hidden');
    queueMicrotask(() => this.focus.focus(player.querySelector('[data-tv-player-primary]') || player.querySelector(FOCUS_SELECTOR), { preventScroll: true }));
    this.emit('playeropen', options);
    return true;
  }

  closePlayer() {
    const player = this.root.querySelector('.tv-player.is-open');
    if (!player) return false;
    player.classList.remove('is-open');
    player.setAttribute('aria-hidden', 'true');
    if (player.__tvkitTrigger) queueMicrotask(() => this.focus.focus(player.__tvkitTrigger, { preventScroll: true }));
    this.emit('playerclose', {});
    return true;
  }

  closeTopLayer() {
    return this.closeMenu() || this.closeProfilePicker() || this.closePlayer();
  }

  toast(message, duration = 2200) {
    const toast = this.root.querySelector('.tv-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.remove('is-visible'), duration);
  }

  onPointerMove(event) {
    if (!finePointer()) return;
    const card = event.target.closest?.('[data-tv-parallax]');
    if (!card) return;
    const art = card.querySelector('.tv-card__art');
    if (!art) return;
    const rect = art.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
    const y = clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1);
    art.style.setProperty('--parallax-x', `${(x - .5) * 7}deg`);
    art.style.setProperty('--parallax-y', `${(.5 - y) * 6}deg`);
  }

  onPointerLeave(event) {
    const card = event.target.closest?.('[data-tv-parallax]');
    const art = card?.querySelector('.tv-card__art');
    art?.style.removeProperty('--parallax-x');
    art?.style.removeProperty('--parallax-y');
  }
}

export function createTVKitApp(options = {}) {
  return new TVKitApp(options).init();
}