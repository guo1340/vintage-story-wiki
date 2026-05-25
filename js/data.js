/* Lightweight data loader. Browser pages use core/search only; prerender builds load every chunk. */
(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  const allChunks = ["core","pages","search-index"];
  const browserChunks = ['core', 'search-index'];
  const useRequire = typeof require === 'function' && typeof module !== 'undefined' && module.exports;
  const chunks = useRequire ? allChunks : browserChunks;
  if (useRequire) root.__GW_PRERENDER__ = true;
  chunks.forEach(function (name) {
    if (useRequire) require('./data/' + name + '.js');
    else document.write('<script src="/js/data/' + name + '.js"><\/script>');
  });
})();
