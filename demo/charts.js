const chartGallery = `
  <div data-chart-gallery>
    <section class="ios-section">
      <div class="ios-section-heading">
        <div class="ios-section-heading__copy">
          <h2 class="ios-section-heading__title">Charts & Data Visualization</h2>
          <div class="ios-section-heading__subtitle">Dependency-free graph patterns for dashboards, trends, health, finance, and activity views</div>
        </div>
      </div>

      <div class="ios-chart-grid">
        <article class="ios-chart-card" style="--ios-chart-accent:var(--ios-blue)">
          <div class="ios-chart-card__header">
            <div class="ios-chart-card__copy"><h3 class="ios-chart-card__title">Line chart</h3><div class="ios-chart-card__subtitle">Best for change over an ordered timeline</div></div>
            <div class="ios-chart-card__metric">1,284<small>today</small></div>
          </div>
          <div class="ios-chart" role="img" aria-label="Illustrative line chart rising from morning to evening">
            <svg viewBox="0 0 320 180" aria-hidden="true">
              <line class="ios-chart__grid-line" x1="28" y1="28" x2="306" y2="28"/><line class="ios-chart__grid-line" x1="28" y1="68" x2="306" y2="68"/><line class="ios-chart__grid-line" x1="28" y1="108" x2="306" y2="108"/><line class="ios-chart__grid-line" x1="28" y1="148" x2="306" y2="148"/>
              <path class="ios-chart__line" d="M28 136 C52 133 64 121 82 124 S115 100 134 106 S165 78 184 86 S216 57 235 64 S270 34 306 42"/>
              <circle class="ios-chart__point" cx="28" cy="136" r="4"/><circle class="ios-chart__point" cx="82" cy="124" r="4"/><circle class="ios-chart__point" cx="134" cy="106" r="4"/><circle class="ios-chart__point" cx="184" cy="86" r="4"/><circle class="ios-chart__point" cx="235" cy="64" r="4"/><circle class="ios-chart__point" cx="306" cy="42" r="4"/>
              <text class="ios-chart__axis-label" x="28" y="169">8 AM</text><text class="ios-chart__axis-label" x="151" y="169">1 PM</text><text class="ios-chart__axis-label" x="278" y="169">6 PM</text>
            </svg>
          </div>
        </article>

        <article class="ios-chart-card" style="--ios-chart-accent:var(--ios-purple)">
          <div class="ios-chart-card__header">
            <div class="ios-chart-card__copy"><h3 class="ios-chart-card__title">Area chart</h3><div class="ios-chart-card__subtitle">Adds emphasis to volume beneath a trend</div></div>
            <div class="ios-chart-card__metric">72<small>%</small></div>
          </div>
          <div class="ios-chart" role="img" aria-label="Illustrative area chart with an upward weekly trend">
            <svg viewBox="0 0 320 180" aria-hidden="true">
              <line class="ios-chart__grid-line" x1="28" y1="28" x2="306" y2="28"/><line class="ios-chart__grid-line" x1="28" y1="68" x2="306" y2="68"/><line class="ios-chart__grid-line" x1="28" y1="108" x2="306" y2="108"/><line class="ios-chart__baseline" x1="28" y1="148" x2="306" y2="148"/>
              <path class="ios-chart__area" d="M28 132 C60 126 68 112 95 119 S139 94 160 101 S207 72 226 79 S270 54 306 58 L306 148 L28 148 Z"/>
              <path class="ios-chart__line" d="M28 132 C60 126 68 112 95 119 S139 94 160 101 S207 72 226 79 S270 54 306 58"/>
              <text class="ios-chart__axis-label" x="28" y="169">Mon</text><text class="ios-chart__axis-label" x="149" y="169">Thu</text><text class="ios-chart__axis-label" x="286" y="169">Sun</text>
            </svg>
          </div>
        </article>

        <article class="ios-chart-card" style="--ios-chart-accent:var(--ios-green)">
          <div class="ios-chart-card__header">
            <div class="ios-chart-card__copy"><h3 class="ios-chart-card__title">Column chart</h3><div class="ios-chart-card__subtitle">Useful for comparing discrete periods or categories</div></div>
          </div>
          <div class="ios-bar-chart" style="--ios-chart-columns:7" role="img" aria-label="Illustrative seven-day column chart">
            <div class="ios-bar-chart__column"><div class="ios-bar-chart__bar" style="height:46%"></div><div class="ios-bar-chart__label">M</div></div>
            <div class="ios-bar-chart__column"><div class="ios-bar-chart__bar" style="height:68%"></div><div class="ios-bar-chart__label">T</div></div>
            <div class="ios-bar-chart__column"><div class="ios-bar-chart__bar" style="height:54%"></div><div class="ios-bar-chart__label">W</div></div>
            <div class="ios-bar-chart__column"><div class="ios-bar-chart__bar" style="height:82%"></div><div class="ios-bar-chart__label">T</div></div>
            <div class="ios-bar-chart__column"><div class="ios-bar-chart__bar" style="height:74%"></div><div class="ios-bar-chart__label">F</div></div>
            <div class="ios-bar-chart__column"><div class="ios-bar-chart__bar" style="height:94%"></div><div class="ios-bar-chart__label">S</div></div>
            <div class="ios-bar-chart__column"><div class="ios-bar-chart__bar" style="height:62%"></div><div class="ios-bar-chart__label">S</div></div>
          </div>
        </article>

        <article class="ios-chart-card">
          <div class="ios-chart-card__header">
            <div class="ios-chart-card__copy"><h3 class="ios-chart-card__title">Stacked bars</h3><div class="ios-chart-card__subtitle">Shows composition and total size together</div></div>
          </div>
          <div class="ios-stacked-bars" role="img" aria-label="Illustrative stacked bars comparing new and returning activity">
            <div><div class="ios-stacked-bar__label-row"><span>Monday</span><span>84</span></div><div class="ios-stacked-bar__track"><span class="ios-stacked-bar__segment" style="width:58%"></span><span class="ios-stacked-bar__segment ios-stacked-bar__segment--secondary" style="width:26%"></span></div></div>
            <div><div class="ios-stacked-bar__label-row"><span>Tuesday</span><span>96</span></div><div class="ios-stacked-bar__track"><span class="ios-stacked-bar__segment" style="width:63%"></span><span class="ios-stacked-bar__segment ios-stacked-bar__segment--secondary" style="width:33%"></span></div></div>
            <div><div class="ios-stacked-bar__label-row"><span>Wednesday</span><span>71</span></div><div class="ios-stacked-bar__track"><span class="ios-stacked-bar__segment" style="width:45%"></span><span class="ios-stacked-bar__segment ios-stacked-bar__segment--secondary" style="width:26%"></span></div></div>
            <div><div class="ios-stacked-bar__label-row"><span>Thursday</span><span>90</span></div><div class="ios-stacked-bar__track"><span class="ios-stacked-bar__segment" style="width:56%"></span><span class="ios-stacked-bar__segment ios-stacked-bar__segment--secondary" style="width:34%"></span></div></div>
          </div>
          <div class="ios-chart-legend"><span class="ios-chart-legend__item"><span class="ios-chart-legend__dot"></span>New</span><span class="ios-chart-legend__item"><span class="ios-chart-legend__dot ios-chart-legend__dot--secondary"></span>Returning</span></div>
        </article>

        <article class="ios-chart-card" style="--ios-chart-accent:var(--ios-blue);--ios-chart-accent-2:var(--ios-purple);--ios-chart-accent-3:var(--ios-orange)">
          <div class="ios-chart-card__header"><div class="ios-chart-card__copy"><h3 class="ios-chart-card__title">Donut chart</h3><div class="ios-chart-card__subtitle">For a small number of parts that make up one whole</div></div></div>
          <div class="ios-donut-layout" role="img" aria-label="Illustrative donut chart showing three categories totaling 100 percent">
            <div class="ios-donut">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle class="ios-donut__track" cx="60" cy="60" r="44"/>
                <circle class="ios-donut__segment" cx="60" cy="60" r="44" pathLength="100" stroke-dasharray="52 48" stroke-dashoffset="0"/>
                <circle class="ios-donut__segment ios-donut__segment--secondary" cx="60" cy="60" r="44" pathLength="100" stroke-dasharray="29 71" stroke-dashoffset="-52"/>
                <circle class="ios-donut__segment ios-donut__segment--tertiary" cx="60" cy="60" r="44" pathLength="100" stroke-dasharray="19 81" stroke-dashoffset="-81"/>
              </svg>
              <div class="ios-donut__center"><div class="ios-donut__value">100%</div><div class="ios-donut__label">Total</div></div>
            </div>
            <div class="ios-chart-legend" style="display:grid;margin:0">
              <span class="ios-chart-legend__item"><span class="ios-chart-legend__dot"></span>Primary 52%</span>
              <span class="ios-chart-legend__item"><span class="ios-chart-legend__dot ios-chart-legend__dot--secondary"></span>Secondary 29%</span>
              <span class="ios-chart-legend__item"><span class="ios-chart-legend__dot ios-chart-legend__dot--tertiary"></span>Other 19%</span>
            </div>
          </div>
        </article>

        <article class="ios-chart-card" style="--ios-chart-accent:var(--ios-orange)">
          <div class="ios-chart-card__header"><div class="ios-chart-card__copy"><h3 class="ios-chart-card__title">Horizontal comparison</h3><div class="ios-chart-card__subtitle">Easy to scan when category names are more important than time</div></div></div>
          <div class="ios-horizontal-bars" role="img" aria-label="Illustrative horizontal comparison chart">
            <div class="ios-horizontal-bar"><span class="ios-horizontal-bar__label">Option A</span><span class="ios-horizontal-bar__track"><span class="ios-horizontal-bar__fill" style="width:86%"></span></span><span class="ios-horizontal-bar__value">86</span></div>
            <div class="ios-horizontal-bar"><span class="ios-horizontal-bar__label">Option B</span><span class="ios-horizontal-bar__track"><span class="ios-horizontal-bar__fill" style="width:63%"></span></span><span class="ios-horizontal-bar__value">63</span></div>
            <div class="ios-horizontal-bar"><span class="ios-horizontal-bar__label">Option C</span><span class="ios-horizontal-bar__track"><span class="ios-horizontal-bar__fill" style="width:48%"></span></span><span class="ios-horizontal-bar__value">48</span></div>
            <div class="ios-horizontal-bar"><span class="ios-horizontal-bar__label">Option D</span><span class="ios-horizontal-bar__track"><span class="ios-horizontal-bar__fill" style="width:31%"></span></span><span class="ios-horizontal-bar__value">31</span></div>
          </div>
        </article>
      </div>
    </section>

    <section class="ios-section">
      <div class="ios-section-heading"><div class="ios-section-heading__copy"><h2 class="ios-section-heading__title">Compact Metrics</h2><div class="ios-section-heading__subtitle">Sparklines work when the exact axis matters less than the direction</div></div></div>
      <div class="ios-spark-grid">
        <article class="ios-spark-card" style="--ios-chart-accent:var(--ios-blue)"><div class="ios-spark-card__label">Revenue</div><div class="ios-spark-card__value">$4,820</div><div class="ios-sparkline" role="img" aria-label="Revenue sparkline trending upward"><svg viewBox="0 0 120 40" aria-hidden="true"><path d="M2 33 L20 29 L38 31 L56 20 L74 23 L92 12 L118 8"/></svg></div></article>
        <article class="ios-spark-card" style="--ios-chart-accent:var(--ios-green)"><div class="ios-spark-card__label">Visitors</div><div class="ios-spark-card__value">1,294</div><div class="ios-sparkline" role="img" aria-label="Visitors sparkline fluctuating upward"><svg viewBox="0 0 120 40" aria-hidden="true"><path d="M2 30 L20 24 L38 27 L56 15 L74 18 L92 11 L118 15"/></svg></div></article>
        <article class="ios-spark-card" style="--ios-chart-accent:var(--ios-orange)"><div class="ios-spark-card__label">Average</div><div class="ios-spark-card__value">38.2</div><div class="ios-sparkline" role="img" aria-label="Average sparkline mostly stable"><svg viewBox="0 0 120 40" aria-hidden="true"><path d="M2 22 L20 20 L38 24 L56 21 L74 22 L92 19 L118 21"/></svg></div></article>
        <article class="ios-spark-card" style="--ios-chart-accent:var(--ios-purple)"><div class="ios-spark-card__label">Completion</div><div class="ios-spark-card__value">82%</div><div class="ios-sparkline" role="img" aria-label="Completion sparkline climbing steadily"><svg viewBox="0 0 120 40" aria-hidden="true"><path d="M2 35 L20 31 L38 27 L56 25 L74 18 L92 13 L118 7"/></svg></div></article>
      </div>
    </section>
  </div>
`;

function ready() {
  const components = document.querySelector('[data-ios-tab-panel="components"] .ios-content');
  if (!components || components.querySelector('[data-chart-gallery]')) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = chartGallery;
  components.append(...wrapper.children);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
else ready();
