function ViewOverview(params) {
  Charts.destroyAll();
  var D = window.AIGameAnalyzerData;
  var C = Components;
  var ov = D.conceptsOverview;
  var ratio = D.getAppCreatives().length / D.creatives.length;
  var activeConcepts = Math.round(ov.activeConcepts * ratio);
  var launchedConcepts = Math.round(ov.launchedConcepts * ratio);
  var totalInstalls = Math.round(ov.totalInstalls * ratio);
  var heroConcepts = Math.round(ov.heroConcepts * ratio) || 1;
  var app = document.getElementById('app');

  app.innerHTML =
    '<div class="fade-in">' +

    // ── Page header
    '<div class="page-header">' +
      '<div>' +
        '<div class="page-title">Overview</div>' +
        '<div class="page-subtitle">Creative performance summary · ' + D.AppState.dateRange + '</div>' +
      '</div>' +
      '<div class="page-actions">' +
        '<button class="btn btn-secondary btn-sm" onclick="ViewOverview()">' + C.icon('refresh-cw',13) + ' Refresh</button>' +
        '<a href="#/reporting" class="btn btn-primary btn-sm" style="text-decoration:none">' + C.icon('file-text',13) + ' Generate Report</a>' +
      '</div>' +
    '</div>' +

    // ── Stat cards
    '<div class="stats-grid">' +
      statCard('Active Concepts', activeConcepts + ' / ' + launchedConcepts, '+' + ov.activeDelta + '%', true) +
      statCard('Avg Creative Age', ov.avgAge, '+' + ov.avgAgeDelta + '%', false, 'Age trending older') +
      statCard('Avg Age — Top 10', ov.avgAgeTop10, '+' + ov.avgAgeTop10Delta + '%', false) +
      statCard('AI Studio Creatives', '3 generated', null, null, '2 video ads · 1 playable ad') +
    '</div>' +

    // ── Trend chart + concepts sidebar
    '<div style="display:grid;grid-template-columns:1fr 300px;gap:20px;margin-bottom:20px">' +

      // Chart card
      '<div class="chart-card">' +
        '<div class="chart-card-header">' +
          '<div>' +
            '<div style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">' +
              '<select class="chart-metric-select" id="trend-metric-select" style="margin-left:0">' +
                '<option value="installs" selected>Installs</option>' +
                '<option value="spend">Spend</option>' +
                '<option value="ctr">CTR</option>' +
              '</select>' +
            '</div>' +
            '<div class="chart-card-value">' + totalInstalls.toLocaleString() + '</div>' +
            '<div class="chart-card-delta up">' + C.icon('trending-up',12) + ' +' + ov.installsDelta + '% vs previous 60 days</div>' +
          '</div>' +
          '<div style="font-size:var(--text-md);font-weight:600;color:var(--color-text)">Trend</div>' +
        '</div>' +
        '<div class="chart-container chart-h-280" style="margin-top:16px">' +
          '<canvas id="trend-chart"></canvas>' +
        '</div>' +
      '</div>' +

      // Concepts sidebar
      '<div style="display:flex;flex-direction:column;gap:12px">' +
        conceptCard('Active / Launched', activeConcepts + ' / ' + launchedConcepts, '+' + ov.activeDelta + '%', true) +
        conceptCard('Avg Age', ov.avgAge, '+' + ov.avgAgeDelta + '%', true) +
        conceptCard('Avg Age Top 10', ov.avgAgeTop10, '+' + ov.avgAgeTop10Delta + '%', true) +
        conceptCard('AI Studio Creatives', '3 generated', null, null) +
      '</div>' +

    '</div>' +

    // ── Top Insights
    '<div class="card" style="margin-bottom:20px">' +
      '<div class="card-header">' +
        '<div class="card-title">' + C.icon('zap',16) + ' Top Insights</div>' +
        '<a href="#/combinations" class="btn btn-ghost btn-sm" style="text-decoration:none;color:var(--color-primary)">View all ' + C.icon('arrow-right',13) + '</a>' +
      '</div>' +
      '<div class="card-body" style="display:flex;flex-direction:column;gap:10px">' +
        D.recommendations.map(function(r,i){ return C.renderInsightCard(r,i); }).join('') +
      '</div>' +
    '</div>' +

    // ── Quick links
    '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">' +
      quickLink('#/performance', 'bar-chart-2', 'Performance', 'Analyze creatives by KPI') +
      quickLink('#/gallery', 'grid', 'Creative Gallery', 'Browse all video assets') +
      quickLink('#/tags', 'tag', 'Tags Performance', 'Explore tag-level data') +
      quickLink('#/combinations', 'shuffle', 'Combinations', 'Find winning element mixes') +
      quickLink('#/ai-studio', 'star', 'AI Studio', 'Generate video and playable ads') +
    '</div>' +

    '</div>';

  // Init trend chart
  requestAnimationFrame(function() {
    // Initial dataset (installs)
    const initialDatasets = [
      { label: 'Google',  data: D.trendData.google,     color: '#4285F4' },
      { label: 'Unity',   data: D.trendData.unity,      color: '#F59E0B' },
      { label: 'Vungle',  data: D.trendData.vungle,     color: '#10B981' },
    ];
    Charts.createTrendChart('trend-chart', D.trendData.dates, initialDatasets);

    // Metric switcher
    var sel = document.getElementById('trend-metric-select');
    if (sel) sel.addEventListener('change', function() {
      const metric = this.value; // 'installs' | 'spend' | 'ctr'
      const hero = D.metricHeroValues[metric];

      // Update hero number display
      const cardVal = document.querySelector('.chart-card-value');
      const cardDelta = document.querySelector('.chart-card-delta');
      if (cardVal) {
        if (metric === 'installs') cardVal.textContent = totalInstalls.toLocaleString();
        else cardVal.textContent = hero.value;
      }
      if (cardDelta) {
        cardDelta.innerHTML = C.icon('trending-up', 12) + ' ' + hero.delta;
      }

      // Rebuild chart with new data
      Charts.destroyAll();
      const datasets = metric === 'installs'
        ? [
            { label: 'Google',  data: D.trendData.google,     color: '#4285F4' },
            { label: 'Unity',   data: D.trendData.unity,      color: '#F59E0B' },
            { label: 'Vungle',  data: D.trendData.vungle,     color: '#10B981' },
          ]
        : metric === 'spend'
        ? [
            { label: 'Google',  data: D.trendData.spendGoogle, color: '#4285F4' },
            { label: 'Unity',   data: D.trendData.spendUnity,  color: '#F59E0B' },
            { label: 'Vungle',  data: D.trendData.spendVungle, color: '#10B981' },
          ]
        : [
            { label: 'Google',  data: D.trendData.ctrGoogle,   color: '#4285F4' },
            { label: 'Unity',   data: D.trendData.ctrUnity,    color: '#F59E0B' },
            { label: 'Vungle',  data: D.trendData.ctrVungle,   color: '#10B981' },
          ];

      Charts.createTrendChart('trend-chart', D.trendData.dates, datasets);
    });
  });

  // Insight card clicks
  app.querySelectorAll('.insight-card').forEach(function(card) {
    card.addEventListener('click', function() {
      Router.navigate('/combinations');
    });
  });
}

