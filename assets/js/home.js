import { content } from "./content.js";
import { initSpotifyLazyLoad } from "./spotify-lazy.js";

function hydrateHero() {
  const claimEl = document.querySelector("[data-band-claim]");
  if (claimEl) claimEl.textContent = content.band.claim;
}

function hydrateMusicLink() {
  const streamAllEl = document.querySelector("[data-stream-all-link]");
  if (streamAllEl) streamAllEl.href = content.music.streamAllUrl;
}

document.addEventListener("DOMContentLoaded", () => {
  hydrateHero();
  hydrateMusicLink();

  const embedContainer = document.querySelector("[data-spotify-embed]");
  if (embedContainer) {
    initSpotifyLazyLoad(embedContainer, content.music.spotifyEmbedUrl);
  }
});
