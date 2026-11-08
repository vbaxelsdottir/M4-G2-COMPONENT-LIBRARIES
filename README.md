# TÍNT component library

Student: Valdís Birna Axelsdóttir
Course: Vefskólinn

A Vefskólinn component-library project based on the TÍNT group website. It contains five reusable components, shared design tokens, interactive controls, usage examples and a composed interface.

## Run

Open this folder in VS Code. Open `index.html` with Live Server or directly in a browser. No packages, build command or backend are required. Photos and scripts work locally. Google Fonts needs an internet connection; system fallback fonts remain available offline.

## Files

- `index.html`: documentation and playground controls.
- `styles/tokens.css`: shared colours, fonts, spacing and border radii.
- `styles/components.css`: reusable component styles.
- `styles/playground.css`: documentation-page layout.
- `scripts/components.js`: component functions; no dependency on the playground.
- `scripts/playground.js`: demo controls, example data and validation.
- `images/`: two photos copied from the original project.
- `PRESENTATION.md`: a short guide for explaining and demonstrating the project.

## Components

Each factory returns a DOM element. Append it to a container in your page. Include tokens.css and components.css, then load components.js before your own script. No React is needed.

```html
<div id="example"></div>
<script src="scripts/components.js"></script>
<script>
  const button = createButton({
    label: "Skoða fyrirtæki",
    variant: "primary",
    icon: "arrow-right",
    onClick: () => console.log("Button clicked")
  });
  document.querySelector("#example").append(button);
</script>
```

### Button

| Option | Default | Meaning |
|---|---|---|
| label | Skoða fyrirtæki | Required accessible name; hidden visually for favourite |
| variant | primary | primary, inverse, secondary, pill, filter, dropdown, favorite, text |
| icon | false | Icon name, false, or true for an arrow |
| disabled | false | Native disabled button |
| selected | false | aria-pressed for filters and favourites |
| expanded | false | aria-expanded for dropdown triggers |
| href | empty | Render a real link for navigation |
| type | button | Use submit inside forms |
| onClick | none | Caller-provided action |

Dropdowns and toggle controls must be buttons. Disabled navigation links are not supported. Dropdown content and selected-state updates belong to the caller; see playground.js. Favourite always uses a heart; dropdown always uses a chevron. These two variants ignore the icon option.

### Icon

Options: `name` (arrow-right), `size` (20), `color` (currentColor), `label` (empty). Names are in the `iconPaths` registry. There are 17 symbols: all 13 data-lucide names found in the original HTML/TypeScript, its Instagram/Facebook symbols, and check/x utility icons. Paths use the original outline style, implemented locally without a CDN dependency.

An icon is decorative unless given a label. A labelled button already provides an accessible name, so its icon stays decorative. Use a high-contrast colour when the symbol conveys information; pale blue is only a decorative colour on light backgrounds.

### Picture

Required: `src` and `alt`. Options: `variant` (image, caption, split), `ratio` (landscape, square, portrait), `caption`, `heading`, `text`. Ratios are 4:3, 1:1 and 3:4. Uses a figure with optional figcaption. Split layout wraps when its container becomes narrow. Empty alt text is allowed for deliberately decorative images.

### BusinessCard

Required: `name`, `src`, `alt`. Options: `description`, `location`, `href`, `favorite`, `variant` (standard or compact), `onFavoriteChange(saved)`.

The card combines Picture, Button and Icon. It updates its heart state and tells the caller about changes. It does not fetch business data or save to localStorage. Separate instances have separate state. The caller can persist favourites if the library is later integrated into the full website.

### FormField

Options: `label`, `type` (text, email, textarea, select), `name`, `placeholder`, `value`, `required`, `disabled`, `hint`, `error`, `options`, `onInput(value)`. `options` is an array of `{ value, label }` objects for a select.

Each instance gets a unique ID. Labels use for/id; help and errors use aria-describedby; errors set aria-invalid. The component displays errors supplied by the form. It does not decide business validation rules. The newsletter example uses the browser's native required/email validity and displays an error or demo confirmation.

## Design decisions

The original TÍNT code uses HTML, CSS and TypeScript. This library uses plain JavaScript to keep the demonstration directly runnable without a build step. It retains the forest green, sky blue, cream and ink palette, Freeman headings, Amarna body font and outlined icons.

| Original pattern | Library equivalent |
|---|---|
| .btn | primary |
| .btn-white | inverse |
| .btn-secondary | secondary |
| .pill footer links | pill with href |
| .pill-filter | filter with selected state |
| .explore-dd-btn | dropdown with expanded state |
| .fav-heart / .biz-heart | favorite |
| .link-small / navigation and website actions | text with optional href and icon |

Shared visual patterns are consolidated rather than retaining every page-specific CSS class. Buttons have a 44px minimum target; favourite controls are slightly larger than the original. Caption pictures and compact cards extend the original design. Disabled/error states are documented explicitly. Site-specific search autocomplete, reviews, uploads and complete menus are outside this five-component library.

## What the assignment concepts mean here

- **Style guide:** visual rules such as colours and type. **Component library:** code implementing reusable UI. **Design system:** those foundations plus usage rules, documentation and shared working practices.
- **Abstraction:** createButton receives clear options; callers do not need to know its SVG/HTML implementation.
- **Modularity:** tokens, component styles, components and demonstration code have separate responsibilities.
- **Composition:** BusinessCard uses Picture and Button; Button uses Icon.
- **Dependencies:** tokens → component styling; Icon → Button → BusinessCard; Picture → BusinessCard. FormField is independent. Playground code depends on components, never the reverse.
- **Coupling:** no component reads the demo controls or fetches the site's JSON. Data and callbacks are supplied from outside.
- **Consistency:** changing a token updates every component using it. Variant names restrict appearances to documented choices.
- **Collaboration:** examples and option descriptions let another developer use a component without reading all its implementation.

## Checks performed

JavaScript syntax checks passed. Browser checks covered all eight button appearances; selected/disabled states; dropdown open/close; native links; picture layouts and local photos; card favourite state; safely displayed text; all four field types; error semantics; and newsletter empty/valid submission. Mobile checks at 390px showed no page-level horizontal overflow. The browser reported no JavaScript errors during these checks. These checks are not a complete accessibility audit.

## Before submitting

1. Open the project and try each playground yourself.
2. Read PRESENTATION.md and be ready to explain the component options and composition.
3. Add your name and any course-required submission details.
4. Upload this folder to your own GitHub repository. Keep index.html at the repository root.
5. Publish with your course's chosen host (the existing group project uses Netlify), and submit the repository and live link.

No hosting account or remote repository was changed by this work. The newsletter does not send data. Favourites reset on reload.

## Sources

Based on the group's TÍNT project: https://github.com/Hopverkefni2/verkefni2 and https://tint-island.netlify.app/ . The original README credits Unsplash for the photos; original individual photo links were not available here. Brand/design work belongs to the original group. Preserve the group's attribution.

The assignment references Hanna, island.is, Material UI and Carbon as documentation/playground inspiration. This project implements its own small functions rather than importing those component libraries.

# M4-G2-COMPONENT-LIBRARIES
