(function () {
  const D = window.WikiData;
  const main = document.getElementById('main');
  const leftNav = document.getElementById('leftNav');
  const rightNav = document.getElementById('rightNav');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const menuToggle = document.getElementById('menuToggle');

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const category = (id) => D.categories.find((c) => c.id === id);
  const pagesIn = (id) => D.pages.filter((p) => p.category === id);
  const page = (cat, id) => D.pages.find((p) => p.category === cat && p.id === id);
  const route = () => (location.pathname.replace(/\/$/, '') || '/').replace('/index.html', '/');

  const icons = {
    compass: 'M50 12 61 39 88 50 61 61 50 88 39 61 12 50 39 39z',
    campfire: 'M50 13c12 22 25 28 20 49-3 17-15 26-20 26s-20-9-20-26c0-14 10-18 13-9 1-17 1-27 7-40z',
    tools: 'M24 75l28-28 8 8-28 28zm28-43 8-10 23 23-10 8z',
    wheat: 'M50 16v68M31 31c15 0 19 11 19 11S38 45 31 31zm38 0C54 31 50 42 50 42s12 3 19-11zM28 52c16-2 22 8 22 8s-13 5-22-8zm44 0c-16-2-22 8-22 8s13 5 22-8z',
    anvil: 'M18 60h40c12 0 16-13 25-13v-9H60l-8-12H25l8 12H18zM31 69h36v12H31z',
    map: 'M18 24l20-8 24 8 20-8v60l-20 8-24-8-20 8zM38 16v60M62 24v60',
    shield: 'M50 12l30 12v22c0 22-13 36-30 44-17-8-30-22-30-44V24z',
    home: 'M16 48l34-30 34 30h-9v34H25V48z',
    globe: 'M50 14a36 36 0 100 72 36 36 0 000-72zm-34 36h68M50 14c12 12 12 60 0 72M50 14c-12 12-12 60 0 72',
    book: 'M22 18h42c8 0 14 6 14 14v50H34c-7 0-12-5-12-12zm12 0v64',
    scroll: 'M30 18h36c8 0 12 5 12 12 0 6-4 10-10 10H34v42c-8 0-12-5-12-12V26c0-5 3-8 8-8z',
    gear: 'M50 21l6 9 11-1 4 10-8 8 3 11-9 6-9-6-10 6-9-6 3-11-8-8 4-10 11 1z'
  };
  const icon = (name) => `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${icons[name] || icons.book}" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></svg>`;

  function adSlot(kind) {
    const banner = kind === 'banner';
    return `<aside class="ad-slot ad-${esc(kind)}" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
      <ins class="adsbygoogle" style="display:block;${banner ? 'width:100%;height:90px;' : ''}" data-ad-client="ca-pub-1319817671788428" data-ad-slot="6141169453" ${banner ? '' : 'data-ad-format="auto"'} data-full-width-responsive="true"></ins>
    </aside>`;
  }

  function loadAds() {
    if (!window.adsbygoogle) return;
    document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])').forEach(() => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  function sourceNotes(entity) {
    const list = (entity && entity.sources || ['officialWiki', 'officialSite']).map((k) => D.sourceRegistry[k]).filter(Boolean);
    return `<aside class="source-notes">
      <div class="src-head">Sources &amp; Update Notes</div>
      <div class="src-meta"><span><strong>Last updated:</strong> ${esc(D.site.lastUpdated)}</span><span><strong>Build focus:</strong> ${esc(D.site.buildStatus)}</span></div>
      <ul>${list.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a> - ${esc(s.note)}</li>`).join('')}</ul>
      <p>Exact recipes, values and mod compatibility can shift between releases. Verify fragile numbers against your installed game version.</p>
    </aside>`;
  }

  function relatedBlock(p) {
    const rel = p.related || [];
    if (!rel.length) return '';
    return `<nav class="related" aria-label="Related pages"><h3>Related Pages</h3><div class="related-grid">${rel.map((r) => `<a href="${esc(r.href)}">${esc(r.label)}</a>`).join('')}</div></nav>`;
  }

  function sectionsHTML(sections) {
    return sections.map((s) => {
      const list = s.list ? `<ul>${s.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
      return `<section class="article-section"><h3>${esc(s.h)}</h3>${s.body || ''}${list}</section>`;
    }).join('');
  }

  function applySeo(r) {
    if (!window.WikiMeta || !document.head) return;
    const seo = window.WikiMeta.seoFor(r);
    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'keywords', seo.keywords.join(', '));
    setMeta('property', 'og:title', seo.ogTitle);
    setMeta('property', 'og:description', seo.ogDescription);
    setMeta('property', 'og:type', seo.ogType);
    setMeta('property', 'og:url', seo.canonical);
    setMeta('property', 'og:image', seo.ogImage);
    setMeta('name', 'twitter:title', seo.ogTitle);
    setMeta('name', 'twitter:description', seo.ogDescription);
    setMeta('name', 'twitter:image', seo.ogImage);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = seo.canonical;
    let ld = document.getElementById('vsw-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'vsw-jsonld';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(window.WikiMeta.jsonLdFor(r));
  }

  function setMeta(attr, key, value) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.content = value || '';
  }

  function renderLeftNav(active) {
    leftNav.innerHTML = `<h3>Field Sections</h3><ul>${D.categories.map((c) => `<li><a href="/${esc(c.id)}" data-r="/${esc(c.id)}">${esc(c.title)}</a></li>`).join('')}</ul><h3>Site Info</h3><ul><li><a href="/about" data-r="/about">About</a></li><li><a href="/privacy-policy" data-r="/privacy-policy">Privacy Policy</a></li><li><a href="/contact" data-r="/contact">Contact</a></li></ul>${adSlot('half-page')}`;
    leftNav.querySelectorAll('a').forEach((a) => {
      const r = a.getAttribute('data-r');
      if (active === r || (r !== '/' && active.startsWith(r + '/'))) a.classList.add('active');
    });
  }

  function renderRightNav(active) {
    const tip = D.tips[Math.floor(Math.random() * D.tips.length)];
    rightNav.innerHTML = `<h3>Essential Pages</h3><ul>
      <li><a href="/getting-started/first-day-guide">First Day Guide</a></li>
      <li><a href="/exploration/prospecting">Prospecting</a></li>
      <li><a href="/smithing/steel-production">Steel Production</a></li>
      <li><a href="/farming/food-preservation">Food Preservation</a></li>
      <li><a href="/guides/survive-winter">Survive Winter</a></li>
      <li><a href="/mods/best-mods">Best Mods</a></li>
    </ul><h3>Field Note</h3><p class="note">${esc(tip)}</p>${adSlot('rectangle')}`;
  }

  function renderHome() {
    const featured = ['first-day-guide', 'prospecting', 'steel-production', 'crop-farming', 'temporal-storms', 'best-mods']
      .map((id) => D.pages.find((p) => p.id === id)).filter(Boolean);
    main.innerHTML = `
      <section class="hero">
        <img src="/assets/images/hero/homepage-hero.svg" alt="Vintage Story wilderness survival handbook scene" />
        <div class="hero-content">
          <span class="hero-kicker">Handbook for the wilderness age</span>
          <h1>Vintage Story Wiki</h1>
          <p>A practical survival handbook for wilderness exploration, farming, metallurgy, crafting, combat, progression and advanced survival systems.</p>
          <div class="hero-buttons">
            <a class="btn" href="/getting-started/first-day-guide">Getting Started</a>
            <a class="btn" href="/survival">Survival Guide</a>
            <a class="btn" href="/crafting">Crafting</a>
            <a class="btn" href="/smithing">Smithing</a>
            <a class="btn" href="/exploration/prospecting">Prospecting</a>
          </div>
        </div>
      </section>
      ${adSlot('banner')}
      <h2 class="section-head">Core Archives</h2>
      <div class="cards cat-cards">${D.categories.map((c) => `<a class="card cat-card" href="/${esc(c.id)}"><span class="ico">${icon(c.icon)}</span><h4>${esc(c.title)}</h4><p>${esc(c.summary)}</p></a>`).join('')}</div>
      <div class="home-grid">
        <section class="page"><h2>Featured Articles</h2><div class="breadcrumb">High-value guides for new and returning players.</div><ul class="link-list">${featured.map((p) => `<li><a href="/${esc(p.category)}/${esc(p.id)}">${esc(p.title)}<span>${esc(p.summary)}</span></a></li>`).join('')}</ul></section>
        <section class="page"><h2>Progression Checklist</h2><div class="breadcrumb">The order that keeps a world stable.</div><ol><li>Make stone tools and a firepit.</li><li>Secure food, vessels and a warm shelter.</li><li>Start crops early enough for the season.</li><li>Prospect copper, then plan bronze alloys.</li><li>Build cellar storage before the harvest spoils.</li><li>Scale charcoal, iron and mechanical power deliberately.</li></ol></section>
      </div>
      ${adSlot('in-article')}
    `;
  }

  function renderCategory(id) {
    const c = category(id);
    if (!c) return render404(id);
    const pages = pagesIn(id);
    main.innerHTML = `${adSlot('banner')}<section class="page"><h1>${esc(c.title)}</h1><div class="breadcrumb">Home / ${esc(c.title)}</div><p class="lead">${esc(c.summary)}</p><div class="cards">${pages.map((p) => `<a class="card" href="/${esc(p.category)}/${esc(p.id)}"><h4>${esc(p.title)}</h4><p>${esc(p.summary)}</p></a>`).join('')}</div></section>${adSlot('in-article')}`;
  }

  function renderDetail(cat, id) {
    const c = category(cat);
    const p = page(cat, id);
    if (!c || !p) return render404(cat + '/' + id);
    main.innerHTML = `${adSlot('banner')}<article class="page article"><div class="breadcrumb"><a href="/${esc(c.id)}">${esc(c.title)}</a> / ${esc(p.title)}</div><h1>${esc(p.title)}</h1><p class="lead">${esc(p.summary)}</p><div class="info-grid"><div>${sectionsHTML(p.sections)}${relatedBlock(p)}${sourceNotes(p)}</div><aside class="infobox"><div class="infobox-head">Key Information</div><dl>${p.keyInfo.map((x, i) => `<dt>${i + 1}</dt><dd>${esc(x)}</dd>`).join('')}</dl></aside></div></article>${adSlot('in-article')}`;
  }

  function renderInfo(slug) {
    const p = D.infoPages[slug];
    if (!p) return render404(slug);
    main.innerHTML = `${adSlot('banner')}<section class="page legal-page"><h1>${esc(p.title)}</h1><div class="breadcrumb">Home / ${esc(p.title)}</div>${p.body}${sourceNotes(null)}</section>`;
  }

  function render404(slug) {
    main.innerHTML = `<section class="page"><h1>Page Not Found</h1><p>No field record found for <code>${esc(slug)}</code>.</p><p><a href="/">Return to the handbook</a></p></section>`;
  }

  function navigate() {
    const r = route();
    renderLeftNav(r);
    renderRightNav(r);
    const seg = r.split('/').filter(Boolean);
    if (r === '/') renderHome();
    else if (seg.length === 1 && category(seg[0])) renderCategory(seg[0]);
    else if (seg.length === 1 && D.infoPages[seg[0]]) renderInfo(seg[0]);
    else if (seg.length === 2) renderDetail(seg[0], seg[1]);
    else render404(r);
    applySeo(r);
    setTimeout(loadAds, 100);
  }

  function go(path) {
    const clean = path.replace(/\/$/, '') || '/';
    if (clean === route()) return;
    history.pushState({}, '', clean);
    leftNav.classList.remove('open');
    navigate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const searchIndex = [
    ...D.categories.map((c) => ({ title: c.title, sub: 'Section', href: '/' + c.id })),
    ...D.pages.map((p) => ({ title: p.title, sub: category(p.category).title, href: '/' + p.category + '/' + p.id })),
    ...Object.entries(D.infoPages).map(([k, p]) => ({ title: p.title, sub: 'Site Info', href: '/' + k }))
  ];

  function runSearch(q) {
    if (!q) {
      searchResults.classList.remove('open');
      return;
    }
    const low = q.toLowerCase();
    const matches = searchIndex.filter((x) => (x.title + ' ' + x.sub).toLowerCase().includes(low)).slice(0, 12);
    searchResults.innerHTML = matches.length ? matches.map((m) => `<a href="${esc(m.href)}">${esc(m.title)}<span>${esc(m.sub)}</span></a>`).join('') : '<div class="empty">No field notes match.</div>';
    searchResults.classList.add('open');
  }

  searchInput.addEventListener('input', () => runSearch(searchInput.value.trim()));
  searchInput.addEventListener('focus', () => runSearch(searchInput.value.trim()));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) {
      if (!e.target.closest('.search')) searchResults.classList.remove('open');
      return;
    }
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    const url = new URL(href, location.origin);
    if (url.origin !== location.origin) return;
    e.preventDefault();
    searchInput.value = '';
    searchResults.classList.remove('open');
    go(url.pathname);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape') searchResults.classList.remove('open');
  });
  window.addEventListener('popstate', navigate);
  if (menuToggle) menuToggle.onclick = () => leftNav.classList.toggle('open');
  navigate();
})();
