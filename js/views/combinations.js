(function() {
  var state = {
    selections: { character: 'Chris', endcard: 'Family', gameConcept: 'Puzzle', room: 'Bedroom' },
    activeTab: 'kpi'
  };

  var OPTIONS = {
    character:   ['Chris', 'Austin', 'Child', 'Katherine Broom', 'No Character'],
    endcard:     ['Family', 'None', 'Play Store'],
    gameConcept: ['Puzzle', 'Fail Concept', 'Drama', 'Fake Gameplay', 'Renovation'],
    room:        ['Bedroom', 'Kitchen', 'Bathroom', 'Living Room', 'None'],
  };

  var CAT_LABELS = { character: 'Character', endcard: 'Endcard', gameConcept: 'Game Concept', room: 'Room Scenarios' };
  var CAT_ICONS  = { character: 'user', endcard: 'layers', gameConcept: 'zap', room: 'grid' };

  window['View_combinations'] = function(params) {
    Charts.destroyAll();
    render();
  };

  function render() {
    var D = window.AIGameAnalyzerData; var C = Components;
    var kpis = D.combinationKPIs(state.selections);

    // Find best matching creative for preview
    var bestCreative = D.creatives.find(function(c) {
      return c.tags.character === state.selections.character ||
             c.tags.gameConcept === state.selections.gameConcept;
    }) || D.creatives[0];

    // Left panel: tag selectors
    var selectorHTML = Object.keys(OPTIONS).map(function(cat) {
      return '<div style="margin-bottom:16px">' +
        '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;display:flex;align-items:center;gap:6px">' +
          C.icon(CAT_ICONS[cat],12) + ' ' + CAT_LABELS[cat] +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:4px">' +
          OPTIONS[cat].map(function(opt) {
            var active = state.selections[cat] === opt;
            return '<button class="combo-opt' + (active?' combo-opt-active':'') + '" data-cat="' + cat + '" data-val="' + opt + '" style="' +
              'display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-radius:var(--radius-sm);border:1px solid ' +
              (active?'var(--color-primary)':'var(--color-border)') + ';background:' +
              (active?'var(--color-primary-light)':'var(--color-surface)') + ';color:' +
              (active?'var(--color-primary)':'var(--color-text-secondary)') + ';font-size:var(--text-sm);font-weight:' +
              (active?'600':'400') + ';cursor:pointer;text-align:left;width:100%">' +
              opt +
              (active ? '<span style="color:var(--color-primary)">' + C.icon('check',12) + '</span>' : '') +
            '</button>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    // Right panel: KPI values
    var kpiItems = [
      {label:'IPM',    value:kpis.ipm.toFixed(1),   delta: kpis.ipm>20},
      {label:'CTR',    value:D.fmtPct(kpis.ctr),    delta: kpis.ctr>1.4},
      {label:'CPI',    value:'$'+kpis.cpi.toFixed(1),delta: kpis.cpi<18, invert:true},
      {label:'CTI',    value:D.fmtPct(kpis.cti),    delta: kpis.cti>28},
      {label:'CPPD7',  value:'$'+kpis.cppd7,        delta: kpis.cppd7<60, invert:true},
      {label:'ROAS D7',value:D.fmtPct(kpis.roasd7), delta: kpis.roasd7>32},
      {label:'SPEND',  value:D.fmtCurrency(kpis.spend), delta:null},
    ];
    var kpiHTML = kpiItems.map(function(item) {
      var arrow = item.delta === null ? '' :
        item.delta ? '<span class="delta-up">↑</span>' : '<span class="delta-down">↓</span>';
      return '<div class="kpi-score-row">' +
        '<span class="kpi-score-label">' + item.label + '</span>' +
        '<div class="kpi-score-value">' + item.value + ' ' + arrow + '</div>' +
      '</div>';
    }).join('');

    // Recommendations filtered to current selections
    var recs = window.AIGameAnalyzerData.recommendations.slice(0,3);

    document.getElementById('app').innerHTML =
      '<div class="fade-in">' +
      '<div class="page-header">' +
        '<div><div class="page-title">Combinations</div>' +
        '<div class="page-subtitle">Mix creative elements · see KPI impact</div></div>' +
        '<div class="page-actions">' +
          '<button class="btn btn-secondary btn-sm" onclick="Components.showToast(\'Brief saved to Creative Knowledge Hub\',\'success\',2000)">' + C.icon('plus',13) + ' Save Brief</button>' +
          '<button class="btn btn-primary btn-sm" id="btn-generate-ai">' + C.icon('star',13) + ' Generate with AI →</button>' +
        '</div>' +
      '</div>' +

      '<div style="display:grid;grid-template-columns:220px 1fr 200px;gap:16px;align-items:start">' +

        // Left: selectors
        '<div class="card" style="padding:16px">' +
          '<div style="font-size:var(--text-sm);font-weight:700;margin-bottom:14px">Tag Selector</div>' +
          selectorHTML +
        '</div>' +

        // Center: preview + tabs
        '<div>' +
          // Video preview
          '<div class="card" style="padding:14px;margin-bottom:14px">' +
            '<div style="display:flex;gap:14px;align-items:flex-start">' +
              '<div style="background:#111;border-radius:var(--radius-md);overflow:hidden;width:140px;flex-shrink:0;aspect-ratio:9/16;position:relative">' +
                '<img src="' + bestCreative.thumbnail + '" style="width:100%;height:100%;object-fit:cover;opacity:.9">' +
                '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">' +
                  '<div class="play-icon" style="width:36px;height:36px">' + C.icon('play',14) + '</div>' +
                '</div>' +
                '<div style="position:absolute;bottom:6px;left:0;right:0;padding:0 8px">' +
                  '<div style="height:3px;background:rgba(255,255,255,.25);border-radius:2px">' +
                    '<div style="width:35%;height:100%;background:white;border-radius:2px"></div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div style="flex:1;min-width:0">' +
                '<div style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);margin-bottom:8px">SELECTED COMBINATION</div>' +
                Object.keys(state.selections).map(function(cat) {
                  return '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--color-border-light);font-size:var(--text-sm)">' +
                    '<span style="color:var(--color-text-muted)">' + CAT_LABELS[cat] + '</span>' +
                    '<span style="font-weight:600;color:var(--color-primary)">' + state.selections[cat] + '</span>' +
                  '</div>';
                }).join('') +
                '<div style="margin-top:10px;display:flex;gap:6px">' +
                  '<span class="badge badge-primary">Est. IPM ' + kpis.ipm.toFixed(1) + '</span>' +
                  '<span class="badge badge-success">ROAS ' + kpis.roasd7.toFixed(1) + '%</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          // Tabs
          C.renderTabs([{id:'kpi',label:'KPI Scores'},{id:'trends',label:'Tag Trends'},{id:'recs',label:'Recommendations'}], state.activeTab) +
          '<div id="combo-tab-content"></div>' +
        '</div>' +

        // Right: quick KPI
        '<div class="card" style="padding:14px">' +
          '<div style="font-size:var(--text-sm);font-weight:700;margin-bottom:10px">Performance Est.</div>' +
          '<div class="kpi-score-list">' + kpiHTML + '</div>' +
          '<div style="margin-top:14px;font-size:var(--text-xs);color:var(--color-text-muted)">Based on historical data for this combination</div>' +
        '</div>' +

      '</div>' +
      '</div>';

    renderComboTab(kpis, recs);
    bindComboEvents();
  }

  function renderComboTab(kpis, recs) {
    var D = window.AIGameAnalyzerData; var C = Components;
    var el = document.getElementById('combo-tab-content');
    if (!el) return;

    if (state.activeTab === 'kpi') {
      var items = [
        {label:'IPM',     val:kpis.ipm.toFixed(1),    up: kpis.ipm>20},
        {label:'CTR',     val:D.fmtPct(kpis.ctr),     up: kpis.ctr>1.4},
        {label:'CPI',     val:'$'+kpis.cpi.toFixed(1), up: kpis.cpi<18, inv:true},
        {label:'CTI',     val:D.fmtPct(kpis.cti),     up: kpis.cti>28},
        {label:'CPPD7',   val:'$'+kpis.cppd7,         up: kpis.cppd7<60, inv:true},
        {label:'ROAS D7', val:D.fmtPct(kpis.roasd7),  up: kpis.roasd7>32},
        {label:'Spend Est.',val:D.fmtCurrency(kpis.spend), up: null},
      ];
      el.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px">' +
        items.map(function(item) {
          var delta = item.up === null ? '' :
            (item.up ? '<div class="delta-up" style="font-size:11px">↑ Above avg</div>' : '<div class="delta-down" style="font-size:11px">↓ Below avg</div>');
          return '<div style="background:var(--color-bg);border-radius:var(--radius-md);padding:10px 12px">' +
            '<div style="font-size:10px;font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">' + item.label + '</div>' +
            '<div style="font-size:var(--text-xl);font-weight:700">' + item.val + '</div>' +
            delta +
          '</div>';
        }).join('') +
      '</div>';

    } else if (state.activeTab === 'trends') {
      var trend = D.generateTagTrend(kpis.ipm, 10);
      el.innerHTML = '<div class="chart-container chart-h-240" style="margin-top:8px"><canvas id="combo-trend-chart"></canvas></div>';
      setTimeout(function() { Charts.createDualTrendChart('combo-trend-chart', trend); }, 80);

    } else {
      el.innerHTML = '<div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">' +
        D.recommendations.map(function(r) {
          return '<div class="rec-card">' +
            '<div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.5">' + r.text + '</div>' +
            '<div style="margin-top:6px;display:flex;gap:6px">' +
              '<span class="badge badge-neutral">' + r.tag + '</span>' +
              '<span class="badge badge-primary">' + r.kpi + '</span>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>';
    }
  }

  function bindComboEvents() {
    var app = document.getElementById('app');
    var D = window.AIGameAnalyzerData; var C = Components;

    // Selector buttons
    app.querySelectorAll('.combo-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.selections[this.dataset.cat] = this.dataset.val;
        Charts.destroyAll();
        render();
      });
    });

    // Tab switching
    C.bindTabs(app, function(tab) {
      state.activeTab = tab;
      var kpis = D.combinationKPIs(state.selections);
      renderComboTab(kpis, D.recommendations);
    });

    // Generate with AI
    app.querySelector('#btn-generate-ai')?.addEventListener('click', function() {
      Router.navigate('/ai-studio', {
        character: state.selections.character,
        gameConcept: state.selections.gameConcept,
        room: state.selections.room,
        endcard: state.selections.endcard,
      });
    });
  }
})();