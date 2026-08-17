import { content } from "./content.js";
import { initNav } from "./nav.js";

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

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  hydrateContactLinks();
});
