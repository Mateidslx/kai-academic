/* Legacy V1/V2 cache-buster shim: immediately upgrades stale tabs to V11 */
(function () {
  if (typeof window !== 'undefined' && window.location && !window.location.search.includes('v=11')) {
    window.location.replace('portfolio.html?v=11');
  }
})();
