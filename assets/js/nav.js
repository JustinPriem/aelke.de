// Erkennt sowohl klassische Dateipfade (/galerie.html) als auch die sprechenden
// Verzeichnis-URLs ohne .html (/galerie bzw. /galerie/), die galerie/index.html usw. liefern.
const PAGE_TO_NAV_ID = {
  index: "home",
  biografie: "biografie",
  galerie: "galerie",
  kontakt: "kontakt",
};

export function getActiveNavId(pathname) {
  const normalized = pathname.split("?")[0].split("#")[0];
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "home";
  const last = segments[segments.length - 1].replace(/\.html$/, "");
  return PAGE_TO_NAV_ID[last] ?? null;
}

export function initNav() {
  if (typeof document === "undefined") return;

  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.getAttribute("data-open") === "true";
      menu.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  const activeId = getActiveNavId(window.location.pathname);
  if (!activeId) return;

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (link.getAttribute("data-nav-link") === activeId) {
      link.setAttribute("aria-current", "page");
    }
  });
}
