/* ============================================================
   COMPONENTS.JS — Reusable render functions
   ============================================================ */

window.Components = (function () {
  const D = window.AIGameAnalyzerData;

  /* ── Toast ──────────────────────────────────────────────── */
  function showToast(message, type = 'default', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 300ms';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ── Modal ──────────────────────────────────────────────── */
  function showModal({ title, content, onClose }) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';

    const modal = document.createElement('div');
    modal.className = 'modal fade-in';
    modal.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button class="btn btn-ghost btn-icon btn-sm" id="modal-close">
          ${icon('x', 16)}
        </button>
      </div>
      <div class="modal-body">${content}</div>
    `;

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    const close = () => {
      backdrop.remove();
      if (onClose) onClose();
    };

    backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
    modal.querySelector('#modal-close')?.addEventListener('click', close);

    return { close };
  }

  /* ── Slide Panel ─────────────────────────────────────────── */
  function showSlidePanel({ title, content, width = '420px' }) {
    // Remove existing
    document.getElementById('slide-panel-instance')?.remove();
    document.getElementById('slide-panel-backdrop-instance')?.remove();

    const backdrop = document.createElement('div');
    backdrop.className = 'slide-panel-backdrop';
    backdrop.id = 'slide-panel-backdrop-instance';

    const panel = document.createElement('div');
    panel.className = 'slide-panel';
    panel.id = 'slide-panel-instance';
    panel.style.width = width;
    panel.innerHTML = `
      <div class="slide-panel-header">
        <div style="font-size:var(--text-lg);font-weight:700;color:var(--color-text)">${title}</div>
        <button class="btn btn-ghost btn-icon btn-sm" id="slide-panel-close">
          ${icon('x', 16)}
        </button>
      </div>
      <div class="slide-panel-body">${content}</div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    requestAnimationFrame(() => panel.classList.add('open'));

    const close = () => {
      panel.classList.remove('open');
      setTimeout(() => { panel.remove(); backdrop.remove(); }, 300);
    };

    backdrop.addEventListener('click', close);
    panel.querySelector('#slide-panel-close')?.addEventListener('click', close);

    return { close };
  }

  /* ── Dropdown ────────────────────────────────────────────── */
  function showDropdown(anchorEl, items, onSelect) {
    // Remove any open dropdown
    closeDropdowns();

    const rect = anchorEl.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = 'dropdown-overlay';
    overlay.id = 'active-dropdown-overlay';

    const menu = document.createElement('div');
    menu.className = 'dropdown-menu';
    menu.id = 'active-dropdown-menu';
    menu.style.cssText = `position:fixed;top:${rect.bottom + 4}px;left:${rect.left}px;min-width:${Math.max(rect.width, 160)}px`;

    items.forEach(item => {
      if (item.divider) {
        menu.insertAdjacentHTML('beforeend', '<div class="dropdown-divider"></div>');
        return;
      }
      const div = document.createElement('div');
      div.className = `dropdown-item${item.active ? ' active' : ''}`;
      div.innerHTML = `${item.icon ? `<span style="color:var(--color-text-muted)">${item.icon}</span>` : ''}${item.label}`;
      div.addEventListener('click', () => {
        closeDropdowns();
        if (onSelect) onSelect(item);
      });
      menu.appendChild(div);
    });

    overlay.addEventListener('click', closeDropdowns);
    document.body.appendChild(overlay);
    document.body.appendChild(menu);
  }

  function closeDropdowns() {
    document.getElementById('active-dropdown-overlay')?.remove();
    document.getElementById('active-dropdown-menu')?.remove();
  }

  /* ── Network filter group ────────────────────────────────── */
  function renderNetworkFilter(selected, onChange) {
    const networks = [
      { id: 'all',    label: 'All Networks' },
      { id: 'google', label: 'Google' },
      { id: 'unity',  label: 'Unity' },
      { id: 'meta',   label: 'Meta' },
      { id: 'tiktok', label: 'TikTok' },
      { id: 'vungle', label: 'Vungle' },
    ];
    return `<div class="network-filter-group" id="network-filter">
      ${networks.map(n => `
        <button class="network-pill${selected === n.id ? ' active' : ''}" data-network="${n.id}">
          ${n.id !== 'all' ? `<span class="network-dot ${n.id}" style="width:12px;height:12px;font-size:7px">${n.label[0]}</span>` : ''}
          ${n.label}
        </button>`).join('')}
    </div>`;
  }

  function bindNetworkFilter(container, onChange) {
    container.querySelectorAll('.network-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.network-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (onChange) onChange(btn.dataset.network);
      });
    });
  }

  /* ── Insight card ────────────────────────────────────────── */
  function renderInsightCard(rec, idx) {
    const creative = D.creatives[idx % D.creatives.length];
    const dirIcon = rec.direction === 'up'
      ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="18 15 12 9 6 15"/></svg>`
      : `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`;

    const kpiColor = rec.direction === 'up' ? 'badge-success' : rec.direction === 'warning' ? 'badge-warning' : 'badge-danger';
    const tagLabel = rec.tag || (rec.tagCategory ? `${rec.tagCategory}: ${rec.value}` : 'Insight');
    
    // Support count/spend ratio strings or numeric values
    const videoCountText = rec.videoCount || (rec.creativeCount ? `${rec.creativeCount} / ${rec.totalCreatives} creatives` : 'Multiple creatives');
    const spendRatioText = rec.spendRatio || (rec.spendOn ? `${D.fmtCurrency(rec.spendOn)} / ${D.fmtCurrency(rec.spendTotal)}` : '');

    return `
      <div class="insight-card" data-rec="${rec.id}">
        <div class="insight-thumb">
          <img src="${creative.thumbnail}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)">
        </div>
        <div class="insight-body">
          <div class="insight-tag">
            <span class="badge ${kpiColor}">${dirIcon} ${rec.kpi}</span>
            <span class="badge badge-neutral" style="margin-left:4px">${tagLabel}</span>
          </div>
          <div class="insight-text">${rec.text}</div>
          <div class="insight-meta">
            <span>${videoCountText}</span>
            ${spendRatioText ? `<span>·</span><span>${spendRatioText}</span>` : ''}
          </div>
        </div>
      </div>`;
  }

  /* ── Timeline renderer ───────────────────────────────────── */
  function renderTimeline(timelineData, duration) {
    const dur = duration || 15;
    const timeMarks = [0, Math.round(dur * 0.25), Math.round(dur * 0.5), Math.round(dur * 0.75), dur];

    const rows = timelineData.map(item => {
      const left  = (item.start / dur * 100).toFixed(1);
      const width = ((item.end - item.start) / dur * 100).toFixed(1);
      return `
        <div class="timeline-row">
          <div class="timeline-row-label" title="${item.tag}: ${item.value}">${item.tag}</div>
          <div class="timeline-row-track">
            <div class="timeline-bar color-${item.color}"
                 style="left:${left}%;width:${width}%"
                 title="${item.value} (${item.start}s – ${item.end}s)">
              <span class="timeline-bar-label">${item.value}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="timeline-container">
        <div class="timeline-time-labels">
          ${timeMarks.map(t => `<span class="timeline-time-label">${t}s</span>`).join('')}
        </div>
        ${rows}
      </div>`;
  }

  /* ── KPI score list ──────────────────────────────────────── */
  function renderKPIScores(metrics, prevMetrics) {
    const items = [
      { label: 'IPM',     value: metrics.ipm,    suffix: '',   prev: prevMetrics?.ipm },
      { label: 'CTR',     value: metrics.ctr,    suffix: '%',  prev: prevMetrics?.ctr },
      { label: 'CPI',     value: metrics.cpi,    suffix: '',   prev: prevMetrics?.cpi, invert: true },
      { label: 'CTI',     value: metrics.cti,    suffix: '%',  prev: prevMetrics?.cti },
      { label: 'CPPD7',   value: metrics.cppd7,  suffix: '',   prev: prevMetrics?.cppd7, invert: true },
      { label: 'ROAS D7', value: metrics.roasd7, suffix: '%',  prev: prevMetrics?.roasd7 },
      { label: 'SPEND',   value: metrics.spend,  suffix: '',   isCurrency: true },
    ];

    return `<div class="kpi-score-list">
      ${items.map(item => {
        const display = item.isCurrency ? D.fmtCurrency(item.value) : (item.suffix ? item.value.toFixed(1) + item.suffix : item.value.toFixed(1));
        let delta = '';
        if (item.prev !== undefined && item.prev !== null) {
          const pct = ((item.value - item.prev) / item.prev * 100).toFixed(1);
          const isPositive = item.invert ? pct < 0 : pct > 0;
          delta = `<span class="${isPositive ? 'delta-up' : 'delta-down'}" style="font-size:11px;margin-left:4px">${pct > 0 ? '↑' : '↓'} ${Math.abs(pct)}%</span>`;
        }
        return `<div class="kpi-score-row">
          <span class="kpi-score-label">${item.label}</span>
          <div class="kpi-score-value">${display}${delta}</div>
        </div>`;
      }).join('')}
    </div>`;
  }

  /* ── Score bar ───────────────────────────────────────────── */
  function renderScoreBar(score, maxScore = 5) {
    const pct = (score / maxScore * 100).toFixed(0);
    return `<div class="score-bar-wrap">
      <div class="score-bar-track">
        <div class="score-bar-fill" style="width:${pct}%"></div>
      </div>
    </div>`;
  }

  /* ── Skeleton loaders ────────────────────────────────────── */
  function renderSkeletonTable(rows = 8, cols = 7) {
    const headerCols = Array(cols).fill('<th><div class="skeleton" style="height:12px;width:80px;border-radius:4px"></div></th>').join('');
    const cells = Array(cols).fill('<td><div class="skeleton" style="height:14px;border-radius:4px"></div></td>').join('');
    const bodyRows = Array(rows).fill(`<tr>${cells}</tr>`).join('');
    return `<div class="table-container">
      <table class="data-table">
        <thead><tr>${headerCols}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>`;
  }

  function renderSkeletonCards(count = 8) {
    return `<div class="gallery-grid">
      ${Array(count).fill(`
        <div class="card" style="overflow:hidden">
          <div class="skeleton" style="width:100%;aspect-ratio:16/9"></div>
          <div style="padding:var(--space-3) var(--space-4)">
            <div class="skeleton" style="height:14px;width:70%;margin-bottom:8px"></div>
            <div class="skeleton" style="height:11px;width:50%"></div>
          </div>
        </div>`).join('')}
    </div>`;
  }

  /* ── Tab bar helper ──────────────────────────────────────── */
  function renderTabs(tabs, activeId) {
    return `<div class="tabs">
      ${tabs.map(t => `<div class="tab-item${t.id === activeId ? ' active' : ''}" data-tab="${t.id}">${t.label}</div>`).join('')}
    </div>`;
  }

  function bindTabs(container, onChange) {
    container.querySelectorAll('.tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (onChange) onChange(tab.dataset.tab);
      });
    });
  }

  /* ── Icon helper (Lucide-style inline SVG) ───────────────── */
  function icon(name, size = 18) {
    const icons = {
      home: `<polyline points="3 9 12 2 21 9"/><path d="M9 22V12h6v10M3 9v13h18V9"/>`,
      'bar-chart-2': `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
      grid: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>`,
      tag: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`,
      film: `<rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>`,
      shuffle: `<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>`,
      globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
      'file-text': `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>`,
      code: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
      settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
      x: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
      download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
      search: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
      filter: `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
      calendar: `<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
      'chevron-down': `<polyline points="6 9 12 15 18 9"/>`,
      'chevron-right': `<polyline points="9 18 15 12 9 6"/>`,
      'arrow-right': `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
      'trending-up': `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
      'plus': `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
      'columns': `<rect x="3" y="3" width="8" height="18"/><rect x="13" y="3" width="8" height="18"/>`,
      'layers': `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
      'zap': `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
      'bell': `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,
      'refresh-cw': `<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
      'external-link': `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`,
      'lightbulb': `<line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>`,
      'play': `<polygon points="5 3 19 12 5 21 5 3"/>`,
      'check': `<polyline points="20 6 9 17 4 12"/>`,
      'user': `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    };

    const paths = icons[name] || icons['x'];
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;flex-shrink:0">${paths}</svg>`;
  }

  return {
    showToast,
    showModal,
    showSlidePanel,
    showDropdown,
    closeDropdowns,
    renderNetworkFilter,
    bindNetworkFilter,
    renderInsightCard,
    renderTimeline,
    renderKPIScores,
    renderScoreBar,
    renderSkeletonTable,
    renderSkeletonCards,
    renderTabs,
    bindTabs,
    icon,
  };
})();
