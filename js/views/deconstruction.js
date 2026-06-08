(function() {
  // compareItems: array of { type: 'own', id } | { type: 'competitor', compId, creativeId }
  var state = { creativeId: null, activeTab: 'recs', compareMode: false, compareItems: [], showRecsOnly: false };

  window['View_deconstruction'] = function(params) {
    Charts.destroyAll();
    if (params && params.id) state.creativeId = params.id;

    // Entry point from Market Insights "Compare →" button
    if (window._pendingCompareItem) {
      state.compareMode = true;
      state.compareItems = [window._pendingCompareItem];
      window._pendingCompareItem = null;
    }

    render();
  };

  // ── Resolve any compareItem to a unified object ─────────
  function resolveItem(item) {
    var D = window.AIGameAnalyzerData;
    if (item.type === 'own') {
      var c = D.getCreative(item.id);
      return c ? { creative: c, isCompetitor: false, compName: null, compColor: null } : null;
    }
    var comp = D.competitors.find(function(c){ return c.id === item.compId; });
    var cc   = comp && comp.creatives.find(function(c){ return c.id === item.creativeId; });
    return (comp && cc) ? { creative: cc, isCompetitor: true, compName: comp.name, compColor: comp.color } : null;
  }

  function renderRecsTimeline(creative, dur) {
    var C = Components;
    var timeMarks = [0, Math.round(dur * 0.25), Math.round(dur * 0.5), Math.round(dur * 0.75), dur];
    
    var items = [
      {
        tag: 'Intro',
        value: 'Trailer',
        start: 0,
        end: 3,
        color: 8,
        action: 'Remove intro',
        badgeType: 'warning',
        kpis: ['CTR']
      },
      {
        tag: 'Room',
        value: 'Bedroom',
        start: 0,
        end: dur,
        color: 2,
        action: 'Replace room with Living Room',
        badgeType: 'replace',
        kpis: ['CTI', 'ROASD7']
      },
      {
        tag: 'Character',
        value: 'Katherine Broom',
        start: 3,
        end: 12,
        color: 1,
        action: 'Replace character with Austin',
        badgeType: 'replace',
        kpis: ['CTI']
      }
    ];

    var rows = items.map(function(item) {
      var left  = (item.start / dur * 100).toFixed(1);
      var width = ((item.end - item.start) / dur * 100).toFixed(1);
      
      var icon = item.badgeType === 'warning' ? 
        '<span style="color:var(--color-danger);font-weight:bold;margin-right:6px">❌</span>' : 
        '<span style="color:var(--color-warning);font-weight:bold;margin-right:6px">🔄</span>';
      
      var badges = item.kpis.map(function(k) {
        return '<span class="badge badge-success" style="font-size:9px;padding:2px 6px">' + k + '</span>';
      }).join(' ');

      return '<div class="timeline-row" style="flex-direction:column;align-items:stretch;padding:10px 16px;gap:6px">' +
        '<div style="display:flex;align-items:center;justify-content:space-between">' +
          '<div style="display:flex;align-items:center;gap:12px">' +
            '<div class="timeline-row-label" style="width:120px;font-weight:700">' + item.tag + '</div>' +
            '<div style="font-size:var(--text-xs);color:var(--color-text-secondary);display:flex;align-items:center">' +
              icon + '<strong style="margin-right:4px">' + item.value + '</strong> · ' + item.action +
            '</div>' +
          '</div>' +
          '<div style="display:flex;gap:4px">' + badges + '</div>' +
        '</div>' +
        '<div class="timeline-row-track" style="margin-left:0;height:12px">' +
          '<div class="timeline-bar color-' + item.color + '" style="left:' + left + '%;width:' + width + '%;height:100%">' +
            '<span class="timeline-bar-label" style="font-size:8px;line-height:12px">' + item.value + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="timeline-container">' +
      '<div class="timeline-time-labels" style="padding-left:140px">' +
        timeMarks.map(function(t){ return '<span class="timeline-time-label">' + t + 's</span>'; }).join('') +
      '</div>' +
      rows +
    '</div>';
  }

  // ── Main single-creative view ────────────────────────────
  function render() {
    var D = window.AIGameAnalyzerData; var C = Components;
    var app = document.getElementById('app');
    var creative = state.creativeId ? D.getCreative(state.creativeId) : null;

    if (!creative && !state.compareMode) { renderSelector(); return; }
    if (state.compareMode) { renderCompare(); return; }

    var dur = creative.tags.duration || 15;

    app.innerHTML =
      '<div class="fade-in">' +
      '<div class="page-header">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
          '<button class="btn btn-secondary btn-sm" onclick="state_decon_back()">' + C.icon('arrow-left',13) + ' Back</button>' +
          '<div>' +
            '<div class="page-title" style="font-size:var(--text-lg)">' + creative.name + '</div>' +
            '<div class="page-subtitle">' + D.renderNetworkDots(creative.networks) + ' &nbsp;' + creative.age + ' · ' + dur + 's</div>' +
          '</div>' +
        '</div>' +
        '<div class="page-actions">' +
          '<button class="btn btn-secondary btn-sm" id="btn-compare">' + C.icon('columns',13) + ' Compare</button>' +
          '<button class="btn btn-primary btn-sm" onclick="Router.navigate(\'/combinations\')">' + C.icon('shuffle',13) + ' Test Combination</button>' +
        '</div>' +
      '</div>' +

      '<div style="display:grid;grid-template-columns:260px 1fr 220px;gap:16px;align-items:start">' +

        // Left: video mock
        '<div>' +
          '<div style="background:#111;border-radius:var(--radius-lg);overflow:hidden;aspect-ratio:9/16;display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:12px">' +
            '<img src="' + creative.thumbnail + '" style="width:100%;height:100%;object-fit:cover;opacity:.9">' +
            '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">' +
              '<div class="play-icon" style="width:52px;height:52px;cursor:pointer" id="play-btn">' + C.icon('play',22) + '</div>' +
            '</div>' +
            '<div style="position:absolute;bottom:10px;left:0;right:0;padding:0 12px">' +
              '<div style="background:rgba(0,0,0,.6);border-radius:4px;overflow:hidden;height:4px;cursor:pointer" id="progress-track">' +
                '<div id="progress-bar" style="height:100%;width:0%;background:white;border-radius:4px;transition:width .1s linear"></div>' +
              '</div>' +
              '<div style="display:flex;justify-content:space-between;margin-top:4px">' +
                '<span id="time-display" style="color:white;font-size:10px;font-weight:600">0:00</span>' +
                '<span style="color:white;font-size:10px">0:' + (dur<10?'0'+dur:dur) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div style="font-size:var(--text-xs);color:var(--color-text-muted);line-height:1.5">' +
            '<div><strong>Launch:</strong> ' + creative.launchDate + '</div>' +
            '<div><strong>Age:</strong> ' + creative.age + '</div>' +
            '<div><strong>Instances:</strong> ' + creative.instances + '</div>' +
            '<div style="margin-top:6px">' + D.renderNetworkDots(creative.networks) + '</div>' +
          '</div>' +
        '</div>' +

        // Center: timeline + tabs
        '<div>' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">' +
            '<div style="font-size:var(--text-sm);font-weight:600;color:var(--color-text)">Tag Timeline</div>' +
            '<label class="toggle-group" style="font-size:12px;margin-left:auto">' +
              '<span>Show only recommendations</span>' +
              '<label class="toggle"><input type="checkbox" id="toggle-recs-only"' + (state.showRecsOnly ? ' checked' : '') + '><div class="toggle-track"></div><div class="toggle-thumb"></div></label>' +
            '</label>' +
          '</div>' +
          (state.showRecsOnly ? 
            // Render the AI Recommendations Summary Card
            '<div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:14px;margin-bottom:14px;display:flex;flex-direction:column;gap:10px">' +
              '<div style="display:flex;align-items:center;gap:8px">' +
                '<div style="width:22px;height:22px;border-radius:50%;background:rgba(91,79,233,0.1);color:var(--color-primary);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700">✦</div>' +
                '<span style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:.05em">AI Recommendations Summary</span>' +
              '</div>' +
              '<div style="display:flex;flex-direction:column;gap:8px">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--color-bg);border:1px solid var(--color-border-light);border-radius:var(--radius-md)">' +
                  '<div style="display:flex;align-items:center;gap:10px">' +
                    '<span style="font-size:12px">➔ 5s</span>' +
                    '<div style="font-size:var(--text-sm);font-weight:600;color:var(--color-text)">Game Concept: Drama</div>' +
                    '<span style="font-size:11px;color:var(--color-text-muted)">Add game concept to first 5 seconds</span>' +
                  '</div>' +
                  '<span class="badge badge-success" style="font-size:9px">CTI</span>' +
                '</div>' +
                '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--color-bg);border:1px solid var(--color-border-light);border-radius:var(--radius-md)">' +
                  '<div style="display:flex;align-items:center;gap:10px">' +
                    '<span style="font-size:12px">➕</span>' +
                    '<div style="font-size:var(--text-sm);font-weight:600;color:var(--color-text)">Visual Element: Hand</div>' +
                    '<span style="font-size:11px;color:var(--color-text-muted)">Add hand tutorial visual element</span>' +
                  '</div>' +
                  '<div style="display:flex;gap:4px">' +
                    '<span class="badge badge-success" style="font-size:9px">CTI</span>' +
                    '<span class="badge badge-success" style="font-size:9px">ROAS D7</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            renderRecsTimeline(creative, dur) :
            C.renderTimeline(creative.timeline, dur)
          ) +
          '<div style="margin-top:16px">' +
            C.renderTabs([
              {id:'recs',   label:'AI Recommendations'},
              {id:'trends', label:'Tag Trends'},
            ], state.activeTab) +
            '<div id="tab-content"></div>' +
          '</div>' +
        '</div>' +

        // Right: KPI scores
        '<div class="card" style="padding:16px">' +
          '<div style="font-size:var(--text-sm);font-weight:700;color:var(--color-text);margin-bottom:12px">KPI Scores</div>' +
          C.renderKPIScores(creative.metrics) +
          '<div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--color-border-light)">' +
            D.renderStars(creative.aiGameAnalyzerScore) +
            '<div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:4px">AI Game Analyzer Score ' + creative.aiGameAnalyzerScore + ' / 5</div>' +
          '</div>' +
        '</div>' +

      '</div>' +
      '</div>';

    renderTab(creative);
    bindDeconEvents(creative, dur);
  }

  // ── Compare mode ─────────────────────────────────────────
  function renderCompare() {
    var D = window.AIGameAnalyzerData; var C = Components;
    var app = document.getElementById('app');

    var resolved = state.compareItems.map(resolveItem).filter(Boolean);

    // ── Build selector panel ────────────────────────────────
    // Section 1: own creatives
    var ownOptions = D.getAppCreatives().map(function(c) {
      var checked  = state.compareItems.some(function(x){ return x.type==='own' && x.id===c.id; });
      var disabled = !checked && state.compareItems.length >= 5;
      return '<label style="display:flex;align-items:center;gap:8px;padding:5px 0;cursor:' + (disabled?'not-allowed':'pointer') + ';opacity:' + (disabled?'.4':'1') + '">' +
        '<input type="checkbox" class="compare-check" data-type="own" data-id="' + c.id + '"' + (checked?' checked':'') + (disabled?' disabled':'') + ' style="flex-shrink:0">' +
        '<img src="' + c.thumbnail + '" style="width:28px;height:28px;border-radius:4px;object-fit:cover;flex-shrink:0">' +
        '<span style="font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + c.name + '</span>' +
      '</label>';
    }).join('');

    // Section 2: competitor creatives grouped by competitor
    var compOptions = D.competitors.map(function(comp) {
      var items = comp.creatives.map(function(cc, idx) {
        var checked  = state.compareItems.some(function(x){ return x.type==='competitor' && x.creativeId===cc.id; });
        var disabled = !checked && state.compareItems.length >= 5;
        return '<label style="display:flex;align-items:center;gap:8px;padding:5px 0 5px 4px;cursor:' + (disabled?'not-allowed':'pointer') + ';opacity:' + (disabled?'.4':'1') + '">' +
          '<input type="checkbox" class="compare-check" data-type="competitor" data-comp-id="' + comp.id + '" data-creative-id="' + cc.id + '"' + (checked?' checked':'') + (disabled?' disabled':'') + ' style="flex-shrink:0">' +
          '<img src="' + cc.thumbnail + '" style="width:28px;height:28px;border-radius:4px;object-fit:cover;flex-shrink:0;outline:2px solid ' + comp.color + ';outline-offset:1px">' +
          '<span style="font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Creative #' + (idx+1) + ' · ' + cc.duration + 's</span>' +
        '</label>';
      }).join('');

      return '<div style="margin-bottom:10px">' +
        '<div style="font-size:10px;font-weight:700;color:' + comp.color + ';padding:3px 0 4px;border-bottom:1px solid var(--color-border-light);margin-bottom:2px;display:flex;align-items:center;gap:5px">' +
          '<span style="width:8px;height:8px;border-radius:50%;background:' + comp.color + ';display:inline-block;flex-shrink:0"></span>' + comp.name +
        '</div>' +
        items +
      '</div>';
    }).join('');

    var selectorHTML =
      '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-text-muted);margin-bottom:8px">My Creatives</div>' +
      ownOptions +
      '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-text-muted);margin:14px 0 8px">Competitors</div>' +
      compOptions;

    // ── Build shared-tags banner ────────────────────────────
    var sharedBanner = '';
    if (resolved.length >= 2) {
      var tagSets = resolved.map(function(item) {
        return (item.creative.timeline || []).map(function(t){ return t.tag + ':' + t.value; });
      });
      var shared = tagSets[0].filter(function(tv) {
        return tagSets.every(function(set){ return set.indexOf(tv) !== -1; });
      });
      var sharedChips = shared.length
        ? shared.map(function(tv){
            return '<span style="font-size:10px;padding:2px 8px;border-radius:999px;background:var(--color-success-bg);color:var(--color-success);font-weight:600">' + tv.split(':')[1] + '</span>';
          }).join('')
        : '<span style="font-size:11px;color:var(--color-text-muted)">No shared tags</span>';

      sharedBanner =
        '<div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px">' +
          '<span style="font-size:11px;font-weight:600;color:var(--color-text-muted);white-space:nowrap">Shared tags:</span>' +
          '<div style="display:flex;gap:5px;flex-wrap:wrap">' + sharedChips + '</div>' +
        '</div>';
    }

    // ── Build compare columns ───────────────────────────────
    var cols = resolved.length > 0
      ? resolved.map(function(item, colIdx) {
          var c      = item.creative;
          var isComp = item.isCompetitor;
          var dur    = (c.tags && c.tags.duration) ? c.tags.duration : (c.duration || 15);
          var colLabel = isComp
            ? item.compName + ' · Creative #' + (function(){
                var comp = D.competitors.find(function(x){ return x.id === state.compareItems.filter(function(x){ return x.type==='competitor'; })[0]?.compId; });
                return colIdx + 1;
              }())
            : c.name;

          // Tag values for this creative
          var myTags = (c.timeline || []).map(function(t){ return t.tag + ':' + t.value; });
          // Tags shared with all other selected creatives
          var otherSets = resolved.filter(function(_, i){ return i !== colIdx; }).map(function(r){
            return (r.creative.timeline || []).map(function(t){ return t.tag + ':' + t.value; });
          });
          var sharedWithAll = resolved.length >= 2
            ? myTags.filter(function(tv){
                return otherSets.every(function(set){ return set.indexOf(tv) !== -1; });
              })
            : [];

          // Build mini timeline with highlight overlay
          var timelineHtml = C.renderTimeline(c.timeline, dur);

          return '<div style="flex:1;min-width:180px;border-left:3px solid ' + (isComp ? item.compColor : 'var(--color-primary)') + ';padding-left:12px">' +

            // Thumbnail
            '<div style="background:#111;border-radius:var(--radius-md);overflow:hidden;aspect-ratio:16/9;margin-bottom:8px;position:relative">' +
              '<img src="' + c.thumbnail + '" style="width:100%;height:100%;object-fit:cover;opacity:' + (isComp?.7:.85) + '">' +
              (isComp
                ? '<div style="position:absolute;top:6px;left:6px;background:' + item.compColor + ';color:white;font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px">' + item.compName + '</div>'
                : '') +
              '<div style="position:absolute;bottom:6px;left:6px;background:rgba(0,0,0,.6);border-radius:4px;padding:2px 6px;color:white;font-size:10px;font-weight:600">' + dur + 's</div>' +
            '</div>' +

            // Name + type badge
            '<div style="font-size:11px;font-weight:600;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:5px">' +
              (isComp
                ? '<span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;background:' + item.compColor + ';color:white;flex-shrink:0">COMP</span>'
                : '<span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;background:var(--color-primary-light);color:var(--color-primary);flex-shrink:0">MINE</span>') +
              '<span style="overflow:hidden;text-overflow:ellipsis">' + (isComp ? item.compName + ' · #' + (colIdx+1) : c.name) + '</span>' +
            '</div>' +

            // KPI scores (own) or locked (competitor)
            (isComp
              ? '<div style="font-size:11px;padding:12px 8px;background:var(--color-bg);border:1px solid var(--color-border-light);border-radius:var(--radius-sm);text-align:center;color:var(--color-text-muted);margin-bottom:10px;display:flex;flex-direction:column;align-items:center;gap:4px">' +
                  C.icon('lock', 16) +
                  '<div style="font-size:10px;line-height:1.4">No KPI data<br>competitor creative</div>' +
                '</div>'
              : '<div style="font-size:11px;display:flex;flex-direction:column;gap:3px;margin-bottom:10px">' +
                  kpiRow('IPM',     c.metrics.ipm.toFixed(1)) +
                  kpiRow('CTR',     D.fmtPct(c.metrics.ctr)) +
                  kpiRow('ROAS D7', D.fmtPct(c.metrics.roasd7)) +
                  kpiRow('Spend',   D.fmtCurrency(c.metrics.spend)) +
                '</div>'
            ) +

            // Timeline
            '<div style="font-size:10px;font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">Timeline</div>' +
            timelineHtml +

          '</div>';
        }).join('')
      : '<div style="color:var(--color-text-muted);font-size:var(--text-sm);padding:40px;text-align:center;width:100%">Select creatives from the panel to compare</div>';

    // ── Render full page ────────────────────────────────────
    app.innerHTML =
      '<div class="fade-in">' +
      '<div class="page-header">' +
        '<div style="display:flex;align-items:center;gap:10px">' +
          '<button class="btn btn-secondary btn-sm" onclick="state_decon_exitcompare()">' + C.icon('x',13) + ' Exit Compare</button>' +
          '<div>' +
            '<div class="page-title">Compare Creatives</div>' +
            '<div class="page-subtitle">' + resolved.length + ' / 5 selected &nbsp;·&nbsp; ' +
              '<span style="color:var(--color-primary)">' + resolved.filter(function(r){ return !r.isCompetitor; }).length + ' mine</span>' +
              ' &nbsp;·&nbsp; ' +
              '<span style="color:#F59E0B">' + resolved.filter(function(r){ return r.isCompetitor; }).length + ' competitor</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:230px 1fr;gap:16px">' +

        // Selector panel
        '<div class="card" style="padding:14px;max-height:calc(100vh - 160px);overflow-y:auto">' +
          '<div style="font-size:var(--text-sm);font-weight:600;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">' +
            '<span>Select (max 5)</span>' +
            '<span style="font-size:var(--text-xs);color:var(--color-text-muted)">' + state.compareItems.length + '/5</span>' +
          '</div>' +
          selectorHTML +
        '</div>' +

        // Compare columns
        '<div style="display:flex;flex-direction:column;gap:0;min-width:0">' +
          sharedBanner +
          '<div style="display:flex;gap:14px;overflow-x:auto;align-items:start">' + cols + '</div>' +
        '</div>' +

      '</div>' +
      '</div>';

    // Bind checkboxes
    app.querySelectorAll('.compare-check').forEach(function(chk) {
      chk.addEventListener('change', function() {
        var type = this.dataset.type;
        if (type === 'own') {
          var id = this.dataset.id;
          if (this.checked) {
            if (state.compareItems.length < 5) state.compareItems.push({ type: 'own', id: id });
          } else {
            state.compareItems = state.compareItems.filter(function(x){ return !(x.type==='own' && x.id===id); });
          }
        } else {
          var compId     = this.dataset.compId;
          var creativeId = this.dataset.creativeId;
          if (this.checked) {
            if (state.compareItems.length < 5) state.compareItems.push({ type: 'competitor', compId: compId, creativeId: creativeId });
          } else {
            state.compareItems = state.compareItems.filter(function(x){ return !(x.type==='competitor' && x.creativeId===creativeId); });
          }
        }
        renderCompare();
      });
    });
  }

  // ── Tab content ──────────────────────────────────────────
  function renderTab(creative) {
    var D = window.AIGameAnalyzerData; var C = Components;
    var el = document.getElementById('tab-content');
    if (!el) return;
    if (state.activeTab === 'recs') {
      el.innerHTML = '<div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">' +
        creative.recommendations.map(function(r) {
          var isPositive = /Replicate|Scale|Top|Expand|hero|✦/.test(r);
          var isWarn     = /below|worst|Sunset|pause/.test(r);
          var badge = isWarn
            ? '<span class="badge badge-danger" style="font-size:9px">⚠ Action</span>'
            : isPositive
            ? '<span class="badge badge-success" style="font-size:9px">✓ Insight</span>'
            : '<span class="badge badge-primary" style="font-size:9px">→ Suggestion</span>';
          return '<div class="rec-card">' +
            '<div style="margin-bottom:6px">' + badge + '</div>' +
            '<div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.5">' + r + '</div>' +
          '</div>';
        }).join('') +
      '</div>';
    } else {
      var trend = D.generateTagTrend(creative.metrics.ipm, 12);
      el.innerHTML = '<div class="chart-container chart-h-240" style="margin-top:8px"><canvas id="decon-trend-chart"></canvas></div>';
      setTimeout(function(){ Charts.createDualTrendChart('decon-trend-chart', trend); }, 80);
    }
  }

  // ── Creative selector (empty state) ─────────────────────
  function renderSelector() {
    var D = window.AIGameAnalyzerData; var C = Components;
    var app = document.getElementById('app');
    var cards = D.getAppCreatives().map(function(c) {
      return '<div class="gallery-card" data-id="' + c.id + '" style="cursor:pointer">' +
        '<div class="gallery-thumb">' +
          '<img class="gallery-thumb-img" src="' + c.thumbnail + '" alt="">' +
          '<div class="gallery-play-overlay"><div class="play-icon">' + C.icon('play',14) + '</div></div>' +
        '</div>' +
        '<div class="gallery-card-body">' +
          '<div class="gallery-card-name">' + c.name + '</div>' +
          '<div class="gallery-card-meta">' + D.renderNetworkDots(c.networks) +
            '<span style="font-size:var(--text-xs);color:var(--color-text-muted)">' + c.metrics.ipm.toFixed(1) + ' IPM</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    app.innerHTML =
      '<div class="fade-in">' +
      '<div class="page-header">' +
        '<div>' +
          '<div class="page-title">Video Deconstruction</div>' +
          '<div class="page-subtitle">Select a creative to begin, or&nbsp;' +
            '<button class="btn btn-secondary btn-sm" style="display:inline-flex" onclick="state_decon_startcompare()">' + C.icon('columns',12) + ' Compare mode</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="gallery-grid">' + cards + '</div>' +
      '</div>';

    app.querySelectorAll('.gallery-card[data-id]').forEach(function(card) {
      card.addEventListener('click', function() {
        state.creativeId = this.dataset.id;
        render();
      });
    });
  }

  // ── Shared KPI row helper ────────────────────────────────
  function kpiRow(label, val) {
    return '<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid var(--color-border-light)">' +
      '<span style="color:var(--color-text-muted)">' + label + '</span>' +
      '<span style="font-weight:600">' + val + '</span>' +
    '</div>';
  }

  // ── Event binding for single-creative view ───────────────
  function bindDeconEvents(creative, dur) {
    var C = Components;

    C.bindTabs(document.getElementById('app'), function(tab) {
      state.activeTab = tab;
      renderTab(creative);
    });

    document.getElementById('btn-compare')?.addEventListener('click', function() {
      state.compareMode = true;
      state.compareItems = [{ type: 'own', id: creative.id }];
      renderCompare();
    });

    document.getElementById('toggle-recs-only')?.addEventListener('change', function() {
      state.showRecsOnly = this.checked;
      render();
    });

    // Mock video playback
    var playing = false; var progress = 0; var timer = null;
    var playBtn  = document.getElementById('play-btn');
    var bar      = document.getElementById('progress-bar');
    var timeDisp = document.getElementById('time-display');
    if (playBtn) {
      playBtn.addEventListener('click', function() {
        playing = !playing;
        if (playing) {
          playBtn.innerHTML = Components.icon('pause', 22);
          timer = setInterval(function() {
            progress = Math.min(100, progress + (100 / (dur * 10)));
            if (bar)      bar.style.width = progress + '%';
            var sec = Math.floor(progress / 100 * dur);
            if (timeDisp) timeDisp.textContent = '0:' + (sec < 10 ? '0' + sec : sec);
            if (progress >= 100) {
              clearInterval(timer); playing = false; progress = 0;
              playBtn.innerHTML = Components.icon('play', 22);
            }
          }, 100);
        } else {
          clearInterval(timer);
          playBtn.innerHTML = Components.icon('play', 22);
        }
      });
    }
  }

  // ── Globals for inline onclick ───────────────────────────
  window.state_decon_back         = function() { state.creativeId = null; state.compareMode = false; state.compareItems = []; render(); };
  window.state_decon_exitcompare  = function() { state.compareMode = false; render(); };
  window.state_decon_startcompare = function() { state.compareMode = true; state.compareItems = []; renderCompare(); };

})();
