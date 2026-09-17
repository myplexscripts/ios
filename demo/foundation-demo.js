import { GlassKitVirtualList, definePlugin, renderLucide } from '../src/framework.js';

const demoPlugin = definePlugin({
  name: 'foundation-demo',
  install(app) {
    return {
      installedAt: new Date(),
      appName: app.name,
      ready: false
    };
  },
  init(app, options, api) {
    api.ready = true;
  }
});

function waitForApp() {
  return new Promise(resolve => {
    const find = () => {
      const app = document.querySelector('#demoApp')?.__glasskitApp;
      if (app?.initialized) resolve(app);
      else setTimeout(find, 20);
    };
    find();
  });
}

function waitForRuntimeSection() {
  return new Promise(resolve => {
    const find = () => {
      const section = document.querySelector('[data-glasskit-runtime-demo]');
      if (section) resolve(section);
      else setTimeout(find, 20);
    };
    find();
  });
}

function setStatus(root, name, value, tone = '') {
  const output = root.querySelector(`[data-foundation-status="${name}"]`);
  if (!output) return;
  output.textContent = value;
  output.className = `ios-subheadline${tone ? ` ios-text-${tone}` : ' ios-secondary'}`;
}

function installDemoStyles() {
  if (document.querySelector('#glasskit-foundation-demo-styles')) return;
  const style = document.createElement('style');
  style.id = 'glasskit-foundation-demo-styles';
  style.textContent = `
    .glasskit-foundation-demo .ios-button-row { align-items: stretch; }
    .glasskit-foundation-demo .ios-button-row .ios-button { flex: 1 1 150px; }
    .glasskit-demo-virtual {
      height: 300px;
      border-radius: max(0px, calc(var(--ios-surface-radius) - 16px));
      background: var(--ios-background);
    }
    .glasskit-demo-virtual .glasskit-virtual-list__item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 14px;
      border-bottom: .5px solid var(--ios-separator);
      background: var(--ios-background);
    }
    .glasskit-demo-virtual-index {
      flex: 0 0 34px;
      color: var(--ios-label-tertiary);
      font-size: 13px;
      font-variant-numeric: tabular-nums;
      text-align: right;
    }
    .glasskit-demo-virtual-copy { min-width: 0; flex: 1 1 auto; }
    .glasskit-demo-metric {
      min-width: 0;
      flex: 1 1 120px;
      padding: 12px;
      border-radius: max(0px, calc(var(--ios-surface-radius) - 16px));
      background: var(--ios-fill-tertiary);
    }
    .glasskit-demo-metric-value { margin-top: 2px; font-size: 20px; line-height: 25px; font-weight: 650; }
  `;
  document.head.append(style);
}

