# iOS Web Foundation

A reusable, framework-agnostic design and interaction layer for web apps that should feel at home on iPhone and iPad.

This is not a pixel-for-pixel clone of UIKit. It is a web foundation that copies the behavioural grammar people expect from iOS: hierarchy, motion, touch targets, safe areas, modality, semantic colours, gestures, list behaviour, accessibility and restrained visual feedback.

## What is included

- Semantic iOS-style design tokens for colour, typography, spacing, radii, separators and materials
- Automatic light and dark appearance, with optional forced themes
- Apple system font stack with Inter fallback
- Lucide icon convention
- Safe-area handling for notches, Dynamic Island and Home Indicator areas
- Dynamic viewport units for mobile Safari
- Navigation bars, large titles, grouped lists, cards, buttons, icon buttons, inputs and search fields
- Switches, segmented controls, badges, spinners and skeleton states
- Bottom tab bars and translucent material surfaces
- Push and pop screen transitions
- Left-edge swipe-to-go-back gesture
- Swipe actions on list rows
- Bottom sheets with drag-to-dismiss
- Action sheets
- Top feedback banners/toasts
- Optional pull-to-refresh behaviour
- Reduced-motion support
- Keyboard and focus-aware modal behaviour
- 44px minimum interactive targets
- Standalone/PWA-friendly viewport and safe-area patterns

## Why it is framework agnostic

`src/ios.css` and `src/ios.js` have no framework dependency. You can use them in:

- plain HTML
- Svelte or SvelteKit
- React or Next.js
- Vue or Nuxt
- an existing server-rendered app

That means future apps can use the same interaction rules without rebuilding them or adopting a particular component framework.

## Quick start

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="stylesheet" href="/ios/src/ios.css">
<script src="https://unpkg.com/lucide@latest" defer></script>
<script type="module">
  import { initIOSFramework } from '/ios/src/ios.js';
  initIOSFramework();
</script>
```

The CSS prefers Apple's system font when the device has it and falls back to Inter elsewhere.

## Navigation

Create screens with `data-ios-route` and links with `data-ios-link`:

```html
<main class="ios-app ios-router" id="app">
  <section class="ios-screen" data-ios-route="home">...</section>
  <section class="ios-screen" data-ios-route="settings">...</section>
</main>

<script type="module">
  import { IOSRouter } from './src/ios.js';
  const router = new IOSRouter('#app').start('home');
</script>
```

Forward navigation slides the destination in from the trailing edge. Going back reverses the hierarchy. Touch users can also begin a back gesture from the left screen edge.

New screens are moved to scroll position 0 before their transition starts, so the user does not see the distracting jump-to-top behaviour that normal web navigation can produce.

## Bottom sheet

```html
<section class="ios-sheet" id="editSheet">
  <div class="ios-sheet__grabber"></div>
  <div class="ios-sheet__header">
    <div class="ios-sheet__title">Edit item</div>
    <button class="ios-icon-button" data-ios-dismiss>Done</button>
  </div>
  <div class="ios-sheet__body">...</div>
</section>
```

```js
import { presentSheet } from './src/ios.js';
presentSheet('#editSheet');
```

## Swipe actions

```html
<div class="ios-swipe-row" data-ios-swipe-row>
  <div class="ios-swipe-row__actions">
    <button class="ios-swipe-row__action">Delete</button>
  </div>
  <div class="ios-swipe-row__content">
    <div class="ios-row">Swipe left</div>
  </div>
</div>
```

## Action sheets and feedback

```js
import { presentActionSheet, showToast } from './src/ios.js';

presentActionSheet({
  title: 'Photo',
  actions: [
    { label: 'Duplicate', onSelect: duplicatePhoto },
    { label: 'Delete', destructive: true, onSelect: deletePhoto }
  ]
});

showToast({ title: 'Saved', message: 'Changes are up to date.' });
```

## Design rules for future apps

Use these as the default rules, not optional polish:

1. **Hierarchy drives motion.** Push for deeper navigation, reverse to go back, sheets for modal tasks, action sheets for contextual choices.
2. **Content gets priority.** Bars and controls should feel like lightweight chrome around content, not decoration competing with it.
3. **Use semantic colour tokens.** Avoid hardcoding grey text, separators or backgrounds. Dark mode should fall out naturally from tokens.
4. **Keep touch targets at least 44px.** Visible icons can be smaller, but hit areas should not be.
5. **Respect safe areas.** Fixed bars, sheets and full-screen screens must account for device insets.
6. **Use restrained feedback.** Small scale and opacity responses beat bouncy website effects.
7. **Preserve context.** Never unexpectedly reset a current view. New pushed screens start at the top before becoming visible.
8. **Do not make every surface rounded.** Use grouped geometry deliberately. Concentric radii should follow the nesting relationship.
9. **Prefer familiar symbols.** Use Lucide consistently instead of mixing icon sets.
10. **Accessibility is structural.** Reduced motion, focus visibility, semantic labels, legible text and contrast are part of the foundation.

## Recommended app shell

For a typical iPhone-style app:

- `ios-app` at the root
- one `ios-screen` per top-level route or navigation destination
- `ios-navbar` for child views
- `ios-large-title` for primary screens
- `ios-group` + `ios-row` for settings and list interfaces
- `ios-tabbar` only for major peer sections
- `ios-sheet` for focused temporary tasks
- swipe actions only when there is a clear direct action on a row

## Demo

Serve the repository and open `/demo/`:

```bash
npm run serve
```

No build step is required.

## API

Exports from `src/ios.js`:

- `initIOSFramework(root)`
- `IOSRouter`
- `bindSwipeRows(root)`
- `bindSegmentedControls(root)`
- `presentSheet(sheet, options)`
- `dismissSheet(sheet)`
- `presentActionSheet(options)`
- `showToast(options)`
- `bindPullToRefresh(element, handler, options)`
- `refreshIcons(root)`
- `pulse(element)`

## Philosophy

A native-feeling web app is not achieved by adding blur and rounded rectangles. It comes from consistent navigation hierarchy, appropriate motion, direct manipulation, touch ergonomics, stable layout, system-aware colours, predictable modality, and interaction feedback that never gets in the way.
