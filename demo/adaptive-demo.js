import { renderSymbols } from '../src/framework.js';

const adaptiveGallery = `
  <section class="ios-section" data-adaptive-gallery>
    <div class="ios-section__header">Adaptive Layout</div>
    <div class="ios-card ios-stack">
      <div>
        <div class="ios-headline">Compact and regular widths</div>
        <div class="ios-subheadline ios-secondary">Resize the browser. The bottom tab bar becomes leading iPad-style navigation when the window has regular-width space.</div>
      </div>
      <div class="ios-split-view" style="height:420px">
        <aside class="ios-split-view__sidebar">
          <div class="ios-split-view__pane-scroll">
            <div class="ios-section__header" style="margin-left:0">Library</div>
            <div class="ios-list" data-ios-select-list>
              <button class="ios-row ios-selection-row" type="button" data-ios-select-row="recent" aria-selected="true" tabindex="0">
                <span class="ios-row__icon"><span data-ios-symbol="document"></span></span>
                <span class="ios-row__body"><span class="ios-row__title">Recent</span></span>
              </button>
              <button class="ios-row ios-selection-row" type="button" data-ios-select-row="saved" aria-selected="false" tabindex="0">
                <span class="ios-row__icon" style="background:var(--ios-purple)"><span data-ios-symbol="folder"></span></span>
                <span class="ios-row__body"><span class="ios-row__title">Saved</span></span>
              </button>
            </div>
          </div>
        </aside>
        <main class="ios-split-view__content">
          <div class="ios-split-view__pane-scroll ios-stack">
            <div class="ios-title-2">Recent</div>
            <div class="ios-collection">
              <article class="ios-collection__item">
                <button class="ios-collection__button" type="button">
                  <div class="ios-collection__media" style="color:var(--ios-blue)"><span data-ios-symbol="document"></span></div>
                  <div class="ios-collection__content"><div class="ios-collection__title">Project Notes</div><div class="ios-collection__subtitle">Edited today</div></div>
                </button>
              </article>
              <article class="ios-collection__item">
                <button class="ios-collection__button" type="button">
                  <div class="ios-collection__media" style="color:var(--ios-orange)"><span data-ios-symbol="folder"></span></div>
                  <div class="ios-collection__content"><div class="ios-collection__title">References</div><div class="ios-collection__subtitle">12 items</div></div>
                </button>
              </article>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="ios-section__footer">Split views expose more hierarchy at regular width instead of shrinking the same phone interface.</div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Input & Loading</div>
    <div class="ios-card ios-stack">
      <label class="ios-stack" style="gap:6px">
        <span class="ios-subheadline ios-secondary">Notes</span>
        <textarea class="ios-text-view" placeholder="Add notes"></textarea>
      </label>
      <label class="ios-stack" style="gap:6px">
        <span class="ios-subheadline ios-secondary">Category</span>
        <span class="ios-picker-field"><select aria-label="Category"><option>Personal</option><option>Work</option><option>Saved</option></select></span>
      </label>
      <div class="ios-inline-message ios-inline-message--success">
        <div class="ios-inline-message__symbol"><span data-ios-symbol="check"></span></div>
        <div class="ios-inline-message__body"><div class="ios-inline-message__title">Up to date</div><div class="ios-inline-message__text">Persistent status stays near the content it describes.</div></div>
      </div>
      <div class="ios-hstack">
        <div class="ios-skeleton ios-skeleton--avatar"></div>
        <div class="ios-stack" style="flex:1;gap:8px"><div class="ios-skeleton ios-skeleton--title"></div><div class="ios-skeleton ios-skeleton--text"></div><div class="ios-skeleton ios-skeleton--text" style="width:78%"></div></div>
      </div>
    </div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Data Table</div>
    <div class="ios-data-table-wrap">
      <table class="ios-data-table">
        <thead><tr><th>Name</th><th>Status</th><th data-align="right">Items</th><th data-align="right">Updated</th></tr></thead>
        <tbody>
          <tr><td>Personal</td><td>Available</td><td data-align="right">18</td><td data-align="right">Today</td></tr>
          <tr><td>Projects</td><td>Available</td><td data-align="right">42</td><td data-align="right">Yesterday</td></tr>
          <tr><td>Archive</td><td>Offline</td><td data-align="right">9</td><td data-align="right">Sep 12</td></tr>
        </tbody>
      </table>
    </div>
  </section>
`;

function ready() {
  const patterns = document.querySelector('[data-ios-tab-panel="patterns"] .ios-content');
  if (!patterns || patterns.querySelector('[data-adaptive-gallery]')) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = adaptiveGallery;
  patterns.append(...wrapper.children);
  renderSymbols(patterns);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
else ready();
