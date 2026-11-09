// Demo-only code: translates graphical controls into component options.
const controls = document.querySelector("#controls");
const status = document.querySelector("#action-status");
let clicks = 0;
let dropdownOpen = false;
function updatePreview() {
  const variant = document.querySelector("#variant").value;
  const toggle = ["filter", "favorite"].includes(variant);
  const actionOnly = toggle || variant === "dropdown";
  const elementControl = document.querySelector("#button-element");
  if (actionOnly) elementControl.value = "action";
  elementControl.disabled = actionOnly;
  const isLink = elementControl.value === "link";
  const disabledControl = document.querySelector("#disabled");
  disabledControl.disabled = isLink;
  if (isLink) disabledControl.checked = false;
  document.querySelector("#selected-control").hidden = !toggle;
  document.querySelector("#icon").disabled = ["favorite", "dropdown"].includes(variant);
  if (variant !== "dropdown") dropdownOpen = false;
  const options = {
    label: document.querySelector("#label").value.trim() || "Skoða fyrirtæki",
    variant,
    icon: document.querySelector("#icon").value || false,
    disabled: disabledControl.checked
  };
  if (toggle) options.selected = document.querySelector("#selected").checked;
  if (variant === "dropdown") options.expanded = dropdownOpen;
  if (isLink) options.href = "#composition";
  const button = createButton({ ...options, onClick: () => {
    if (isLink) return;
    if (toggle) {
      const selected = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(selected));
      document.querySelector("#selected").checked = selected;
      options.selected = selected;
      status.textContent = selected ? "Selected / saved." : "Selection removed.";
    } else if (variant === "dropdown") {
      dropdownOpen = !dropdownOpen;
      button.setAttribute("aria-expanded", String(dropdownOpen));
      document.querySelector("#dropdown-demo").hidden = !dropdownOpen;
      options.expanded = dropdownOpen;
      status.textContent = dropdownOpen ? "Filter panel opened." : "Filter panel closed.";
    } else {
      clicks += 1;
      status.textContent = `Button clicked ${clicks} ${clicks === 1 ? "time" : "times"}.`;
    }
    showUsage("usage", "createButton", options, "button");
  }});
  if (variant === "dropdown") button.setAttribute("aria-controls", "dropdown-demo");
  document.querySelector("#button-preview").replaceChildren(button);
  document.querySelector("#dropdown-demo").hidden = !dropdownOpen;
  document.querySelector("#preview").classList.toggle("preview--inverse", variant === "inverse");
  status.textContent = options.disabled ? "Disabled buttons cannot be activated." : isLink ? "This link moves to the example section." : "Try clicking the button.";
  showUsage("usage", "createButton", options, "button");
}
function showUsage(id, factory, options, variable) {
  document.getElementById(id).textContent = `const ${variable} = ${factory}(${JSON.stringify(options, null, 2)});\ndocument.querySelector("#example").append(${variable});`;
}
controls.addEventListener("input", updatePreview);
controls.addEventListener("submit", event => event.preventDefault());
updatePreview();

// A separate playground uses the same reusable Icon component as Button.
const iconSelect = document.querySelector("#icon-name");
for (const name of Object.keys(iconPaths)) {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  iconSelect.append(option);
}
function updateIconPreview() {
  const options = {
    name: iconSelect.value,
    size: Number(document.querySelector("#icon-size").value),
    color: document.querySelector("#icon-color").value,
    label: iconSelect.value.replaceAll("-", " ")
  };
  document.querySelector("#icon-preview").replaceChildren(createIcon(options));
  document.querySelector("#icon-usage").textContent = `const icon = createIcon(${JSON.stringify(options, null, 2)});\ndocument.querySelector("#example").append(icon);`;
}
document.querySelector("#icon-controls").addEventListener("input", updateIconPreview);
document.querySelector("#icon-controls").addEventListener("submit", event => event.preventDefault());
updateIconPreview();

// Image data belongs to the demo; createPicture works with any supplied source.
const pictureExamples = {
  shop: { src: "images/hero.jpg", alt: "Notaleg verslun með fötum, töskum og vörum til sýnis" },
  bakery: { src: "images/bakad.jpg", alt: "Bakarí með hillum fullum af nýbökuðu brauði" }
};
function updatePicturePreview() {
  const variant = document.querySelector("#picture-variant").value;
  const options = {
    src: pictureExamples[document.querySelector("#picture-source").value].src,
    alt: document.querySelector("#picture-alt").value,
    variant,
    ratio: document.querySelector("#picture-ratio").value
  };
  document.querySelector("#picture-caption-controls").hidden = variant !== "caption";
  document.querySelector("#picture-split-controls").hidden = variant !== "split";
  if (variant === "caption") options.caption = document.querySelector("#picture-caption").value;
  if (variant === "split") {
    options.heading = document.querySelector("#picture-heading").value;
    options.text = document.querySelector("#picture-text").value;
  }
  document.querySelector("#picture-preview").replaceChildren(createPicture(options));
  document.querySelector("#picture-usage").textContent = `const picture = createPicture(${JSON.stringify(options, null, 2)});\ndocument.querySelector("#example").append(picture);`;
}
document.querySelector("#picture-controls").addEventListener("input", event => {
  if (event.target.id === "picture-source") {
    document.querySelector("#picture-alt").value = pictureExamples[event.target.value].alt;
  }
  updatePicturePreview();
});
document.querySelector("#picture-controls").addEventListener("submit", event => event.preventDefault());
updatePicturePreview();

