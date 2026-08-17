export function shouldInjectEmbed(entry) {
  return Boolean(entry && entry.isIntersecting);
}

export function initSpotifyLazyLoad(container, embedUrl) {
  if (!container) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (shouldInjectEmbed(entry)) {
          const iframe = document.createElement("iframe");
          iframe.src = embedUrl;
          iframe.width = "100%";
          iframe.height = "352";
          iframe.frameBorder = "0";
          iframe.allow =
            "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
          iframe.loading = "lazy";
          iframe.title = "Spotify Player";
          container.replaceChildren(iframe);
          observer.disconnect();
        }
      }
    },
    { rootMargin: "200px" }
  );

  observer.observe(container);
}
