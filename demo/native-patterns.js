import { renderLucide } from '../src/framework.js';

const nativePatterns = `
  <div data-native-patterns>
    <section class="ios-section">
      <div class="ios-section-heading">
        <div class="ios-section-heading__copy">
          <h2 class="ios-section-heading__title">Highlights</h2>
          <div class="ios-section-heading__subtitle">Metric and insight cards for data-rich apps</div>
        </div>
        <button class="ios-section-heading__action" type="button" aria-label="Show all highlights">All <span data-ios-symbol="chevronRight"></span></button>
      </div>

      <div class="ios-insight-card-grid">
        <article class="ios-insight-card" style="--ios-insight-accent:var(--ios-orange)">
          <div class="ios-insight-card__topline"><span data-ios-symbol="flame"></span> Active Energy</div>
          <div class="ios-insight-card__summary">Your recent activity is holding steady over the last seven days.</div>
          <div class="ios-insight-card__divider"></div>
          <div class="ios-insight-card__label">Average Calories</div>
          <div class="ios-insight-card__metric">31.5<span class="ios-insight-card__unit">cal</span></div>
          <div class="ios-insight-card__chart">
            <div class="ios-insight-rule"></div>
            <div class="ios-insight-bars"><span style="height:52%"></span><span style="height:66%"></span><span style="height:42%"></span><span style="height:57%"></span><span style="height:61%"></span><span style="height:75%"></span><span style="height:69%"></span></div>
            <div class="ios-insight-axis"><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span><span>M</span><span>T</span></div>
          </div>
        </article>

        <article class="ios-insight-card" style="--ios-insight-accent:var(--ios-blue)">
          <div class="ios-insight-card__topline"><span data-ios-symbol="activity"></span> Weekly Progress</div>
          <div class="ios-insight-card__summary">You completed more of your goal this week than last week.</div>
          <div class="ios-insight-card__divider"></div>
          <div class="ios-hstack">
            <div><div class="ios-insight-card__label">This Week</div><div class="ios-insight-card__metric" style="color:var(--ios-blue)">82<span class="ios-insight-card__unit">%</span></div></div>
            <span class="ios-spacer"></span>
            <div><div class="ios-insight-card__label">Previous</div><div class="ios-insight-card__metric ios-text-secondary">64<span class="ios-insight-card__unit">%</span></div></div>
          </div>
          <div class="ios-insight-card__chart"><div class="ios-insight-rule"></div></div>
        </article>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section-heading">
        <div class="ios-section-heading__copy"><h2 class="ios-section-heading__title">Get More From Your App</h2></div>
      </div>

      <article class="ios-recommendation-card" style="--ios-recommendation-accent:var(--ios-pink)">
        <div class="ios-recommendation-card__icon"><span data-ios-symbol="heartPulse"></span></div>
        <div>
          <div class="ios-recommendation-card__title">Set up an important feature</div>
          <div class="ios-recommendation-card__body">Short educational cards can explain why a feature matters before asking someone to act.</div>
          <button class="ios-button ios-button--prominent ios-recommendation-card__cta" type="button">Get Started</button>
        </div>
        <button class="ios-recommendation-card__dismiss" type="button" aria-label="Dismiss"><span data-ios-symbol="xmark"></span></button>
      </article>

      <article class="ios-recommendation-card" style="--ios-recommendation-accent:var(--ios-indigo)">
        <div class="ios-recommendation-card__icon"><span data-ios-symbol="circleCheck"></span></div>
        <div>
          <div class="ios-recommendation-card__title">Complete your checklist</div>
          <div class="ios-recommendation-card__body">Recommendations remain scannable with a clear title, supporting text, and one primary action.</div>
          <button class="ios-button ios-button--tinted ios-recommendation-card__cta" type="button">Set Up</button>
        </div>
        <button class="ios-recommendation-card__dismiss" type="button" aria-label="Dismiss"><span data-ios-symbol="xmark"></span></button>
      </article>
    </section>

    <section class="ios-section">
      <div class="ios-section-heading">
        <div class="ios-section-heading__copy"><h2 class="ios-section-heading__title">Articles</h2><div class="ios-section-heading__subtitle">Image-led educational content</div></div>
        <button class="ios-section-heading__action" type="button">See All <span data-ios-symbol="chevronRight"></span></button>
      </div>

      <div class="ios-card-scroller ios-card-scroller--peek" aria-label="Articles">
        <article class="ios-article-card">
          <div class="ios-article-card__media" style="background:linear-gradient(135deg,#c9ff3d,#5c9b1b);color:#173000;font-size:42px"><span data-ios-symbol="activity"></span></div>
          <div class="ios-article-card__content"><div class="ios-article-card__title">Understanding Your Progress</div><div class="ios-article-card__subtitle">Learn how trends and daily changes fit together.</div></div>
        </article>
        <article class="ios-article-card">
          <div class="ios-article-card__media" style="background:linear-gradient(135deg,#ffe56d,#8e6b24);color:#392a00;font-size:42px"><span data-ios-symbol="heart"></span></div>
          <div class="ios-article-card__content"><div class="ios-article-card__title">Build Better Habits</div><div class="ios-article-card__subtitle">Small, repeatable actions can make goals easier to maintain.</div></div>
        </article>
        <article class="ios-article-card">
          <div class="ios-article-card__media" style="background:linear-gradient(135deg,#ffaf9f,#8840a8);color:white;font-size:42px"><span data-ios-symbol="sparkles"></span></div>
          <div class="ios-article-card__content"><div class="ios-article-card__title">Make Data Useful</div><div class="ios-article-card__subtitle">Turn measurements into clear, understandable next steps.</div></div>
        </article>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section-heading">
        <div class="ios-section-heading__copy"><h2 class="ios-section-heading__title">Browse Categories</h2></div>
      </div>
      <div class="ios-chip-scroller" aria-label="Categories">
        <button class="ios-chip" type="button" aria-selected="true"><span data-ios-symbol="sparkles"></span> Featured</button>
        <button class="ios-chip" type="button" aria-selected="false"><span data-ios-symbol="image"></span> Design</button>
        <button class="ios-chip" type="button" aria-selected="false"><span data-ios-symbol="play"></span> Entertainment</button>
        <button class="ios-chip" type="button" aria-selected="false"><span data-ios-symbol="activity"></span> Wellness</button>
        <button class="ios-chip" type="button" aria-selected="false"><span data-ios-symbol="grid"></span> Utilities</button>
      </div>
    </section>

    <section class="ios-section">
      <article class="ios-editorial-card">
        <div class="ios-editorial-card__media" style="background:linear-gradient(145deg,#d7cab9 0%,#8b7063 45%,#7667a9 100%);display:grid;place-items:center;color:rgba(255,255,255,.84);font-size:104px;font-weight:700">27</div>
        <div class="ios-editorial-card__content">
          <div class="ios-editorial-card__eyebrow">Now Trending</div>
          <div class="ios-editorial-card__title">A Large Editorial Story</div>
          <div class="ios-editorial-card__body">Full-bleed media, strong hierarchy, and short supporting copy create a focused destination.</div>
        </div>
      </article>
    </section>

    <section class="ios-section">
      <div class="ios-section-heading">
        <div class="ios-section-heading__copy"><h2 class="ios-section-heading__title">Recommended Apps</h2><div class="ios-section-heading__subtitle">Compact rows with a clear trailing action</div></div>
        <button class="ios-section-heading__action" type="button" aria-label="Show all recommended apps"><span data-ios-symbol="chevronRight"></span></button>
      </div>
      <div class="ios-app-list">
        <div class="ios-app-row"><div class="ios-app-row__icon" style="background:linear-gradient(135deg,#ff9f50,#ffdf8a);color:#6b2b00"><span data-ios-symbol="sparkles"></span></div><div class="ios-app-row__copy"><div class="ios-app-row__title">Focus</div><div class="ios-app-row__subtitle">Habits and daily routines</div></div><div class="ios-app-row__action-wrap"><button class="ios-app-row__action" type="button">Get</button><div class="ios-app-row__action-note">In-App Purchases</div></div></div>
        <div class="ios-app-row"><div class="ios-app-row__icon" style="background:linear-gradient(135deg,#82e7df,#15939c);color:#003d42"><span data-ios-symbol="activity"></span></div><div class="ios-app-row__copy"><div class="ios-app-row__title">Motion</div><div class="ios-app-row__subtitle">Simple activity tracking</div></div><div class="ios-app-row__action-wrap"><button class="ios-app-row__action" type="button">Open</button></div></div>
        <div class="ios-app-row"><div class="ios-app-row__icon" style="background:linear-gradient(135deg,#af9cff,#5c50c5);color:white"><span data-ios-symbol="star"></span></div><div class="ios-app-row__copy"><div class="ios-app-row__title">Discover</div><div class="ios-app-row__subtitle">Find something new</div></div><div class="ios-app-row__action-wrap"><button class="ios-app-row__action" type="button"><span data-ios-symbol="download"></span></button></div></div>
      </div>
    </section>

    <section class="ios-section">
      <article class="ios-feature-list-card">
        <div class="ios-feature-list-card__eyebrow">Try Now</div>
        <div class="ios-feature-list-card__title">What We’re Exploring</div>
        <div class="ios-app-list">
          <div class="ios-app-row"><div class="ios-app-row__icon"><span data-ios-symbol="grid"></span></div><div class="ios-app-row__copy"><div class="ios-app-row__title">Daily Mix</div><div class="ios-app-row__subtitle">A compact grouped recommendation</div></div><div class="ios-app-row__action-wrap"><button class="ios-app-row__action" type="button">Open</button></div></div>
          <div class="ios-app-row"><div class="ios-app-row__icon"><span data-ios-symbol="play"></span></div><div class="ios-app-row__copy"><div class="ios-app-row__title">Playground</div><div class="ios-app-row__subtitle">Browse a curated collection</div></div><div class="ios-app-row__action-wrap"><button class="ios-app-row__action" type="button">Get</button></div></div>
          <div class="ios-app-row"><div class="ios-app-row__icon"><span data-ios-symbol="bookmark"></span></div><div class="ios-app-row__copy"><div class="ios-app-row__title">Saved Ideas</div><div class="ios-app-row__subtitle">Return to items you kept</div></div><div class="ios-app-row__action-wrap"><button class="ios-app-row__action" type="button"><span data-ios-symbol="download"></span></button></div></div>
        </div>
      </article>
    </section>

    <section class="ios-section">
      <div class="ios-section-heading"><div class="ios-section-heading__copy"><h2 class="ios-section-heading__title">Promotional Banner</h2></div></div>
      <article class="ios-promo-banner"><div><div class="ios-promo-banner__title">Featured recommendation</div><div class="ios-promo-banner__body">A compact media-style banner can combine a campaign, product, or timely suggestion with one clear destination.</div></div></article>
    </section>
  </div>
`;

function ready() {
  const patterns = document.querySelector('[data-ios-tab-panel="patterns"] .ios-content');
  if (!patterns || patterns.querySelector('[data-native-patterns]')) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = nativePatterns;
  patterns.append(...wrapper.children);
  renderLucide(patterns);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
else ready();
