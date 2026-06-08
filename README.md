# Mock Dashboard

Interactive mockup built as a static site for GitHub Pages.

## Setup & Deployment

### Option A — GitHub Pages (recommended for sharing)
1. Create a new GitHub repository (public)
2. Upload all files from this folder to the repo root
3. Go to **Settings → Pages → Source**: Deploy from branch → `main` / `root`
4. Your site will be live at `https://[username].github.io/[repo-name]/`

### Option B — Local preview
Open `index.html` directly in a browser. All assets are local or CDN-loaded, no server needed.

> Note: If viewing locally via `file://`, some browsers block relative imports. Use a simple local server:
> ```
> npx serve .
> # or
> python -m http.server 8080
> ```
> Then open `http://localhost:8080`

## Structure
```
index.html          ← App shell (sidebar, topbar, router bootstrap)
css/
  base.css          ← CSS variables, reset, typography utilities
  layout.css        ← Sidebar, topbar, app layout, modals, dropdowns
  components.css    ← Cards, tables, badges, buttons, gallery, timeline
  charts.css        ← Chart container sizing
js/
  data.js           ← All mock data (20 creatives, tags, competitors, trends)
  router.js         ← Hash-based SPA router
  components.js     ← Reusable render helpers + icon library
  charts.js         ← Chart.js wrappers
  views/
    overview.js
    performance.js
    gallery.js
    tags-performance.js
    deconstruction.js
    combinations.js
    market-insights.js
    reporting.js
assets/
  logo.svg
```

## Pages
| Route | Page |
|---|---|
| `#/overview` | Concepts overview, trend chart, AI insights |
| `#/performance` | Creative performance table with full metrics |
| `#/gallery` | Visual thumbnail grid (own + competitors) |
| `#/tags` | Tags performance ranked table |
| `#/deconstruction` | Video timeline deconstruction + compare |
| `#/combinations` | Tag mix-and-match + KPI scores |
| `#/market` | Competitor intelligence (BETA) |
| `#/reporting` | Auto-report generation |

## Dependencies (CDN, no install)
- [Chart.js 4.4.1](https://www.chartjs.org/)
- [Inter font](https://fonts.google.com/specimen/Inter) (Google Fonts)


