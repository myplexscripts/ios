const root = document.querySelector('[data-glasskit-app]');
root?.removeAttribute('data-ios-app');

const [{ GlassKitApp }, { ItemDetail }] = await Promise.all([
  import('./framework/framework.js'),
  import('./components/item-detail.js')
]);

export const app = new GlassKitApp({
  root: '[data-glasskit-app]',
  name: 'App Name',
  router: {
    mode: 'hash',
    defaultRoute: '/',
    componentCacheSize: 12
  },
  routes: [
    { name: 'home', path: '/', tab: 'home' },
    { name: 'library', path: '/library', tab: 'library' },
    { name: 'settings', path: '/settings', tab: 'settings' },
    { name: 'item', path: '/item/:id', tab: 'library', component: ItemDetail },
    { name: 'detail', path: '/detail', screen: 'detail' },
    { path: '*', redirect: '/' }
  ],
  store: {
    searchQuery: ''
  }
}).init();

const search = document.querySelector('#starterSearch');
const rows = [...document.querySelectorAll('#starterList [data-starter-search]')];
const noResults = document.querySelector('#starterNoResults');

rows.forEach((row, index) => {
  const label = row.querySelector('.ios-row__title')?.textContent?.trim() || `item-${index + 1}`;
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  row.removeAttribute('data-ios-push');
  row.setAttribute('data-glasskit-link', `/item/${encodeURIComponent(id)}`);
});

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
