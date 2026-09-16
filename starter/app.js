import '../src/framework.js';

// Keep app-specific behaviour here. Navigation, gestures, menus, sheets,
// adaptive layout, keyboard behaviour and Lucide rendering are provided by
// the framework automatically.

const search = document.querySelector('#starterSearch');
const rows = [...document.querySelectorAll('#starterList [data-starter-search]')];
const noResults = document.querySelector('#starterNoResults');

function filterLibrary() {
  if (!search) return;

  const query = search.value.trim().toLowerCase();
  let visible = 0;

  rows.forEach(row => {
    const matches = !query || row.dataset.starterSearch.includes(query);
    row.hidden = !matches;
    if (matches) visible += 1;
  });

  if (noResults) noResults.hidden = visible !== 0;
}

search?.addEventListener('input', filterLibrary);

// The framework clear button updates the field. Listen for a click as well so
// this starter's example filtering stays in sync immediately.
document.querySelector('[data-ios-clear]')?.addEventListener('click', () => {
  requestAnimationFrame(filterLibrary);
});
