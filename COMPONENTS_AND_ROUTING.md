# GlassKit Components and Router 2.0

GlassKit 1.1 can create route screens at runtime instead of requiring every possible destination to exist in `index.html`.

## Define a component

```js
import { defineComponent } from './framework/framework.js';

export const ItemPage = defineComponent({
  state: { saved: false },

  render({ params, data, state }) {
    return `
      <header class="ios-navigation-bar is-scrolled">...</header>
      <div class="ios-scroll">
        <div class="ios-content">
          <h1 class="ios-large-title">${data.title}</h1>
          <button data-save>${state.saved ? 'Saved' : 'Save'}</button>
        </div>
      </div>
    `;
  },

  events: {
    'click [data-save]': (event, { state, setState }) => {
      event.preventDefault();
      setState({ saved: !state.saved });
    }
  }
});
```

A component can define:

- `state`
- `setup(context)`
- `render(context)`
- delegated `events`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeUnmount`
- `unmounted`

The render context includes `app`, `router`, `store`, `route`, `params`, `query`, `data`, `state`, `setState`, `query`, and `queryAll`.

GlassKit re-applies its dynamic UI enhancement layer after every component render so routed screens participate in navigation-bar scrolling, Lucide rendering, and framework search behaviour.

## Route directly to a component

```js
const app = new GlassKitApp({
  root: '[data-glasskit-app]',
  routes: [
    { name: 'home', path: '/', tab: 'home' },
    {
      name: 'item',
      path: '/item/:id',
      tab: 'home',
      component: ItemPage,
      resolve: async ({ params }) => {
        return await loadItem(params.id);
      }
    }
  ]
}).init();
```

Opening `/item/123` causes GlassKitRouter to create a push screen, mount `ItemPage`, pass `id = 123`, run the route resolver, and animate the new destination into place.

## Lazy-loaded components

Large screens can stay out of the initial JavaScript graph:

```js
{
  name: 'item',
  path: '/item/:id',
  loadComponent: async () => {
    const module = await import('./pages/item.js');
    return module.ItemPage;
  }
}
```

`app.router.preload()` can warm up the route before navigation:

```js
await app.router.preload({
  name: 'item',
  params: { id: 123 }
});
```

## Named routes

```js
await app.router.to('item', { id: 123 });
```

Generate a URL without navigating:

```js
const href = app.router.href({
  name: 'item',
  params: { id: 123 },
  query: { source: 'library' }
});
```

## Declarative links

```html
<button data-glasskit-link="/item/123">Open Item</button>
```

Named routes can also be attached to an element using `data-glasskit-route` with JSON parameter and query attributes.

## Guards and lifecycle

Routes can stop navigation before it happens:

```js
{
  path: '/editor',
  component: EditorPage,
  beforeEnter(to, from) {
    return canOpenEditor();
  },
  beforeLeave(from, to) {
    return !hasUnsavedChanges();
  }
}
```

Route targets emit:

- `glasskit:pagebeforeenter`
- `glasskit:pageenter`
- `glasskit:pagebeforeleave`
- `glasskit:pageleave`

The app also emits `routebeforechange`, `routechange`, `routeloadstart`, `routeloadend`, `componentmounted`, and `componentunmounted` through the normal `glasskit:*` event namespace.

## History and restoration

Router 2.0 tracks its own history index so browser Back and Forward can distinguish reverse and forward navigation. It also records scroll position per route and restores it when the user returns.

Routed components remain cached by default so their local state survives Back and Forward. Use `cache: false` on a route when the component should be destroyed after it leaves the navigation stack.

The app-level component cache defaults to 12 routed screens and can be changed with:

```js
router: {
  componentCacheSize: 20
}
```

## Static screens remain supported

Existing GlassKit markup still works:

```js
{ path: '/settings', tab: 'settings' }
{ path: '/detail', screen: 'detail' }
```

This is deliberate. Apps can migrate screen by screen instead of converting everything to components at once.
