import { createTVKitApp } from '../src/tvkit.js';
import { catalog, rails } from './data.js';

const root = document.querySelector('[data-tv-app]');
const stage = root.querySelector('.tv-stage');
const watchlist = new Set(['highland', 'small-hours', 'blue-room']);
const itemById = id => [...catalog.items, ...catalog.sports, ...catalog.store].find(item => item.id === id) || catalog.items[0];

function styleVars(item, prefix = 'card') {
  const accent = item.accent || '#718ca5';
  const deep = item.deep || '#111922';
  const warm = item.warm || '#7d6255';
  return `--${prefix}-accent:${accent};--${prefix}-deep:${deep};--${prefix}-warm:${warm}`;
}

function card(item, options = {}) {
  const progress = Number(item.progress || 0);
  const classes = ['tv-card'];
  if (options.poster) classes.push('tv-card--poster');
  if (options.wide) classes.push('tv-card--wide');
  return `
    <button class="${classes.join(' ')}" type="button" data-tv-focusable data-tv-parallax data-show-id="${item.id}" style="${styleVars(item)}">
      <span class="tv-card__art">
        <span class="tv-card__mark">${options.number ? `<span style="font-size:1.9em;opacity:.78;margin-right:10px">${options.number}</span>` : ''}${item.title}</span>
        ${progress > 0 ? `<span class="tv-card__progress" style="--progress:${progress}%"><span></span></span>` : ''}
      </span>
      <span class="tv-card__meta"><span class="tv-card__title">${item.title}</span><span class="tv-card__subtitle">${item.subtitle || item.genre}</span></span>
    </button>`;
}

function rail(title, items, options = {}) {
  return `
    <section class="tv-row">
      <div class="tv-row__heading"><h2 class="tv-row__title">${title}</h2>${options.link ? `<button class="tv-row__link" type="button" data-tv-focusable>${options.link}</button>` : ''}</div>
      <div class="tv-rail">
        ${items.map((item, index) => card(item, { ...options, number: options.numbered ? index + 1 : null })).join('')}
      </div>
    </section>`;
}

function hero(slides) {
  return `
    <section class="tv-hero" data-tv-carousel data-tv-interval="7600">
      ${slides.map((item, index) => `
        <article class="tv-hero__slide${index === 0 ? ' is-active' : ''}" style="--hero-accent:${item.accent};--hero-deep:${item.deep};--hero-mid:${item.mid};--hero-warm:${item.warm}">
          <div class="tv-hero__art"></div>
          <div class="tv-hero__copy">
            <div class="tv-eyebrow">${item.eyebrow}</div>
            <h1 class="tv-title-mark">${item.title}</h1>
            <div class="tv-metadata">${item.meta.map((meta, i) => i === 2 ? `<span class="tv-metadata__badge">${meta}</span>` : `<span>${meta}</span>`).join('')}</div>
            <p class="tv-hero__description">${item.description}</p>
            <div class="tv-actions">
              <button class="tv-action" type="button" data-tv-focusable data-play-id="${item.id}"><span data-ios-symbol="play"></span><span>Play</span></button>
              <button class="tv-action tv-action--secondary" type="button" data-tv-focusable data-show-id="${item.id}"><span>Go to Show</span></button>
            </div>
          </div>
        </article>`).join('')}
      <div class="tv-hero__pages" aria-label="Featured titles">
        ${slides.map((_, index) => `<button class="tv-page-dot" type="button" aria-label="Featured item ${index + 1}" aria-current="${index === 0}" data-tv-focusable></button>`).join('')}
      </div>
    </section>`;
}

function screen(route, content, extra = '') {
  return `<section class="tv-screen" data-tv-route="${route}"><div class="tv-scroll"><div class="tv-content">${content}</div></div>${extra}</section>`;
}

function renderHome() {
  const rowMarkup = rails.map(def => {
    const items = def.ids.map(itemById);
    return rail(def.title, items, { numbered: def.numbered });
  }).join('');
  return screen('/home', `${hero(catalog.heroes)}<div class="tv-rows">${rowMarkup}</div>`);
}

