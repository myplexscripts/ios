import { defineComponent, renderLucide } from '../src/framework.js';

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}

const RuntimeRouteComponent = defineComponent({
  state: {
    count: 0
  },

  render({ params, data, state }) {
    const id = escapeHTML(params.id || 'example');
    const title = escapeHTML(data?.title || 'Routed Component');
    return `
      <header class="ios-navigation-bar is-scrolled">
        <div class="ios-navigation-bar__row">
          <div class="ios-navigation-bar__leading">
            <div class="ios-glass-group">
              <button class="ios-bar-button" type="button" data-ios-back>
                <span data-ios-symbol="chevronLeft"></span><span>Patterns</span>
              </button>
            </div>
          </div>
          <div class="ios-navigation-bar__title" style="opacity:1;transform:none">${title}</div>
          <div class="ios-navigation-bar__trailing"></div>
        </div>
      </header>
      <div class="ios-scroll">
        <div class="ios-content">
          <h1 class="ios-large-title">${title}</h1>

          <section class="ios-section">
            <div class="ios-card ios-stack" style="gap:16px">
              <div>
                <div class="ios-headline">Created by GlassKitRouter</div>
                <p class="ios-paragraph ios-paragraph--secondary">This entire screen was created when the route opened. It is not present in demo/index.html.</p>
              </div>
              <div class="ios-key-value-list">
                <div class="ios-key-value"><span class="ios-key-value__key">Route</span><span class="ios-key-value__value ios-text-tabular">/detail/:id</span></div>
                <div class="ios-key-value"><span class="ios-key-value__key">Parameter</span><span class="ios-key-value__value ios-text-tabular">${id}</span></div>
                <div class="ios-key-value"><span class="ios-key-value__key">Loaded data</span><span class="ios-key-value__value">${title}</span></div>
              </div>
            </div>
          </section>

          <section class="ios-section">
            <div class="ios-section__header">Local Component State</div>
            <div class="ios-card ios-hstack" style="gap:14px">
              <div>
                <div class="ios-headline">Counter</div>
                <div class="ios-subheadline ios-secondary">State belongs to this route component.</div>
              </div>
              <span class="ios-spacer"></span>
              <button class="ios-button ios-button--tinted" type="button" data-runtime-decrement aria-label="Decrease">−</button>
              <span class="ios-title-3 ios-text-tabular">${state.count}</span>
              <button class="ios-button ios-button--tinted" type="button" data-runtime-increment aria-label="Increase">+</button>
            </div>
          </section>

          <section class="ios-section">
            <div class="ios-card ios-stack">
              <div class="ios-headline">Router 2.0</div>
              <div class="ios-subheadline ios-secondary">Back and Forward restore this component and its scroll position. The route can also load its component and data asynchronously.</div>
              <button class="ios-button ios-button--prominent ios-button--block" type="button" data-glasskit-link="/settings">Navigate to Settings</button>
            </div>
          </section>
        </div>
      </div>
    `;
  },

  events: {
    'click [data-runtime-increment]': (event, { state, setState }) => {
      event.preventDefault();
      setState({ count: state.count + 1 });
    },
    'click [data-runtime-decrement]': (event, { state, setState }) => {
      event.preventDefault();
      setState({ count: state.count - 1 });
    }
  }
});

function installRuntimeRoute() {
  const root = document.querySelector('#demoApp');
  const app = root?.__glasskitApp;
  if (!app?.router) {
    setTimeout(installRuntimeRoute, 0);
    return;
  }

  const route = app.router.routes.find(candidate => candidate.path === '/detail/:id');
  if (!route || route.__glasskitComponentDemo) return;

  route.__glasskitComponentDemo = true;
  route.name = 'runtimeComponent';
  route.tab = 'patterns';
  delete route.screen;
  route.loadComponent = async () => RuntimeRouteComponent;
  route.resolve = async ({ params }) => ({
    title: params.id === 'runtime-demo' ? 'Runtime Component' : `Item ${params.id}`
  });
  route.cacheData = true;
  app.router.namedRoutes.set(route.name, route);

  const addExplanation = () => {
    const runtime = document.querySelector('[data-glasskit-runtime-demo]');
    if (!runtime) {
      setTimeout(addExplanation, 20);
      return;
    }
    if (document.querySelector('[data-router-two-demo-note]')) return;
    const note = document.createElement('div');
    note.dataset.routerTwoDemoNote = '';
    note.className = 'ios-callout-box';
    note.style.marginTop = '12px';
    note.innerHTML = `
      <div class="ios-callout-box__icon"><span data-ios-symbol="columns"></span></div>
      <div class="ios-callout-box__content">
        <div class="ios-callout-box__title">Routed components are live</div>
        <div class="ios-callout-box__message">Open “Parameterized Route” above. GlassKit will lazy-load and create that screen at runtime instead of revealing hidden HTML.</div>
      </div>
    `;
    runtime.append(note);
    renderLucide(note);
  };

  addExplanation();
}

installRuntimeRoute();