function foundationMarkup() {
  return `
    <section class="ios-section glasskit-foundation-demo" data-glasskit-foundation-demo>
      <div class="ios-section-heading">
        <div class="ios-section-heading__copy">
          <h2 class="ios-section-heading__title">Foundation APIs</h2>
          <div class="ios-section-heading__subtitle">Interactive GlassKit 1.2 framework services.</div>
        </div>
        <span class="ios-status-pill ios-status-pill--success">Live</span>
      </div>

      <div class="ios-section__header">Controllers</div>
      <div class="ios-card ios-stack" style="gap:14px">
        <div class="ios-button-row">
          <button class="ios-button ios-button--tinted" type="button" data-foundation-action="dialog">Dialog</button>
          <button class="ios-button ios-button--tinted" type="button" data-foundation-action="sheet">Sheet</button>
          <button class="ios-button ios-button--tinted" type="button" data-foundation-action="toast">Toast</button>
          <button class="ios-button ios-button--tinted" type="button" data-foundation-action="loading">Loading</button>
        </div>
        <div class="ios-subheadline ios-secondary" data-foundation-status="controllers">Use the controls to exercise the programmatic APIs.</div>
      </div>

      <div class="ios-section__header">Store 2.0</div>
      <div class="ios-card ios-stack" style="gap:14px">
        <div class="ios-hstack" style="gap:10px;flex-wrap:wrap">
          <div class="glasskit-demo-metric"><div class="ios-caption ios-secondary">State</div><div class="glasskit-demo-metric-value ios-text-tabular" data-foundation-store-count>0</div></div>
          <div class="glasskit-demo-metric"><div class="ios-caption ios-secondary">Computed getter</div><div class="glasskit-demo-metric-value ios-text-tabular" data-foundation-store-double>0</div></div>
        </div>
        <div class="ios-button-row">
          <button class="ios-button ios-button--tinted" type="button" data-foundation-action="store-increment">Dispatch +1</button>
          <button class="ios-button" type="button" data-foundation-action="store-reset">Reset</button>
        </div>
        <div class="ios-subheadline ios-secondary" data-foundation-status="store">Actions, getters and subscriptions are wired to the live app store.</div>
      </div>

      <div class="ios-section__header">Request & Storage</div>
      <div class="ios-card ios-stack" style="gap:14px">
        <div class="ios-list">
          <div class="ios-row">
            <span class="ios-row__icon" style="background:var(--ios-blue)"><span data-ios-symbol="download"></span></span>
            <span class="ios-row__body"><span class="ios-row__title">Request layer</span><span class="ios-row__subtitle" data-foundation-status="request">Ready to fetch local demo data.</span></span>
            <button class="ios-button ios-button--tinted" type="button" data-foundation-action="request">Fetch</button>
          </div>
          <div class="ios-row">
            <span class="ios-row__icon" style="background:var(--ios-indigo)"><span data-ios-symbol="archive"></span></span>
            <span class="ios-row__body"><span class="ios-row__title">Namespaced storage</span><span class="ios-row__subtitle" data-foundation-status="storage">Nothing saved in this demo session yet.</span></span>
            <button class="ios-button ios-button--tinted" type="button" data-foundation-action="storage">Save</button>
          </div>
        </div>
      </div>

      <div class="ios-section__header">Plugin System</div>
      <div class="ios-card ios-hstack" style="gap:14px;align-items:center">
        <div style="min-width:0;flex:1 1 auto">
          <div class="ios-headline">Runtime plugin</div>
          <div class="ios-subheadline ios-secondary" data-foundation-status="plugin">Not installed.</div>
        </div>
        <button class="ios-button ios-button--prominent" type="button" data-foundation-action="plugin">Install Plugin</button>
      </div>

      <div class="ios-section__header">Virtual List</div>
      <div class="ios-card ios-stack" style="gap:14px">
        <div class="ios-hstack">
          <div><div class="ios-headline">1,000 rows</div><div class="ios-subheadline ios-secondary">Only the visible range is mounted in the DOM.</div></div>
          <span class="ios-spacer"></span>
          <button class="ios-button ios-button--tinted" type="button" data-foundation-action="virtual-jump">Jump to 750</button>
        </div>
        <div class="glasskit-demo-virtual" data-foundation-virtual-list aria-label="One thousand virtualized example rows"></div>
        <div class="ios-subheadline ios-secondary" data-foundation-status="virtual">Virtual list ready.</div>
      </div>
    </section>
  `;
}

function bindStoreDemo(app, root) {
  if (!app.store.getterDefinitions.demoDouble) {
    app.store.getterDefinitions.demoDouble = state => (Number(state.demoCount) || 0) * 2;
  }
  if (!app.store.actions.demoIncrement) {
    app.store.actions.demoIncrement = ({ update }, amount = 1) => update('demoCount', current => (Number(current) || 0) + Number(amount));
  }
  if (!app.store.actions.demoReset) {
    app.store.actions.demoReset = ({ set }) => set('demoCount', 0);
  }

  const count = root.querySelector('[data-foundation-store-count]');
  const doubled = root.querySelector('[data-foundation-store-double]');
  const sync = () => {
    if (count) count.textContent = String(app.store.get('demoCount') ?? 0);
    if (doubled) doubled.textContent = String(app.store.getters.demoDouble ?? 0);
  };
  app.store.subscribe('demoCount', sync, { immediate: true });
}

function bindVirtualList(root) {
  const container = root.querySelector('[data-foundation-virtual-list]');
  const items = Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    title: `Framework row ${index + 1}`,
    detail: index % 3 === 0 ? 'Reusable data row' : index % 3 === 1 ? 'Virtualized content' : 'Rendered on demand'
  }));

  const list = new GlassKitVirtualList({
    container,
    items,
    rowHeight: 58,
    overscan: 5,
    key: item => item.id,
    renderItem: item => `
      <span class="glasskit-demo-virtual-index">${item.id}</span>
      <span class="glasskit-demo-virtual-copy"><span class="ios-headline">${item.title}</span><span class="ios-caption ios-secondary" style="display:block">${item.detail}</span></span>
    `
  });

  const syncMounted = () => {
    const mounted = container.querySelectorAll('.glasskit-virtual-list__item').length;
    setStatus(root, 'virtual', `1,000 data items, ${mounted} DOM rows currently mounted.`);
  };
  container.addEventListener('scroll', () => requestAnimationFrame(syncMounted), { passive: true });
  requestAnimationFrame(syncMounted);
  return list;
}