function renderTVPlus() {
  const featured = [catalog.heroes[1], catalog.heroes[3], catalog.heroes[0]];
  const essentials = catalog.items.slice(0, 8);
  return screen('/tvplus', `${hero(featured)}<div class="tv-rows">${rail('TV+ Originals', essentials)}${rail('Award Winning Stories', catalog.items.slice(5, 12))}${rail('Big Screen Favourites', catalog.items.slice(8), { wide: true })}</div>`);
}

function renderSports() {
  const sportsHero = [{
    id: 'matchday', title: 'Matchday Live', eyebrow: 'Live Sports',
    description: 'Big matches, expert coverage and the moments everyone will be talking about tomorrow.',
    meta: ['Live', 'Tonight', 'All Ages', '4K'], accent: '#d35d43', deep: '#1b0907', mid: '#5f1d15', warm: '#b65335'
  }];
  return screen('/sports', `${hero(sportsHero)}<div class="tv-rows">${rail('Live & Upcoming', catalog.sports, { wide: true })}${rail('Highlights', catalog.sports.concat(catalog.items.slice(5, 8)))}</div>`);
}

function renderStore() {
  return screen('/store', `
    <div class="tv-page-heading"><h1 class="tv-section-title">Store</h1><p class="tv-section-copy">Buy or rent new releases and favourites, all in one place.</p></div>
    <div class="tv-brand-strip">
      <button class="tv-brand-card" type="button" data-tv-focusable style="--brand-bg:linear-gradient(135deg,#362350,#895b9a)">New Releases</button>
      <button class="tv-brand-card" type="button" data-tv-focusable style="--brand-bg:linear-gradient(135deg,#153452,#3d75a1)">Top Movies</button>
      <button class="tv-brand-card" type="button" data-tv-focusable style="--brand-bg:linear-gradient(135deg,#4e261c,#a75d39)">Family Night</button>
      <button class="tv-brand-card" type="button" data-tv-focusable style="--brand-bg:linear-gradient(135deg,#1e3b2f,#4f8568)">Under $10</button>
    </div>
    <div class="tv-rows">${rail('Featured Movies', catalog.store.concat(catalog.items.slice(0, 4)), { wide: true })}${rail('Browse by Genre', catalog.items.slice(6, 14))}</div>`);
}

function renderLibrary() {
  const items = catalog.items.filter(item => watchlist.has(item.id));
  const body = items.length
    ? `<div class="tv-page-heading"><h1 class="tv-section-title">Library</h1><p class="tv-section-copy">Your saved shows and movies.</p></div><div class="tv-rows">${rail('Watchlist', items)}${rail('Recently Watched', catalog.items.filter(item => item.progress > 0))}</div>`
    : `<div class="tv-empty"><div><span class="tv-empty__icon" data-ios-symbol="library"></span><div class="tv-empty__title">Your library is empty</div><p class="tv-empty__copy">Add shows and movies to your watchlist and they will appear here.</p></div></div>`;
  return screen('/library', body);
}

function renderSearch() {
  return screen('/search', `
    <section class="tv-search-page">
      <div class="tv-search-shell">
        <label class="tv-search-field"><span data-ios-symbol="search"></span><input type="search" placeholder="Search shows, movies and sports" data-tv-search-input autocomplete="off"></label>
        <div class="tv-search-results" data-tv-search-results></div>
      </div>
    </section>`);
}

function detailScreen() {
  return screen('/show/:id', `<div data-detail-host></div>`);
}

stage.innerHTML = renderHome() + renderTVPlus() + renderSports() + renderStore() + renderLibrary() + renderSearch() + detailScreen();

const app = createTVKitApp({ root });
window.tvDemo = app;

