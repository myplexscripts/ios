# GlassKit

GlassKit is an opinionated web application framework for building native-feeling iOS and iPadOS-style apps in ordinary HTML, CSS and JavaScript.

It is intentionally focused: one Apple-style design system, one app runtime, and the infrastructure most apps repeatedly need without requiring a build system.

## Start a new app

Copy the self-contained `starter/` folder into a new project:

```text
starter/
  index.html
  app.css
  app.js
  components/
  framework/
```

`framework/` is a snapshot of GlassKit. The new app does not depend on this repository at runtime.

## App runtime

```js
import { GlassKitApp } from './framework/framework.js';

export const app = new GlassKitApp({
  root: '[data-glasskit-app]',
  name: 'My App',
  router: { mode: 'hash', defaultRoute: '/' },
  routes: [
    { path: '/', tab: 'home' },
    { path: '/library', tab: 'library' },
    {
      name: 'item',
      path: '/item/:id',
      loadComponent: () => import('./components/item.js')
    },
    { path: '*', redirect: '/' }
  ],
  store: {
    state: { items: [] },
    getters: {
      itemCount: state => state.items.length
    },
    actions: {
      setItems({ set }, items) { set('items', items); }
    }
  }
}).init();

await app.whenReady();
```

## Foundation services

Every `GlassKitApp` includes:

```js
app.router    // URL-aware navigation and routed components
app.store     // reactive state, getters and actions
app.request   // fetch wrapper with timeout, caching and request deduplication
app.storage   // namespaced JSON persistence with an in-memory fallback
app.dialog    // alert, confirm and prompt
app.sheet     // programmatic sheets
app.toast     // transient notifications
app.loading   // loading presentation and async helper
app.plugins   // optional framework/app modules
```

Large collections can use `GlassKitVirtualList` so thousands of rows do not need thousands of live DOM nodes.

## Router and routed components

GlassKit defaults to hash routing so static hosting works without rewrite rules:

```text
#/library
#/item/123
```

Navigate declaratively:

```html
<button data-glasskit-link="/item/123">Open</button>
```

or programmatically:

```js
await app.navigate('/item/123');
await app.router.to('item', { id: 123 });
app.router.back();
```

Routes support parameters, query values, redirects, async data resolution, route guards, lazy component imports, component caching, scroll restoration and browser Back/Forward.

See `COMPONENTS_AND_ROUTING.md` for the component and router API.

## Store

The simple form remains supported:

```js
store: { selectedItem: null }
```

For larger apps use state, getters and actions:

```js
store: {
  state: { count: 0 },
  getters: {
    doubled: state => state.count * 2
  },
  actions: {
    increment({ update }) {
      update('count', value => value + 1);
    }
  }
}
```

```js
app.store.dispatch('increment');
console.log(app.store.getters.doubled);
```

## Requests

```js
const items = await app.request.get('/api/items', {
  query: { page: 1 },
  cache: true
});
```

Identical in-flight GET requests are deduplicated. Requests support timeout, cancellation, JSON request bodies, response parsing and short-lived memory caching.

## Presentations

```js
await app.dialog.alert('Saved');
const confirmed = await app.dialog.confirm('Delete this item?', { destructive: true });
app.toast.show('Updated');

const sheet = app.sheet.open({
  title: 'Options',
  content: '<div class="ios-list">...</div>'
});
```

The markup-based `data-ios-*` presentation system remains available as well.

## Virtual list

```js
import { GlassKitVirtualList } from './framework/framework.js';

const list = new GlassKitVirtualList({
  container: '#results',
  items,
  rowHeight: 56,
  renderItem: item => `<div class="ios-row">${item.name}</div>`
});
```

## Plugins

```js
await app.use({
  name: 'example',
  install(app) {
    app.example = { enabled: true };
  },
  destroy(app) {
    delete app.example;
  }
});
```

## UI system

GlassKit includes compact and regular-width navigation, large titles, tabs, push transitions, swipe back, safe areas, sheets, dialogs, menus, popovers, lists, forms, cards, horizontal collections, charts, Lucide icons, semantic Apple system colours, accessibility behaviour, dark mode and concentric radii.

Nested rounded surfaces follow one rule:

```text
inner radius = outer radius - inset
```

The existing `ios-*` classes remain intentionally supported as the low-level Apple-platform UI primitives. GlassKit is the application framework above them.

## Repository layout

```text
src/        master GlassKit framework source
demo/       interactive component and behaviour reference
starter/    self-contained new-app template
tools/      validation and starter sync scripts
```

When framework source changes, run:

```bash
npm run sync:starter
npm run check
```

## Run locally

```bash
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/starter/
http://localhost:4173/demo/
```
