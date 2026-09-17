# Start Here

If you are building a new app, copy the `starter/` folder.

`starter/` is a self-contained **GlassKit** app. It includes the framework files it needs, so it can be moved into another repository without depending on `src/` or `demo/`.

```text
src/       master GlassKit framework source
demo/      full component and behaviour reference
starter/   standalone GlassKit app template
```

## New app workflow

1. Copy `starter/` into the new project.
2. Replace `App Name`, routes, tab names and placeholder content.
3. Keep app-specific CSS in `app.css`.
4. Keep app-specific behaviour, routed components and route declarations in the app layer.
5. Leave `framework/` intact unless you are intentionally syncing a newer GlassKit runtime.
6. Use `demo/` only as the component reference.

A new app already has `GlassKitApp`, Router 2.0, `GlassKitStore`, routed components, lazy component loading, named routes, route parameters, guards, lifecycle events, scroll restoration, tabs, push navigation, swipe back, sheets, menus, adaptive layouts, safe areas, accessibility, Lucide icons, semantic colours, typography and concentric radii.

The starter demonstrates the newer architecture directly: Library items open a `defineComponent()` screen that GlassKitRouter creates at runtime. That destination does not need to exist in `index.html` ahead of time.

See `COMPONENTS_AND_ROUTING.md` for the routed component API.

To preview it:

```bash
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/starter/
```

The intended workflow is simple: copy the starter, define the app's routes and content, and build on top of GlassKit instead of recreating application infrastructure for every project.
