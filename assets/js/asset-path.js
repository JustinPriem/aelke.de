// Ermittelt die Site-Root robust über den Speicherort dieses Moduls
// (assets/js/asset-path.js), unabhängig davon, ob die aufrufende Seite im Root
// (index.html) oder in einem Unterordner (galerie/, biografie/, kontakt/) liegt.
// So funktionieren die in content.js hinterlegten Asset-Pfade (z. B.
// "assets/img/gallery/gallery-1.jpg") auf jeder Seite gleichermaßen.
const siteRoot = new URL("../../", import.meta.url);

export function assetUrl(relativePath) {
  return new URL(relativePath, siteRoot).href;
}
