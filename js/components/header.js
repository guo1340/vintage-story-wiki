(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  root.WikiComponents = root.WikiComponents || {};
  root.WikiComponents.renderHeader = function renderHeader() {
    return `<a class="logo" href="/">
        <span class="logo-mark">VS</span>
        <span class="logo-text">VINTAGE STORY<small>unofficial survival handbook</small></span>
      </a>
      <div class="search">
        <input type="text" id="searchInput" placeholder="Search smithing, crops, ores, storms..." autocomplete="off" aria-label="Search the wiki" />
        <div class="search-results" id="searchResults"></div>
      </div>
      <nav class="top" aria-label="Primary">
        ${[
          ['Getting Started', '/getting-started'],
          ['Survival', '/survival'],
          ['Crafting', '/crafting'],
          ['Farming', '/farming'],
          ['Smithing', '/smithing'],
          ['Exploration', '/exploration'],
          ['Mods', '/mods']
        ].map(([label, href]) => `<a href="${esc(href)}">${esc(label)}</a>`).join('')}
        <a class="network-link" href="https://gamewikihub.com/">GameWikiHub</a>
      </nav>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">Menu</button>`;
  };
})();
