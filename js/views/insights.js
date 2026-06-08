(function() {
  var state = {
    network: 'all',
    kpi: 'all',
    country: 'all'
  };

  window['View_insights'] = function(params) {
    Charts.destroyAll();
    render();
  };

  function render() {
    var D = window.AIGameAnalyzerData;
    var C = Components;
    var app = document.getElementById('app');

    // Get app-filtered or global recommendations
    var rawRecs = D.recommendations || [];
    var filteredRecs = rawRecs.filter(function(r) {
      if (state.network !== 'all' && r.networks && r.networks.indexOf(state.network) === -1) return false;
      if (state.kpi !== 'all' && r.kpi !== state.kpi) return false;
      return true;
    });

    var dropdownsHTML = 
      '<div style="display:flex;gap:10px;margin-left:auto">' +
        '<select class="filter-select" id="insights-network-filter">' +
          '<option value="all"' + (state.network === 'all' ? ' selected' : '') + '>All Networks</option>' +
          '<option value="google"' + (state.network === 'google' ? ' selected' : '') + '>Google</option>' +
          '<option value="meta"' + (state.network === 'meta' ? ' selected' : '') + '>Meta</option>' +
          '<option value="unity"' + (state.network === 'unity' ? ' selected' : '') + '>Unity</option>' +
        '</select>' +
        '<select class="filter-select" id="insights-kpi-filter">' +
          '<option value="all"' + (state.kpi === 'all' ? ' selected' : '') + '>All KPIs</option>' +
          '<option value="SPEND"' + (state.kpi === 'SPEND' ? ' selected' : '') + '>Spend</option>' +
          '<option value="IPM"' + (state.kpi === 'IPM' ? ' selected' : '') + '>IPM</option>' +
          '<option value="CPI"' + (state.kpi === 'CPI' ? ' selected' : '') + '>CPI</option>' +
          '<option value="CTR"' + (state.kpi === 'CTR' ? ' selected' : '') + '>CTR</option>' +
          '<option value="ROASD7"' + (state.kpi === 'ROASD7' ? ' selected' : '') + '>ROAS D7</option>' +
        '</select>' +
        '<select class="filter-select" id="insights-country-filter">' +
          '<option value="all"' + (state.country === 'all' ? ' selected' : '') + '>All Countries</option>' +
          '<option value="US"' + (state.country === 'US' ? ' selected' : '') + '>United States</option>' +
          '<option value="UK"' + (state.country === 'UK' ? ' selected' : '') + '>United Kingdom</option>' +
          '<option value="DE"' + (state.country === 'DE' ? ' selected' : '') + '>Germany</option>' +
        '</select>' +
      '</div>';

    var gridCardsHTML = filteredRecs.map(function(r) {
      var isPoorer = r.direction === 'down' || r.text.indexOf('poorer') !== -1 || r.text.indexOf('worse') !== -1;
      var badgeClass = isPoorer ? 'badge-danger' : 'badge-success';
      var badgeIcon = isPoorer ? '↓ ' : '↑ ';
      var badgeStyle = isPoorer ? 'background:var(--color-danger-bg);color:var(--color-danger)' : 'background:var(--color-success-bg);color:var(--color-success)';
      
      // Determine left panel (thumbnail or icon circle)
      var leftPanelHTML = '';
      var creative = r.creativeId ? D.getCreative(r.creativeId) : null;
      var thumb = creative ? creative.thumbnail : r.imageThumbnail;
      if (thumb) {
        leftPanelHTML = 
          '<div style="width:110px;height:100%;flex-shrink:0;background:#111;position:relative">' +
            '<img src="' + thumb + '" style="width:100%;height:100%;object-fit:cover">' +
          '</div>';
      } else {
        var circleIcon = 'clock';
        if (r.tagCategory === 'Pace') circleIcon = 'trending-up';
        if (r.tagCategory === 'Color') circleIcon = 'zap'; // bucket/brush representation
        leftPanelHTML = 
          '<div style="width:110px;height:100%;flex-shrink:0;background:#E5E7EB;display:flex;align-items:center;justify-content:center">' +
            '<div style="width:44px;height:44px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary);box-shadow:var(--shadow-sm)">' +
              C.icon(circleIcon, 20) +
            '</div>' +
          '</div>';
      }

      // Duration context badge on top right if present
      var timeContextHTML = r.timeContext ? 
        '<div style="position:absolute;top:12px;right:14px;display:flex;align-items:center;gap:4px;font-size:10px;color:var(--color-text-muted)">' +
          '<span>➔ ' + r.timeContext + '</span>' +
        '</div>' : '';

      return '<div class="card" style="display:flex;overflow:hidden;height:130px;position:relative;transition:box-shadow var(--transition-fast)" onmouseover="this.style.boxShadow=\'var(--shadow-md)\'" onmouseout="this.style.boxShadow=\'\'">' +
        leftPanelHTML +
        '<div style="flex:1;padding:12px 14px;display:flex;flex-direction:column;justify-content:space-between;min-width:0">' +
          '<div>' +
            '<div style="display:flex;align-items:baseline;gap:8px;margin-bottom:4px">' +
              '<span style="font-size:var(--text-md);font-weight:700;color:var(--color-text)">' + r.value + '</span>' +
              '<span style="font-size:10px;color:var(--color-text-muted)">' + r.tagCategory + '</span>' +
            '</div>' +
            '<span class="badge" style="' + badgeStyle + ';font-size:9px;font-weight:700;padding:2px 6px;margin-bottom:6px">' +
              badgeIcon + r.kpi +
            '</span>' +
            '<div style="font-size:11px;color:var(--color-text-secondary);line-height:1.4;margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden" title="' + r.text + '">' +
              r.text +
            '</div>' +
          '</div>' +
          
          // Bottom count status
          '<div style="display:flex;gap:12px;align-items:center;font-size:10px;color:var(--color-text-muted);border-top:1px solid var(--color-border-light);padding-top:6px">' +
            '<div style="display:flex;align-items:center;gap:4px">' +
              C.icon('film', 11) + ' ' + r.videoCount +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:4px">' +
              C.icon('download', 11) + ' ' + r.spendRatio +
            '</div>' +
          '</div>' +
        '</div>' +
        timeContextHTML +
      '</div>';
    }).join('');

    app.innerHTML = 
      '<div class="fade-in">' +
        '<div class="page-header" style="align-items:center">' +
          '<div>' +
            '<div class="page-title">Insights</div>' +
            '<div class="page-subtitle">AI-driven creative element recommendations · ' + D.AppState.dateRange + '</div>' +
          '</div>' +
          dropdownsHTML +
        '</div>' +
        
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px" id="insights-grid">' +
          (gridCardsHTML || '<div style="grid-column:span 2;text-align:center;padding:48px;color:var(--color-text-muted)">No recommendations match your active filter selections.</div>') +
        '</div>' +
      '</div>';

    bindEvents();
  }

  function bindEvents() {
    var app = document.getElementById('app');
    
    app.querySelector('#insights-network-filter')?.addEventListener('change', function() {
      state.network = this.value;
      render();
    });
    app.querySelector('#insights-kpi-filter')?.addEventListener('change', function() {
      state.kpi = this.value;
      render();
    });
    app.querySelector('#insights-country-filter')?.addEventListener('change', function() {
      state.country = this.value;
      render();
    });
  }
})();
