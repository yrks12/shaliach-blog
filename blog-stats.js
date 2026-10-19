/* blog.shaliach.me counting. No cookies, no storage, no account.
 * Public abacus counters under the "blog.shaliach.me" namespace: views per day, views per page,
 * and clicks on the Book a demo button (total, per day, per page). Read with
 * curl -s https://abacus.jasoncameron.dev/get/blog.shaliach.me/<key>   (never /hit/). */
(function () {
  var HOST = "blog.shaliach.me";
  var COUNTER = "https://abacus.jasoncameron.dev/hit/" + HOST + "/";

  function pageOf(path) {
    var p = String(path || "/").replace(/[?#].*$/, "").replace(/^\/+|\/+$/g, "");
    if (!p) return "home";
    if (p === "he") return "he-home";
    return p.replace(/\//g, "-").replace(/[^A-Za-z0-9_-]/g, "-");
  }
  function viewKeys(path, day) { return ["views-" + day, "page-" + pageOf(path)]; }
  function clickKeys(path, day) { return ["book-click", "book-click-" + day, "book-click-" + pageOf(path)]; }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { pageOf: pageOf, viewKeys: viewKeys, clickKeys: clickKeys };
    return;
  }
  if (location.hostname !== HOST) return;
  function hit(key) { try { fetch(COUNTER + key, { keepalive: true }).catch(function () {}); } catch (e) {} }
  var day = new Date().toISOString().slice(0, 10);
  viewKeys(location.pathname, day).forEach(hit);
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-book]") : null;
    if (a) clickKeys(location.pathname, day).forEach(hit);
  });
})();
