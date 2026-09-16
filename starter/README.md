# iOS Web App Starter

This folder is the clean starting point for a new app built with the framework.
It is intentionally not the component demo.

## Start a new app

1. Keep `src/` and `starter/` together.
2. Work from the files in `starter/`.
3. Rename the app title, tabs and placeholder content.
4. Put app-specific styles in `app.css`.
5. Put app-specific behaviour in `app.js`.
6. Use the component reference in `demo/` when you need another framework pattern.

No build step is required.

Serve the repository locally and open `/starter/`:

```bash
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/starter/
```

## What is already wired

The starter already includes:

- compact iPhone and regular-width adaptive layouts
- safe areas
- light and dark appearance
- current framework typography and spacing
- Lucide icons
- concentric radius rules
- large-title navigation
- scrolled compact navigation title
- top-level tabs
- preserved tab state
- push navigation
- browser history
- left-edge swipe back
- horizontal card scrolling
- grouped lists
- search
- a settings/form screen
- a modal sheet
- menus
- reduced motion and accessibility behaviour
- keyboard and pointer support on larger layouts

The framework owns those behaviours. Do not reimplement them in `app.js`.

## Structure

```text
starter/
  index.html   app shell and screen markup
  app.css      only app-specific styling
  app.js       only app-specific behaviour
  README.md    this file
```

## Concentric radii

Do not invent nested border-radius values. The framework follows the concentric rule:

```text
inner radius = outer radius - inset
```

Use framework surfaces and `ios-concentric` primitives whenever possible. Capsules and circles are the intentional geometric exceptions.

## Adding screens

For a new top-level destination, copy an existing `ios-tab-panel` and add the matching `data-ios-tab` button.

For hierarchical navigation, create an `ios-push-screen` and open it with `data-ios-push="screen-name"`.

For a modal task, create an `ios-overlay` and open it with `data-ios-present="overlay-name"`.

The complete catalogue of available controls, cards, lists, charts, presentations and content patterns remains in `demo/`.
