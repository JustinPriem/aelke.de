import { escapeHtml } from "./escape-html.js";
import { assetUrl } from "./asset-path.js";

export function buildPlaceholderTileHTML(item, { linkUrl, label } = {}) {
  const tileLabel = escapeHtml(label ?? "Foto folgt");
  const altText = item.alt ?? label ?? "Foto folgt";
  const alt = escapeHtml(`${label ?? "Foto folgt"}: ${altText}`);
  // Konvention: Fotos liegen unter assets/img/gallery/<id>.jpg (siehe assets/img/gallery/README.md).
  // Fehlt die Datei, entfernt sich das <img> selbst und der Platzhalter bleibt sichtbar.
  const photoSrc = assetUrl(`assets/img/gallery/${item.id}.jpg`);
  const photo = `<img class="tile-placeholder__photo" src="${escapeHtml(
    photoSrc
  )}" alt="${alt}" loading="lazy" onerror="this.remove()" />`;
  const inner = `${photo}<span class="tile-placeholder__grain" aria-hidden="true"></span><span class="tile-placeholder__label">${tileLabel}</span>`;

  if (linkUrl) {
    return `<a class="tile-placeholder" href="${escapeHtml(
      linkUrl
    )}" target="_blank" rel="noopener" aria-label="${alt}">${inner}</a>`;
  }

  return `<button type="button" class="tile-placeholder" data-gallery-id="${escapeHtml(
    item.id
  )}" aria-label="${alt}">${inner}</button>`;
}

export function buildGridHTML(items, getOptions = () => ({})) {
  return items.map((item) => buildPlaceholderTileHTML(item, getOptions(item))).join("");
}
