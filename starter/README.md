# iOS Web App Starter

This folder is intentionally self-contained. Copy `starter/` into a new project and it will continue to work without depending on files outside the folder.

## Structure

```text
starter/
  index.html
  app.css
  app.js
  framework/
```

`framework/` is the reusable iOS-style foundation. Do not rewrite framework behaviour in `app.js` or framework styling in `app.css` unless the change belongs to the framework itself.

Use `index.html` for your app screens and content, `app.css` for app-specific identity and layout needs, and `app.js` for app-specific behaviour.

The starter already includes working examples of top-level tabs, large-title navigation, compact scrolled navigation, a list/search screen, settings/form screen, push navigation, swipe-back behaviour, a horizontal card scroller, a menu, a sheet, safe areas, dark mode, Lucide icons, accessibility behaviour, and compact/regular-width adaptation.

The full component catalogue remains in the repository's `demo/` folder. Copy patterns from the demo only when you need an additional component, while keeping the starter as the actual app foundation.