function detailMarkup(item) {
  const inList = watchlist.has(item.id);
  return `
    <article class="tv-detail" style="--hero-accent:${item.accent};--hero-deep:${item.deep};--hero-mid:${item.accent};--hero-warm:${item.warm}">
      <section class="tv-detail__hero">
        <div class="tv-detail__art"></div>
        <div class="tv-detail__copy">
          <div class="tv-eyebrow">TV+ Original</div>
          <h1 class="tv-title-mark">${item.title}</h1>
          <div class="tv-metadata"><span>${item.genre}</span><span>${item.year}</span><span class="tv-metadata__badge">16+</span><span>4K</span><span>Dolby Vision</span></div>
          <p class="tv-hero__description">A premium streaming story presented through TVKit. This detail template is reusable for films, series, live events and library items.</p>
          <div class="tv-actions">
            <button class="tv-action" type="button" data-tv-focusable data-play-id="${item.id}" data-tv-autofocus><span data-ios-symbol="play"></span><span>${item.progress ? 'Resume' : 'Play'}</span></button>
            <button class="tv-action tv-action--secondary" type="button" data-tv-focusable data-watchlist-id="${item.id}"><span data-ios-symbol="${inList ? 'check' : 'plus'}"></span><span>${inList ? 'In Watchlist' : 'Add'}</span></button>
            <button class="tv-action tv-action--secondary" type="button" data-tv-focusable data-tv-menu-trigger="detail"><span data-ios-symbol="ellipsis"></span></button>
          </div>
        </div>
      </section>
      <section class="tv-detail__body">
        <div class="tv-detail__tabs" role="tablist">
          <button class="tv-segment" type="button" aria-selected="true" data-tv-focusable data-detail-tab="episodes">Episodes</button>
          <button class="tv-segment" type="button" aria-selected="false" data-tv-focusable data-detail-tab="related">Related</button>
          <button class="tv-segment" type="button" aria-selected="false" data-tv-focusable data-detail-tab="details">Details</button>
        </div>
        <div data-detail-panel>${rail('Season 1', catalog.items.slice(0, 6), { wide: true })}</div>
      </section>
    </article>`;
}

function updateDetail(id) {
  const host = root.querySelector('[data-detail-host]');
  const item = itemById(id);
  host.innerHTML = detailMarkup(item);
  app.enhance(host);
}

function searchResults(query = '') {
  const target = root.querySelector('[data-tv-search-results]');
  if (!target) return;
  const clean = query.trim().toLowerCase();
  const all = [...catalog.items, ...catalog.sports, ...catalog.store];
  const results = clean
    ? all.filter(item => `${item.title} ${item.genre} ${item.subtitle}`.toLowerCase().includes(clean))
    : all.slice(0, 8);
  target.innerHTML = `
    <div class="tv-row__heading" style="padding-left:0;padding-right:0"><h2 class="tv-row__title">${clean ? `Results for “${query}”` : 'Popular Now'}</h2></div>
    ${results.length ? `<div class="tv-grid">${results.map(item => card(item)).join('')}</div>` : `<div class="tv-empty"><div><div class="tv-empty__title">No results</div><p class="tv-empty__copy">Try another title, genre or sport.</p></div></div>`}`;
  app.enhance(target);
}

root.addEventListener('tvkit:routechange', event => {
  const { to, params } = event.detail;
  if (to.startsWith('/show/')) updateDetail(params.id);
  if (to === '/search') {
    searchResults('');
    queueMicrotask(() => root.querySelector('[data-tv-search-input]')?.focus());
  }
});

