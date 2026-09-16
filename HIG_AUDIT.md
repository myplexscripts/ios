# Apple HIG implementation audit

Last reviewed: September 16, 2026

This document maps the current Apple Human Interface Guidelines to this web framework. The goal is not to draw an iPhone-shaped website. The goal is to reproduce the hierarchy, behaviour, layout adaptation, controls, motion, input handling, and visual relationships people expect from current iOS and iPadOS as closely as the browser permits.

Primary sources:

- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/design/resources/
- https://developer.apple.com/documentation/technologyoverviews/liquid-glass

## Platform model

### Compact

Compact is the iPhone-style presentation.

- Bottom floating tab bar
- Single primary content column
- Push navigation for hierarchy
- Left-edge swipe back
- Compact sheets and source-aware transient actions
- Minimal persistent chrome
- 44px or larger touch targets
- Swipe actions on list rows
- Split views collapse into a navigation stack rather than showing multiple squeezed columns
- New destinations begin at the top while the previous destination preserves its position

### Regular

Regular is the iPad-style presentation used for sufficiently large browser windows.

- Leading top-level navigation derived from the same tab model
- Wider content canvas
- Split views and inspectors
- Popovers for small transient tasks
- Toolbars with grouped controls
- Pointer hover feedback
- Keyboard navigation and focus treatment
- Command-Comma opens Settings when a Settings tab exists
- The same navigation state and content hierarchy as compact mode

The regular layout activates only when both width and height are large enough, preventing a landscape phone from being treated as a desktop layout simply because it is wide.

## Foundations

### Accessibility

Implemented:

- Semantic HTML as the base of interactive controls
- 44px minimum interaction targets and enlarged activation areas for visually small controls
- Visible keyboard focus
- Reduced Motion
- Reduced Transparency
- Increased Contrast
- Forced-colors support
- Light and dark appearances
- Modal focus containment and focus restoration
- Keyboard navigation for tabs, menus, page controls, and selectable lists
- Useful content can opt into text selection
- Selection and error states do not depend on colour alone
- Browser zoom and text scaling remain supported
- Automated contrast regression checks for important semantic text and interactive colours

Contrast policy:

- Important text targets at least 4.5:1 in normal appearance.
- Small custom text should aim higher where practical.
- Non-text interactive boundaries and states target at least 3:1 where applicable.
- Decorative separators and disabled states may use lower contrast because they do not carry meaning alone.

Web limitation:

Safari doesn’t expose every native iOS accessibility preference to webpages. Native Dynamic Type behaviour cannot be reproduced perfectly in a generic webpage, so the framework uses Apple’s semantic text hierarchy and remains compatible with browser text scaling and zoom.

### Colour

Implemented:

- Current iOS light and dark system colour values
- Increased-contrast system colour variants
- Semantic primary, secondary, tertiary, and quaternary label hierarchy
- Semantic backgrounds, fills, and separators
- Separate accessible text-link colour where the standard system tint is not dark enough for small text on light backgrounds
- Brand or accent colour reserved for interactivity, selection, and status instead of flooding controls

Rule:

Do not hard-code grey text or backgrounds to match one screenshot. Use semantic tokens so hierarchy survives appearance and accessibility changes.

### Icons and symbols

Implemented:

- Lucide is the web icon system used by the framework and demo.
- Framework symbol names map to Lucide names so future apps use one consistent icon language.
- Icons inherit semantic colour and standard control sizing.
- A tiny built-in SVG set remains only as a failure fallback if Lucide cannot load.

Web limitation:

SF Symbols is Apple’s native preferred symbol library, but the browser does not provide it as a reliable cross-platform web icon API. Lucide is used as the requested web substitute while preserving familiar placement, sizing, and semantics.

### Layout

Implemented:

- Edge-to-edge app shell
- Safe-area insets
- Dynamic viewport units
- Independent scrolling surfaces
- Compact and regular size classes
- Readable-width long-form content
- Responsive card grids and collections
- Horizontal card and content scrollers
- Regular-width split views and inspector columns
- Compact split views that collapse to one pane at a time
- Data tables that scroll horizontally instead of shrinking text into illegibility
- Content that visually continues behind floating navigation controls

### Materials and Liquid Glass

Implemented:

- Glass is primarily reserved for navigation, menus, toolbars, floating top-level navigation, and modal chrome.
- Content uses semantic opaque or filled surfaces instead of glass everywhere.
- Backdrop blur and saturation provide a browser approximation.
- Reduced Transparency swaps glass for opaque semantic materials.

Limitation:

Apple’s Liquid Glass renderer has private optical and morphing behaviour. CSS can reproduce the hierarchy, shape relationships, blur, translucency, and motion relationship, but not the private renderer pixel for pixel.

### Typography

Implemented:

- Apple system font stack first
- Extra Large title styles
- Large Title
- Title 1, 2, and 3
- Headline
- Body
- Callout
- Subheadline
- Footnote
- Caption and Caption 2
- Apple semantic default metrics for the public type scale
- Readable-width prose
- Metadata, quotes, inline code, lead copy, truncation, and line clamping

Rule:

Use an existing semantic text style before inventing another font size.