async function bindFoundationDemo(app, root) {
  bindStoreDemo(app, root);
  const virtualList = bindVirtualList(root);

  root.addEventListener('click', async event => {
    const button = event.target.closest('[data-foundation-action]');
    if (!button) return;
    const action = button.dataset.foundationAction;

    try {
      if (action === 'dialog') {
        const confirmed = await app.dialog.confirm('GlassKit created this dialog programmatically.', { title: 'Controller API' });
        setStatus(root, 'controllers', confirmed ? 'Dialog confirmed.' : 'Dialog cancelled.');
      }

      if (action === 'sheet') {
        app.sheet.open({
          title: 'Programmatic Sheet',
          done: 'Done',
          content: '<div class="ios-stack"><div class="ios-title-3">Created by app.sheet</div><div class="ios-body ios-secondary">The sheet, focus handling and drag-to-dismiss behavior come from GlassKit.</div><label class="ios-text-field"><input type="text" placeholder="Try typing here" aria-label="Example text"></label></div>',
          onClose: reason => setStatus(root, 'controllers', `Sheet closed: ${reason}.`)
        });
        setStatus(root, 'controllers', 'Sheet opened from the controller API.');
      }

      if (action === 'toast') {
        app.toast.show('GlassKit toast is working.', {
          action: { text: 'Done', onClick: () => setStatus(root, 'controllers', 'Toast action selected.') }
        });
        setStatus(root, 'controllers', 'Toast shown with an optional action.');
      }

      if (action === 'loading') {
        button.disabled = true;
        await app.loading.during(new Promise(resolve => setTimeout(resolve, 900)), 'Testing loading controller…');
        button.disabled = false;
        setStatus(root, 'controllers', 'Loading controller completed.');
      }

      if (action === 'store-increment') {
        await app.store.dispatch('demoIncrement', 1);
        setStatus(root, 'store', 'Action dispatched. Computed getter updated automatically.');
      }

      if (action === 'store-reset') {
        await app.store.dispatch('demoReset');
        setStatus(root, 'store', 'Store reset through an action.');
      }

      if (action === 'request') {
        button.disabled = true;
        setStatus(root, 'request', 'Fetching two identical requests…');
        const started = performance.now();
        const [first, second] = await Promise.all([
          app.request.get('./runtime-data.json', { cacheTTL: 60000 }),
          app.request.get('./runtime-data.json', { cacheTTL: 60000 })
        ]);
        const elapsed = Math.max(0, Math.round(performance.now() - started));
        button.disabled = false;
        setStatus(root, 'request', `${first.framework} ${first.version}: two calls resolved in ${elapsed} ms, cache entries ${app.request.cache.size}.`, 'success');
        if (first.framework !== second.framework) throw new Error('Deduplicated responses did not match');
      }

      if (action === 'storage') {
        const value = { savedAt: new Date().toLocaleTimeString(), preference: 'GlassKit demo' };
        app.storage.set('foundation-demo', value);
        const restored = app.storage.get('foundation-demo');
        setStatus(root, 'storage', `Saved and restored: ${restored.preference} at ${restored.savedAt}.`, 'success');
      }

      if (action === 'plugin') {
        button.disabled = true;
        const api = await app.use(demoPlugin);
        button.disabled = false;
        button.textContent = 'Installed';
        setStatus(root, 'plugin', `${api.appName} plugin installed and initialized: ${api.ready ? 'ready' : 'pending'}.`, 'success');
      }

      if (action === 'virtual-jump') {
        virtualList.scrollToIndex(749, { align: 'center' });
        setStatus(root, 'virtual', 'Jumped directly to row 750 without rendering the other 999 rows.');
      }
    } catch (error) {
      button.disabled = false;
      app.handleError?.(error, { phase: 'foundation-demo', action });
      setStatus(root, action === 'request' ? 'request' : 'controllers', error.message || 'Demo action failed.', 'error');
    }
  });
}

async function mount() {
  installDemoStyles();
  const [app, runtimeSection] = await Promise.all([waitForApp(), waitForRuntimeSection()]);
  if (document.querySelector('[data-glasskit-foundation-demo]')) return;
  runtimeSection.insertAdjacentHTML('afterend', foundationMarkup());
  const root = document.querySelector('[data-glasskit-foundation-demo]');
  renderLucide(root);
  await bindFoundationDemo(app, root);
}

mount();
