/* ============================================================
   ROUTER.JS — Hash-based SPA router
   ============================================================ */

window.Router = (function () {
  const routes = {};
  let currentRoute = null;
  let currentParams = {};

  function register(path, handler) {
    routes[path] = handler;
  }

  function parseHash() {
    const hash = window.location.hash.slice(1) || '/overview';
    const [path, queryStr] = hash.split('?');
    const params = {};
    if (queryStr) {
      queryStr.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }
    return { path: path || '/overview', params };
  }

  function navigate(path, params) {
    let hash = path;
    if (params && Object.keys(params).length) {
      const q = Object.entries(params).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
      hash += '?' + q;
    }
    window.location.hash = hash;
  }

  function dispatch() {
    const { path, params } = parseHash();
    currentParams = params;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.route === path);
    });

    // Update topbar breadcrumb
    const labels = {
      '/overview':      'Overview',
      '/performance':   'Performance',
      '/gallery':       'Creative Gallery',
      '/tags':          'Tags Performance',
      '/deconstruction':'Video Deconstruction',
      '/combinations':  'Combinations',
      '/market':        'Market Insights',
      '/reporting':     'Reporting',
    };
    const pageTitle = document.getElementById('topbar-page-title');
    if (pageTitle) pageTitle.textContent = labels[path] || 'AI Game Analyzer';

    // Find and run route handler
    const handler = routes[path];
    const app = document.getElementById('app');
    if (!app) return;

    if (handler) {
      currentRoute = path;
      // Show loading state briefly for visual polish
      app.innerHTML = `<div class="fade-in" style="display:flex;align-items:center;justify-content:center;height:200px;">
        <div style="text-align:center;color:var(--color-text-muted);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning" style="margin:0 auto 8px">
            <path d="M21 12a9 9 0 11-6-8.5"/>
          </svg>
          <div style="font-size:12px;">Loading...</div>
        </div>
      </div>`;
      // Slight delay so content appears fresh
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          handler(params);
        });
      });
    } else {
      app.innerHTML = `<div class="empty-state fade-in">
        <div class="empty-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div class="empty-title">Page not found</div>
        <div class="empty-desc">The route "${path}" doesn't exist.</div>
      </div>`;
    }
  }

  // Init
  function init() {
    window.addEventListener('hashchange', dispatch);
    dispatch(); // handle initial load
  }

  function reload() {
    dispatch();
  }

  // Public API
  return { register, navigate, init, parseHash, reload, getParams: () => currentParams };
})();
