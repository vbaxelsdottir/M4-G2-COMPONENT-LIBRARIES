// Shared SVG definitions. Add a new named path here to make it reusable everywhere.
const iconPaths = {
  "arrow-right": "M5 12h14m-6-6 6 6-6 6",
  "search": "M21 21l-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  "heart": "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  "mail": "M3 4h18v16H3ZM3 5l9 7 9-7",
  "map-pin": "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  "star": "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z",
  "chevron-down": "m6 9 6 6 6-6",
  "external-link": "M15 3h6v6M10 14 21 3M10 3H3v18h18v-7",
  "clock": "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 6v6l4 2",
  "check": "m5 12 4 4L19 6",
  "phone": "M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.7L8.8 10.4a16 16 0 0 0 4.8 4.8l1.2-1.2a2 2 0 0 1 1.7-.6l2.8.5a2 2 0 0 1 1.7 2Z",
  "shopping-bag": "M4 7h16l1 14H3ZM8 7V6a4 4 0 0 1 8 0v1",
  "sliders-horizontal": "M3 6h4m4 0h10M3 18h10m4 0h4M7 3v6m4-3H7m6 9v6m4-3h-4M3 12h18",
  "upload": "M12 16V3m-5 5 5-5 5 5M3 16v5h18v-5",
  "instagram": "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0M17.5 6.5h.01",
  "facebook": "M3 3h18v18H3ZM16 8h-2a2 2 0 0 0-2 2v11M9 13h6",
  "x": "m6 6 12 12M6 18 18 6"
};

// Icons are decorative by default. Give a standalone meaningful icon a label.
function createIcon({ name = "arrow-right", size = 20, color = "currentColor", label = "" } = {}) {
  if (!Object.hasOwn(iconPaths, name)) throw new Error(`Unknown icon: ${name}`);
  if (!Number.isFinite(size) || size <= 0) throw new Error("Icon size must be positive");
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  const attributes = { viewBox: "0 0 24 24", width: size, height: size, fill: "none", stroke: "currentColor", "stroke-width": 1.5, "stroke-linecap": "round", "stroke-linejoin": "round", focusable: "false", class: "tint-icon" };
  for (const [key, value] of Object.entries(attributes)) svg.setAttribute(key, value);
  svg.style.color = color;
  if (label) {
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", label);
  } else {
    svg.setAttribute("aria-hidden", "true");
  }
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", iconPaths[name]);
  svg.append(path);
  return svg;
}

// The component receives options and returns an element.
// It knows nothing about the playground controls or business data.
function createButton({ label = "Skoða fyrirtæki", variant = "primary", icon = false, disabled = false, selected = false, expanded = false, href = "", type = "button", onClick } = {}) {
  const variants = ["primary", "inverse", "secondary", "pill", "filter", "dropdown", "favorite", "text"];
  if (!variants.includes(variant)) throw new Error("Unknown button variant");
  if (typeof label !== "string" || !label.trim()) throw new Error("A button needs a text label");
  if (href && ["filter", "favorite", "dropdown"].includes(variant)) throw new Error("Toggle controls must be buttons");
  if (href && disabled) throw new Error("Links do not support disabled; use a button for an unavailable action");
  const button = document.createElement(href ? "a" : "button");
  if (href) button.href = safeLink(href);
  else { button.type = type; button.disabled = disabled; }
  button.className = `tint-button tint-button--${variant}`;
  if (["filter", "favorite"].includes(variant)) button.setAttribute("aria-pressed", String(selected));
  if (variant === "dropdown") button.setAttribute("aria-expanded", String(expanded));
  if (variant === "favorite") {
    button.setAttribute("aria-label", label);
    button.append(createIcon({ name: "heart" }));
  } else {
    const text = document.createElement("span");
    text.textContent = label;
    button.append(text);
    if (variant === "dropdown") icon = "chevron-down";
    if (icon) button.append(createIcon({ name: icon === true ? "arrow-right" : icon }));
  }
  if (onClick) button.addEventListener("click", onClick);
  return button;
}

// Allow normal web links and relative paths, never executable URL schemes.
function safeLink(href) {
  const url = new URL(href, "https://tint.example/");
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Use an HTTP(S) or relative link");
  return href;
}