## Patterns

### Feedback and loading

Implemented:

- Inline information, warning, success, and error messages
- Badges and status pills
- Determinate progress
- Indeterminate activity
- Skeleton loading states
- Content-unavailable and empty states
- Alerts for genuinely interruptive information

Persistent status belongs near the content it describes. Alerts are for information that genuinely requires interruption.

### Modality and transient actions

Implemented:

- Alerts
- Draggable sheets
- Popover surfaces
- Source-aware action sheets
- Outside-tap dismissal where appropriate
- One active modal layer at a time
- Escape dismissal
- Focus containment and restoration

Current action-sheet presentation records the source control and grows near it instead of treating every transient command set as an unrelated generic bottom popup.

### Motion

Implemented:

- Forward navigation enters from the trailing edge
- Back navigation reverses the relationship
- Edge swipe directly manipulates the current screen
- Compact split-view transitions push into detail and back to hierarchy
- Sheets move vertically and dismiss in the same direction
- Transient actions animate from their source relationship
- Reduced Motion removes nonessential animation

### Searching and filtering

Implemented:

- Search field and clear control
- Sticky search presentation pattern
- Scope/filter tokens
- Keyboard-compatible text input
- Component gallery demonstrates filter-like token selection

Apps should expose one obvious primary search location where possible and make the current search scope clear.

### Settings

Implemented:

- Grouped settings lists
- Switch rows
- Value rows
- Disclosure rows
- Command-Comma shortcut to the Settings top-level destination when present

Task-specific options belong with the task. Settings is for broader, infrequently changed preferences.

## Components

### Content

Implemented:

- Semantic labels and body copy
- Long-form text views
- Standard, elevated, outlined, tinted, plain, and interactive cards
- Media and horizontal cards
- Horizontal card scrollers with next-item peeking
- Responsive collection grids
- Horizontal collections
- Avatars and media rows
- Key/value groups
- Inline callouts
- Content-unavailable states
- Data tables

### Layout and organization

Implemented:

- Lists and grouped lists
- Selectable lists
- Disclosure groups
- Collections
- Split views
- Inspector panes
- Sections with headers and footers
- Adaptive top-level navigation
- Readable content guides

### Menus and actions

Implemented:

- Standard, prominent, tinted, plain, and destructive buttons
- Pull-down menus
- Touch-and-hold and secondary-click context menus
- Toolbars
- Swipe actions
- Source-aware action sheets
- Keyboard navigation inside menus

Rules:

- Keep menus short and logically grouped.
- Context-menu commands also need a visible route elsewhere.
- Destructive commands appear last.
- A toolbar acts on the current view. A tab bar navigates between major areas.

### Navigation and search

Implemented:

- Compact bottom tab bar
- Regular-width leading navigation
- Push navigation
- Large-to-compact title transition
- Back controls
- Edge swipe back
- Search field and filter tokens
- Preserved state for top-level destinations

### Selection and input

Implemented:

- Text fields
- Field labels, help, validation, and errors
- Multiline text views
- Native select/date/time wrappers
- Checkboxes
- Radio choices
- Switches
- Segmented controls
- Sliders
- Steppers
- Filter tokens
- Selectable list rows

### Status

Implemented:

- Badges
- Status pills
- Progress indicators
- Activity indicators
- Page controls with enlarged activation areas
- Inline messages
- Skeleton placeholders

## Inputs

### Touch and gestures

Implemented:

- Tap
- Native scrolling
- Horizontal scrollers
- Swipe actions
- Left-edge swipe back
- Sheet drag-to-dismiss
- Touch-and-hold context menus

No critical action depends on a hidden gesture alone.

### Keyboard

Implemented:

- Tab focus navigation
- Arrow-key top-level navigation
- Arrow-key menus
- Arrow-key selectable lists
- Arrow-key page controls
- Escape dismissal
- Command-Comma Settings shortcut

### Pointing devices

Implemented:

- Hover treatment only when the pointer supports hover
- Secondary-click context menus
- Pointer-compatible controls and scrolling
- Focus and selection consistent with touch behaviour

The framework doesn’t replace the system cursor or redefine browser-wide trackpad gestures.

## Desktop policy

A desktop browser does not receive fake macOS traffic lights or a fake title bar. The browser is already the system window.

Large browser viewports receive a regular-width Apple-style app layout:

- leading top-level navigation
- wider content canvas
- split views and inspectors
- popovers where appropriate
- pointer states
- keyboard operation
- simultaneous information without shrinking touch targets

## Native-only areas

Some HIG topics describe platform services instead of reusable web interface primitives. Individual apps should integrate real browser or native equivalents rather than drawing fake copies. Examples include:

- Apple Pay
- HealthKit
- HomeKit
- Siri and App Intents
- Live Activities
- widgets
- Wallet passes
- CarPlay
- Game Center
- native notifications
- Face ID and Touch ID
- camera and sensor experiences
- system file pickers
- system share sheets

## Review rule

When adding a framework component, identify the matching HIG component or pattern first. If Apple defines the interaction, follow it. If Apple doesn’t define one, keep it in the content layer and don’t make it look like system navigation chrome.