root.addEventListener('click', event => {
  const show = event.target.closest('[data-show-id]');
  if (show) {
    app.navigate(`/show/${show.dataset.showId}`);
    return;
  }

  const play = event.target.closest('[data-play-id]');
  if (play) {
    const item = itemById(play.dataset.playId);
    app.openPlayer({ title: item.title, subtitle: `${item.genre} · ${item.year}`, progress: item.progress || 8 });
    return;
  }

  const watch = event.target.closest('[data-watchlist-id]');
  if (watch) {
    const id = watch.dataset.watchlistId;
    const item = itemById(id);
    if (watchlist.has(id)) {
      watchlist.delete(id);
      app.toast(`${item.title} removed from Watchlist`);
    } else {
      watchlist.add(id);
      app.toast(`${item.title} added to Watchlist`);
    }
    updateDetail(id);
    return;
  }

  const tab = event.target.closest('[data-detail-tab]');
  if (tab) {
    root.querySelectorAll('[data-detail-tab]').forEach(node => node.setAttribute('aria-selected', String(node === tab)));
    const panel = root.querySelector('[data-detail-panel]');
    const current = itemById(app.currentRoute.split('/').pop());
    if (tab.dataset.detailTab === 'episodes') panel.innerHTML = rail('Season 1', catalog.items.slice(0, 6), { wide: true });
    if (tab.dataset.detailTab === 'related') panel.innerHTML = rail('You Might Also Like', catalog.items.filter(item => item.id !== current.id).slice(2, 10));
    if (tab.dataset.detailTab === 'details') panel.innerHTML = `<div style="padding:18px var(--tv-content-gutter) 70px;max-width:900px;color:var(--tv-label-secondary);font-size:17px;line-height:1.55"><h2 style="color:white;font-size:28px;margin:0 0 14px">About ${current.title}</h2><p>A reusable details panel for synopsis, cast, crew, ratings, accessibility information and technical playback formats.</p><p>${current.genre} · ${current.year} · 4K · Dolby Vision · Dolby Atmos</p></div>`;
    app.enhance(panel);
    return;
  }

  const profile = event.target.closest('[data-profile]');
  if (profile) {
    if (profile.dataset.profile === 'Add') {
      app.toast('Add profile flow can be connected to your account system');
      return;
    }
    root.querySelector('[data-profile-name]').textContent = profile.dataset.profile;
    root.querySelector('[data-profile-avatar]').textContent = profile.dataset.initial;
    app.closeProfilePicker();
    app.toast(`Switched to ${profile.dataset.profile}`);
    return;
  }

  const menuAction = event.target.closest('[data-menu-action]');
  if (menuAction) {
    const action = menuAction.dataset.menuAction;
    app.closeMenu({ restoreFocus: false });
    if (action === 'profiles') app.openProfilePicker();
    if (action === 'watchlist') app.navigate('/library');
    if (action === 'settings') app.toast('Settings panel ready for app-specific preferences');
    if (action === 'autoplay') app.toast('Autoplay previews toggled');
    if (action === 'quality') app.toast('Playback quality: Auto');
    return;
  }

  const channel = event.target.closest('[data-channel]');
  if (channel) app.toast(`${channel.dataset.channel} can be connected as a provider page`);
});

root.addEventListener('input', event => {
  if (event.target.matches('[data-tv-search-input]')) searchResults(event.target.value);
});

const detailMenu = document.createElement('div');
detailMenu.className = 'tv-menu';
detailMenu.dataset.tvMenu = 'detail';
detailMenu.hidden = true;
detailMenu.innerHTML = `
  <button class="tv-menu__item" type="button" data-menu-action="details-info" data-tv-focusable><span>View Details</span><span data-ios-symbol="info"></span></button>
  <button class="tv-menu__item" type="button" data-menu-action="details-share" data-tv-focusable><span>Share</span><span data-ios-symbol="share"></span></button>
  <div class="tv-menu__separator"></div>
  <button class="tv-menu__item" type="button" data-menu-action="details-accessibility" data-tv-focusable><span>Accessibility</span><span data-ios-symbol="captions"></span></button>`;
root.querySelector('.tv-menu-layer').append(detailMenu);
app.enhance(detailMenu);

root.addEventListener('click', event => {
  const action = event.target.closest('[data-menu-action^="details-"]');
  if (!action) return;
  app.closeMenu();
  const copy = {
    'details-info': 'Full metadata view ready',
    'details-share': 'Share action ready',
    'details-accessibility': 'Accessibility options ready'
  }[action.dataset.menuAction];
  app.toast(copy);
});