import { content } from "./content.js";
import { buildGridHTML } from "./gallery-render.js";
import { Lightbox } from "./lightbox.js";

document.addEventListener("DOMContentLoaded", () => {
  const gridEl = document.querySelector("[data-full-gallery-grid]");
  if (!gridEl) return;

  gridEl.innerHTML = buildGridHTML(content.gallery, () => ({ label: "Foto folgt" }));

  const lightbox = new Lightbox({
    items: content.gallery,
    rootEl: document.querySelector("[data-lightbox]"),
    imgEl: document.querySelector("[data-lightbox-image]"),
    captionEl: document.querySelector("[data-lightbox-caption]"),
    closeEl: document.querySelector("[data-lightbox-close]"),
    nextEl: document.querySelector("[data-lightbox-next]"),
    prevEl: document.querySelector("[data-lightbox-prev]"),
  });

  gridEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-id]");
    if (!button) return;
    const index = content.gallery.findIndex((item) => item.id === button.dataset.galleryId);
    if (index !== -1) lightbox.open(index);
  });
});