// Picture owns only its image and optional text, not the surrounding page.
function createPicture({ src, alt, variant = "image", caption = "", heading = "", text = "", ratio = "landscape" } = {}) {
  if (typeof src !== "string" || !src.trim()) throw new Error("Picture needs an image source");
  if (typeof alt !== "string") throw new Error("Provide alt text (an empty string is allowed for decorative images)");
  if (!["image", "caption", "split"].includes(variant)) throw new Error("Unknown picture variant");
  if (!["landscape", "square", "portrait"].includes(ratio)) throw new Error("Unknown picture ratio");
  const figure = document.createElement("figure");
  figure.className = `tint-picture tint-picture--${variant} tint-picture--${ratio}`;
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  figure.append(image);
  if (variant === "caption" && caption) {
    const description = document.createElement("figcaption");
    description.textContent = caption;
    figure.append(description);
  }
  if (variant === "split" && (heading || text)) {
    const description = document.createElement("figcaption");
    if (heading) {
      const title = document.createElement("p");
      title.className = "tint-picture__heading";
      title.textContent = heading;
      description.append(title);
    }
    if (text) {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      description.append(paragraph);
    }
    figure.append(description);
  }
  return figure;
}

// A card composes Picture, Button and Icon. The caller owns saved favourites.
function createBusinessCard({ name, description = "", location = "Reykjavík", src, alt, href = "#composition", favorite = false, variant = "standard", onFavoriteChange } = {}) {
  if (!name || !name.trim()) throw new Error("A business card needs a name");
  if (!["standard", "compact"].includes(variant)) throw new Error("Unknown card variant");
  const card = document.createElement("article");
  card.className = `tint-card tint-card--${variant}`;
  const media = document.createElement("div");
  media.className = "tint-card__media";
  const imageLink = document.createElement("a");
  imageLink.href = safeLink(href);
  imageLink.setAttribute("aria-label", `Skoða ${name}`);
  imageLink.append(createPicture({ src, alt }));
  const favoriteButton = createButton({ label: `Vista ${name} í uppáhald`, variant: "favorite", selected: favorite, onClick: () => {
    favorite = !favorite;
    favoriteButton.setAttribute("aria-pressed", String(favorite));
    if (onFavoriteChange) onFavoriteChange(favorite);
  }});
  media.append(imageLink, favoriteButton);
  const body = document.createElement("div");
  body.className = "tint-card__body";
  const title = document.createElement("h3");
  const titleLink = document.createElement("a");
  titleLink.href = safeLink(href);
  titleLink.textContent = name;
  title.append(titleLink);
  const place = document.createElement("p");
  place.className = "tint-card__location";
  place.append(createIcon({ name: "map-pin", size: 16 }), document.createTextNode(location));
  const copy = document.createElement("p");
  copy.textContent = description;
  body.append(title, place, copy);
  card.append(media, body);
  return card;
}

let fieldCount = 0;
// Each instance has its own ID, so labels and errors cannot point to another field.
function createFormField({ label = "Netfang", type = "email", name = "email", placeholder = "", value = "", required = false, disabled = false, hint = "", error = "", options = [{ value: "", label: "Veldu efni" }, { value: "general", label: "Almenn fyrirspurn" }, { value: "application", label: "Spurning um umsókn" }], onInput } = {}) {
  if (!["text", "email", "textarea", "select"].includes(type)) throw new Error("Unknown field type");
  if (!label.trim()) throw new Error("A field needs a label");
  const id = `tint-field-${++fieldCount}`;
  const wrapper = document.createElement("div");
  wrapper.className = "tint-field";
  const labelElement = document.createElement("label");
  labelElement.htmlFor = id;
  labelElement.textContent = label + (required ? " *" : "");
  const input = document.createElement(type === "textarea" || type === "select" ? type : "input");
  if (type === "text" || type === "email") input.type = type;
  if (type === "textarea") input.rows = 4;
  if (type === "select") {
    for (const { value: optionValue, label: text } of options) {
      const option = document.createElement("option");
      option.value = optionValue; option.textContent = text; input.append(option);
    }
  } else input.placeholder = placeholder;
  input.id = id; input.name = name; input.value = value;
  input.required = required; input.disabled = disabled;
  wrapper.append(labelElement, input);
  const descriptions = [];
  if (hint) {
    const help = document.createElement("p");
    help.className = "tint-field__hint"; help.id = `${id}-hint`; help.textContent = hint;
    descriptions.push(help.id); wrapper.append(help);
  }
  if (error) {
    input.setAttribute("aria-invalid", "true");
    const message = document.createElement("p");
    message.className = "tint-field__error"; message.id = `${id}-error`; message.textContent = error;
    descriptions.push(message.id); wrapper.append(message);
  }
  if (descriptions.length) input.setAttribute("aria-describedby", descriptions.join(" "));
  if (onInput) input.addEventListener("input", event => onInput(event.target.value));
  return wrapper;
}
