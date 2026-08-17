const PAGE_TO_NAV_ID = {
  "/": "home",
  "/index.html": "home",
  "/biografie.html": "biografie",
  "/galerie.html": "galerie",
  "/kontakt.html": "kontakt",
};

export function getActiveNavId(pathname) {
  const normalized = pathname.split("?")[0].split("#")[0];
  const fileName = normalized.substring(normalized.lastIndexOf("/") + 1);
  const key = fileName === "" ? "/" : `/${fileName}`;
  return PAGE_TO_NAV_ID[key] ?? null;
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
