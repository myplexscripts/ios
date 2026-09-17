import { renderLucide } from '../src/framework.js';
import './full-gallery.js';
import './component-router-demo.js';

const adaptiveGallery = `
  <section class="ios-section" data-adaptive-gallery>
    <div class="ios-section__header">Adaptive Layout</div>
    <div class="ios-card ios-stack">
      <div class="ios-text-stack ios-text-stack--loose">
        <div class="ios-headline">Compact and regular widths</div>
        <div class="ios-subheadline ios-secondary">On iPhone-sized layouts, this hierarchy behaves as a navigation stack. At regular width, the same content expands into a split view.</div>
      </div>

      <div class="ios-split-view" data-ios-split-view>
        <aside class="ios-split-view__sidebar">
          <div class="ios-split-view__pane-scroll">
            <div class="ios-section__header" style="margin-left:0">Library</div>
            <div class="ios-list">
              <button class="ios-row ios-selection-row" type="button" data-ios-split-show="recent" aria-selected="true">
                <span class="ios-row__icon"><span data-ios-symbol="document"></span></span>
                <span class="ios-row__body"><span class="ios-row__title">Recent</span><span class="ios-row__subtitle">Edited and opened recently</span></span>
                <span class="ios-row__chevron"><span data-ios-symbol="chevronRight"></span></span>
              </button>
              <button class="ios-row ios-selection-row" type="button" data-ios-split-show="saved" aria-selected="false">
                <span class="ios-row__icon" style="background:var(--ios-purple)"><span data-ios-symbol="folder"></span></span>
                <span class="ios-row__body"><span class="ios-row__title">Saved</span><span class="ios-row__subtitle">Items saved for later</span></span>
                <span class="ios-row__chevron"><span data-ios-symbol="chevronRight"></span></span>
              </button>
            </div>
          </div>
        </aside>

        <main class="ios-split-view__content">
          <div class="ios-split-view__pane-scroll">
            <button class="ios-button ios-button--plain ios-split-back" type="button" data-ios-split-back><span data-ios-symbol="chevronLeft"></span> Library</button>

            <div data-ios-split-panel="recent">
              <div class="ios-title-2" style="margin-bottom:14px">Recent</div>
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

            <div data-ios-split-panel="saved" hidden>
              <div class="ios-title-2" style="margin-bottom:14px">Saved</div>
              <div class="ios-card ios-card--tinted">
                <div class="ios-card__title">Saved for later</div>
                <div class="ios-card__body">The compact layout replaces the sidebar with this destination, while regular width keeps both visible.</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="ios-section__footer">This mirrors the iOS and iPadOS pattern: compact width collapses hierarchy into push navigation instead of squeezing multiple columns onto a phone.</div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Input & Loading</div>
    <div class="ios-card ios-form-group">
      <label class="ios-field">
        <span class="ios-field__label">Notes</span>
        <textarea class="ios-text-view" placeholder="Add notes"></textarea>
        <span class="ios-field__help">Text views support longer editable content.</span>
      </label>
      <label class="ios-field">
        <span class="ios-field__label">Category</span>
        <span class="ios-picker-field"><select aria-label="Category"><option>Personal</option><option>Work</option><option>Saved</option></select></span>
      </label>
      <div class="ios-inline-message ios-inline-message--success">
        <div class="ios-inline-message__symbol"><span data-ios-symbol="circleCheck"></span></div>
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
          <tr><td>Personal</td><td><span class="ios-status-pill ios-status-pill--success">Available</span></td><td data-align="right">18</td><td data-align="right">Today</td></tr>
          <tr><td>Projects</td><td><span class="ios-status-pill ios-status-pill--success">Available</span></td><td data-align="right">42</td><td data-align="right">Yesterday</td></tr>
          <tr><td>Archive</td><td><span class="ios-status-pill">Offline</span></td><td data-align="right">9</td><td data-align="right">Sep 12</td></tr>
        </tbody>
      </table>
    </div>
    <div class="ios-section__footer">Wide data remains horizontally scrollable on compact devices rather than shrinking text below legible sizes.</div>
  </section>
`;

function ready() {
  const patterns = document.querySelector('[data-ios-tab-panel="patterns"] .ios-content');
  if (!patterns || patterns.querySelector('[data-adaptive-gallery]')) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = adaptiveGallery;
  patterns.append(...wrapper.children);
  renderLucide(patterns);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
else ready();
