# iOS Web Framework

A dependency-free design and interaction foundation for web apps that should feel at home on iPhone and iPad-sized interfaces, including large desktop browser windows.

It mirrors the parts of current Apple interface design that translate well to the web: hierarchy, typography, semantic colour, content layout, familiar controls, navigation, gestures, modality, safe areas, pointer and keyboard input, adaptive size classes, and accessibility.

## Use it

No install or build step is required.

```html
<link rel="stylesheet" href="/ios/src/framework.css">
<script type="module" src="/ios/src/framework.js"></script>
```

`framework.css` and `framework.js` are the two public entry points. The framework auto-initializes every `data-ios-app` root.

## Adaptive platform behaviour

The same app automatically changes presentation based on the available space.

### Compact width

Compact uses iPhone-style patterns:

- floating bottom tab bar
- single-column navigation
- push screens
- left-edge swipe back
- swipe actions
- bottom and full-width sheets
- touch-first controls

### Regular width

Regular uses iPad-style patterns rather than stretching the phone UI:

- floating leading navigation using the same top-level tabs
- wider content canvas
- split-view support
- popover surfaces
- richer toolbars
- pointer hover feedback
- keyboard navigation
- Command-Comma Settings shortcut when a Settings tab exists

The breakpoint also considers height, preventing a wide iPhone landscape viewport from being treated as a desktop layout.

## What is included

### App structure

- safe-area aware full-screen shell
- independent scroll surfaces
- large and compact navigation titles
- floating navigation controls
- adaptive top-level navigation
- push navigation and left-edge swipe back
- toolbars and grouped bar actions
- split views and inspectors
- compact and regular size classes

### Typography and content

The content layer follows Apple's system text hierarchy rather than inventing a different type scale for every app.

- Extra Large titles
- Large Title
- Title 1, 2, and 3
- Headline
- Body
- Callout
- Subheadline
- Footnote
- Caption and Caption 2
- primary, secondary, tertiary, and quaternary text emphasis
- accent, success, and destructive semantic text
- readable-width long-form content
- paragraph and lead styles
- metadata rows
- eyebrows
- quotes
- inline links and code
- truncation and two or three line clamping
- selectable text and tabular numerals

### Content containers

- standard cards
- elevated cards
- outlined cards
- tinted cards
- accent cards
- plain cards
- interactive cards
- media cards
- horizontal cards
- responsive card grids
- collections and horizontal collections
- data tables
- key/value groups
- persistent callouts
- empty states

### Controls

- prominent, tinted, standard, plain, and destructive buttons
- grouped lists and disclosure rows
- switches
- segmented controls
- sliders
- steppers
- text fields
- multiline text views
- search fields
- select, date, and time field wrappers
- selectable list rows
- badges
- progress and activity indicators
- page controls
- skeleton loading states
- swipe actions

### Presentations and menus

- pull-down menus
- touch-and-hold and secondary-click context menus
- alerts
- action sheets
- draggable sheets
- popover surfaces
- modal focus containment and restoration

### Input methods

- touch
- pointer
- keyboard
- familiar swipe and drag gestures
- keyboard navigation for tabs, menus, lists, and page controls
- reduced-motion behaviour

## Design rules

1. Content is the main layer. Glass belongs primarily to navigation and controls.
2. Use semantic colours instead of hard-coded greys.
3. Use the system text hierarchy before inventing a new size.
4. Long-form text uses a readable width instead of stretching across a large display.
5. Cards group related content. Do not make every section a card.
6. Tab bars navigate. Toolbars act on the current view.
7. Keep interactive targets at least 44px.
8. Preserve context. Tabs retain state and pushed screens open at the top.
9. Familiar gestures should behave predictably.
10. Reduced Motion, contrast, light and dark appearance, and safe areas are part of the base system.
11. Desktop-sized layouts adapt to regular-width Apple patterns instead of drawing a fake Mac window.

## Basic shell

```html
<main class="ios-app" data-ios-app>
  <section class="ios-tab-panel" data-ios-tab-panel="home">
    <div class="ios-scroll">
      <div class="ios-content">
        <h1 class="ios-large-title">Home</h1>
      </div>
    </div>
  </section>

  <div class="ios-tabbar-wrap">
    <nav class="ios-tabbar" aria-label="Primary navigation">
      <button class="ios-tabbar__item" data-ios-tab="home" aria-selected="true">Home</button>
      <button class="ios-tabbar__item" data-ios-tab="settings" aria-selected="false">Settings</button>
    </nav>
  </div>
</main>
```

The bottom tab bar automatically becomes leading regular-width navigation when the browser has iPad-like space.

## Push navigation

```html
<button class="ios-row" data-ios-push="detail">Open detail</button>

<section class="ios-push-screen" data-ios-screen="detail" hidden tabindex="-1">
  <button data-ios-back>Back</button>
  <div class="ios-scroll">...</div>
</section>
```

Push navigation supports left-edge swipe back on touch devices.

## Presentations

```html
<button data-ios-present="edit-sheet">Edit</button>

<div class="ios-overlay" data-ios-overlay="edit-sheet" hidden>
  <section class="ios-sheet">
    <div class="ios-sheet__grabber" data-ios-sheet-handle></div>
    <button data-ios-dismiss>Cancel</button>
  </section>
</div>
```

## Split view

```html
<div class="ios-split-view">
  <aside class="ios-split-view__sidebar">...</aside>
  <main class="ios-split-view__content">...</main>
  <aside class="ios-split-view__inspector">...</aside>
</div>
```

In compact layouts, apps should present one pane at a time. In regular layouts, the framework provides the multi-column structure.

## Symbols

A small built-in neutral SVG symbol set covers common interface actions without a CDN or icon dependency.

```html
<span data-ios-symbol="search"></span>
<span data-ios-symbol="gear"></span>
<span data-ios-symbol="chevronRight"></span>
```

Apps can replace the symbol set while retaining the framework's sizing and layout classes.

## HIG audit

`HIG_AUDIT.md` records the current mapping between Apple's Human Interface Guidelines and the framework, including compact versus regular presentation, accessibility, modality, content, controls, gestures, pointer behaviour, and native-only areas.

Primary Apple references:

- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/design/resources/
- https://developer.apple.com/documentation/technologyoverviews/liquid-glass

## Demo

From the repository root:

```bash
python -m http.server 4173
```

Open `http://localhost:4173/demo/`.

Resize the demo between phone and desktop widths to see the compact and regular presentations use the same app state and components.

## Files

```text
src/
  framework.css  public CSS entry point
  framework.js   public JavaScript entry point
  ios.css        shell, controls, navigation, presentations
  content.css    typography, readable copy, cards, content containers
  adaptive.css   compact and regular layouts, collections, tables, accessibility
  ios.js         navigation, gestures, menus, overlays, built-in symbols
  platform.js    pointer, keyboard, focus, and adaptive input behaviour

demo/
  index.html     working reference app
  demo.js        demo content and demo-only behaviour

HIG_AUDIT.md     Apple HIG implementation map
```

The rule for future apps is simple: start with these primitives and behaviours instead of restyling every screen independently.
