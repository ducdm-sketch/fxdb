(function() {
  var state = {
    network: 'all',
    os: 'all',
    search: '',
    activeOnly: false,
    sortCol: 'aiGameAnalyzerScore',
    sortDir: 'desc',
    page: 1,
    pageSize: 10,
    minSpend: 0,
    visibleCols: ['name','aiGameAnalyzerScore','networks','scoreBar','installs','ctr','cpi','ipm','roasd7']
  };

  var allCols = [
    {id:'name',      label:'Creative'},
    {id:'aiGameAnalyzerScore',label:'Score'},
    {id:'networks',  label:'Networks'},
    {id:'scoreBar',  label:'Score Bar'},
    {id:'installs',  label:'Installs'},
    {id:'spend',     label:'Spend'},
    {id:'ctr',       label:'CTR'},
    {id:'cpi',       label:'CPI'},
    {id:'cti',       label:'CTI'},
    {id:'ipm',       label:'IPM'},
    {id:'cppd7',     label:'CPPD7'},
    {id:'roasd7',    label:'ROAS D7'},
    {id:'impressions',label:'Impressions'},
    {id:'age',       label:'Age'},
  ];

  window['View_performance'] = function(params) {
    Charts.destroyAll();
    render();
  };

  function getFiltered() {
    var D = window.AIGameAnalyzerData;
    return D.getAppCreatives().filter(function(c) {
      if (state.network !== 'all' && c.networks.indexOf(state.network) === -1) return false;
      if (state.os !== 'all' && c.os.indexOf(state.os) === -1) return false;
      if (state.activeOnly && c.metrics.spend < 50) return false;
      if (state.minSpend > 0 && c.metrics.spend < state.minSpend) return false;
      if (state.search && c.name.toLowerCase().indexOf(state.search.toLowerCase()) === -1) return false;
      return true;
    }).sort(function(a, b) {
      var av, bv;
      if (state.sortCol === 'name') { av = a.name; bv = b.name; }
      else if (state.sortCol === 'aiGameAnalyzerScore') { av = a.aiGameAnalyzerScore; bv = b.aiGameAnalyzerScore; }
      else if (state.sortCol === 'age') { av = a.age; bv = b.age; }
      else { av = a.metrics[state.sortCol] || 0; bv = b.metrics[state.sortCol] || 0; }
      if (typeof av === 'string') return state.sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return state.sortDir === 'asc' ? av - bv : bv - av;
    });
  }

  function render() {
    var app = document.getElementById('app');
    var D = window.AIGameAnalyzerData;
    var C = Components;
    var filtered = getFiltered();
    var total = filtered.length;
    var pages = Math.ceil(total / state.pageSize);
    state.page = Math.min(state.page, pages || 1);
    var pageData = filtered.slice((state.page-1)*state.pageSize, state.page*state.pageSize);

    // Build table header
    var colDefs = allCols.filter(function(c){ return state.visibleCols.indexOf(c.id) !== -1; });
    var theadCells = colDefs.map(function(col) {
      var sortable = ['name','aiGameAnalyzerScore','installs','spend','ctr','cpi','cti','ipm','cppd7','roasd7','impressions','age'].indexOf(col.id) !== -1;
      var cls = sortable ? 'sortable' : '';
      if (sortable && state.sortCol === col.id) cls += ' sorted-' + state.sortDir;
      return '<th class="' + cls + '" data-sort="' + col.id + '">' + col.label + '</th>';
    }).join('');

    // Build table rows
    var rows = pageData.map(function(c) {
      var cells = colDefs.map(function(col) {
        switch(col.id) {
          case 'name':
            return '<td><div class="table-creative-cell">' +
              '<img class="table-thumbnail" src="' + c.thumbnail + '" alt="">' +
              '<div><div class="table-creative-name">' + c.name + '</div>' +
              '<div class="table-creative-sub">' + c.instances + ' ad instance' + (c.instances>1?'s':'') + ' · ' + c.age + '</div></div>' +
              '</div></td>';
          case 'aiGameAnalyzerScore':
            return '<td>' + D.renderStars(c.aiGameAnalyzerScore) + '</td>';
          case 'networks':
            return '<td>' + D.renderNetworkDots(c.networks) + '</td>';
          case 'scoreBar':
            return '<td>' + Components.renderScoreBar(c.aiGameAnalyzerScore) + '</td>';
          case 'installs':
            return '<td class="kpi-value">' + D.fmt(c.metrics.installs) + '</td>';
          case 'spend':
            return '<td class="kpi-value">' + D.fmtCurrency(c.metrics.spend) + '</td>';
          case 'ctr':
            return '<td class="kpi-value">' + D.fmtPct(c.metrics.ctr) + '</td>';
          case 'cpi':
            return '<td class="kpi-value">$' + c.metrics.cpi.toFixed(2) + '</td>';
          case 'cti':
            return '<td class="kpi-value">' + D.fmtPct(c.metrics.cti) + '</td>';
          case 'ipm':
            return '<td class="kpi-value">' + c.metrics.ipm.toFixed(1) + '</td>';
          case 'cppd7':
            return '<td class="kpi-value">$' + c.metrics.cppd7.toFixed(0) + '</td>';
          case 'roasd7':
            return '<td class="kpi-value">' + D.fmtPct(c.metrics.roasd7) + '</td>';
          case 'impressions':
            return '<td class="kpi-value">' + D.fmt(c.metrics.impressions) + '</td>';
          case 'age':
            return '<td class="text-muted">' + c.age + '</td>';
          default: return '<td>—</td>';
        }
      }).join('');
      return '<tr data-id="' + c.id + '">' + cells + '</tr>';
    }).join('') || '<tr><td colspan="' + colDefs.length + '" style="text-align:center;padding:40px;color:var(--color-text-muted)">No creatives match your filters</td></tr>';

    // Pagination
    var start = total === 0 ? 0 : (state.page-1)*state.pageSize+1;
    var end   = Math.min(state.page*state.pageSize, total);
    var pageButtons = '';
    for (var p=1;p<=pages;p++) {
      pageButtons += '<button class="pagination-btn' + (p===state.page?' current':'') + '" data-page="' + p + '">' + p + '</button>';
    }

    app.innerHTML =
      '<div class="fade-in">' +

      // Header
      '<div class="page-header">' +
        '<div><div class="page-title">Performance</div>' +
        '<div class="page-subtitle">' + total + ' creatives · sorted by ' + state.sortCol + ' · ' + D.AppState.dateRange + '</div></div>' +
        '<div class="page-actions">' +
          '<button class="btn btn-secondary btn-sm" id="btn-export">' + C.icon('download',13) + ' Export CSV</button>' +
          '<button class="btn btn-secondary btn-sm" id="btn-customize">' + C.icon('columns',13) + ' Customize</button>' +
        '</div>' +
      '</div>' +

      // Filter bar
      '<div class="filter-bar">' +
        '<div class="search-input-wrap">' +
          '<span class="search-icon">' + C.icon('search',14) + '</span>' +
          '<input class="search-input" id="search-input" placeholder="Search creatives…" value="' + state.search + '">' +
        '</div>' +
        C.renderNetworkFilter(state.network) +
        '<select class="filter-select" id="os-filter">' +
          '<option value="all"' + (state.os==='all'?' selected':'') + '>All OS</option>' +
          '<option value="ios"' + (state.os==='ios'?' selected':'') + '>iOS</option>' +
          '<option value="android"' + (state.os==='android'?' selected':'') + '>Android</option>' +
        '</select>' +
        '<button class="filter-btn" id="btn-filters">' + C.icon('filter',13) + ' Filters' + (state.minSpend>0?' ·  $'+state.minSpend+'+':'') + '</button>' +
        '<label class="toggle-group" style="margin-left:auto">' +
          '<span>Active only</span>' +
          '<label class="toggle"><input type="checkbox" id="active-toggle"' + (state.activeOnly?' checked':'') + '><div class="toggle-track"></div><div class="toggle-thumb"></div></label>' +
        '</label>' +
      '</div>' +

      // Table
      '<div class="table-container">' +
        '<table class="data-table" id="perf-table">' +
          '<thead><tr>' + theadCells + '</tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
        '<div class="table-pagination">' +
          '<span class="pagination-info">Showing ' + start + '–' + end + ' of ' + total + ' creatives</span>' +
          '<div class="pagination-btns">' +
            '<button class="pagination-btn" id="page-prev" ' + (state.page<=1?'disabled':'') + '>← Prev</button>' +
            pageButtons +
            '<button class="pagination-btn" id="page-next" ' + (state.page>=pages?'disabled':'') + '>Next →</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '</div>';

    bindEvents();
  }

  function bindEvents() {
    var app = document.getElementById('app');
    var C = Components;

    // Search
    var searchEl = app.querySelector('#search-input');
    if (searchEl) {
      searchEl.addEventListener('input', function() {
        state.search = this.value;
        state.page = 1;
        render();
      });
    }

    // Network filter
    C.bindNetworkFilter(app, function(n) {
      state.network = n;
      state.page = 1;
      render();
    });

    // OS filter
    var osEl = app.querySelector('#os-filter');
    if (osEl) osEl.addEventListener('change', function() {
      state.os = this.value; state.page = 1; render();
    });

    // Active toggle
    var toggleEl = app.querySelector('#active-toggle');
    if (toggleEl) toggleEl.addEventListener('change', function() {
      state.activeOnly = this.checked; state.page = 1; render();
    });

    // Sort headers
    app.querySelectorAll('th.sortable').forEach(function(th) {
      th.addEventListener('click', function() {
        var col = this.dataset.sort;
        if (state.sortCol === col) {
          state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
        } else {
          state.sortCol = col;
          state.sortDir = 'desc';
        }
        state.page = 1;
        render();
      });
    });

    // Row clicks → deconstruction
    app.querySelectorAll('#perf-table tbody tr[data-id]').forEach(function(row) {
      row.addEventListener('click', function() {
        Router.navigate('/deconstruction', {id: this.dataset.id});
      });
    });

    // Pagination
    app.querySelector('#page-prev')?.addEventListener('click', function() {
      if (state.page > 1) { state.page--; render(); }
    });
    app.querySelector('#page-next')?.addEventListener('click', function() {
      state.page++; render();
    });
    app.querySelectorAll('.pagination-btn[data-page]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.page = parseInt(this.dataset.page); render();
      });
    });

    // Filters panel
    app.querySelector('#btn-filters')?.addEventListener('click', function() {
      var content =
        '<div class="filter-panel">' +
          '<div>' +
            '<div class="filter-panel-section-label">Minimum Spend ($)</div>' +
            '<input class="filter-input" id="fp-min-spend" type="number" placeholder="e.g. 500" value="' + (state.minSpend||'') + '">' +
          '</div>' +
          '<div>' +
            '<div class="filter-panel-section-label">Creative Age</div>' +
            '<select class="filter-select" id="fp-age" style="width:100%">' +
              '<option value="">Any age</option>' +
              '<option value="new">New (< 3 months)</option>' +
              '<option value="mid">Mid (3–6 months)</option>' +
              '<option value="old">Mature (6m+)</option>' +
            '</select>' +
          '</div>' +
          '<div style="display:flex;gap:8px;margin-top:8px">' +
            '<button class="btn btn-primary" style="flex:1" id="fp-apply">Apply filters</button>' +
            '<button class="btn btn-secondary" id="fp-reset">Reset</button>' +
          '</div>' +
        '</div>';
      var panel = C.showSlidePanel({title: 'Filters', content: content, width: '320px'});
      setTimeout(function() {
        var applyBtn = document.getElementById('fp-apply');
        var resetBtn = document.getElementById('fp-reset');
        if (applyBtn) applyBtn.addEventListener('click', function() {
          var v = document.getElementById('fp-min-spend')?.value;
          state.minSpend = v ? parseFloat(v) : 0;
          state.page = 1;
          panel.close();
          render();
        });
        if (resetBtn) resetBtn.addEventListener('click', function() {
          state.minSpend = 0;
          panel.close();
          render();
        });
      }, 100);
    });

    // Customize columns
    app.querySelector('#btn-customize')?.addEventListener('click', function() {
      var allCols2 = ['name','aiGameAnalyzerScore','networks','scoreBar','installs','spend','ctr','cpi','cti','ipm','cppd7','roasd7','impressions','age'];
      var labels = {name:'Creative',aiGameAnalyzerScore:'Score',networks:'Networks',scoreBar:'Score Bar',installs:'Installs',spend:'Spend',ctr:'CTR',cpi:'CPI',cti:'CTI',ipm:'IPM',cppd7:'CPPD7',roasd7:'ROAS D7',impressions:'Impressions',age:'Age'};
      var checks = allCols2.map(function(c) {
        var chk = state.visibleCols.indexOf(c) !== -1;
        var disabled = c === 'name' ? 'disabled' : '';
        return '<label style="display:flex;align-items:center;gap:8px;padding:6px 0;cursor:pointer;font-size:13px">' +
          '<input type="checkbox" value="' + c + '"' + (chk?' checked':'') + ' ' + disabled + '>' +
          labels[c] + '</label>';
      }).join('');
      C.showModal({
        title: 'Customize Columns',
        content: '<div style="display:flex;flex-direction:column;gap:2px">' + checks + '</div>' +
          '<div style="display:flex;gap:8px;margin-top:16px">' +
            '<button class="btn btn-primary" style="flex:1" id="col-apply">Apply</button>' +
            '<button class="btn btn-secondary" id="col-cancel">Cancel</button>' +
          '</div>',
        onClose: null
      });
      setTimeout(function() {
        document.getElementById('col-apply')?.addEventListener('click', function() {
          var checked = [];
          document.querySelectorAll('.modal input[type=checkbox]:checked').forEach(function(el){ checked.push(el.value); });
          if (checked.length === 0) checked = ['name'];
          state.visibleCols = checked;
          document.querySelector('.modal-backdrop')?.remove();
          render();
        });
        document.getElementById('col-cancel')?.addEventListener('click', function() {
          document.querySelector('.modal-backdrop')?.remove();
        });
      }, 50);
    });

    // Export CSV
    app.querySelector('#btn-export')?.addEventListener('click', function() {
      var filtered = getFiltered();
      var header = 'Name,Score,Networks,Installs,Spend,CTR,CPI,IPM,ROAS D7\n';
      var rows = filtered.map(function(c) {
        return [c.name, c.aiGameAnalyzerScore, c.networks.join('+'), c.metrics.installs,
                c.metrics.spend.toFixed(2), c.metrics.ctr.toFixed(2),
                c.metrics.cpi.toFixed(2), c.metrics.ipm.toFixed(1),
                c.metrics.roasd7.toFixed(1)].join(',');
      }).join('\n');
      var blob = new Blob([header+rows], {type:'text/csv'});
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ai-game-analyzer-performance-' + new Date().toISOString().slice(0,10) + '.csv';
      a.click();
      Components.showToast('CSV exported!', 'success', 2000);
    });
  }
})();