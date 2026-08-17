import { content } from "./content.js";
import { initNav } from "./nav.js";
import { escapeHtml } from "./escape-html.js";

function safeCall(fn) {
  try {
    fn();
  } catch (error) {
    console.error(`Hydration failed: ${fn.name}`, error);
  }
}

function hydrateContactLinks() {
  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    el.href = `mailto:${content.contact.email}`;
    el.textContent = content.contact.email;
  });

  document.querySelectorAll("[data-social-instagram]").forEach((el) => {
    el.href = content.social.instagram;
  });

  document.querySelectorAll("[data-social-spotify]").forEach((el) => {
    el.href = content.social.spotify;
  });
}

function hydrateBioPage() {
  const fullEl = document.querySelector("[data-bio-full]");
  if (fullEl) fullEl.textContent = content.bio.full;

  const listEl = document.querySelector("[data-member-list]");
  if (listEl) {
    listEl.innerHTML = content.bio.members
      .map(
        (member) => `
        <li class="member-card">
          <p class="member-card__role">${escapeHtml(member.role)}</p>
          <p class="member-card__name">${escapeHtml(member.name)}</p>
          <p>${escapeHtml(member.text)}</p>
        </li>`
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  safeCall(initNav);
  safeCall(hydrateContactLinks);
  safeCall(hydrateBioPage);
});