function statCard(label, value, delta, deltaUp, sub) {
  var dHtml = delta
    ? '<span class="stat-card-delta ' + (deltaUp ? 'up' : 'down') + '">' + delta + '</span>'
    : '';
  return '<div class="stat-card">' +
    '<div class="stat-card-label">' + label + '</div>' +
    '<div class="stat-card-value">' + value + '</div>' +
    dHtml +
    (sub ? '<div class="stat-card-sub">' + sub + '</div>' : '') +
    '</div>';
}

function conceptCard(label, value, delta, deltaUp) {
  return '<div class="card" style="padding:14px 16px">' +
    '<div style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">' + label + '</div>' +
    '<div style="font-size:var(--text-xl);font-weight:700;color:var(--color-text)">' + value + '</div>' +
    (delta ? '<div style="font-size:var(--text-xs);font-weight:600;color:' + (deltaUp?'var(--color-success)':'var(--color-danger)') + ';margin-top:4px">' + delta + '</div>' : '') +
    '</div>';
}

function quickLink(href, iconName, title, desc) {
  return '<a href="' + href + '" class="card" style="padding:16px;text-decoration:none;display:block;cursor:pointer;transition:box-shadow var(--transition-normal),transform var(--transition-normal)" ' +
    'onmouseover="this.style.boxShadow=\'var(--shadow-md)\';this.style.transform=\'translateY(-2px)\'" ' +
    'onmouseout="this.style.boxShadow=\'\';this.style.transform=\'\'">' +
    '<div style="width:36px;height:36px;background:var(--color-primary-light);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-primary);margin-bottom:10px">' +
      Components.icon(iconName, 18) +
    '</div>' +
    '<div style="font-size:var(--text-sm);font-weight:600;color:var(--color-text);margin-bottom:3px">' + title + '</div>' +
    '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">' + desc + '</div>' +
    '</a>';
}