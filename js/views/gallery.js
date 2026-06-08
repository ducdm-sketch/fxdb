(function() {
  var state = {
    mode: 'own',
    network: 'all',
    sort: 'score',
    tagFilter: 'all'
  };

  window['View_gallery'] = function(params) {
    Charts.destroyAll();
    if (params && params.view === 'competitors') state.mode = 'competitors';
    render();
  };

  function render() {
    var D = window.AIGameAnalyzerData;
    var C = Components;
    var app = document.getElementById('app');

    // Filter own creatives
    var ownData = D.getAppCreatives().filter(function(c) {
      if (state.network !== 'all' && c.networks.indexOf(state.network) === -1) return false;
      if (state.tagFilter !== 'all' && c.tags.gameConcept !== state.tagFilter && c.tags.character !== state.tagFilter) return false;
      return true;
    }).sort(function(a, b) {
      if (state.sort === 'score')   return b.aiGameAnalyzerScore - a.aiGameAnalyzerScore;
      if (state.sort === 'newest')  return new Date(b.launchDate) - new Date(a.launchDate);
      if (state.sort === 'oldest')  return new Date(a.launchDate) - new Date(b.launchDate);
      if (state.sort === 'spend')   return b.metrics.spend - a.metrics.spend;
      return 0;
    });

    // Build grid
    var ownCards = ownData.map(function(c) {
      return '<div class="gallery-card" data-id="' + c.id + '">' +
        '<div class="gallery-thumb">' +
          '<img class="gallery-thumb-img" src="' + c.thumbnail + '" alt="">' +
          '<div class="gallery-play-overlay">' +
            '<div class="play-icon">' + C.icon('play', 16) + '</div>' +
          '</div>' +
          // AI badge if applicable
          (c.aiGenerated ? '<div style="position:absolute;top:6px;left:6px;background:#5B4FE9;border-radius:4px;padding:2px 6px;backdrop-filter:blur(4px)"><span style="color:white;font-size:9px;font-weight:700">✦ AI</span></div>' : '') +
        '</div>' +
        '<div class="gallery-card-body">' +
          '<div class="gallery-card-name" title="' + c.name + '">' + c.name + '</div>' +
          '<div class="gallery-card-meta">' +
            D.renderNetworkDots(c.networks) +
            '<span style="font-size:var(--text-xs);color:var(--color-text-muted)">' + D.fmt(c.metrics.installs) + ' installs</span>' +
          '</div>' +
          '<div style="margin-top:6px">' + D.renderStars(c.aiGameAnalyzerScore) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    // Competitor grid
    var compCards = '';
    if (state.mode === 'competitors') {
      D.competitors.forEach(function(comp) {
        comp.creatives.forEach(function(cc) {
          compCards +=
            '<div class="gallery-card" data-comp-id="' + comp.id + '" data-creative-id="' + cc.id + '">' +
              '<div class="gallery-thumb" style="position:relative">' +
                '<img class="gallery-thumb-img" src="' + cc.thumbnail + '" alt="" style="opacity:0.85">' +
                '<div class="gallery-play-overlay">' +
                  '<div class="play-icon">' + C.icon('play',16) + '</div>' +
                '</div>' +
                '<div style="position:absolute;top:6px;left:6px;background:rgba(0,0,0,.6);border-radius:6px;padding:2px 7px;backdrop-filter:blur(4px)">' +
                  '<span style="color:white;font-size:10px;font-weight:600">' + comp.name + '</span>' +
                '</div>' +
              '</div>' +
              '<div class="gallery-card-body">' +
                '<div class="gallery-card-name">' + comp.name + ' · Creative #' + (comp.creatives.indexOf(cc)+1) + '</div>' +
                '<div class="gallery-card-meta">' +
                  '<span style="font-size:var(--text-xs);color:var(--color-text-muted)">Est. launch: ' + cc.estimatedLaunch + '</span>' +
                  '<span class="badge badge-warning" style="font-size:9px">COMP</span>' +
                '</div>' +
              '</div>' +
            '</div>';
        });
      });
    }

    var gridCards  = state.mode === 'own' ? ownCards : compCards;
    var gridCount  = state.mode === 'own' ? ownData.length : D.competitors.reduce(function(n,c){return n+c.creatives.length;},0);

    var tagOptions = ['all','Fail Concept','Fake Gameplay','Puzzle','Drama','Renovation','Austin','Child','Chris','Katherine Broom'];

    app.innerHTML =
      '<div class="fade-in">' +

      '<div class="page-header">' +
        '<div><div class="page-title">Creative Gallery</div>' +
        '<div class="page-subtitle">' + gridCount + ' ' + (state.mode==='own'?'your creatives':'competitor creatives') + ' · ' + D.AppState.dateRange + '</div></div>' +
      '</div>' +

      // Mode toggle
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">' +
        '<div style="display:flex;border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden">' +
          '<button class="btn btn-sm" id="mode-own" style="border-radius:0;border:none;' + (state.mode==='own'?'background:var(--color-primary);color:white':'background:var(--color-surface);color:var(--color-text-muted)') + '">My Creatives</button>' +
          '<button class="btn btn-sm" id="mode-comp" style="border-radius:0;border:none;' + (state.mode==='competitors'?'background:var(--color-primary);color:white':'background:var(--color-surface);color:var(--color-text-muted)') + '">Competitors <span class="badge badge-beta" style="margin-left:4px">BETA</span></button>' +
        '</div>' +
        (state.mode==='own' ? C.renderNetworkFilter(state.network) : '') +
        (state.mode==='own' ?
          '<select class="filter-select" id="tag-filter">' +
            tagOptions.map(function(t){return '<option value="'+t+'"'+(state.tagFilter===t?' selected':'')+'>'+( t==='all'?'All Tags':t)+'</option>';}).join('') +
          '</select>' : '') +
        '<select class="filter-select" id="sort-select" style="margin-left:auto">' +
          '<option value="score"'+(state.sort==='score'?' selected':'')+'>Best Performing</option>' +
          '<option value="newest"'+(state.sort==='newest'?' selected':'')+'>Newest</option>' +
          '<option value="oldest"'+(state.sort==='oldest'?' selected':'')+'>Oldest</option>' +
          '<option value="spend"'+(state.sort==='spend'?' selected':'')+'>Most Spend</option>' +
        '</select>' +
      '</div>' +

      '<div class="gallery-grid" id="gallery-grid">' + gridCards + '</div>' +

      '</div>';

    bindEvents();
  }

  function bindEvents() {
    var app = document.getElementById('app');
    var C = Components;

    app.querySelector('#mode-own')?.addEventListener('click', function() {
      state.mode = 'own'; render();
    });
    app.querySelector('#mode-comp')?.addEventListener('click', function() {
      state.mode = 'competitors'; render();
    });

    C.bindNetworkFilter(app, function(n) { state.network = n; render(); });

    app.querySelector('#tag-filter')?.addEventListener('change', function() {
      state.tagFilter = this.value; render();
    });
    app.querySelector('#sort-select')?.addEventListener('change', function() {
      state.sort = this.value; render();
    });

    // Own creative clicks
    app.querySelectorAll('.gallery-card[data-id]').forEach(function(card) {
      card.addEventListener('click', function() {
        Router.navigate('/deconstruction', {id: this.dataset.id});
      });
    });

    // Competitor clicks
    app.querySelectorAll('.gallery-card[data-comp-id]').forEach(function(card) {
      card.addEventListener('click', function() {
        Router.navigate('/market');
        setTimeout(function() {
          Components.showToast('Viewing competitor timeline in Market Insights', 'default', 2500);
        }, 400);
      });
    });
  }
})();