import { content } from "./content.js";
import { initSpotifyLazyLoad } from "./spotify-lazy.js";
import { buildGridHTML } from "./gallery-render.js";

function hydrateHero() {
  const claimEl = document.querySelector("[data-band-claim]");
  if (claimEl) claimEl.textContent = content.band.claim;
}

function hydrateMusicLink() {
  const streamAllEl = document.querySelector("[data-stream-all-link]");
  if (streamAllEl) streamAllEl.href = content.music.streamAllUrl;
}

function hydrateInstagram() {
  const handleEl = document.querySelector("[data-instagram-handle]");
  if (handleEl) handleEl.textContent = content.instagram.handle;

  const profileLinkEl = document.querySelector("[data-instagram-profile-link]");
  if (profileLinkEl) profileLinkEl.href = content.instagram.profileUrl;

  const gridEl = document.querySelector("[data-instagram-grid]");
  if (gridEl) {
    gridEl.innerHTML = buildGridHTML(content.instagram.posts, (post) => ({
      linkUrl: post.postUrl,
      label: "Instagram",
    }));
  }
}

function hydrateGalleryTeaser() {
  const gridEl = document.querySelector("[data-gallery-teaser-grid]");
  if (!gridEl) return;
  const teaserItems = content.gallery.slice(0, 3);
  gridEl.innerHTML = buildGridHTML(teaserItems, () => ({ label: "Foto folgt" }));
}

document.addEventListener("DOMContentLoaded", () => {
  hydrateHero();
  hydrateMusicLink();
  hydrateInstagram();
  hydrateGalleryTeaser();

  const embedContainer = document.querySelector("[data-spotify-embed]");
  if (embedContainer) {
    initSpotifyLazyLoad(embedContainer, content.music.spotifyEmbedUrl);
  }
});
