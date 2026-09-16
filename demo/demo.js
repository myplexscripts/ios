import { renderSymbols } from '../src/framework.js';

['../src/content.css', '../src/adaptive.css'].forEach(href => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.append(link);
});

const contentGallery = `
  <section class="ios-section">
    <div class="ios-section__header">Typography</div>
    <div class="ios-card ios-stack" style="gap:18px">
      <div class="ios-text-stack">
        <div class="ios-extra-large-title-2">Extra Large 2</div>
        <div class="ios-caption ios-text-secondary">Hero moments and very prominent content</div>
      </div>
      <div class="ios-text-stack">
        <div class="ios-large-title" style="margin:0">Large Title</div>
        <div class="ios-title-1">Title 1</div>
        <div class="ios-title-2">Title 2</div>
        <div class="ios-title-3">Title 3</div>
      </div>
      <hr class="ios-divider">
      <div class="ios-text-stack" style="gap:9px">
        <div class="ios-headline">Headline</div>
        <div class="ios-body">Body text is the default for readable interface copy.</div>
        <div class="ios-callout">Callout text sits just below body in emphasis.</div>
        <div class="ios-subheadline ios-text-secondary">Subheadline</div>
        <div class="ios-footnote ios-text-secondary">Footnote</div>
        <div class="ios-caption ios-text-tertiary">Caption</div>
        <div class="ios-caption-2 ios-text-tertiary">Caption 2</div>
      </div>
    </div>
    <div class="ios-section__footer">Text styles use the system font and semantic label colours instead of hard-coded grey values.</div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Body Copy</div>
    <div class="ios-card ios-readable">
      <div class="ios-prose">
        <div class="ios-eyebrow">Article</div>
        <h2>Readable content has its own rhythm</h2>
        <p class="ios-lead">Longer text should feel like content, not like a settings row stretched into a paragraph.</p>
        <p>Body copy uses a comfortable line height and a readable maximum width. It supports <strong>emphasis</strong>, <a href="#" onclick="return false">inline links</a>, lists, small supporting text, and <code>inline code</code> without requiring a custom style for every screen.</p>
        <blockquote class="ios-quote">Use hierarchy to make text easier to scan before adding decoration.<cite class="ios-quote__source">Content guideline</cite></blockquote>
        <p class="ios-paragraph ios-paragraph--secondary">Secondary paragraphs can carry supporting context without competing with the primary copy.</p>
      </div>
    </div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Cards</div>
    <div class="ios-card-grid">
      <article class="ios-card">
        <div class="ios-eyebrow">Standard</div>
        <h3 class="ios-card__title">Content card</h3>
        <p class="ios-card__body">A quiet container for related content that belongs together.</p>
        <div class="ios-card__footer"><span>Updated today</span></div>
      </article>

      <article class="ios-card ios-card--elevated">
        <div class="ios-card__header">
          <div>
            <h3 class="ios-card__title">Elevated</h3>
            <p class="ios-card__subtitle">Use elevation sparingly</p>
          </div>
          <span class="ios-card__badge">New</span>
        </div>
        <div class="ios-card__body">Useful when a card needs slightly more separation from its surrounding content.</div>
      </article>

      <article class="ios-card ios-card--outlined">
        <div class="ios-card__title">Outlined</div>
        <div class="ios-card__body">A low-emphasis boundary without adding a shadow.</div>
      </article>

      <article class="ios-card ios-card--tinted">
        <div class="ios-card__title">Tinted</div>
        <div class="ios-card__body">Uses semantic fill rather than introducing another surface colour.</div>
      </article>
    </div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Media & Interactive Cards</div>
    <div class="ios-stack">
      <article class="ios-card ios-card--elevated">
        <div class="ios-card__media" style="display:grid;place-items:center;background:var(--ios-blue);color:white;font-size:42px">
          <span data-ios-symbol="document"></span>
        </div>
        <div class="ios-eyebrow">Featured</div>
        <h3 class="ios-card__title">Media card</h3>
        <p class="ios-card__body">Images and video can sit edge to edge while the text keeps the standard card inset.</p>
        <div class="ios-metadata"><span>6 min read</span><span>Today</span><span>Saved</span></div>
      </article>

      <button class="ios-card ios-card--horizontal ios-card--interactive" type="button" data-ios-present="alert-demo">
        <div class="ios-card__media" style="display:grid;place-items:center;background:var(--ios-fill-secondary);color:var(--ios-blue);font-size:28px">
          <span data-ios-symbol="folder"></span>
        </div>
        <div class="ios-text-stack">
          <div class="ios-card__title">Horizontal interactive card</div>
          <div class="ios-card__subtitle ios-text-clamp-2">Good for compact content previews where the whole surface performs one clear action.</div>
          <div class="ios-metadata"><span>Library</span><span>12 items</span></div>
        </div>
      </button>
    </div>
  </section>

  <section class="ios-section">
    <div class="ios-section__header">Supporting Content</div>
    <div class="ios-stack">
      <div class="ios-callout-box">
        <div class="ios-callout-box__icon"><span data-ios-symbol="info"></span></div>
        <div class="ios-callout-box__content">
          <div class="ios-callout-box__title">Helpful information</div>
          <div class="ios-callout-box__message">Use a callout for useful context that should remain visible with the content.</div>
        </div>
      </div>

      <div class="ios-key-value-list">
        <div class="ios-key-value"><span class="ios-key-value__key">Created</span><span class="ios-key-value__value">September 16</span></div>
        <div class="ios-key-value"><span class="ios-key-value__key">Status</span><span class="ios-key-value__value ios-text-success">Available</span></div>
        <div class="ios-key-value"><span class="ios-key-value__key">Version</span><span class="ios-key-value__value ios-text-tabular">1.1</span></div>
      </div>
    </div>
  </section>
`;

const ready = () => {
  const components = document.querySelector('[data-ios-tab-panel="components"] .ios-content');
  const searchSection = components?.querySelector('.ios-section');
  if (searchSection && !components.querySelector('[data-content-gallery]')) {
    const wrapper = document.createElement('div');
    wrapper.dataset.contentGallery = '';
    wrapper.innerHTML = contentGallery;
    searchSection.insertAdjacentElement('afterend', wrapper);
  }

  renderSymbols(document);

  const deleteButton = document.querySelector('#demoDelete');
  deleteButton?.addEventListener('click', () => {
    const row = deleteButton.closest('.ios-swipe-row');
    row?.animate([{ opacity: 1, height: `${row.offsetHeight}px` }, { opacity: 0, height: '0px' }], {
      duration: 220,
      easing: 'ease-out',
      fill: 'forwards'
    }).finished.then(() => row.remove());
  });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
else ready();
