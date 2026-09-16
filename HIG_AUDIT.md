# Apple HIG implementation audit

Last reviewed: September 16, 2026

This document maps the current Apple Human Interface Guidelines to this web framework. The goal is not to draw an iPhone-shaped website. The goal is to reproduce the hierarchy, behaviour, layout adaptation, controls, motion, input handling, and visual relationships people expect from current iOS and iPadOS.

Primary source:

- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/design/resources/
- https://developer.apple.com/documentation/technologyoverviews/liquid-glass

## Platform model

The framework uses two layout environments.

### Compact

Compact is the iPhone-style presentation.

- Bottom floating tab bar
- Single primary content column
- Push navigation for hierarchy
- Left-edge swipe back
- Full-width or bottom sheet presentation
- Minimal persistent chrome
- Touch-first controls with 44px minimum targets
- Swipe actions on list rows
- Content begins at the top before a pushed screen appears
- Current screen preserves its scroll position when navigating away

### Regular

Regular is the iPad-style presentation used for sufficiently large browser windows.

- Floating leading navigation derived from the same top-level tab model
- Wider content canvas
- Split-view and inspector patterns
- Popovers for compact transient tasks when appropriate
- Toolbars with grouped controls
- Pointer hover feedback
- Keyboard navigation and focus treatment
- Command-Comma opens the Settings tab when one exists
- The same navigation state and content hierarchy as compact mode

The regular layout activates only when both width and height are large enough. This prevents an iPhone in landscape from becoming a desktop layout simply because its viewport is wide.

## Design principles

Apple's current design principles emphasize purpose, hierarchy, harmony, consistency, agency, and familiarity. The framework translates these into the following rules.

- Content has priority over chrome.
- Controls use familiar placement and interaction.
- Navigation and controls form a distinct functional layer above content.
- The same action behaves consistently with touch, pointer, and keyboard input.
- Motion communicates hierarchy instead of decorating the interface.
- Secondary actions stay discoverable without competing with primary content.
- System settings and accessibility preferences take precedence over custom styling.

## Foundations

### Accessibility

Implemented:

- Semantic HTML remains the base of interactive controls.
- 44px minimum interaction targets.
- Visible keyboard focus.
- Reduced Motion support.
- Increased Contrast support.
- Forced-colors support.
- Light and dark appearances.
- Modal focus containment and focus restoration.
- Keyboard navigation for tabs, menus, page controls, and selectable lists.
- Useful content can opt into text selection.
- Colour is not intended to be the only indicator of state.

Web limitation:

Safari does not expose every iOS accessibility preference to CSS or JavaScript. Native Dynamic Type behaviour cannot be reproduced perfectly in a generic webpage, so text uses Apple's semantic size hierarchy and remains compatible with browser zoom and text scaling.

### App icons

Native app icon production belongs to the installed PWA or native wrapper rather than the component framework. The framework does not draw fake app icons inside the interface.

### Colour

Implemented:

- Semantic label hierarchy.
- Semantic background hierarchy.
- Separator and fill tokens.
- Standard iOS accent colours.
- Light and dark variants.
- Increased-contrast overrides.
- Accent colour is reserved primarily for interactivity, status, and selected navigation.

Rule:

Do not hard-code a grey or background simply because it visually matches one screenshot. Use semantic tokens so the hierarchy survives appearance changes.

### Layout

Implemented:

- Edge-to-edge app shell.
- Safe-area insets.
- Dynamic viewport units.
- Independent scrolling surfaces.
- Readable-width long-form content.
- Compact and regular size-class behaviour.
- Regular-width split views.
- Content grids and collections.
- Content continues visually behind the floating navigation layer.
- Nested scroll views of the same orientation are discouraged by the component structure.

### Materials and Liquid Glass

Implemented:

- Glass is limited to navigation, menus, toolbars, floating tab/sidebar controls, and modal chrome.
- Content uses normal semantic materials rather than glass.
- Backdrop blur and saturation provide a web approximation of the current material system.
- Reduced-transparency and high-contrast states fall back to more opaque surfaces where supported.

Important limitation:

Apple's Liquid Glass rendering is a system material with private optical behaviour. CSS backdrop filters can reproduce the hierarchy and general appearance, but a browser cannot recreate the private system renderer pixel for pixel.

### Typography

Implemented:

- Apple system font stack first.
- Extra large title styles.
- Large Title.
- Title 1, Title 2, Title 3.
- Headline.
- Body.
- Callout.
- Subheadline.
- Footnote.
- Caption and Caption 2.
- Semantic text emphasis.
- Readable-width prose.
- Metadata, quotes, inline code, lead copy, truncation, and line clamping.

Rule:

Use an existing semantic text style before inventing a new font size.

## Patterns

### Drag and drop

The framework does not force custom drag behaviour onto every surface. Native HTML drag and drop can be used for desktop workflows. Touch reordering should be implemented only in apps that need it and must retain another accessible method for the same task.

### Feedback

Implemented:

- Inline status surfaces.
- Badges.
- Progress bars.
- Activity indicators.
- Skeleton loading states.
- Alerts for interruptive information.
- Destructive roles.

Rule:

Persistent status belongs near the content it describes. Alerts are reserved for information that genuinely needs interruption.

### Launching

The framework has no splash-screen dependency. Pages can paint the shell immediately and load content into it progressively.

### Loading

Implemented:

- Determinate progress.
- Indeterminate activity.
- Skeleton placeholders.
- Inline loading states.

