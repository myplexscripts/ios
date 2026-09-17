const root = document.querySelector('#demoApp');
root?.removeAttribute('data-ios-app');
root?.setAttribute('data-glasskit-app', '');

document.title = 'GlassKit Demo';

const { GlassKitApp, GLASSKIT_VERSION, renderLucide } = await import('../src/framework.js');
await Promise.all([
  import('./adaptive-demo.js'),
  import('./native-patterns.js'),
  import('./charts.js')
]);

export const demoApp = new GlassKitApp({
  root: '#demoApp',
  name: 'GlassKit Demo',
  router: {
    mode: 'hash',
    defaultRoute: '/components'
  },
  routes: [
    { path: '/components', tab: 'components' },
    { path: '/patterns', tab: 'patterns' },
    { path: '/settings', tab: 'settings' },
    { path: '/detail', screen: 'detail' },
    { path: '/detail/:id', screen: 'detail' },
    { path: '*', redirect: '/components' }
  ],
  store: {
    demoCount: 0
  }
}).init();

const glassKitGallery = `
  <section class="ios-section" data-glasskit-runtime-demo>
    <div class="ios-section-heading">
      <div class="ios-section-heading__copy">
        <h2 class="ios-section-heading__title">GlassKit Runtime</h2>
        <div class="ios-section-heading__subtitle">The demo itself is running on GlassKitApp.</div>
      </div>
      <span class="ios-badge">v${GLASSKIT_VERSION}</span>
    </div>

    <div class="ios-card ios-stack" style="gap:16px">
      <div class="ios-key-value-list">
        <div class="ios-key-value"><span class="ios-key-value__key">Current route</span><span class="ios-key-value__value ios-text-tabular" data-glasskit-current-route>/components</span></div>
        <div class="ios-key-value"><span class="ios-key-value__key">App instance</span><span class="ios-key-value__value">GlassKitApp</span></div>
        <div class="ios-key-value"><span class="ios-key-value__key">Router</span><span class="ios-key-value__value">Hash + browser history</span></div>
      </div>

      <div class="ios-hstack" style="gap:12px">
        <div>
          <div class="ios-headline">Shared store</div>
          <div class="ios-subheadline ios-secondary">Reactive state shared across the app.</div>
        </div>
        <span class="ios-spacer"></span>
        <div class="ios-stepper" aria-label="GlassKit store counter">
          <button type="button" data-glasskit-store-step="-1" aria-label="Decrease"><span data-ios-symbol="minus"></span></button>
          <span class="ios-stepper__value" data-glasskit-store-value>0</span>
          <button type="button" data-glasskit-store-step="1" aria-label="Increase"><span data-ios-symbol="plus"></span></button>
        </div>
      </div>

      <div class="ios-divider"></div>

      <div class="ios-text-stack" style="gap:10px">
        <div class="ios-headline">Routed navigation</div>
        <div class="ios-subheadline ios-secondary">These use GlassKitRouter rather than manually swapping panels.</div>
        <div class="ios-button-row">
          <button class="ios-button ios-button--tinted" type="button" data-glasskit-link="/components">Components</button>
          <button class="ios-button ios-button--tinted" type="button" data-glasskit-link="/settings">Settings</button>
          <button class="ios-button ios-button--prominent" type="button" data-glasskit-link="/detail/runtime-demo">Parameterized Route</button>
        </div>
      </div>

      <div class="ios-callout-box">
        <div class="ios-callout-box__icon"><span data-ios-symbol="info"></span></div>
        <div class="ios-callout-box__content">
          <div class="ios-callout-box__title">Lifecycle</div>
          <div class="ios-callout-box__message" data-glasskit-last-event>Waiting for the next route change.</div>
        </div>
      </div>
    </div>
    <div class="ios-section__footer">Change tabs, use Back/Forward, or open the parameterized route and watch the URL and lifecycle state update.</div>
  </section>
`;

