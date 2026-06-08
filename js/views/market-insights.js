/* ============================================================
   MARKET INSIGHTS VIEW
   ============================================================ */
window['View_market-insights'] = function (params) {
  Charts.destroyAll();
  var app = document.getElementById('app');
  var D = AIGameAnalyzerData;
  var C = Components;

  // ── State ─────────────────────────────────────────────────
  var activeCompetitor = 'all';
  var activeTimelineCreative = null; // { comp, creative }

  // ── Render helpers ────────────────────────────────────────
  function compColor(comp) { return comp.color || '#5B4FE9'; }

  function renderThumbnail(id, name) {
    var colors = ['#5B4FE9','#10B981','#F59E0B','#EF4444','#3B82F6','#8B5CF6','#EC4899'];
    var hash = 0;
    for (var i = 0; i < id.length; i++) hash = ((hash << 5) - hash) + id.charCodeAt(i), hash |= 0;
    var c1 = colors[Math.abs(hash) % colors.length];
    var c2 = colors[Math.abs(hash >> 3) % colors.length];
    var initials = (name || id).split(' ').slice(0,2).map(function(w){ return w[0]||''; }).join('').toUpperCase();
    return '<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">'
      + '<defs><linearGradient id="g' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="' + c1 + '"/><stop offset="100%" stop-color="' + c2 + '"/></linearGradient></defs>'
      + '<rect width="160" height="90" fill="url(#g' + id + ')"/>'
      + '<text x="80" y="50" text-anchor="middle" dominant-baseline="middle" font-family="Inter,sans-serif" font-size="24" font-weight="700" fill="rgba(255,255,255,0.9)">' + initials + '</text>'
      + '<rect x="0" y="70" width="160" height="20" fill="rgba(0,0,0,0.3)"/>'
      + '<rect x="4" y="76" width="80" height="6" rx="3" fill="rgba(255,255,255,0.6)"/>'
      + '</svg>';
  }

  function getFilteredCompetitors() {
    if (activeCompetitor === 'all') return D.competitors;
    return D.competitors.filter(function(c){ return c.id === activeCompetitor; });
  }

  function renderCompetitorPills() {
    var pills = [{ id: 'all', name: 'All Competitors', color: '#5B4FE9' }]
      .concat(D.competitors.map(function(c){ return { id: c.id, name: c.name, color: c.color }; }));
    return pills.map(function(p){
      var active = activeCompetitor === p.id;
      var style = active
        ? 'background:' + p.color + ';color:#fff;border-color:' + p.color
        : 'background:var(--color-surface);color:var(--color-text-secondary);border-color:var(--color-border)';
      return '<button class="competitor-pill btn btn-sm" data-comp="' + p.id + '" style="' + style + ';border-radius:20px;padding:5px 14px;font-size:var(--text-xs);font-weight:600;cursor:pointer;border:1px solid;transition:all 0.15s">'
        + p.name + '</button>';
    }).join('');
  }

  function renderCreativeGrid() {
    var comps = getFilteredCompetitors();
    var cards = [];
    comps.forEach(function(comp){
      comp.creatives.forEach(function(cr){
        var active = activeTimelineCreative && activeTimelineCreative.creativeId === cr.id;
        cards.push(
          '<div class="competitor-card gallery-card' + (active ? ' selected' : '') + '" '
          + 'data-comp-id="' + comp.id + '" data-creative-id="' + cr.id + '" '
          + 'style="cursor:pointer;border:2px solid ' + (active ? comp.color : 'var(--color-border)') + ';border-radius:var(--radius-lg);overflow:hidden;background:var(--color-surface);transition:border-color 0.15s,box-shadow 0.15s">'
          + '<div style="position:relative;aspect-ratio:16/9;background:#111">'
          + renderThumbnail(cr.id, comp.name)
          + '<span style="position:absolute;top:8px;left:8px;background:' + comp.color + ';color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;letter-spacing:0.03em">' + comp.name + '</span>'
          + '</div>'
          + '<div style="padding:10px 12px 12px">'
          + '<div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:4px">Est. launch: ' + cr.estimatedLaunch + '</div>'
          + '<div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:8px">Duration: ' + cr.duration + 's</div>'
          + '<div style="display:flex;gap:6px">'
          + '<button class="btn btn-sm btn-secondary deconstruct-btn" data-comp-id="' + comp.id + '" data-creative-id="' + cr.id + '" style="flex:1;justify-content:center">Deconstruct</button>'
          + '<button class="btn btn-sm btn-primary compare-comp-btn" data-comp-id="' + comp.id + '" data-creative-id="' + cr.id + '" style="flex:1;justify-content:center" title="Open in Compare mode">Compare →</button>'
          + '</div>'
          + '</div>'
          + '</div>'
        );
      });
    });
    if (!cards.length) {
      return '<div style="text-align:center;padding:48px;color:var(--color-text-muted);font-size:var(--text-sm)">No creatives for this competitor.</div>';
    }
    return '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-4)">'
      + cards.join('') + '</div>';
  }

  function renderBenchmarkTable() {
    var rows = D.benchmark.map(function(row){
      var gapClass = row.gap > 0 ? 'gap-positive' : (row.gap < -5 ? 'gap-warning' : 'gap-negative');
      var gapLabel = row.gap > 0 ? '+' + row.gap + '%' : row.gap + '%';
      var maxVal = Math.max(row.mine, row.market, 1);
      var mineW = (row.mine / Math.max(maxVal, 80) * 100).toFixed(1);
      var mktW  = (row.market / Math.max(maxVal, 80) * 100).toFixed(1);
      return '<tr>'
        + '<td style="font-size:var(--text-sm);font-weight:500;color:var(--color-text)">' + row.tag + '</td>'
        + '<td style="font-size:var(--text-sm);color:var(--color-text);text-align:right">' + row.mine + '%</td>'
        + '<td style="font-size:var(--text-sm);color:var(--color-text-secondary);text-align:right">' + row.market + '%</td>'
        + '<td style="text-align:right"><span class="' + gapClass + '" style="font-size:var(--text-xs);font-weight:600;padding:2px 8px;border-radius:10px;display:inline-block">' + gapLabel + '</span></td>'
        + '<td style="min-width:140px;padding-right:8px">'
        + '<div class="usage-bar-wrap" style="position:relative;height:20px;display:flex;flex-direction:column;gap:2px;justify-content:center">'
        + '<div class="usage-bar-track" style="background:var(--color-surface-hover);border-radius:3px;height:6px;position:relative">'
        + '<div class="usage-bar-fill mine" style="width:' + mineW + '%;height:100%;border-radius:3px;background:var(--color-primary)"></div>'
        + '</div>'
        + '<div class="usage-bar-track" style="background:var(--color-surface-hover);border-radius:3px;height:6px;position:relative">'
        + '<div class="usage-bar-fill market" style="width:' + mktW + '%;height:100%;border-radius:3px;background:#94A3B8"></div>'
        + '</div>'
        + '</div>'
        + '</td>'
        + '</tr>';
    });
    return '<table class="benchmark-table" style="width:100%;border-collapse:collapse">'
      + '<thead><tr style="border-bottom:1px solid var(--color-border)">'
      + '<th style="text-align:left;padding:8px 0;font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.05em">Tag</th>'
      + '<th style="text-align:right;padding:8px 8px;font-size:var(--text-xs);font-weight:600;color:var(--color-primary);text-transform:uppercase;letter-spacing:0.05em">Your Usage</th>'
      + '<th style="text-align:right;padding:8px 8px;font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.05em">Market Avg</th>'
      + '<th style="text-align:right;padding:8px 8px;font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.05em">Gap</th>'
      + '<th style="padding:8px 8px 8px 0;font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.05em">'
      + '<span style="display:inline-flex;gap:12px"><span style="color:var(--color-primary)">■</span> You &nbsp;<span style="color:#94A3B8">■</span> Market</span></th>'
      + '</tr></thead>'
      + '<tbody>' + rows.map(function(r){ return r.replace('<tr>','<tr style="border-bottom:1px solid var(--color-border-light)">'); }).join('') + '</tbody>'
      + '</table>';
  }

  function renderTimelinePanel() {
    if (!activeTimelineCreative) return '';
    var comp = D.competitors.find(function(c){ return c.id === activeTimelineCreative.compId; });
    var cr   = comp && comp.creatives.find(function(c){ return c.id === activeTimelineCreative.creativeId; });
    if (!comp || !cr) return '';

    // Generate mock estimated metrics for competitor creatives based on their ID hash
    var hash = 0;
    for (var i = 0; i < cr.id.length; i++) hash = ((hash << 5) - hash) + cr.id.charCodeAt(i), hash |= 0;
    var rawImpressions = Math.abs(hash % 950000) + 50000;
    var rawInstalls = Math.round(rawImpressions * (0.003 + (Math.abs(hash % 100) / 10000)));
    var estSpend = Math.round(rawInstalls * (1.2 + (Math.abs(hash % 15) / 10)));
    var estIpm = ((rawInstalls / rawImpressions) * 1000).toFixed(1);

    var fmtNum = function(num) {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num;
    };

    var header = comp.name + ' · Creative #' + (comp.creatives.indexOf(cr) + 1) + ' · Est. launch: ' + cr.estimatedLaunch;
    return '<div class="card fade-in" style="margin-top:0">'
      + '<div class="card-header">'
      + '<div class="card-title">' + C.icon('film', 16) + ' <span>' + header + '</span></div>'
      + '<button id="close-timeline-panel" class="btn btn-ghost btn-sm btn-icon" title="Close">'
      + C.icon('x', 16) + '</button>'
      + '</div>'
      + '<div class="card-body" style="display:grid;grid-template-columns:1fr 280px;gap:var(--space-5)">'
      + '<div>'
      + '<div style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:var(--space-3)">Creative Timeline</div>'
      + C.renderTimeline(cr.timeline, cr.duration)
      + '</div>'
      + '<div style="background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-4);display:flex;flex-direction:column;gap:12px">'
      + '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid var(--color-border-light);padding-bottom:6px">Est. Competitor Metrics</div>'
      + '<div style="display:flex;flex-direction:column;gap:8px">'
      + '<div style="display:flex;justify-content:space-between;font-size:var(--text-sm)"><span style="color:var(--color-text-muted)">Impressions</span><strong style="color:var(--color-text)">' + fmtNum(rawImpressions) + '</strong></div>'
      + '<div style="display:flex;justify-content:space-between;font-size:var(--text-sm)"><span style="color:var(--color-text-muted)">Installs</span><strong style="color:var(--color-text)">' + fmtNum(rawInstalls) + '</strong></div>'
      + '<div style="display:flex;justify-content:space-between;font-size:var(--text-sm)"><span style="color:var(--color-text-muted)">Est. Spend</span><strong style="color:var(--color-text)">$' + fmtNum(estSpend) + '</strong></div>'
      + '<div style="display:flex;justify-content:space-between;font-size:var(--text-sm)"><span style="color:var(--color-text-muted)">IPM</span><strong style="color:var(--color-text)">' + estIpm + '</strong></div>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>';
  }

  // ── Full render ───────────────────────────────────────────
  function render() {
    var showTimeline = !!activeTimelineCreative;
    app.innerHTML = '<div class="fade-in" style="display:flex;flex-direction:column;gap:var(--space-6)">'

      // Page header
      + '<div style="display:flex;align-items:center;justify-content:space-between">'
      + '<div>'
      + '<div style="font-size:var(--text-2xl);font-weight:700;color:var(--color-text)">Market Insights</div>'
      + '<div class="page-subtitle" style="font-size:var(--text-sm);color:var(--color-text-muted);margin-top:2px">See how competitors use creative tags and benchmark your strategy · ' + D.AppState.dateRange + '</div>'
      + '</div>'
      + '</div>'

      // Competitor pills
      + '<div style="display:flex;align-items:center;gap:var(--space-2);flex-wrap:wrap">'
      + renderCompetitorPills()
      + '</div>'

      // Row layout: gallery full width, timeline panel full-width below (or hidden when no panel)
      + '<div style="display:flex;flex-direction:column;gap:var(--space-5)" id="market-grid">'
 
        // Competitor creative gallery
        + '<div class="card">'
        + '<div class="card-header">'
        + '<div class="card-title">' + C.icon('film', 16) + ' Competitor Creatives</div>'
        + '<span style="font-size:var(--text-xs);color:var(--color-text-muted)">' + (function(){ var n=0; getFilteredCompetitors().forEach(function(c){ n+=c.creatives.length; }); return n; })() + ' creatives</span>'
        + '</div>'
        + '<div class="card-body" id="competitor-gallery">'
        + renderCreativeGrid()
        + '</div>'
        + '</div>'
 
        // Timeline panel (only shown when a card is selected)
        + (showTimeline ? '<div id="timeline-panel-col">' + renderTimelinePanel() + '</div>' : '<div id="timeline-panel-col" style="display:none"></div>')
 
      + '</div>'

      // Benchmark table
      + '<div class="card">'
      + '<div class="card-header">'
      + '<div class="card-title">' + C.icon('bar-chart', 16) + ' Tag Usage Benchmark</div>'
      + '<div style="display:flex;align-items:center;gap:var(--space-3);font-size:var(--text-xs);color:var(--color-text-muted)">'
      + '<span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:2px;background:var(--color-primary);display:inline-block"></span> Your creatives</span>'
      + '<span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:2px;background:#94A3B8;display:inline-block"></span> Market average</span>'
      + '</div>'
      + '</div>'
      + '<div class="card-body">'
      + renderBenchmarkTable()
      + '</div>'
      + '</div>'

      + '</div>';

    // ── CSS for gap badges ─────────────────────────────────
    if (!document.getElementById('mi-gap-styles')) {
      var s = document.createElement('style');
      s.id = 'mi-gap-styles';
      s.textContent = '.gap-positive{background:#D1FAE5;color:#065F46}.gap-negative{background:#FEF3C7;color:#92400E}.gap-warning{background:#FEE2E2;color:#991B1B}';
      document.head.appendChild(s);
    }

    bindEvents();
  }

  function bindEvents() {
    // Competitor pills
    app.querySelectorAll('.competitor-pill').forEach(function(btn){
      btn.addEventListener('click', function(){
        activeCompetitor = this.dataset.comp;
        if (activeTimelineCreative) {
          // check if selected creative still exists in filtered set
          var stillValid = getFilteredCompetitors().some(function(c){
            return c.id === activeTimelineCreative.compId;
          });
          if (!stillValid) activeTimelineCreative = null;
        }
        render();
      });
    });

    // Deconstruct / card click
    function handleCardClick(compId, creativeId) {
      activeTimelineCreative = { compId: compId, creativeId: creativeId };
      render();
      setTimeout(function(){
        var panel = document.getElementById('timeline-panel-col');
        if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }

    app.querySelectorAll('.deconstruct-btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        handleCardClick(this.dataset.compId, this.dataset.creativeId);
      });
    });

    // "Compare →" — navigate to Deconstruction in compare mode with this competitor pre-loaded
    app.querySelectorAll('.compare-comp-btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        window._pendingCompareItem = {
          type: 'competitor',
          compId: this.dataset.compId,
          creativeId: this.dataset.creativeId,
        };
        Router.navigate('/deconstruction');
      });
    });

    app.querySelectorAll('.competitor-card').forEach(function(card){
      card.addEventListener('click', function(){
        handleCardClick(this.dataset.compId, this.dataset.creativeId);
      });
    });

    // Close timeline panel
    var closeBtn = document.getElementById('close-timeline-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(){
        activeTimelineCreative = null;
        render();
      });
    }
  }

  render();
};