Rule:

Show useful structure immediately rather than blocking the entire interface behind a spinner.

### Modality

Implemented:

- Alerts.
- Action sheets.
- Sheets.
- Popover styling.
- One active modal layer at a time.
- Escape dismissal where appropriate.
- Focus containment.
- Focus restoration.

Compact environments favour sheets. Regular environments can use popovers for small transient tasks.

### Motion

Implemented:

- Forward navigation enters from the trailing edge.
- Back navigation reverses the relationship.
- Edge swipe directly manipulates the current screen.
- Sheets move vertically and dismiss in the same direction.
- Press feedback is restrained.
- Reduced Motion removes nonessential animation.

Rule:

Movement must explain state or hierarchy. No decorative bouncing or gratuitous parallax belongs in the base framework.

### Onboarding

No mandatory framework onboarding component is provided because Apple recommends making an interface understandable through use. Apps can build optional tips and short flows using the normal cards, sheets, page controls, and content components.

### Searching

Implemented:

- Search field.
- Clear button.
- Sticky search-strip pattern.
- Keyboard-compatible text input.

Apps should expose one obvious primary search location where possible.

### Settings

Implemented:

- Grouped settings lists.
- Switch rows.
- Value rows.
- Disclosure rows.
- Regular-width Command-Comma shortcut to the `settings` tab when present.

Rule:

Task-specific options belong with the task. The Settings area is for broader, infrequently changed preferences.

## Components

### Content

Implemented:

- Labels and semantic text.
- Long-form text views.
- Cards.
- Media cards.
- Horizontal cards.
- Empty states.
- Collections and grids.
- Horizontal scrolling collections.
- Data tables.
- Key/value groups.
- Inline callouts.

### Layout and organization

Implemented:

- Lists.
- Grouped lists.
- Collections.
- Split views.
- Sections with headers and footers.
- Responsive regular-width navigation.
- Readable content guides.

### Menus and actions

Implemented:

- Standard buttons.
- Prominent buttons.
- Tinted buttons.
- Plain buttons.
- Destructive buttons.
- Icon buttons.
- Pull-down menus.
- Context menus via touch-and-hold and secondary click.
- Toolbars.
- Swipe actions.
- Keyboard navigation inside menus.

Rules:

- Menus should be short and grouped logically.
- Context-menu commands must also be available somewhere visible.
- Destructive commands appear last in context menus.
- A toolbar acts on the current view. A tab bar navigates between major areas.

### Navigation and search

Implemented:

- Compact tab bar.
- Regular-width adaptable leading navigation.
- Push navigation.
- Large-to-compact title transition.
- Back control.
- Edge swipe back.
- Search field.
- Preserved state for each top-level tab.

### Presentation

Implemented:

- Alerts.
- Action sheets.
- Sheets.
- Popover surface.
- Page controls.
- Scroll views.
- Regular-width split content.

### Selection and input

Implemented:

- Text fields.
- Multiline text views.
- Native select/date/time field wrappers.
- Switches.
- Segmented controls.
- Sliders.
- Steppers.
- Selectable list rows.

Rules:

- iPhone switches belong in list rows.
- Segmented controls represent a small set of closely related choices.
- Pickers are for medium-length ordered choices.
- Long choices use a list or searchable view.

### Status

Implemented:

- Badges.
- Progress indicators.
- Activity indicators.
- Inline messages.
- Skeleton placeholders.

## Inputs

### Touch and gestures

Implemented:

- Tap.
- Swipe actions.
- Left-edge swipe back.
- Sheet drag-to-dismiss.
- Touch-and-hold context menus.
- Native scrolling.

Rule:

No critical action may depend on a hidden gesture alone.

### Keyboard

Implemented:

- Tab focus navigation.
- Arrow-key top-level navigation.
- Arrow-key menu navigation.
- Arrow-key selectable lists.
- Arrow-key page controls.
- Escape dismissal.
- Command-Comma Settings shortcut.

### Pointing devices

Implemented:

- Hover treatment only where the pointer supports hover.
- Context menu secondary click.
- Pointer-compatible controls.
- Focus and selection remain consistent with touch behaviour.

The framework does not replace the system cursor or redefine browser-wide trackpad gestures.

## Desktop policy

A desktop browser does not receive a fake macOS title bar or fake traffic-light window controls. Apple specifically recommends against recreating system window chrome. The browser is already the system window.

Instead, a large browser viewport receives an iPad-style regular-width app layout using the same universal Apple design language:

- floating leading navigation
- wider content canvas
- split views
- popovers where appropriate
- pointer states
- keyboard operation
- denser access to simultaneous information without shrinking touch targets

This produces a native-feeling desktop web app without turning the browser into a drawing of a Mac window.

## Native-only areas

Some HIG topics describe platform services rather than reusable interface primitives. They should be integrated by an individual app when relevant, not simulated by the base framework. Examples include:

- Apple Pay
- HealthKit
- HomeKit
- Siri and App Intents
- Live Activities
- Widgets
- Wallet passes
- CarPlay
- Game Center
- system notifications
- Face ID and Touch ID
- camera and sensor experiences
- native file pickers
- system share sheets

Where a browser exposes an equivalent native API, apps should prefer the platform-provided experience rather than drawing a fake copy.

## Review rule

When adding a new framework component, first identify its matching HIG component or pattern. If Apple already defines the interaction, follow that interaction. If Apple does not define one, keep the component in the content layer and avoid making it look like system navigation chrome.
