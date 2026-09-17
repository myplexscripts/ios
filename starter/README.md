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

The starter includes working examples of top-level tabs, large-title navigation, Router 2.0, named routes, URL parameters, browser Back/Forward, runtime-created route components, component-local state, component caching, scroll restoration, push navigation, swipe back, a shared store, list/search screens, settings/forms, horizontal cards, menus, sheets, safe areas, dark mode, Lucide icons, accessibility behaviour and compact/regular-width adaptation.

Open a Library item to see a real routed component. That destination is created from `components/item-detail.js` when the route opens rather than being pre-rendered in `index.html`.

The default router uses hash URLs so the starter works on static hosting without server rewrites.

The full UI catalogue remains in the repository's `demo/` folder. Use it as a reference when you need another GlassKit component or pattern.
