# GlassKit

GlassKit is an opinionated web application framework for building native-feeling iOS and iPadOS-style apps in ordinary HTML, CSS and JavaScript.

It combines the existing HIG-aligned UI system with an application layer inspired by the useful parts of frameworks such as Framework7: an app instance, router, shared store, lifecycle events, adaptive navigation and reusable components, without requiring a build system.

## Start a new app

Use the self-contained `starter/` folder.

```text
starter/
  index.html
  app.css
  app.js
  framework/
```

Copy that folder into a new project and replace the placeholder content. It does not depend on files outside the folder.

## App instance

New GlassKit apps start with one app object:

```js
import { GlassKitApp } from './framework/framework.js';

export const app = new GlassKitApp({
  root: '[data-glasskit-app]',
  name: 'My App',
  routes: [
    { path: '/', tab: 'home' },
    { path: '/library', tab: 'library' },
    { path: '/item/:id', tab: 'library', screen: 'detail' },
    { path: '*', redirect: '/' }
  ],
  store: {
    selectedItem: null
  }
}).init();
```

The app instance owns the router and shared store while the existing `data-ios-*` component primitives remain available for UI behaviour.

## Router

`GlassKitRouter` provides URL-aware navigation, browser Back and Forward support, route parameters, direct links, redirects and route lifecycle hooks.

GlassKit defaults to hash routing because it works on static hosting without server rewrite rules:

```text
#/library
#/item/123
```

Navigate declaratively:

```html
<button data-glasskit-link="/item/123">Open</button>
```

or from JavaScript:

```js
app.navigate('/item/123');
app.router.back();
app.replace('/library');
```

Route callbacks receive `params`, `query`, `store`, `router` and `app`.

## Shared store

GlassKit includes a deliberately small reactive store:

```js
app.store.set('selectedItem', 123);

const unsubscribe = app.store.subscribe('selectedItem', value => {
  console.log(value);
});
```

You can also use `app.store.state` directly or update several values with `patch()`.

## Lifecycle

GlassKit emits app and navigation lifecycle events such as:

```text
glasskit:ready
glasskit:routebeforechange
glasskit:routechange
glasskit:pageenter
glasskit:destroy
```

Routes can also define `beforeEnter`, `enter` and `leave` callbacks.

## UI system

GlassKit includes the existing reusable iOS/iPadOS component layer:

- compact and regular-width navigation
- large-title headers
- tab bars and leading navigation
- push transitions and edge swipe back
- safe areas
- sheets, alerts, menus, popovers and toolbars
- lists, forms, search and selection controls
- cards, editorial patterns and horizontal scrollers
- charts and data presentation
- Lucide icons
- semantic light and dark colours
- reduced motion and reduced transparency support
- keyboard, pointer and touch behaviour
- concentric radius rules

The `ios-*` class names remain for backward compatibility and because they describe the platform design primitives. The framework itself is GlassKit.

## Concentric radii

Nested rounded surfaces follow one rule:

```text
inner radius = outer radius - inset
```

Do not choose unrelated radii for nested surfaces. `src/radii.css` enforces this across framework components.

## Repository layout

```text
src/        GlassKit framework source
demo/       full component and behaviour reference
starter/    self-contained new-app template
```

The main JavaScript entry point is `src/framework.js`. It exports `GlassKitApp`, `GlassKitRouter`, `GlassKitStore` and the lower-level UI modules.

## Run locally

```bash
python -m http.server 4173
```

Open:

```text
http://localhost:4173/starter/
http://localhost:4173/demo/
```

Use `starter/` to build apps. Use `demo/` only as the component reference.
