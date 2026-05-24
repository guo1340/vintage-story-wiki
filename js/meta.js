(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  const D = root.WikiData;
  if (!D) return;
  const S = D.site;

  const categoryById = (id) => D.categories.find((c) => c.id === id);
  const pageByRoute = (cat, slug) => D.pages.find((p) => p.category === cat && p.id === slug);
  const clean = (route) => {
    route = (route || '/').replace(/\/+$/, '');
    return route || '/';
  };
  const plain = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const clip = (s, max = 158) => {
    s = plain(s);
    if (s.length <= max) return s;
    const cut = s.slice(0, max);
    return cut.slice(0, Math.max(60, cut.lastIndexOf(' '))).replace(/[,;:.\s]+$/, '') + '...';
  };
  const abs = (p) => /^https?:/.test(p || '') ? p : S.baseUrl + (p || S.defaultOgImage);

  function routeInfo(route) {
    route = clean(route);
    if (route === '/' || route === '/index.html') return { kind: 'home', route: '/' };
    const seg = route.split('/').filter(Boolean);
    if (seg.length === 1) {
      if (categoryById(seg[0])) return { kind: 'category', category: categoryById(seg[0]), route };
      if (D.infoPages[seg[0]]) return { kind: 'info', slug: seg[0], page: D.infoPages[seg[0]], route };
    }
    if (seg.length === 2 && categoryById(seg[0])) {
      const page = pageByRoute(seg[0], seg[1]);
      if (page) return { kind: 'detail', category: categoryById(seg[0]), page, route };
    }
    return { kind: 'unknown', route };
  }

  function seoFor(route) {
    const info = routeInfo(route);
    const canonical = S.baseUrl + (info.route === '/' ? '/' : info.route);
    let title = S.shortName + ' - Wilderness Survival Handbook';
    let description = S.defaultDescription;
    let keywords = ['Vintage Story wiki', 'Vintage Story guide'];
    let ogType = 'website';

    if (info.kind === 'category') {
      title = info.category.title + ' | ' + S.titleSuffix;
      description = clip(info.category.summary + ' Vintage Story guide pages for practical survival planning.');
      keywords = ['Vintage Story ' + info.category.title.toLowerCase(), 'Vintage Story wiki', 'Vintage Story guide'];
    } else if (info.kind === 'detail') {
      title = info.page.title + ' | ' + S.titleSuffix;
      description = clip(info.page.summary);
      keywords = ['Vintage Story ' + info.page.title.toLowerCase(), 'Vintage Story ' + info.category.title.toLowerCase(), 'Vintage Story wiki'];
      ogType = 'article';
    } else if (info.kind === 'info') {
      title = info.page.title + ' | ' + S.titleSuffix;
      description = clip(info.page.body);
    } else if (info.kind === 'unknown') {
      title = 'Page Not Found | ' + S.titleSuffix;
    }

    return {
      title,
      description,
      canonical,
      ogTitle: title,
      ogDescription: description,
      ogImage: abs(S.defaultOgImage),
      ogType,
      keywords
    };
  }

  function jsonLdFor(route) {
    const info = routeInfo(route);
    const seo = seoFor(route);
    const publisher = { '@type': 'Organization', name: S.name, url: S.baseUrl };
    if (info.kind === 'home') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: S.name,
        url: S.baseUrl,
        description: S.defaultDescription,
        publisher,
        potentialAction: {
          '@type': 'SearchAction',
          target: S.baseUrl + '/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };
    }
    if (info.kind === 'detail') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: info.page.title,
        description: seo.description,
        image: seo.ogImage,
        url: seo.canonical,
        datePublished: '2026-05-24',
        dateModified: S.lastUpdated,
        author: { '@type': 'Organization', name: S.name },
        publisher,
        mainEntityOfPage: { '@type': 'WebPage', '@id': seo.canonical }
      };
    }
    return {
      '@context': 'https://schema.org',
      '@type': info.kind === 'category' ? 'CollectionPage' : 'WebPage',
      name: seo.title,
      description: seo.description,
      url: seo.canonical,
      publisher
    };
  }

  root.WikiMeta = { routeInfo, seoFor, jsonLdFor };
})();