const contentGallery = `
  <section class="ios-section">
    <div class="ios-section__header">Typography</div>
    <div class="ios-card ios-stack" style="gap:18px">
      <div class="ios-text-stack"><div class="ios-extra-large-title-2">Extra Large 2</div><div class="ios-caption ios-text-secondary">Hero moments and very prominent content</div></div>
      <div class="ios-text-stack"><div class="ios-large-title" style="margin:0">Large Title</div><div class="ios-title-1">Title 1</div><div class="ios-title-2">Title 2</div><div class="ios-title-3">Title 3</div></div>
      <hr class="ios-divider">
      <div class="ios-text-stack" style="gap:9px"><div class="ios-headline">Headline</div><div class="ios-body">Body text is the default for readable interface copy.</div><div class="ios-callout">Callout text sits just below body in emphasis.</div><div class="ios-subheadline ios-text-secondary">Subheadline</div><div class="ios-footnote ios-text-secondary">Footnote</div><div class="ios-caption ios-text-tertiary">Caption</div><div class="ios-caption-2 ios-text-tertiary">Caption 2</div></div>
    </div>
    <div class="ios-section__footer">Semantic text styles retain their hierarchy across appearance and size changes.</div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Body Copy</div>
    <div class="ios-card ios-readable"><div class="ios-prose"><div class="ios-eyebrow">Article</div><h2>Readable content has its own rhythm</h2><p class="ios-lead">Longer text should feel like content, not like a settings row stretched into a paragraph.</p><p>Body copy uses a comfortable line height and readable maximum width. It supports <strong>emphasis</strong>, <a href="#" onclick="return false">inline links</a>, lists, supporting text and <code>inline code</code>.</p><blockquote class="ios-quote">Use hierarchy to make text easier to scan before adding decoration.<cite class="ios-quote__source">Content guideline</cite></blockquote><p class="ios-paragraph ios-paragraph--secondary">Secondary copy keeps enough contrast to remain readable without competing with primary content.</p></div></div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Cards</div>
    <div class="ios-card-grid">
      <article class="ios-card"><div class="ios-eyebrow">Standard</div><h3 class="ios-card__title">Content card</h3><p class="ios-card__body">A quiet container for related content that belongs together.</p><div class="ios-card__footer"><span>Updated today</span></div></article>
      <article class="ios-card ios-card--elevated"><div class="ios-card__header"><div><h3 class="ios-card__title">Elevated</h3><p class="ios-card__subtitle">Use elevation sparingly</p></div><span class="ios-card__badge">New</span></div><div class="ios-card__body">Useful when content needs slightly more separation.</div></article>
      <article class="ios-card ios-card--outlined"><div class="ios-card__title">Outlined</div><div class="ios-card__body">A low-emphasis boundary without a shadow.</div></article>
      <article class="ios-card ios-card--tinted"><div class="ios-card__title">Tinted</div><div class="ios-card__body">Uses semantic fill rather than another arbitrary surface colour.</div></article>
    </div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Media & Interactive Cards</div>
    <div class="ios-stack">
      <article class="ios-card ios-card--elevated"><div class="ios-card__media" style="display:grid;place-items:center;background:var(--ios-blue);color:white;font-size:42px"><span data-ios-symbol="document"></span></div><div class="ios-eyebrow">Featured</div><h3 class="ios-card__title">Media card</h3><p class="ios-card__body">Media can sit edge to edge while copy keeps the standard inset.</p><div class="ios-metadata"><span>6 min read</span><span>Today</span><span>Saved</span></div></article>
      <button class="ios-card ios-card--horizontal ios-card--interactive" type="button" data-ios-present="alert-demo"><div class="ios-card__media" style="display:grid;place-items:center;background:var(--ios-fill-secondary);color:var(--ios-blue);font-size:28px"><span data-ios-symbol="folder"></span></div><div class="ios-text-stack"><div class="ios-card__title">Horizontal interactive card</div><div class="ios-card__subtitle ios-text-clamp-2">Good for compact previews where the whole surface performs one clear action.</div><div class="ios-metadata"><span>Library</span><span>12 items</span></div></div></button>
    </div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Supporting Content</div>
    <div class="ios-stack">
      <div class="ios-callout-box"><div class="ios-callout-box__icon"><span data-ios-symbol="info"></span></div><div class="ios-callout-box__content"><div class="ios-callout-box__title">Helpful information</div><div class="ios-callout-box__message">Use a callout for context that should remain visible with the content.</div></div></div>
      <div class="ios-key-value-list"><div class="ios-key-value"><span class="ios-key-value__key">Created</span><span class="ios-key-value__value">September 17</span></div><div class="ios-key-value"><span class="ios-key-value__key">Status</span><span class="ios-key-value__value ios-text-success">Available</span></div><div class="ios-key-value"><span class="ios-key-value__key">Version</span><span class="ios-key-value__value ios-text-tabular">${GLASSKIT_VERSION}</span></div></div>
    </div>
  </section>
`;

function ready() {
  const components = document.querySelector('[data-ios-tab-panel="components"] .ios-content');
  const searchSection = components?.querySelector('.ios-section');
  if (searchSection && !components.querySelector('[data-content-gallery]')) {
    const wrapper = document.createElement('div');
    wrapper.dataset.contentGallery = '';
    wrapper.innerHTML = contentGallery;
    searchSection.insertAdjacentElement('afterend', wrapper);
  }

  const patterns = document.querySelector('[data-ios-tab-panel="patterns"] .ios-content');
  const patternsTitle = patterns?.querySelector('.ios-large-title');
  if (patternsTitle && !patterns.querySelector('[data-glasskit-runtime-demo]')) {
    patternsTitle.insertAdjacentHTML('afterend', glassKitGallery);
  }

  renderLucide(document);

  const routeOutput = document.querySelector('[data-glasskit-current-route]');
  const eventOutput = document.querySelector('[data-glasskit-last-event]');
  const storeOutput = document.querySelector('[data-glasskit-store-value]');

  const syncRoute = route => {
    if (routeOutput) routeOutput.textContent = route?.path || demoApp.router.current?.path || '/components';
  };
  syncRoute(demoApp.router.current);

  demoApp.on('routebeforechange', event => {
    const to = event.detail.to;
    if (eventOutput) eventOutput.textContent = `pagebeforeenter → ${to?.path || 'unknown'}`;
  });
  demoApp.on('routechange', event => {
    const to = event.detail.to;
    syncRoute(to);
    if (eventOutput) eventOutput.textContent = `pageenter → ${to?.path || 'unknown'}`;
  });

  demoApp.store.subscribe('demoCount', value => {
    if (storeOutput) storeOutput.textContent = String(value ?? 0);
  }, { immediate: true });

  document.querySelectorAll('[data-glasskit-store-step]').forEach(button => {
    button.addEventListener('click', () => {
      demoApp.store.update('demoCount', current => (Number(current) || 0) + Number(button.dataset.glasskitStoreStep));
    });
  });

  const deleteButton = document.querySelector('#demoDelete');
  deleteButton?.addEventListener('click', () => {
    const row = deleteButton.closest('.ios-swipe-row');
    const animation = row?.animate([{ opacity: 1, height: `${row.offsetHeight}px` }, { opacity: 0, height: '0px' }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
    animation?.finished.then(() => row.remove());
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
else ready();
