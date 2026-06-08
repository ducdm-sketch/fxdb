(function() {
  var state = { network: 'all', category: 'all', sortCol: 'spend', sortDir: 'desc' };

  window['View_tags-performance'] = function(params) {
    Charts.destroyAll();
    render();
  };

  var CATS = ['all','GameConcept','Character','Endcard','CTA','DangerType','Room','Emotion','Pace'];
  var CAT_LABELS = {all:'All tags',GameConcept:'Game Concept',Character:'Character',Endcard:'Endcard',
    CTA:'CTA',DangerType:'Danger Type',Room:'Room',Emotion:'Emotion',Pace:'Pace'};

  function filtered() {
    var D = window.AIGameAnalyzerData;
    var ratio = D.getAppCreatives().length / D.creatives.length;
    return D.tags.filter(function(t) {
      if (state.network !== 'all' && t.networks.indexOf(state.network) === -1) return false;
      if (state.category !== 'all' && t.category !== state.category) return false;
      return true;
    }).map(function(t) {
      return Object.assign({}, t, {
        appears: Math.max(1, Math.round(t.appears * ratio)),
        spend: Math.round(t.spend * ratio)
      });
    }).sort(function(a,b) {
      var av = a[state.sortCol] || 0, bv = b[state.sortCol] || 0;
      if (typeof av === 'string') return state.sortDir==='asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return state.sortDir === 'asc' ? av - bv : bv - av;
    });
  }

  function render() {
    var D = window.AIGameAnalyzerData; var C = Components;
    var rows = filtered();

    var catTabs = CATS.map(function(c) {
      var cnt = c==='all' ? D.tags.length : D.tags.filter(function(t){return t.category===c;}).length;
      return '<button class="filter-btn' + (state.category===c?' active':'') + '" data-cat="' + c + '">' +
        CAT_LABELS[c] + (cnt ? ' <span style="opacity:.6;font-weight:400">(' + cnt + ')</span>' : '') + '</button>';
    }).join('');

    var thCls = function(col) {
      return 'sortable' + (state.sortCol===col ? ' sorted-'+state.sortDir : '');
    };

    var tableRows = rows.map(function(tag, i) {
      var dotColor = tag.color || '#5B4FE9';
      return '<tr data-tag-id="' + tag.id + '">' +
        '<td><div style="display:flex;align-items:center;gap:10px">' +
          '<div style="width:36px;height:36px;border-radius:var(--radius-sm);background:' + dotColor + '22;display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
            '<div style="width:12px;height:12px;border-radius:50%;background:' + dotColor + '"></div>' +
          '</div>' +
          '<div>' +
            '<div style="font-weight:600;font-size:var(--text-sm);color:var(--color-text)">' + tag.name + '</div>' +
            '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">' + CAT_LABELS[tag.category] + '</div>' +
          '</div></div></td>' +
        '<td class="kpi-value">' + tag.appears + '</td>' +
        '<td>' + D.renderNetworkDots(tag.networks) + '</td>' +
        '<td class="kpi-value">$' + (tag.spend/1000).toFixed(1) + 'K</td>' +
        '<td class="kpi-value">' + tag.roasd7.toFixed(1) + '%</td>' +
        '<td class="kpi-value">' + tag.ctr.toFixed(1) + '%</td>' +
        '<td class="text-muted" style="font-size:var(--text-xs)">' + tag.launchAge + '</td>' +
        '<td><div class="score-bar-wrap"><div class="score-bar-track" style="max-width:80px">' +
          '<div class="score-bar-fill" style="width:' + Math.min(100,(tag.roasd7/40*100)).toFixed(0) + '%;background:' + dotColor + '"></div>' +
        '</div></div></td>' +
      '</tr>';
    }).join('') || '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--color-text-muted)">No tags match filters</td></tr>';

    document.getElementById('app').innerHTML =
      '<div class="fade-in">' +
      '<div class="page-header">' +
        '<div><div class="page-title">Tags Performance</div>' +
        '<div class="page-subtitle">' + rows.length + ' tags · sorted by ' + state.sortCol + ' · ' + D.AppState.dateRange + '</div></div>' +
      '</div>' +

      '<div class="filter-bar" style="margin-bottom:12px">' +
        C.renderNetworkFilter(state.network) +
      '</div>' +

      '<div class="filter-bar" style="flex-wrap:wrap;gap:6px;margin-bottom:16px">' + catTabs + '</div>' +

      '<div class="table-container">' +
        '<table class="data-table" id="tags-table">' +
          '<thead><tr>' +
            '<th>Tag</th>' +
            '<th class="' + thCls('appears') + '" data-sort="appears">Appears</th>' +
            '<th>Networks</th>' +
            '<th class="' + thCls('spend') + '" data-sort="spend">Spend</th>' +
            '<th class="' + thCls('roasd7') + '" data-sort="roasd7">ROAS D7</th>' +
            '<th class="' + thCls('ctr') + '" data-sort="ctr">CTR</th>' +
            '<th>Launch Age</th>' +
            '<th>Performance</th>' +
          '</tr></thead>' +
          '<tbody>' + tableRows + '</tbody>' +
        '</table>' +
      '</div>' +
      '</div>';

    bindTagEvents();
  }

  function bindTagEvents() {
    var app = document.getElementById('app');
    var C = Components; var D = window.AIGameAnalyzerData;

    C.bindNetworkFilter(app, function(n){ state.network=n; render(); });

    app.querySelectorAll('[data-cat]').forEach(function(btn) {
      btn.addEventListener('click', function(){ state.category=this.dataset.cat; render(); });
    });

    app.querySelectorAll('th.sortable').forEach(function(th) {
      th.addEventListener('click', function() {
        var col = this.dataset.sort;
        state.sortDir = state.sortCol===col && state.sortDir==='desc' ? 'asc' : 'desc';
        state.sortCol = col;
        render();
      });
    });

    app.querySelectorAll('tr[data-tag-id]').forEach(function(row) {
      row.addEventListener('click', function() { openTagDetail(this.dataset.tagId); });
    });
  }

  function openTagDetail(tagId) {
    var D = window.AIGameAnalyzerData; var C = Components;
    var ratio = D.getAppCreatives().length / D.creatives.length;
    var origTag = D.tags.find(function(t){ return t.id===tagId; });
    if (!origTag) return;
    var tag = Object.assign({}, origTag, {
      appears: Math.max(1, Math.round(origTag.appears * ratio)),
      spend: Math.round(origTag.spend * ratio)
    });
    var trend = D.generateTagTrend(tag.roasd7, 8);
    var relCreatives = D.getAppCreatives().filter(function(c) {
      return Object.values(c.tags).indexOf(tag.name) !== -1;
    }).slice(0,4);

    var content =
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:14px;background:var(--color-bg);border-radius:var(--radius-lg)">' +
        '<div style="width:44px;height:44px;border-radius:var(--radius-md);background:' + (tag.color||'#5B4FE9') + '22;display:flex;align-items:center;justify-content:center">' +
          '<div style="width:16px;height:16px;border-radius:50%;background:' + (tag.color||'#5B4FE9') + '"></div>' +
        '</div>' +
        '<div><div style="font-size:var(--text-lg);font-weight:700">' + tag.name + '</div>' +
        '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">' + CAT_LABELS[tag.category] + ' · ' + tag.appears + ' creatives</div></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px">' +
        miniKPI('Spend', '$' + (tag.spend/1000).toFixed(1) + 'K') +
        miniKPI('ROAS D7', tag.roasd7.toFixed(1) + '%') +
        miniKPI('CTR', tag.ctr.toFixed(1) + '%') +
      '</div>' +
      '<div style="font-size:var(--text-sm);font-weight:600;margin-bottom:8px">Performance Trend</div>' +
      '<div class="chart-container chart-h-200" style="margin-bottom:20px"><canvas id="tag-detail-chart"></canvas></div>' +
      '<div style="font-size:var(--text-sm);font-weight:600;margin-bottom:8px">Creatives using this tag (' + relCreatives.length + ')</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
        relCreatives.map(function(c) {
          return '<div style="display:flex;align-items:center;gap:8px;padding:8px;border:1px solid var(--color-border);border-radius:var(--radius-md);cursor:pointer" onclick="Router.navigate(\'/deconstruction\',{id:\'' + c.id + '\'})">' +
            '<img src="' + c.thumbnail + '" style="width:36px;height:36px;border-radius:4px;object-fit:cover">' +
            '<div style="min-width:0"><div style="font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + c.name + '</div>' +
            '<div style="font-size:10px;color:var(--color-text-muted)">' + D.renderStars(c.aiGameAnalyzerScore) + '</div></div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="margin-top:16px">' +
        '<button class="btn btn-primary" style="width:100%" onclick="Router.navigate(\'/combinations\')">' + C.icon('shuffle',14) + ' Test in Combinations</button>' +
      '</div>';

    C.showSlidePanel({ title: tag.name, content: content, width: '460px' });
    setTimeout(function() {
      Charts.createDualTrendChart('tag-detail-chart', trend);
    }, 150);
  }

  function miniKPI(label, val) {
    return '<div style="background:var(--color-bg);border-radius:var(--radius-md);padding:10px 12px">' +
      '<div style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">' + label + '</div>' +
      '<div style="font-size:var(--text-xl);font-weight:700;color:var(--color-text)">' + val + '</div>' +
    '</div>';
  }
})();