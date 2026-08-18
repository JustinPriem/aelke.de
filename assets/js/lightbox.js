export function computeNextIndex(current, length) {
  if (length <= 0) return -1;
  return (current + 1) % length;
}

export function computePrevIndex(current, length) {
  if (length <= 0) return -1;
  return (current - 1 + length) % length;
}

export function mapKeyToAction(key) {
  switch (key) {
    case "ArrowRight":
      return "next";
    case "ArrowLeft":
      return "prev";
    case "Escape":
      return "close";
    default:
      return null;
  }
}

export class Lightbox {
  constructor({ items, rootEl, imgEl, captionEl, closeEl, nextEl, prevEl }) {
    this.items = items;
    this.rootEl = rootEl;
    this.imgEl = imgEl;
    this.captionEl = captionEl;
    this.currentIndex = -1;
    this.triggerEl = null;

    closeEl?.addEventListener("click", () => this.close());
    nextEl?.addEventListener("click", () =>
      this.show(computeNextIndex(this.currentIndex, this.items.length))
    );
    prevEl?.addEventListener("click", () =>
      this.show(computePrevIndex(this.currentIndex, this.items.length))
    );
    document.addEventListener("keydown", (event) => {
      if (this.currentIndex === -1) return;
      const action = mapKeyToAction(event.key);
      if (action === "close") this.close();
      if (action === "next") this.show(computeNextIndex(this.currentIndex, this.items.length));
      if (action === "prev") this.show(computePrevIndex(this.currentIndex, this.items.length));
    });
  }

  open(index, triggerEl) {
    this.triggerEl = triggerEl ?? null;
    this.show(index);
    this.rootEl.setAttribute("data-open", "true");
    this.rootEl.focus();
  }

  show(index) {
    const item = this.items[index];
    if (!item) return;
    this.currentIndex = index;

    if (item.src) {
      // Datei könnte fehlen (Konvention statt Build-Check) – bei Fehler auf Platzhalter zurückfallen.
      this.rootEl.classList.remove("lightbox--placeholder");
      this.imgEl.hidden = false;
      this.imgEl.onerror = () => {
        this.imgEl.hidden = true;
        this.rootEl.classList.add("lightbox--placeholder");
      };
      this.imgEl.alt = item.alt;
      this.imgEl.src = item.src;
    } else {
      this.imgEl.hidden = true;
      this.rootEl.classList.add("lightbox--placeholder");
    }

    this.captionEl.textContent = item.alt;
  }

  close() {
    this.rootEl.setAttribute("data-open", "false");
    this.currentIndex = -1;
    this.triggerEl?.focus();
  }
}
