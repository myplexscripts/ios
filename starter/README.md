# GlassKit App Starter

This folder is a self-contained GlassKit application template. Copy `starter/` into a new project and it continues to work without depending on files outside the folder.

```text
starter/
  index.html
  app.css
  app.js
  components/
  framework/
```

`framework/` contains the GlassKit runtime. `index.html` contains persistent top-level UI, `app.css` contains app-specific styling, `components/` contains routed screens, and `app.js` creates the `GlassKitApp`, declares routes and contains app-specific behaviour.

The starter already includes the reusable infrastructure most apps need: Router 2.0, routed components, browser history, scroll restoration, Store 2.0, `app.request`, `app.storage`, programmatic dialogs/sheets/toasts/loading, plugin support, virtualized large lists, push navigation, swipe back, adaptive layouts, safe areas, semantic Apple colours, Lucide icons, accessibility behaviour and concentric radii.

Open a Library item to see a real routed component. That destination is created from `components/item-detail.js` when the route opens rather than being pre-rendered in `index.html`.

The default router uses hash URLs so the starter works on static hosting without server rewrites.

Use the framework services rather than rebuilding generic infrastructure in each app:

```js
await app.request.get('/api/items');
app.storage.set('view', 'grid');
app.store.set('selectedItem', 123);
app.toast.show('Saved');
```

The full UI catalogue remains in the repository's `demo/` folder. Use it as a reference when you need another GlassKit component or pattern.
