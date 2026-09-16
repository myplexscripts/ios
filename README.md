# iOS Web Framework

A reusable HIG-aligned web foundation for apps that should feel at home on iPhone, iPad, and large desktop browser windows.

It mirrors the parts of current Apple interface design that translate to the web: hierarchy, semantic colour, typography, content layout, controls, navigation, gestures, modality, safe areas, adaptive size classes, keyboard and pointer input, accessibility, and current Liquid Glass relationships.

## Use it

No build step is required.

```html
<link rel="stylesheet" href="/ios/src/framework.css">
<script type="module" src="/ios/src/framework.js"></script>
```

`framework.css` and `framework.js` are the public entry points. Every `data-ios-app` root initializes automatically.

## Icons

Lucide is the framework icon system. The framework loads a pinned Lucide web build and converts `data-ios-symbol` names to their Lucide equivalents. A small built-in SVG fallback remains only so the interface does not become unusable if the icon resource cannot load.

```html
<span data-ios-symbol="search"></span>
<span data-ios-symbol="gear"></span>
<span data-ios-symbol="chevronRight"></span>
```

Common interface sizing and alignment are applied automatically.

## Adaptive platform behaviour

The same app changes presentation with available space instead of stretching one layout.

### Compact

Compact uses iPhone-style patterns:

- floating bottom tab bar
- single-column hierarchy
- push screens
- left-edge swipe back
- swipe actions
- compact sheets and source-aware transient actions
- touch-first 44px or larger hit areas
- split views collapse into navigation stacks

### Regular

Regular uses iPad-style patterns:

- leading top-level navigation
- wider content canvas
- split views and inspectors
- popovers
- richer toolbars
- pointer hover feedback
- keyboard navigation
- Command-Comma Settings shortcut when a Settings tab exists

Width and height both participate in the size-class decision so a landscape phone does not suddenly become a desktop interface.

## Accessibility defaults

The framework treats accessibility as structural rather than optional polish.

- semantic light and dark colours
- stronger web-safe supporting-text contrast
- current iOS system colour values
- increased-contrast system colour variants
- Reduced Motion support
- Reduced Transparency support
- forced-colours support
- keyboard focus containment and restoration
- large activation areas around visually small controls
- selected states that do not rely only on colour
- error states that include text as well as colour
- browser text scaling and zoom compatibility
- readable-width long-form content

Apple recommends at least 4.5:1 contrast for text in normal circumstances and higher contrast for small custom text. Important supporting text in the framework is tuned around that requirement instead of using decorative low-opacity grey everywhere.

## Full component template

The reference demo is intended to be a catalogue, not a sample landing page. It includes working examples of:

### Typography and content

- Extra Large titles
- Large Title
- Title 1, 2, and 3
- Headline
- Body
- Callout
- Subheadline
- Footnote
- Caption and Caption 2
- primary, secondary, tertiary, and quaternary emphasis
- readable article copy
- lead paragraphs
- quotes
- metadata
- links
- inline code
- truncation and line clamping
- key/value information
- persistent callouts

### Cards and collections

- standard cards
- elevated cards
- outlined cards
- tinted cards
- accent cards
- plain cards
- interactive cards
- media cards
- horizontal cards
- horizontal card scrollers with next-card peeking
- responsive card grids
- collection grids
- horizontal collections
- media rows
- avatars
- status pills
- content-unavailable states

### Lists and hierarchy

- grouped lists
- value rows
- disclosure rows
- selectable rows
- swipe actions
- disclosure groups
- compact navigation hierarchy
- regular-width split views
- inspectors
- data tables

### Forms and controls

- text fields
- field labels and help text
- validation and error states
- multiline text views
- search fields
- select fields
- date and time inputs
- checkboxes
- radio choices
- switches
- segmented controls
- sliders
- steppers
- tokens and filters
- buttons in standard, prominent, tinted, plain, and destructive styles

### Status and feedback

- badges
- status pills
- determinate progress
- activity indicators
- page controls with accessible hit areas
- skeleton loading states
- informational messages
- warnings
- errors
- empty/content-unavailable views

### Navigation and presentation

- compact tab bar
- regular-width leading navigation
- navigation bars
- large-to-compact titles
- toolbars
- push navigation
- edge-swipe back
- menus
- context menus
- alerts
- source-aware action sheets
- draggable sheets
- popovers

## Split views

A split view is adaptive, not a miniature desktop window.

```html
<div class="ios-split-view" data-ios-split-view>
  <aside class="ios-split-view__sidebar">
    <button data-ios-split-show="recent">Recent</button>
  </aside>

  <main class="ios-split-view__content">
    <button data-ios-split-back>Library</button>
    <div data-ios-split-panel="recent">...</div>
  </main>
</div>
```

On compact widths the sidebar and detail appear one at a time. Selecting a row pushes into the detail and the back control returns to the sidebar. At regular width both columns are visible simultaneously.

## Horizontal cards

```html
<div class="ios-card-scroller ios-card-scroller--peek">
  <article class="ios-card ios-card--elevated">...</article>
  <article class="ios-card ios-card--elevated">...</article>
  <article class="ios-card ios-card--elevated">...</article>
</div>
```

The scroller supports touch and trackpad scrolling, scroll snapping, safe page margins, and a visible next-card peek on compact screens.

## Design rules

1. Content is the main layer. Glass belongs primarily to navigation and controls.
2. Use semantic colours instead of hard-coded greys.
3. Use the system text hierarchy before inventing another font size.
4. Long-form text uses readable width rather than stretching across a large display.
5. Cards group related content. Do not put every section in a card.
6. Tab bars navigate. Toolbars act on the current view.
7. Keep interactive targets at least 44px.
8. Preserve context and scroll state.
9. Familiar gestures behave predictably and never become the only way to perform a critical action.
10. Reduced Motion, Reduced Transparency, contrast, light/dark appearance, safe areas, pointer, touch, and keyboard behaviour are part of the base system.
11. Desktop-sized layouts use regular-width Apple patterns instead of a fake macOS window.

## HIG audit

`HIG_AUDIT.md` records the current mapping between Apple’s Human Interface Guidelines and the framework, including areas that are compact-only, regular-width-only, shared, or native-only.

Primary references:

- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/design/resources/
- https://developer.apple.com/documentation/technologyoverviews/liquid-glass

## Demo

From the repository root:

```bash
python -m http.server 4173
```

Open `http://localhost:4173/demo/`.

Resize between phone and regular widths and interact with the examples. The demo is the visual and behavioural reference for future apps.

## Files

```text
src/
  framework.css       public CSS entry point
  framework.js        public JavaScript entry point
  ios.css              shell, controls, navigation, presentations
  content.css          typography and content containers
  adaptive.css         collections and compact/regular layouts
  refinements.css      current colours, spacing, forms, scrollers, mobile split view
  presentations.css    source-aware transient presentation styling
  accessibility.css    contrast, focus, forced colours, hit-area guarantees
  ios.js               navigation, gestures, menus, overlays, fallback symbols
  platform.js          keyboard, pointer, focus, adaptive input behaviour
  lucide.js            Lucide icon bridge
  split-view.js        compact/regular split-view behaviour
  presentations.js     source-aware action presentation behaviour

demo/
  index.html            reference app shell
  demo.js               typography and content gallery
  adaptive-demo.js      adaptive and data examples
  full-gallery.js       full reusable component catalogue

HIG_AUDIT.md            Apple HIG implementation map
```

Future apps should start from these primitives and behaviours instead of rebuilding basic iOS interaction and layout rules screen by screen.
