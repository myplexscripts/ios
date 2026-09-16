import { renderLucide } from '../src/framework.js';

const gallery = `
  <div data-full-gallery>
    <section class="ios-section">
      <div class="ios-section__header">Horizontal Scrollers</div>
      <div class="ios-card-scroller ios-card-scroller--peek" aria-label="Featured cards">
        <article class="ios-card ios-card--elevated ios-scroll-card">
          <div class="ios-scroll-card__media" style="display:grid;place-items:center;background:linear-gradient(135deg,var(--ios-blue),var(--ios-indigo));color:white;font-size:36px"><span data-ios-symbol="star"></span></div>
          <div class="ios-eyebrow">Featured</div>
          <div class="ios-card__title">Card carousel</div>
          <div class="ios-card__body">Horizontal content keeps a visible next-card peek on compact screens.</div>
        </article>
        <article class="ios-card ios-card--elevated ios-scroll-card">
          <div class="ios-scroll-card__media" style="display:grid;place-items:center;background:linear-gradient(135deg,var(--ios-purple),var(--ios-pink));color:white;font-size:36px"><span data-ios-symbol="image"></span></div>
          <div class="ios-eyebrow">Media</div>
          <div class="ios-card__title">Image-led card</div>
          <div class="ios-card__body">Use for browseable media or editorial content.</div>
        </article>
        <article class="ios-card ios-card--elevated ios-scroll-card">
          <div class="ios-scroll-card__media" style="display:grid;place-items:center;background:linear-gradient(135deg,var(--ios-orange),var(--ios-red));color:white;font-size:36px"><span data-ios-symbol="bookmark"></span></div>
          <div class="ios-eyebrow">Saved</div>
          <div class="ios-card__title">Independent item</div>
          <div class="ios-card__body">Each card is a single focused destination or action.</div>
        </article>
        <article class="ios-card ios-card--elevated ios-scroll-card">
          <div class="ios-scroll-card__media" style="display:grid;place-items:center;background:linear-gradient(135deg,var(--ios-green),var(--ios-teal));color:white;font-size:36px"><span data-ios-symbol="download"></span></div>
          <div class="ios-eyebrow">Offline</div>
          <div class="ios-card__title">Download card</div>
          <div class="ios-card__body">Horizontal scrollers work with touch, trackpad, and pointer input.</div>
        </article>
      </div>
      <div class="ios-section__footer">Scrollable collections preserve item size instead of compressing cards until their content becomes unreadable.</div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Collection Grid</div>
      <div class="ios-collection">
        ${['Personal','Projects','Travel','Archive'].map((name, index) => `
          <article class="ios-collection__item">
            <button class="ios-collection__button" type="button">
              <div class="ios-collection__media" style="color:var(--ios-${['blue','purple','orange','green'][index]})"><span data-ios-symbol="${index === 3 ? 'bookmark' : 'folder'}"></span></div>
              <div class="ios-collection__content"><div class="ios-collection__title">${name}</div><div class="ios-collection__subtitle">${[18,9,24,7][index]} items</div></div>
            </button>
          </article>`).join('')}
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Complete Form</div>
      <div class="ios-card ios-form-group">
        <label class="ios-field">
          <span class="ios-field__label">Name</span>
          <span class="ios-text-field"><input type="text" value="Example Collection" autocomplete="off"></span>
          <span class="ios-field__help">Use concise labels and keep related help text with the field.</span>
        </label>

        <label class="ios-field is-invalid">
          <span class="ios-field__label">Email</span>
          <span class="ios-text-field"><input type="email" value="not-an-email" aria-invalid="true" aria-describedby="email-error"></span>
          <span class="ios-field__error" id="email-error">Enter a valid email address.</span>
        </label>

        <label class="ios-field">
          <span class="ios-field__label">Description</span>
          <textarea class="ios-text-view" rows="4" placeholder="Add a description"></textarea>
        </label>

        <div class="ios-card-grid">
          <label class="ios-field">
            <span class="ios-field__label">Date</span>
            <span class="ios-picker-field"><input type="date" aria-label="Date"></span>
          </label>
          <label class="ios-field">
            <span class="ios-field__label">Time</span>
            <span class="ios-picker-field"><input type="time" aria-label="Time"></span>
          </label>
        </div>

        <label class="ios-field">
          <span class="ios-field__label">Category</span>
          <span class="ios-picker-field"><select><option>Personal</option><option>Work</option><option>Travel</option></select></span>
        </label>

        <div class="ios-field">
          <span class="ios-field__label">Options</span>
          <label class="ios-check-row"><input type="checkbox" checked> Include archived items</label>
          <label class="ios-check-row"><input type="checkbox"> Notify collaborators</label>
        </div>

        <div class="ios-field">
          <span class="ios-field__label">Visibility</span>
          <label class="ios-radio-row"><input type="radio" name="visibility-demo" checked> Private</label>
          <label class="ios-radio-row"><input type="radio" name="visibility-demo"> Shared</label>
        </div>

        <div class="ios-button-row">
          <button class="ios-button ios-button--prominent" type="button"><span data-ios-symbol="check"></span> Save</button>
          <button class="ios-button" type="button">Cancel</button>
        </div>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Tokens & Filters</div>
      <div class="ios-card ios-stack">
        <div class="ios-token-row" data-demo-tokens>
          <button class="ios-token" type="button" aria-selected="true">All</button>
          <button class="ios-token" type="button" aria-selected="false">Recent</button>
          <button class="ios-token" type="button" aria-selected="false">Shared</button>
          <button class="ios-token" type="button" aria-selected="false">Downloaded</button>
        </div>
        <div class="ios-hstack"><span class="ios-status-pill ios-status-pill--success"><span data-ios-symbol="circleCheck"></span> Synced</span><span class="ios-status-pill ios-status-pill--warning"><span data-ios-symbol="clock"></span> Pending</span><span class="ios-status-pill ios-status-pill--error"><span data-ios-symbol="circleAlert"></span> Error</span></div>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Disclosure</div>
      <div class="ios-disclosure-group">
        <details open>
          <summary><span data-ios-symbol="folder"></span><span class="ios-headline">General</span></summary>
          <div class="ios-disclosure-group__content">Disclosure groups reveal related supporting information without creating a new level of navigation.</div>
        </details>
        <details>
          <summary><span data-ios-symbol="bell"></span><span class="ios-headline">Notifications</span></summary>
          <div class="ios-disclosure-group__content">Use disclosure for content expansion, not as a replacement for a destination that belongs in navigation.</div>
        </details>
        <details>
          <summary><span data-ios-symbol="lock"></span><span class="ios-headline">Privacy</span></summary>
          <div class="ios-disclosure-group__content">Expanded content inherits semantic text and appearance colours.</div>
        </details>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Media Rows & Accessories</div>
      <div class="ios-list">
        <button class="ios-row ios-row--disclosure" type="button">
          <span class="ios-avatar">DB</span>
          <span class="ios-row__body"><span class="ios-row__title">David</span><span class="ios-row__subtitle">Owner</span></span>
          <span class="ios-row__value">Online</span>
          <span class="ios-row__chevron"><span data-ios-symbol="chevronRight"></span></span>
        </button>
        <div class="ios-row">
          <span class="ios-row__icon" style="background:var(--ios-green)"><span data-ios-symbol="download"></span></span>
          <span class="ios-row__body"><span class="ios-row__title">Downloads</span><span class="ios-row__subtitle">Available offline</span></span>
          <span class="ios-status-pill ios-status-pill--success">Ready</span>
        </div>
        <div class="ios-row">
          <span class="ios-row__icon" style="background:var(--ios-indigo)"><span data-ios-symbol="calendar"></span></span>
          <span class="ios-row__body"><span class="ios-row__title">Next review</span></span>
          <span class="ios-row__value">Sep 21</span>
        </div>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Progress & Pagination</div>
      <div class="ios-card ios-stack">
        <div class="ios-hstack"><div class="ios-spinner" aria-label="Loading"></div><div><div class="ios-headline">Syncing</div><div class="ios-subheadline ios-secondary">18 of 24 items</div></div></div>
        <progress class="ios-progress" value="75" max="100">75%</progress>
        <div class="ios-page-control" data-ios-page-control aria-label="Featured pages">
          <span data-ios-page aria-current="true"></span><span data-ios-page aria-current="false"></span><span data-ios-page aria-current="false"></span><span data-ios-page aria-current="false"></span>
        </div>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Inline Feedback</div>
      <div class="ios-stack">
        <div class="ios-inline-message"><div class="ios-inline-message__symbol"><span data-ios-symbol="info"></span></div><div class="ios-inline-message__body"><div class="ios-inline-message__title">Information</div><div class="ios-inline-message__text">Use inline feedback when the message belongs with this content.</div></div></div>
        <div class="ios-inline-message ios-inline-message--warning"><div class="ios-inline-message__symbol"><span data-ios-symbol="triangleAlert"></span></div><div class="ios-inline-message__body"><div class="ios-inline-message__title">Needs attention</div><div class="ios-inline-message__text">A warning can remain visible without interrupting the person's task.</div></div></div>
        <div class="ios-inline-message ios-inline-message--error"><div class="ios-inline-message__symbol"><span data-ios-symbol="circleAlert"></span></div><div class="ios-inline-message__body"><div class="ios-inline-message__title">Couldn’t save</div><div class="ios-inline-message__text">Explain what happened and how to recover.</div></div></div>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Content Unavailable</div>
      <div class="ios-card ios-content-unavailable">
        <div>
          <div class="ios-content-unavailable__icon"><span data-ios-symbol="search"></span></div>
          <div class="ios-content-unavailable__title">No Results</div>
          <div class="ios-content-unavailable__description">Try another search or remove some filters.</div>
          <button class="ios-button ios-button--tinted" type="button">Clear Filters</button>
        </div>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section__header">Loading Skeleton</div>
      <div class="ios-card ios-stack">
        <div class="ios-hstack"><div class="ios-skeleton ios-skeleton--avatar"></div><div class="ios-stack" style="flex:1;gap:8px"><div class="ios-skeleton ios-skeleton--title"></div><div class="ios-skeleton ios-skeleton--text"></div><div class="ios-skeleton ios-skeleton--text" style="width:72%"></div></div></div>
        <div class="ios-card-grid"><div class="ios-skeleton" style="height:110px"></div><div class="ios-skeleton" style="height:110px"></div></div>
      </div>
    </section>
  </div>
`;

function bindDemoInteractions(root) {
  root.querySelector('[data-demo-tokens]')?.addEventListener('click', event => {
    const token = event.target.closest('.ios-token');
    if (!token) return;
    root.querySelectorAll('[data-demo-tokens] .ios-token').forEach(item => item.setAttribute('aria-selected', String(item === token)));
  });
}

function ready() {
  const components = document.querySelector('[data-ios-tab-panel="components"] .ios-content');
  if (!components || components.querySelector('[data-full-gallery]')) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = gallery;
  components.append(...wrapper.children);
  bindDemoInteractions(components);
  renderLucide(components);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
else ready();
