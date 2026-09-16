# iOS Web Framework

A small, dependency-free web foundation for apps that should feel at home on iPhone and iPad.

It is not a clone of UIKit or SwiftUI. It takes the parts of Apple’s current design language that matter on the web and turns them into reusable CSS classes and lightweight interactions.

## What it covers

### Structure

- Safe-area aware full-screen app shell
- Independent scroll surfaces
- Large titles that collapse into compact navigation titles
- Floating navigation controls
- Floating tab bar with optional minimize-on-scroll behaviour
- Push navigation with back navigation and left-edge swipe back
- Toolbars and grouped bar actions
- Responsive sizing for iPhone and wider iPad-style layouts

### Components

- Buttons: prominent, tinted, standard, plain, destructive
- Grouped lists and disclosure rows
- Switches
- Segmented controls
- Sliders
- Steppers
- Text fields and search fields
- Badges
- Progress bars and activity indicators
- Page controls
- Empty states
- Cards and inline status surfaces
- Menus and context menus
- Alerts
- Action sheets
- Draggable sheets
- Swipe actions

### Interaction rules

- Minimum 44px hit targets for interactive controls
- Tap feedback for custom buttons
- Standard tap, swipe, drag, edge-swipe, and touch-and-hold patterns
- Swipe actions preserve vertical scrolling
- Context menu actions are also expected to exist elsewhere in the interface
- Reduced Motion, Reduced Transparency, increased contrast, light mode, and dark mode are respected
- Each tab retains its own scroll position
- Pushed screens begin at the top while the previous screen keeps its position

## Current Apple design direction

The framework follows the current Human Interface Guidelines rather than older flat iOS styling.

The important rules are:

1. **Content is the main layer.** Glass is reserved for controls and navigation rather than used as decoration across the content layer.
2. **Bars float above content.** Navigation buttons, toolbars, and tab bars use grouped translucent surfaces instead of heavy bar backgrounds and borders.
3. **Hierarchy comes from layout and grouping.** Related symbol actions can share a glass group. Text actions and primary actions remain visually distinct.
4. **Tab bars are navigation only.** Screen-specific actions belong with the content or in a toolbar.
5. **Use familiar gestures.** Tap activates, swipe reveals actions or navigates, drag directly manipulates, and touch-and-hold can reveal a context menu.
6. **Keep modal experiences scoped.** Sheets handle focused tasks, alerts handle important actionable information, and action sheets offer choices related to an action the person just initiated.
7. **Accessibility is part of the base system.** Controls remain large enough to tap and the visual system adapts to the user’s display preferences.

Primary references:

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Apple Design Resources: https://developer.apple.com/design/resources/
- Liquid Glass: https://developer.apple.com/documentation/technologyoverviews/liquid-glass
- WWDC: Get to know the new design system: https://developer.apple.com/videos/play/wwdc2025/356/

## Use it

No package install is required.

```html
<link rel="stylesheet" href="/ios/src/ios.css">
<script type="module" src="/ios/src/ios.js"></script>
```

Then create an app root:

```html
<main class="ios-app" data-ios-app>
  <!-- panels, screens, and tab bar -->
</main>
```

The framework auto-initializes every `data-ios-app` root.

## Basic tab bar

```html
<section class="ios-tab-panel" data-ios-tab-panel="home">
  <div class="ios-scroll">...</div>
</section>

<section class="ios-tab-panel" data-ios-tab-panel="settings" hidden>
  <div class="ios-scroll">...</div>
</section>

<nav class="ios-tabbar">
  <button class="ios-tabbar__item" data-ios-tab="home" aria-selected="true">Home</button>
  <button class="ios-tabbar__item" data-ios-tab="settings" aria-selected="false">Settings</button>
</nav>
```

## Push navigation

```html
<button class="ios-row" data-ios-push="detail">Open detail</button>

<section class="ios-push-screen" data-ios-screen="detail" hidden tabindex="-1">
  <button data-ios-back>Back</button>
  <div class="ios-scroll">...</div>
</section>
```

Push navigation supports the standard left-edge swipe-back gesture on touch devices.

## Sheets, alerts, and action sheets

Anything with `data-ios-present="name"` can present the matching overlay.

```html
<button data-ios-present="edit-sheet">Edit</button>

<div class="ios-overlay" data-ios-overlay="edit-sheet" hidden>
  <section class="ios-sheet">
    <div class="ios-sheet__grabber" data-ios-sheet-handle></div>
    <button data-ios-dismiss>Cancel</button>
    ...
  </section>
</div>
```

Use `data-ios-dismiss` on controls that close a presentation.

## Menus

```html
<button data-ios-menu-trigger="more">More</button>

<div class="ios-menu" data-ios-menu="more" hidden>
  <button class="ios-menu__item">Share</button>
  <button class="ios-menu__item ios-menu__item--destructive">Delete</button>
</div>
```

For a touch-and-hold or secondary-click context menu:

```html
<div data-ios-context-menu="more">...</div>
```

## Symbols

The framework includes a small neutral web symbol set for common interface actions. It does not depend on a CDN or icon package.

```html
<span data-ios-symbol="search"></span>
<span data-ios-symbol="gear"></span>
<span data-ios-symbol="chevronRight"></span>
```

The symbol renderer is intentionally small. An app can replace these with its own icon system while keeping the framework’s sizing and placement classes.

## Demo

The demo is a working component and interaction gallery.

From the repository root:

```bash
python -m http.server 4173
```

Open:

```text
http://localhost:4173/demo/
```

It has no network or API dependency.

## Files

```text
src/
  ios.css      visual system and components
  ios.js       interaction behaviour and built-in symbols

demo/
  index.html   working reference app
  demo.js      demo-only behaviour
```

The rule for future apps is simple: use the framework for platform behaviour and consistency, then put the app’s own content and branding inside it. Do not restyle every screen independently.
