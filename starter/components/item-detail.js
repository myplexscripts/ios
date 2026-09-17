import { defineComponent } from '../framework/framework.js';

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}

function titleFromId(id = 'item') {
  return decodeURIComponent(id)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

export const ItemDetail = defineComponent({
  state: {
    saved: false
  },

  render({ params, state }) {
    const title = escapeHTML(titleFromId(params.id));
    return `
      <header class="ios-navigation-bar is-scrolled">
        <div class="ios-navigation-bar__row">
          <div class="ios-navigation-bar__leading">
            <div class="ios-glass-group">
              <button class="ios-bar-button" type="button" data-ios-back>
                <span data-ios-symbol="chevronLeft"></span><span>Library</span>
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
            <article class="ios-card ios-stack" style="gap:16px">
              <div>
                <div class="ios-headline">Routed component</div>
                <p class="ios-paragraph ios-paragraph--secondary">This screen did not exist in index.html. GlassKitRouter created it from a component when the route opened.</p>
              </div>
              <button class="ios-button ios-button--${state.saved ? 'tinted' : 'prominent'} ios-button--block" type="button" data-example-save>
                <span data-ios-symbol="bookmark"></span>${state.saved ? 'Saved' : 'Save Item'}
              </button>
            </article>
          </section>
        </div>
      </div>
    `;
  },

  events: {
    'click [data-example-save]': (event, { state, setState }) => {
      event.preventDefault();
      setState({ saved: !state.saved });
    }
  }
});
