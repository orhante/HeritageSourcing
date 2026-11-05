// Heritage Sourcing — backend connection settings
// While the backend is not hosted yet, the live site keeps working exactly as before.
// When the backend is online, put its address in LIVE_API, e.g. 'https://api.sourceheritage.com/api'
(function () {
  var LIVE_API = '';
  var isLocal = ['localhost', '127.0.0.1'].indexOf(location.hostname) !== -1;
  window.HERITAGE_API = isLocal ? '/api' : LIVE_API;

  window.heritageFetch = function (path, options) {
    if (!window.HERITAGE_API) return Promise.reject(new Error('API not configured'));
    var controller = 'AbortController' in window ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 8000) : null;
    var opts = Object.assign({}, options || {});
    if (controller) opts.signal = controller.signal;
    return fetch(window.HERITAGE_API + path, opts).then(function (res) {
      if (timer) clearTimeout(timer);
      return res.json().catch(function () { return {}; }).then(function (body) {
        return { ok: res.ok, status: res.status, body: body };
      });
    });
  };
})();
