# iOS Web Framework

A small, dependency-free design and interaction foundation for web apps that should feel at home on iPhone and iPad.

It is not a UIKit or SwiftUI clone. It mirrors the parts of iOS that translate well to the web: hierarchy, typography, semantic colour, content layout, familiar controls, navigation, gestures, modality, safe areas, and accessibility.

## Use it

No install or build step is required.

```html
<link rel="stylesheet" href="/ios/src/framework.css">
<script type="module" src="/ios/src/ios.js"></script>
```

`framework.css` is the single stylesheet entry point. It includes both the core interface components and the content/typography layer.

## What is included

### App structure

- Safe-area aware full-screen shell
- Independent scroll surfaces
- Large and compact navigation titles
- Floating navigation controls
- Floating tab bar with optional minimize-on-scroll behaviour
- Push navigation and left-edge swipe back
- Toolbars and grouped bar actions
- iPhone and wider iPad layouts

### Typography and content

The content layer follows Apple’s system text hierarchy rather than inventing a different type scale for every app.

- Extra large titles
- Large title
- Title 1, 2, and 3
- Headline
- Body
- Callout
- Subheadline
- Footnote
- Caption and Caption 2
- Primary, secondary, tertiary, and quaternary text emphasis
- Accent, success, and destructive semantic text
- Readable-width long-form content
- Paragraph and lead styles
- Metadata rows
- Eyebrows
- Quotes
- Inline links and code
- Truncation and two/three-line clamping
- Selectable text and tabular numerals

Example:

```html
<div class="ios-readable ios-prose">
  <div class="ios-eyebrow">Guide</div>
  <h2>Readable content</h2>
  <p class="ios-lead">A short introduction with slightly more visual emphasis.</p>
  <p>Regular body copy with an <a href="#">inline link</a>.</p>
</div>
```

### Cards and content containers

Cards stay in the content layer. They are not glass navigation surfaces.

- Standard card
- Elevated card
- Outlined card
- Tinted card
- Accent card
- Plain card
- Interactive card
- Media card
- Horizontal compact card
- Card headers, footers, badges, actions, and accessories
- Responsive card grid
- Persistent informational callouts
- Key/value information groups

Example:

```html
<article class="ios-card ios-card--elevated">
  <div class="ios-eyebrow">Featured</div>
  <h3 class="ios-card__title">Card title</h3>
  <p class="ios-card__body">Supporting content goes here.</p>
  <div class="ios-card__footer">Updated today</div>
</article>
```

### Controls

- Prominent, tinted, standard, plain, and destructive buttons
- Grouped lists and disclosure rows
- Switches
- Segmented controls
- Sliders
- Steppers
- Text and search fields
- Badges
- Progress and activity indicators
- Page controls
- Empty states
- Swipe actions

### Presentations and menus

- Pull-down menus
- Touch-and-hold context menus
- Alerts
- Action sheets
- Draggable sheets

## Design rules

1. Content is the main layer. Glass belongs primarily to navigation and controls.
2. Use semantic colours instead of hard-coded greys.
3. Use the system text hierarchy before inventing a new size.
4. Long-form text uses a readable width instead of stretching across a large display.
5. Cards group related content. Do not make every section a card.
6. Tab bars are navigation, not a place for screen-specific actions.
7. Keep interactive targets at least 44px.
8. Preserve context. Tabs retain scroll position and pushed screens open at the top.
9. Familiar gestures should behave predictably.
10. Reduced Motion, Reduced Transparency, contrast, light/dark appearance, and safe areas are part of the base system.

## Basic app shell

```html
<main class="ios-app" data-ios-app>
  <section class="ios-tab-panel" data-ios-tab-panel="home">
    <div class="ios-scroll">
      <div class="ios-content">
        <h1 class="ios-large-title">Home</h1>
      </div>
    </div>
  </section>
</main>
```

The JavaScript auto-initializes every `data-ios-app` root.

## Navigation

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

## Symbols

A small built-in neutral SVG symbol set covers common interface actions without a CDN or icon dependency.

```html
<span data-ios-symbol="search"></span>
<span data-ios-symbol="gear"></span>
<span data-ios-symbol="chevronRight"></span>
```

Apps can replace the symbol set while retaining the framework’s sizing and layout classes.

## Demo

From the repository root:

```bash
python -m http.server 4173
```

Open `http://localhost:4173/demo/`.

The demo is the component gallery and interaction reference. It includes typography, body copy, cards, controls, lists, navigation, gestures, menus, sheets, alerts, and other supported patterns.

## Files

```text
src/
  framework.css  single CSS entry point
  ios.css        app shell, controls, navigation, presentations
  content.css    typography, readable copy, cards, content containers
  ios.js         interaction behaviour and built-in symbols

demo/
  index.html     working reference app
  demo.js        demo content and small demo-only behaviour
```

The goal is simple: future apps should start from these pieces instead of recreating basic iOS behaviour and content styling every time.
