# Explaining the project

Use these notes as a guide, then explain the work in your own words.

## A short demonstration

1. **Start with the source.** Explain that the library is based on the TÍNT group project, a directory of Icelandic businesses. It keeps the original colours, typography and main visual patterns.
2. **Show Button.** Change appearance, label and icon. Show a disabled state. Select a favourite and click the heart. Explain that the same factory accepts different options.
3. **Show Icon.** Change its name, size and colour. Explain that Button also calls this component.
4. **Show Picture.** Switch among image-only, caption and split layouts. Change the photo and crop.
5. **Show BusinessCard.** Change the name and layout. Click its heart. Explain that the card combines smaller components, and that persistence is the page's responsibility.
6. **Show FormField.** Change type, required, disabled and error text. Explain why labels and errors must be connected to the correct input.
7. **Show the combined example.** Submit an empty email, then a valid test email. Nothing is sent; it demonstrates validation and reuse.
8. **Show tokens.css.** Point to --color-green. Explain that all components using that variable update together.

## Three pieces of code to understand

- `createIcon(options)` returns an SVG element. It has no knowledge of the playground.
- `createBusinessCard(options)` calls other component factories and uses a callback when the heart changes.
- `updatePicturePreview()` reads the controls, calls createPicture and updates the usage example. It is demo code, not part of the Picture component.

## Questions to practise

- Why use a link for navigation and a button for an action?
- How is a token different from a component option?
- Why should a card not fetch its own business data?
- How does changing Icon affect the other components?
- What makes this a component library rather than a page of copied examples?

## Final personal review

Add your own name and course details. Try the final controls, read the functions, and describe one change you would make yourself.
