/* ============================================================
   CHARTS.JS — Chart.js helpers
   ============================================================ */

window.Charts = (function () {
  const chartInstances = {};

  const defaults = {
    font: { family: 'Inter, system-ui, sans-serif', size: 12 },
    color: '#6B7280',
    grid: '#E5E7EB',
    primary: '#5B4FE9',
    networkColors: {
      google: '#4285F4',
      unity:  '#333333',
      meta:   '#0866FF',
      tiktok: '#010101',
      vungle: '#E8553E',
    },
  };

  // Destroy existing chart on a canvas
  function destroy(id) {
    if (chartInstances[id]) {
      chartInstances[id].destroy();
      delete chartInstances[id];
    }
  }

  // Base Chart.js defaults
  function applyDefaults() {
    if (!window.Chart) return;
    Chart.defaults.font.family = defaults.font.family;
    Chart.defaults.font.size   = defaults.font.size;
    Chart.defaults.color       = defaults.color;
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.tooltip.backgroundColor = '#111827';
    Chart.defaults.plugins.tooltip.titleColor = '#F9FAFB';
    Chart.defaults.plugins.tooltip.bodyColor  = '#D1D5DB';
    Chart.defaults.plugins.tooltip.padding    = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.displayColors = true;
    Chart.defaults.plugins.tooltip.boxPadding = 4;
  }

  // ── Trend line chart (Overview / Tag trends) ──────────────
  function createTrendChart(canvasId, dates, datasetsInput) {
    destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    // Map inputs to the Chart.js dataset config
    const datasets = datasetsInput.map(ds => {
      const color = ds.color || defaults.primary;
      // Extract alpha parts for fill
      let fillBg = 'rgba(91,79,233,0.06)';
      if (color.startsWith('#')) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        fillBg = `rgba(${r},${g},${b},0.06)`;
      } else if (color.startsWith('rgb')) {
        fillBg = color.replace('rgb', 'rgba').replace(')', ',0.06)');
      }
      return {
        label: ds.label,
        data: ds.data,
        borderColor: color,
        backgroundColor: fillBg,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2,
      };
    });

    chartInstances[canvasId] = new Chart(canvas, {
      type: 'line',
      data: { labels: dates, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 16,
              font: { size: 11 },
            },
          },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { size: 11 }, color: defaults.color },
          },
          y: {
            grid: { color: defaults.grid, drawBorder: false },
            border: { display: false, dash: [4, 4] },
            ticks: {
              font: { size: 11 },
              color: defaults.color,
              callback: v => v >= 1000 ? (v / 1000).toFixed(1) + 'K' : v,
            },
          },
        },
      },
    });

    return chartInstances[canvasId];
  }

  // ── Tag performance bar chart ─────────────────────────────
  function createTagBarChart(canvasId, tags, metric = 'roasd7') {
    destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const sorted = [...tags].sort((a, b) => b[metric] - a[metric]).slice(0, 10);
    const colors = sorted.map(t => t.color || defaults.primary);

    chartInstances[canvasId] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: sorted.map(t => t.name),
        datasets: [{
          data: sorted.map(t => t[metric]),
          backgroundColor: colors.map(c => c + '99'),
          borderColor: colors,
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => ` ${metric.toUpperCase()}: ${ctx.parsed.x.toFixed(1)}%`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: defaults.grid },
            border: { display: false },
            ticks: { callback: v => v + '%', font: { size: 11 } },
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { size: 11 } },
          },
        },
      },
    });

    return chartInstances[canvasId];
  }

  // ── Dual-line trend chart (Tag trends / Combinations) ─────
  function createDualTrendChart(canvasId, trendObj) {
    destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    chartInstances[canvasId] = new Chart(canvas, {
      type: 'line',
      data: {
        labels: trendObj.dates,
        datasets: [
          {
            label: 'Avg performance',
            data: trendObj.avg,
            borderColor: defaults.primary,
            backgroundColor: 'rgba(91,79,233,0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
          {
            label: 'Videos with tag',
            data: trendObj.accel,
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245,158,11,0.08)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5,
            borderDash: [5, 3],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { usePointStyle: true, pointStyle: 'circle', padding: 12, font: { size: 11 } },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { size: 10 }, color: defaults.color },
          },
          y: {
            grid: { color: defaults.grid },
            border: { display: false },
            ticks: { font: { size: 11 }, color: defaults.color },
          },
        },
      },
    });

    return chartInstances[canvasId];
  }

  // ── Donut chart (spend by network) ───────────────────────
  function createDonutChart(canvasId, data, labels, colors) {
    destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    chartInstances[canvasId] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderColor: '#FFFFFF',
          borderWidth: 3,
          hoverBorderWidth: 3,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: { usePointStyle: true, pointStyle: 'circle', padding: 14, font: { size: 11 } },
          },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.label}: ${ctx.parsed.toFixed(1)}%`,
            },
          },
        },
      },
    });

    return chartInstances[canvasId];
  }

  // ── Sparkline (tiny inline chart, rendered on canvas) ─────
  function createSparkline(canvasId, data, color = defaults.primary) {
    destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    chartInstances[canvasId] = new Chart(canvas, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data,
          borderColor: color,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.4,
        }],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false },
        },
        animation: false,
      },
    });

    return chartInstances[canvasId];
  }

  // Destroy all
  function destroyAll() {
    Object.keys(chartInstances).forEach(id => destroy(id));
  }

  return {
    applyDefaults,
    createTrendChart,
    createTagBarChart,
    createDualTrendChart,
    createDonutChart,
    createSparkline,
    destroy,
    destroyAll,
  };
})();