// The gallery is generated from the registry, so new icons appear automatically.
for (const name of Object.keys(iconPaths)) {
  const item = document.createElement("div");
  const label = document.createElement("span"); label.textContent = name;
  item.append(createIcon({ name, size: 24 }), label);
  document.querySelector("#icon-gallery").append(item);
}
function cardOptions() {
  const photo = pictureExamples[document.querySelector("#card-image").value];
  return {
    name: document.querySelector("#card-name").value.trim() || "Fyrirtæki",
    description: document.querySelector("#card-description").value,
    location: document.querySelector("#card-location").value,
    ...photo,
    variant: document.querySelector("#card-variant").value,
    favorite: document.querySelector("#card-favorite").checked,
    href: "https://tint-island.netlify.app/fyrirtaeki.html"
  };
}
function updateCardPreview() {
  const options = cardOptions();
  document.querySelector("#card-preview").replaceChildren(createBusinessCard({ ...options, onFavoriteChange: saved => {
    document.querySelector("#card-favorite").checked = saved;
    document.querySelector("#card-status").textContent = saved ? "Saved to demo favourites." : "Removed from demo favourites.";
    showUsage("card-usage", "createBusinessCard", cardOptions(), "card");
  }}));
  document.querySelector("#card-status").textContent = options.favorite ? "Saved to demo favourites." : "Click the heart to save this example.";
  showUsage("card-usage", "createBusinessCard", options, "card");
}
document.querySelector("#card-controls").addEventListener("input", updateCardPreview);
document.querySelector("#card-controls").addEventListener("submit", event => event.preventDefault());
updateCardPreview();

let fieldValue = "";
function updateFieldPreview() {
  const type = document.querySelector("#field-type").value;
  document.querySelector("#field-placeholder").disabled = type === "select";
  const options = {
    label: document.querySelector("#field-label").value.trim() || "Reitur",
    type, name: "example", value: fieldValue,
    placeholder: document.querySelector("#field-placeholder").value,
    hint: document.querySelector("#field-hint").value,
    error: document.querySelector("#field-error").value,
    required: document.querySelector("#field-required").checked,
    disabled: document.querySelector("#field-disabled").checked
  };
  document.querySelector("#field-preview").replaceChildren(createFormField({ ...options, onInput: value => {
    fieldValue = value; options.value = value;
    showUsage("field-usage", "createFormField", options, "field");
  }}));
  showUsage("field-usage", "createFormField", options, "field");
}
document.querySelector("#field-controls").addEventListener("input", event => {
  if (event.target.id === "field-type") fieldValue = "";
  updateFieldPreview();
});
document.querySelector("#field-controls").addEventListener("submit", event => event.preventDefault());
updateFieldPreview();

// A composed example uses the exact same factories, not copied markup.
document.querySelector("#example-business").append(createBusinessCard({
  name: "Bakað", description: "Brauð, kökur og handverk úr heimabyggð.", location: "Reykjavík", ...pictureExamples.bakery,
  href: "https://tint-island.netlify.app/fyrirtaeki-sida.html?id=bakad"
}));
function renderNewsletterField(error = "", value = "") {
  document.querySelector("#newsletter-field").replaceChildren(createFormField({ label: "Netfang", type: "email", name: "newsletter-email", placeholder: "nafn@example.is", required: true, value, error }));
}
renderNewsletterField();
document.querySelector("#newsletter-button").append(createButton({ label: "Skrá mig", icon: "arrow-right", type: "submit" }));
document.querySelector("#newsletter-demo").addEventListener("submit", event => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  const message = document.querySelector("#newsletter-status");
  if (!input.validity.valid) {
    renderNewsletterField("Vinsamlegast sláðu inn gilt netfang.", input.value);
    message.textContent = "Athugaðu netfangið.";
    event.currentTarget.querySelector("input").focus();
  } else {
    renderNewsletterField("", input.value);
    message.textContent = "Takk! Þetta er sýnidæmi; engin skráning var send.";
    event.currentTarget.querySelector("input").focus();
  }
});
