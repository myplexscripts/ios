# Start Here

If you are building a new app, copy the `starter/` folder.

`starter/` is self-contained. It includes the framework files it needs, so it can be moved into a new repository or project without depending on `src/` or `demo/`.

Do not start from `demo/`. The demo is the full component and behaviour reference.

The repository has three layers:

```text
src/       master reusable iOS-style framework
demo/      complete component and pattern catalogue
starter/   standalone app template for new projects
```

## New app workflow

1. Copy `starter/` into the new project.
2. Rename the folder if you want.
3. Open `index.html` and replace `App Name`, tab names and placeholder content.
4. Keep app-specific CSS in `app.css`.
5. Keep app-specific JavaScript in `app.js`.
6. Keep the included `framework/` folder intact unless you are intentionally updating the framework.
7. Refer to this repository's `demo/` when you need another component or pattern.

The starter should not require you to rebuild navigation, sheets, menus, gestures, adaptive layout, safe areas, accessibility, Lucide icon handling, semantic colours, typography, or concentric-radius logic.

To preview the starter from this repository:

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
- search and no-results state
- forms
- pull-down menu
- sheet presentation
- keyboard, pointer and touch behaviour
- accessibility adaptations

The intended workflow is simple: copy `starter/`, replace the placeholder content, and build the app on top of the included framework.