# Start Here

If you are building a new app, start in `starter/`.

Do not start from `demo/`. The demo is the full component and behaviour reference.

The repository has three layers:

```text
src/       reusable iOS-style framework
demo/      complete component and pattern catalogue
starter/   clean app template for new projects
```

## New app workflow

1. Copy or clone this repository.
2. Open `starter/index.html` and replace `App Name`, tab names and placeholder content.
3. Keep app-specific CSS in `starter/app.css`.
4. Keep app-specific JavaScript in `starter/app.js`.
5. Use `demo/` only when you need to see how another framework component is built.
6. Do not recreate navigation, sheets, menus, gestures, adaptive layout, safe areas, accessibility, icon handling or radius logic in the app. Those belong to `src/`.

To run it locally:

```bash
python -m http.server 4173
```

Open:

```text
http://localhost:4173/starter/
```

## What the starter already gives you

- iPhone compact layout
- regular-width iPad/desktop layout
- safe areas
- light and dark mode
- Lucide icons
- semantic iOS-style typography and colours
- concentric radii
- large-title navigation
- compact scrolled navigation title
- top-level tabs
- preserved tab state
- push navigation and browser history
- left-edge swipe back
- lists and settings rows
- cards and horizontal card scrollers
- search
- forms
- menus
- sheets
- keyboard, pointer and touch behaviour
- accessibility adaptations

The intended workflow is simple: future apps replace the starter content while keeping the framework behaviour underneath it.
