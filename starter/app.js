const root = document.querySelector('[data-glasskit-app]');
root?.removeAttribute('data-ios-app');

const { GlassKitApp } = await import('./framework/framework.js');

export const app = new GlassKitApp({
  root: '[data-glasskit-app]',
  name: 'App Name',
  router: {
    mode: 'hash',
    defaultRoute: '/'
  },
  routes: [
    { path: '/', tab: 'home' },
    { path: '/library', tab: 'library' },
    { path: '/settings', tab: 'settings' },
    {
      path: '/detail/:id',
      screen: 'detail',
      enter({ params }) {
        const title = document.querySelector('[data-starter-detail-title]');
        if (title) title.textContent = params.id.replace(/[-_]+/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
      }
    },
    { path: '/detail', screen: 'detail' },
    { path: '*', redirect: '/' }
  ],
  store: {
    searchQuery: ''
  }
}).init();

const search = document.querySelector('#starterSearch');
const rows = [...document.querySelectorAll('#starterList [data-starter-search]')];
const noResults = document.querySelector('#starterNoResults');

function filterLibrary() {
  if (!search) return;

  const query = search.value.trim().toLowerCase();
  app.store.set('searchQuery', query);
  let visible = 0;

  rows.forEach(row => {
    const matches = !query || row.dataset.starterSearch.includes(query);
    row.hidden = !matches;
    if (matches) visible += 1;
  });

  if (noResults) noResults.hidden = visible !== 0;
}

search?.addEventListener('input', filterLibrary);

document.querySelector('[data-ios-clear]')?.addEventListener('click', () => {
  requestAnimationFrame(filterLibrary);
});
