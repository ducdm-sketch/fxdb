/* ============================================================
   REPORTING VIEW
   ============================================================ */
window['View_reporting'] = function (params) {
  Charts.destroyAll();
  var app = document.getElementById('app');
  var C = Components;

  // ── Template definitions ──────────────────────────────────
  var templates = [
    {
      id: 'weekly-performance',
      icon: 'bar-chart',
      name: 'Weekly Creative Performance Summary',
      description: 'Top performers, spend summary, and trend highlights for the week.',
      defaultSections: ['performance', 'trends', 'insights'],
      defaultFormat: 'pptx',
    },
    {
      id: 'monthly-ua',
      icon: 'trending-up',
      name: 'Monthly UA Review',
      description: 'Full-funnel metrics, creative fatigue analysis, and budget pacing.',
      defaultSections: ['performance', 'tags', 'insights', 'trends'],
      defaultFormat: 'pdf',
    },
    {
      id: 'tag-breakdown',
      icon: 'tag',
      name: 'Tag Performance Breakdown',
      description: 'Deep dive into which creative elements are driving results.',
      defaultSections: ['tags', 'insights'],
      defaultFormat: 'pdf',
    },
    {
      id: 'competitor-benchmark',
      icon: 'globe',
      name: 'Competitor Benchmarking Report',
      description: 'Side-by-side comparison of your tags vs. market trends.',
      defaultSections: ['competitor', 'tags', 'insights'],
      defaultFormat: 'pptx',
    },
    {
      id: 'concept-deep-dive',
      icon: 'film',
      name: 'Creative Concept Deep Dive',
      description: 'Timeline analysis, AI recommendations, and creative scoring.',
      defaultSections: ['performance', 'insights', 'trends'],
      defaultFormat: 'pptx',
    },
    {
      id: 'ai-generation-summary',
      icon: 'star',
      name: 'AI Generation Summary',
      description: 'Overview of AI-generated creatives, predicted vs. actual performance, and prompt effectiveness.',
      defaultSections: ['performance', 'insights'],
      defaultFormat: 'pdf',
    },
  ];

  var sections = [
    { id: 'performance', label: 'Performance table' },
    { id: 'tags',        label: 'Tag breakdown' },
    { id: 'insights',    label: 'Top insights' },
    { id: 'trends',      label: 'Trend charts' },
    { id: 'competitor',  label: 'Competitor comparison' },
  ];

  var recentReports = [
    { name: 'weekly-creative-report-jan-2026.pptx', type: 'pptx', date: 'Jan 12, 2026', size: '2.4 MB' },
    { name: 'tag-breakdown-dec-2025.pdf',            type: 'pdf',  date: 'Dec 29, 2025', size: '1.1 MB' },
    { name: 'monthly-ua-review-dec-2025.pptx',       type: 'pptx', date: 'Dec 1, 2025',  size: '3.8 MB' },
  ];

  // ── State ─────────────────────────────────────────────────
  var selectedTemplate = templates[0];
  var selectedSections = selectedTemplate.defaultSections.slice();
  var selectedFormat   = selectedTemplate.defaultFormat;
  var genState = 'idle'; // idle | generating | done
  var generatedFile = null;

  // ── Render helpers ────────────────────────────────────────
  function renderTemplateList() {
    return templates.map(function(t){
      var active = selectedTemplate.id === t.id;
      return '<div class="report-template-item" data-tpl-id="' + t.id + '" '
        + 'style="display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3) var(--space-4);border-radius:var(--radius-md);cursor:pointer;transition:background 0.12s;'
        + (active ? 'background:var(--color-primary-light);' : 'background:transparent;') + '">'
        + '<div style="width:32px;height:32px;flex-shrink:0;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-top:1px;'
        + (active ? 'background:var(--color-primary);color:#fff' : 'background:var(--color-surface-hover);color:var(--color-text-muted)') + '">'
        + C.icon(t.icon, 15) + '</div>'
        + '<div style="min-width:0">'
        + '<div style="font-size:var(--text-sm);font-weight:' + (active ? '600' : '500') + ';color:' + (active ? 'var(--color-primary)' : 'var(--color-text)') + ';line-height:1.3;margin-bottom:2px">' + t.name + '</div>'
        + '<div style="font-size:var(--text-xs);color:var(--color-text-muted);line-height:1.4">' + t.description + '</div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  function renderSectionCheckboxes() {
    return sections.map(function(s){
      var checked = selectedSections.indexOf(s.id) !== -1;
      return '<label style="display:flex;align-items:center;gap:var(--space-2);cursor:pointer;padding:var(--space-1) 0">'
        + '<input type="checkbox" class="section-checkbox" data-section-id="' + s.id + '" '
        + (checked ? 'checked' : '') + ' '
        + 'style="width:15px;height:15px;cursor:pointer;accent-color:var(--color-primary)">'
        + '<span style="font-size:var(--text-sm);color:var(--color-text-secondary)">' + s.label + '</span>'
        + '</label>';
    }).join('');
  }

  function renderFormatToggle() {
    return ['pptx','pdf'].map(function(fmt){
      var active = selectedFormat === fmt;
      var label  = fmt === 'pptx' ? 'PowerPoint' : 'PDF';
      return '<button class="format-toggle-btn btn btn-sm" data-fmt="' + fmt + '" '
        + 'style="border-radius:var(--radius-md);border:1px solid ' + (active ? 'var(--color-primary)' : 'var(--color-border)') + ';'
        + 'background:' + (active ? 'var(--color-primary)' : 'var(--color-surface)') + ';'
        + 'color:' + (active ? '#fff' : 'var(--color-text-secondary)') + ';'
        + 'font-weight:' + (active ? '600' : '500') + ';padding:6px 16px;cursor:pointer;transition:all 0.15s">'
        + label + '</button>';
    }).join('');
  }

  function renderGenerateBtn() {
    if (genState === 'idle') {
      return '<button id="generate-btn" class="btn btn-primary btn-lg" style="width:100%;justify-content:center">'
        + C.icon('file-text', 16) + 'Generate Report</button>';
    }
    if (genState === 'generating') {
      return '<button class="btn btn-primary btn-lg" disabled style="width:100%;justify-content:center;opacity:0.8">'
        + '<svg width="16" height="16" viewBox="0 0 16 16" style="animation:spin 0.8s linear infinite" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6" stroke-opacity="0.3"/><path d="M14 8a6 6 0 0 0-6-6"/></svg>'
        + 'Generating…</button>';
    }
    if (genState === 'done') {
      return '<button class="btn btn-sm" disabled style="width:100%;justify-content:center;background:#D1FAE5;color:#065F46;border:none;padding:10px 24px;font-size:var(--text-md)">'
        + '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#065F46" stroke-width="2.5"><path d="M3 8l3.5 3.5L13 4"/></svg>'
        + 'Report ready!</button>';
    }
  }

  function renderGeneratedFileCard() {
    if (genState !== 'done' || !generatedFile) return '';
    var colorMap = { pptx: '#FF6B35', pdf: '#EF4444' };
    var color = colorMap[generatedFile.ext] || '#5B4FE9';
    return '<div class="fade-in" style="margin-top:var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);display:flex;align-items:center;gap:var(--space-3);background:var(--color-surface)">'
      + '<div style="width:38px;height:44px;flex-shrink:0;background:' + color + ';border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#fff;letter-spacing:0.04em">' + generatedFile.ext.toUpperCase() + '</div>'
      + '<div style="flex:1;min-width:0">'
      + '<div style="font-size:var(--text-sm);font-weight:600;color:var(--color-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + generatedFile.name + '</div>'
      + '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">Just now · ' + generatedFile.size + '</div>'
      + '</div>'
      + '<button id="download-report-btn" class="btn btn-secondary btn-sm btn-icon" title="Download">'
      + C.icon('download', 15) + '</button>'
      + '</div>';
  }

  function renderRecentReports() {
    return recentReports.map(function(r){
      var colorMap = { pptx: '#FF6B35', pdf: '#EF4444' };
      var color = colorMap[r.type] || '#5B4FE9';
      return '<div class="recent-report-item" style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;border-bottom:1px solid var(--color-border-light)">'
        + '<div class="report-file-icon ' + r.type + '" style="width:34px;height:40px;flex-shrink:0;background:' + color + ';border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#fff;letter-spacing:0.04em">' + r.type.toUpperCase() + '</div>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:var(--text-sm);font-weight:500;color:var(--color-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + r.name + '</div>'
        + '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">' + r.date + ' · ' + r.size + '</div>'
        + '</div>'
        + '<button class="btn btn-ghost btn-sm btn-icon recent-dl-btn" title="Download">'
        + C.icon('download', 14) + '</button>'
        + '</div>';
    }).join('');
  }

  // ── Full render ───────────────────────────────────────────
  function render() {
    var tpl = selectedTemplate;
    // Generate a plausible filename
    var dateStr = AIGameAnalyzerData.AppState.dateRange.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    var fileBase = tpl.id + '-' + dateStr;
    var ext = selectedFormat;
    var fileSizes = { pptx: '2.8 MB', pdf: '1.4 MB' };

    if (genState === 'done' && !generatedFile) {
      generatedFile = { name: fileBase + '.' + ext, ext: ext, size: fileSizes[ext] };
    }

    app.innerHTML = '<div class="fade-in" style="display:flex;flex-direction:column;gap:var(--space-6)">'

      // Page header
      + '<div>'
      + '<div style="font-size:var(--text-2xl);font-weight:700;color:var(--color-text)">Reporting</div>'
      + '<div class="page-subtitle" style="font-size:var(--text-sm);color:var(--color-text-muted);margin-top:2px">Generate custom reports for your team or stakeholders · ' + AIGameAnalyzerData.AppState.dateRange + '</div>'
      + '</div>'

      // Two-column layout
      + '<div style="display:grid;grid-template-columns:280px 1fr;gap:var(--space-5);align-items:start">'

        // Left: Template list
        + '<div class="card">'
        + '<div class="card-header"><div class="card-title">' + C.icon('file-text', 15) + ' Templates</div></div>'
        + '<div style="padding:var(--space-2)">'
        + renderTemplateList()
        + '</div>'
        + '</div>'

        // Right: Config panel
        + '<div style="display:flex;flex-direction:column;gap:var(--space-5)">'

          // Config card
          + '<div class="card">'
          + '<div class="card-header"><div class="card-title">' + C.icon('settings', 15) + ' Report Configuration</div></div>'
          + '<div class="card-body" style="display:flex;flex-direction:column;gap:var(--space-5)">'

            // Date range
            + '<div>'
            + '<div style="font-size:var(--text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-muted);margin-bottom:var(--space-2)">Date Range</div>'
            + '<div style="display:flex;align-items:center;gap:var(--space-2);padding:8px var(--space-3);background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-text-secondary)">'
            + C.icon('calendar', 14)
            + '<span>' + AIGameAnalyzerData.AppState.dateRange + '</span>'
            + '</div>'
            + '</div>'

            // Sections
            + '<div>'
            + '<div style="font-size:var(--text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-muted);margin-bottom:var(--space-2)">Include Sections</div>'
            + '<div style="display:flex;flex-direction:column;gap:4px">'
            + renderSectionCheckboxes()
            + '</div>'
            + '</div>'

            // Output format
            + '<div>'
            + '<div style="font-size:var(--text-xs);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-muted);margin-bottom:var(--space-2)">Output Format</div>'
            + '<div style="display:flex;gap:var(--space-2)">'
            + renderFormatToggle()
            + '</div>'
            + '</div>'

            // Generate button
            + '<div>'
            + renderGenerateBtn()
            + renderGeneratedFileCard()
            + '</div>'

          + '</div>'
          + '</div>'

          // Recent reports card
          + '<div class="card">'
          + '<div class="card-header"><div class="card-title">' + C.icon('clock', 15) + ' Recent Reports</div></div>'
          + '<div class="card-body" style="padding-top:0;padding-bottom:var(--space-2)">'
          + renderRecentReports()
          + '</div>'
          + '</div>'

        + '</div>'

      + '</div>'
      + '</div>';

    // Inject spin keyframe once
    if (!document.getElementById('spin-style')) {
      var s = document.createElement('style');
      s.id = 'spin-style';
      s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
      document.head.appendChild(s);
    }

    bindEvents();
  }

  function bindEvents() {
    // Template selection
    app.querySelectorAll('.report-template-item').forEach(function(item){
      item.addEventListener('click', function(){
        var tpl = templates.find(function(t){ return t.id === item.dataset.tplId; });
        if (!tpl) return;
        selectedTemplate = tpl;
        selectedSections = tpl.defaultSections.slice();
        selectedFormat   = tpl.defaultFormat;
        genState = 'idle';
        generatedFile = null;
        render();
      });
    });

    // Section checkboxes
    app.querySelectorAll('.section-checkbox').forEach(function(cb){
      cb.addEventListener('change', function(){
        var id = this.dataset.sectionId;
        if (this.checked) {
          if (selectedSections.indexOf(id) === -1) selectedSections.push(id);
        } else {
          selectedSections = selectedSections.filter(function(s){ return s !== id; });
        }
      });
    });

    // Format toggle
    app.querySelectorAll('.format-toggle-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        selectedFormat = this.dataset.fmt;
        genState = 'idle';
        generatedFile = null;
        render();
      });
    });

    // Generate button
    var genBtn = document.getElementById('generate-btn');
    if (genBtn) {
      genBtn.addEventListener('click', function(){
        genState = 'generating';
        generatedFile = null;
        render();
        setTimeout(function(){
          genState = 'done';
          var fileBase = selectedTemplate.id + '-' + dateStr;
          var fileSizes = { pptx: '2.8 MB', pdf: '1.4 MB' };
          generatedFile = { name: fileBase + '.' + selectedFormat, ext: selectedFormat, size: fileSizes[selectedFormat] };
          render();
        }, 2500);
      });
    }

    // Download generated file
    var dlBtn = document.getElementById('download-report-btn');
    if (dlBtn) {
      dlBtn.addEventListener('click', function(){
        C.showToast('In a real product your report would download here', 'default', 3000);
      });
    }

    // Recent downloads
    app.querySelectorAll('.recent-dl-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        C.showToast('In a real product your report would download here', 'default', 3000);
      });
    });
  }

  render();
};
