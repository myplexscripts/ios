# TVKit

TVKit is the television and streaming interface layer for GlassKit. It reproduces the interaction model shown by modern tvOS streaming apps while remaining ordinary HTML, CSS and JavaScript.

It is designed as a framework rather than a one-off mockup. The demo in `tv-demo/` uses the same public primitives an app can use.

## Included

- Full-screen television shell with a compact liquid-glass sidebar
- Sidebar expansion when focus enters navigation
- Spatial focus engine for arrow keys and remote-style input
- Focus memory by route
- Automatic horizontal rail scrolling while focus moves
- Hero carousel with page controls and reduced-motion handling
- 16:9, poster and wide card layouts
- Focus lift, scale, shadow and pointer parallax
- Reusable show and movie detail page structure
- Search screen and results grid
- Store, sports, library and provider patterns
- Profile picker
- Glass menus and popovers
- Full-screen player chrome
- Toast feedback
- Hash routing and back navigation
- Scroll restoration when navigating back
- Dark streaming typography, metadata and playback badges
- Reduced motion and reduced transparency fallbacks
- Lucide icons through the existing GlassKit icon renderer

## Use

```html
<link rel="stylesheet" href="./src/tvkit.css">
<script type="module">
  import { createTVKitApp } from './src/tvkit.js';

  const app = createTVKitApp({ root: '[data-tv-app]' });
</script>
```

A route is a `.tv-screen` with `data-tv-route`:

```html
<section class="tv-screen" data-tv-route="/home">
  <div class="tv-scroll">
    <div class="tv-content">...</div>
  </div>
</section>
```

Navigation uses `data-tv-route` on a focusable control:

```html
<button class="tv-nav-item" data-tv-route="/library" data-tv-focusable>
  Library
</button>
```

Parameterized detail routes are supported:

```html
<section class="tv-screen" data-tv-route="/show/:id">...</section>
```

Listen for route changes to load the selected item:

```js
root.addEventListener('tvkit:routechange', event => {
  const { to, params } = event.detail;
  if (to.startsWith('/show/')) renderShow(params.id);
});
```

## Focus engine

TVKit treats keyboard arrows like a television remote. Any element using one of the TVKit interactive classes or `data-tv-focusable` participates in spatial navigation.

The focus engine chooses the nearest valid item in the requested direction based on element geometry. It also keeps horizontal cards visible, restores the last focused control on each route and expands the sidebar while navigation has focus.

Enter or Space activates the focused control. Escape or Backspace closes the top presentation first, then navigates back.

## Hero carousel

```html
<section class="tv-hero" data-tv-carousel data-tv-interval="8000">
  <article class="tv-hero__slide is-active">...</article>
  <article class="tv-hero__slide">...</article>
  <div class="tv-hero__pages">
    <button class="tv-page-dot" aria-current="true"></button>
    <button class="tv-page-dot" aria-current="false"></button>
  </div>
</section>
```

Autoplay pauses when the hero contains focus, when a pointer is hovering it, when the page is hidden or when reduced motion is enabled.

## Cards

```html
<button class="tv-card" data-tv-focusable data-tv-parallax>
  <span class="tv-card__art" style="--card-accent:#6f94b6;--card-deep:#101923;--card-warm:#9a6e56">
    <span class="tv-card__mark">Show Name</span>
  </span>
  <span class="tv-card__meta">
    <span class="tv-card__title">Show Name</span>
    <span class="tv-card__subtitle">Recently Added</span>
  </span>
</button>
```

Use `.tv-card--poster` for 2:3 art and `.tv-card--wide` for large editorial rails.

## Menus

Create a menu in `.tv-menu-layer`:

```html
<div class="tv-menu" data-tv-menu="options" hidden>
  <button class="tv-menu__item" data-tv-focusable>Settings</button>
</div>
```

Then open it from any control:

```html
<button data-tv-menu-trigger="options" data-tv-focusable>More</button>
```

## Player

The app exposes a lightweight player presentation shell:

```js
app.openPlayer({
  title: 'Highland',
  subtitle: 'Drama · 2026',
  progress: 38
});
```

TVKit intentionally does not choose a video engine. Connect the player presentation to HTML video, HLS, DASH, Plex playback or another media stack at the app layer.

## Demo

Serve the repository and open:

```text
http://localhost:4173/tv-demo/
```

Use the arrow keys to move focus, Enter to activate and Escape or Backspace to go back.