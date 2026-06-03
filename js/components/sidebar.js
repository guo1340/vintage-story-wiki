(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ageLabels = ['Stone', 'Copper', 'Bronze', 'Iron', 'Steel'];
  root.WikiComponents = root.WikiComponents || {};
  root.WikiComponents.renderLeftSidebar = function renderLeftSidebar(D) {
    return `<div class="journal-title">Field Journal</div>${D.categories.map((c, i) => `<a class="journal-row" href="/${esc(c.id)}" data-r="/${esc(c.id)}"><span>${ageLabels[i % ageLabels.length]}</span><b>${esc(c.title)}</b></a>`).join('')}<div class="journal-title small">Camp Records</div><a class="journal-row" href="/about" data-r="/about"><b>About</b></a><a class="journal-row" href="/privacy-policy" data-r="/privacy-policy"><b>Privacy Policy</b></a><a class="journal-row" href="/contact" data-r="/contact"><b>Contact</b></a>`;
  };
  root.WikiComponents.renderRightSidebar = function renderRightSidebar(D) {
    const fallbackTip = 'Carry more torches than you think you need when entering caves.';
    const tip = Array.isArray(D.tips) && D.tips.length ? D.tips[0] : fallbackTip;
    return `<div class="journal-title">Survival Almanac</div><a class="field-link" href="/getting-started/first-day-guide"><b>First Day Guide</b></a><a class="field-link" href="/exploration/prospecting"><b>Prospecting</b></a><a class="field-link" href="/smithing/steel-production"><b>Steel Production</b></a><a class="field-link" href="/farming/food-preservation"><b>Food Preservation</b></a><a class="field-link" href="/guides/survive-winter"><b>Survive Winter</b></a><a class="field-link" href="/mods/best-mods"><b>Best Mods</b></a><div class="season-card"><span>Season Note</span><p>${esc(tip)}</p></div>`;
  };
  root.WikiComponents.markActiveSidebar = function markActiveSidebar(leftNav, active) {
    if (!leftNav) return;
    leftNav.querySelectorAll('a').forEach((a) => {
      const r = a.getAttribute('data-r');
      if (r && (active === r || active.startsWith(r + '/'))) a.classList.add('active');
      else a.classList.remove('active');
    });
  };
})();
