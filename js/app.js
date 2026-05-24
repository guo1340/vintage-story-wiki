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
  const ageLabels = ['Stone', 'Copper', 'Bronze', 'Iron', 'Steel'];

  function adSlot(kind) {
    const banner = kind === 'banner';
    return `<div class="ad-slot ad-${esc(kind)}" role="complementary" aria-label="Advertisement"><span class="ad-label">Notice Board</span><ins class="adsbygoogle" style="display:block;${banner ? 'width:100%;height:90px;' : ''}" data-ad-client="ca-pub-1319817671788428" data-ad-slot="6141169453" ${banner ? '' : 'data-ad-format="auto"'} data-full-width-responsive="true"></ins></div>`;
  }
  function loadAds() {
    if (!window.adsbygoogle) return;
    document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])').forEach(() => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
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
  function sourceNotes(entity) {
    const list = (entity && entity.sources || ['officialWiki', 'officialSite']).map((k) => D.sourceRegistry[k]).filter(Boolean);
    return `<aside class="source-notes"><b>Field sources</b><div class="src-meta"><span>Updated ${esc(D.site.lastUpdated)}</span><span>${esc(D.site.buildStatus)}</span></div><ul>${list.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a> - ${esc(s.note)}</li>`).join('')}</ul></aside>`;
  }
  function sectionsHTML(sections) {
    return sections.map((s, i) => `<section class="ledger-section"><h3><span>${ageLabels[i % ageLabels.length]}</span>${esc(s.h)}</h3>${s.body || ''}${s.list ? `<div class="craft-grid">${s.list.map((x, n) => `<div><i>${String(n + 1).padStart(2, '0')}</i>${esc(x)}</div>`).join('')}</div>` : ''}</section>`).join('');
  }
  function relatedBlock(p) {
    return `<div class="related-tokens">${relatedPages(p).map((r) => `<a href="${esc(r.href)}">${esc(r.label)}</a>`).join('')}</div>`;
  }
  function relatedPages(p, count = 5) {
    const sameCategory = D.pages
      .filter((candidate) => candidate.category === p.category && candidate.id !== p.id)
      .slice(0, count)
      .map((candidate) => ({ label: candidate.title, href: `/${candidate.category}/${candidate.id}` }));
    const explicit = (p.related || [])
      .filter((r) => r && r.href && r.href !== `/${p.category}`)
      .map((r) => ({ label: r.label, href: r.href }));
    const seen = new Set();
    return [...explicit, ...sameCategory].filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    }).slice(0, count);
  }
  function renderLeftNav(active) {
    leftNav.innerHTML = `<div class="journal-title">Field Journal</div>${D.categories.map((c, i) => `<a class="journal-row" href="/${esc(c.id)}" data-r="/${esc(c.id)}"><span>${ageLabels[i % ageLabels.length]}</span><b>${esc(c.title)}</b></a>`).join('')}<div class="journal-title small">Camp Records</div><a class="journal-row" href="/about" data-r="/about"><b>About</b></a><a class="journal-row" href="/privacy-policy" data-r="/privacy-policy"><b>Privacy Policy</b></a><a class="journal-row" href="/contact" data-r="/contact"><b>Contact</b></a>`;
    leftNav.querySelectorAll('a').forEach((a) => {
      const r = a.getAttribute('data-r');
      if (r && (active === r || active.startsWith(r + '/'))) a.classList.add('active');
    });
  }
  function renderRightNav() {
    const tip = D.tips[Math.floor(Math.random() * D.tips.length)];
    rightNav.innerHTML = `<div class="journal-title">Survival Almanac</div><a class="field-link" href="/getting-started/first-day-guide"><b>First Day Guide</b></a><a class="field-link" href="/exploration/prospecting"><b>Prospecting</b></a><a class="field-link" href="/smithing/steel-production"><b>Steel Production</b></a><a class="field-link" href="/farming/food-preservation"><b>Food Preservation</b></a><a class="field-link" href="/guides/survive-winter"><b>Survive Winter</b></a><a class="field-link" href="/mods/best-mods"><b>Best Mods</b></a><div class="season-card"><span>Season Note</span><p>${esc(tip)}</p></div>`;
  }
  function progressStrip() {
    return `<div class="age-strip">${ageLabels.map((a, i) => `<div><span>${esc(a)}</span><b>${['flint', 'ore', 'alloy', 'bloom', 'cementation'][i]}</b></div>`).join('')}</div>`;
  }
  function renderHome() {
    const featured = ['first-day-guide', 'prospecting', 'steel-production', 'crop-farming', 'temporal-storms', 'best-mods'].map((id) => D.pages.find((p) => p.id === id)).filter(Boolean);
    main.innerHTML = `<section class="workbench-hero"><img src="/assets/images/hero/homepage-hero.svg" alt="Vintage Story voxel wilderness workbench scene" /><div class="hero-shade"><div class="climate-readout"><span>Temp: falling</span><span>Stability: unstable</span><span>Season: early autumn</span></div><div class="hero-copy"><span class="kicker">Uncompromising wilderness field manual</span><h1>Vintage Story Wiki</h1><p>A practical archive for stone-to-steel progression, tactile crafting, seasons, temporal storms, farming, metallurgy and survival in a ruined world reclaimed by nature.</p><div class="hero-actions"><a href="/getting-started/first-day-guide">First Day</a><a href="/crafting/knapping">Knapping</a><a href="/farming/crop-farming">Farming</a><a href="/smithing/steel-production">Steel</a><a href="/survival/temporal-stability">Temporal Stability</a></div></div></div></section>${progressStrip()}${adSlot('banner')}<section class="manual-layout"><div class="manual-grid">${D.categories.map((c, i) => `<a class="manual-card" href="/${esc(c.id)}"><span class="stamp">${ageLabels[i % ageLabels.length]}</span><h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p><small>${['handbook', 'workbench', 'survey', 'archive'][i % 4]}</small></a>`).join('')}</div><aside class="workbench-panel"><div class="journal-title">Pinned Field Notes</div>${featured.map((p) => `<a class="field-link" href="/${esc(p.category)}/${esc(p.id)}"><b>${esc(p.title)}</b><span>${esc(p.summary)}</span></a>`).join('')}</aside></section>${adSlot('in-article')}`;
  }
  function renderCategory(id) {
    const c = category(id);
    if (!c) return render404(id);
    main.innerHTML = `${adSlot('banner')}<section class="category-ledger"><span class="kicker">Field section</span><h1>${esc(c.title)}</h1><p>${esc(c.summary)}</p></section><section class="manual-grid wide">${pagesIn(id).map((p, i) => `<a class="manual-card" href="/${esc(p.category)}/${esc(p.id)}"><span class="stamp">${esc(c.title.slice(0, 3).toUpperCase())}-${String(i + 1).padStart(2, '0')}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><small>${esc(p.keyInfo.slice(0, 2).join(' / '))}</small></a>`).join('')}</section>${adSlot('in-article')}`;
  }
  function renderDetail(cat, id) {
    const c = category(cat);
    const p = page(cat, id);
    if (!c || !p) return render404(cat + '/' + id);
    main.innerHTML = `${adSlot('banner')}<article class="ledger-page"><header class="ledger-head"><div><div class="breadcrumb"><a href="/${esc(c.id)}">${esc(c.title)}</a> / ${esc(p.title)}</div><h1>${esc(p.title)}</h1><p>${esc(p.summary)}</p></div></header><div class="ledger-layout"><div>${sectionsHTML(p.sections)}${relatedBlock(p)}${sourceNotes(p)}</div><aside class="article-rail"><div class="toolrack"><b>Key Information</b>${p.keyInfo.map((x) => `<span>${esc(x)}</span>`).join('')}</div><div class="inspection-card"><b>Workbench Tags</b><a href="/${esc(c.id)}">${esc(c.title)}</a>${relatedPages(p, 5).map((x) => `<a href="${esc(x.href)}">${esc(x.label)}</a>`).join('')}</div></aside></div></article>${adSlot('in-article')}`;
  }
  function renderInfo(slug) {
    const p = D.infoPages[slug];
    if (!p) return render404(slug);
    main.innerHTML = `${adSlot('banner')}<article class="ledger-page"><header class="ledger-head"><div><div class="breadcrumb">Camp Records / ${esc(p.title)}</div><h1>${esc(p.title)}</h1></div></header><div class="ledger-layout"><section class="ledger-section">${p.body}</section><aside class="inspection-card"><b>Camp Records</b><a href="/about">About</a><a href="/privacy-policy">Privacy Policy</a><a href="/contact">Contact</a></aside></div>${sourceNotes(null)}</article>`;
  }
  function render404(slug) {
    main.innerHTML = `<section class="ledger-page"><header class="ledger-head"><div><h1>Field Note Missing</h1><p>No field record found for <code>${esc(slug)}</code>.</p><p><a href="/">Return to camp</a></p></div></header></section>`;
  }
  function navigate() {
    const r = route();
    renderLeftNav(r);
    renderRightNav();
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
  const searchIndex = [...D.categories.map((c) => ({ title: c.title, sub: 'Field Section', href: '/' + c.id, tags: c.summary })), ...D.pages.map((p) => ({ title: p.title, sub: category(p.category).title, href: '/' + p.category + '/' + p.id, tags: p.keyInfo.join(' ') })), ...Object.entries(D.infoPages).map(([k, p]) => ({ title: p.title, sub: 'Camp Record', href: '/' + k, tags: p.body }))];
  function runSearch(q) {
    if (!q) { searchResults.classList.remove('open'); return; }
    const low = q.toLowerCase();
    const matches = searchIndex.filter((x) => (x.title + ' ' + x.sub + ' ' + x.tags).toLowerCase().includes(low)).slice(0, 12);
    searchResults.innerHTML = matches.length ? matches.map((m) => `<a href="${esc(m.href)}">${esc(m.title)}<span>${esc(m.sub)}</span></a>`).join('') : '<div class="empty">No field notes match.</div>';
    searchResults.classList.add('open');
  }
  searchInput.addEventListener('input', () => runSearch(searchInput.value.trim()));
  searchInput.addEventListener('focus', () => runSearch(searchInput.value.trim()));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) { if (!e.target.closest('.search')) searchResults.classList.remove('open'); return; }
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
    if (e.key === '/' && document.activeElement !== searchInput) { e.preventDefault(); searchInput.focus(); }
    if (e.key === 'Escape') searchResults.classList.remove('open');
  });
  window.addEventListener('popstate', navigate);
  if (menuToggle) menuToggle.onclick = () => leftNav.classList.toggle('open');
  navigate();
})();
