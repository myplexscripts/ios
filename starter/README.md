# GlassKit App Starter

This folder is a self-contained GlassKit application template. Copy `starter/` into a new project and it continues to work without depending on files outside the folder.

```text
starter/
  index.html
  app.css
  app.js
  framework/
```

`framework/` contains the GlassKit runtime. `index.html` contains your screens and content, `app.css` contains app-specific styling, and `app.js` creates the `GlassKitApp`, declares routes and contains app-specific behaviour.

The starter includes working examples of top-level tabs, large-title navigation, URL-aware routing, route parameters, browser history, push navigation, swipe back, a shared store, a list/search screen, settings/forms, horizontal cards, menus, sheets, safe areas, dark mode, Lucide icons, accessibility behaviour and compact/regular-width adaptation.

The default router uses hash URLs so the starter works on static hosting without server rewrites.

The full UI catalogue remains in the repository's `demo/` folder. Use it as a reference when you need another GlassKit component or pattern.
