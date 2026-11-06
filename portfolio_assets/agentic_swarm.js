// Auto-redirect shim for cached older versions of portfolio.html
(function () {
  if (!window.location.search.includes('v=13')) {
    var sep = window.location.search ? '&' : '?';
    window.location.replace('portfolio.html' + window.location.search + sep + 'v=13');
  }
})();
