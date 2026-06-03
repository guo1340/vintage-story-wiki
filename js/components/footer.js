(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  root.WikiComponents = root.WikiComponents || {};
  root.WikiComponents.renderFooter = function renderFooter() {
    return `<p class="footer-tagline">A survival archive for patient players.</p>
      <nav class="footer-links" aria-label="External resources">
        <a href="https://www.vintagestory.at/" target="_blank" rel="noopener noreferrer">Official Site</a>
        <a href="https://wiki.vintagestory.at/" target="_blank" rel="noopener noreferrer">Official Wiki</a>
        <a href="https://mods.vintagestory.at/" target="_blank" rel="noopener noreferrer">Mod DB</a>
        <a href="https://gamewikihub.com/">GameWikiHub</a>
        <a href="/updates">Updates</a>
      </nav>
      <nav class="footer-links" aria-label="Site information">
        <a href="/about">About</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/contact">Contact</a>
      </nav>
      <p>Unofficial fan wiki. Vintage Story is owned by Anego Studios. GameWikiHub &copy; 2026.</p>`;
  };
})();
