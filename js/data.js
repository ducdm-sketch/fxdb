/* ============================================================
   DATA.JS — All mock data for the AI Game Analyzer mock dashboard
   ============================================================ */

window.AIGameAnalyzerData = (function () {

  // ── Creatives ──────────────────────────────────────────────
  const creatives = [
    {
      id: 'cr-001',
      name: 'c 009 bathroom child family',
      networks: ['google', 'unity'],
      os: ['ios', 'android'],
      instances: 1,
      launchDate: '2026-03-14',
      age: '1m 5d',
      aiGameAnalyzerScore: 3.5,
      apps: ['Homescapes', 'My Game'],
      metrics: { installs: 543, spend: 134.95, ctr: 1.72, cpi: 24.8, cti: 32.6, ipm: 30.8, cppd7: 53.04, roasd7: 50.6, earningsD7: 680, purchasesD7: 14, impressions: 17600, clicks: 302 },
      tags: { gameConcept: 'Fail Concept', character: 'Child', endcard: 'Family', room: 'Bathroom', pace: 'Moderate', duration: 15, cutFreq: 'Medium', emotion: 'Joy', cta: 'Play Now', dangerType: null, introType: 'Character Focus', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Fail Concept', start: 0,  end: 15, color: 0 },
        { tag: 'Character',    value: 'Child',        start: 0,  end: 12, color: 1 },
        { tag: 'Background',   value: 'Bathroom',     start: 0,  end: 15, color: 2 },
        { tag: 'Emotion',      value: 'Joy',          start: 2,  end: 8,  color: 6 },
        { tag: 'Gameplay',     value: 'Fail',         start: 1,  end: 10, color: 4 },
        { tag: 'CTA',          value: 'Play Now',     start: 12, end: 15, color: 9 },
        { tag: 'Endcard',      value: 'Family',       start: 13, end: 15, color: 5 },
        { tag: 'Pace',         value: 'Moderate',     start: 0,  end: 15, color: 7 },
      ],
      recommendations: [
        'Consider a Danger element in seconds 5–10 to boost IPM',
        'Fail Concept outperforms Drama by 23% on CTI — keep it',
        'Family endcard is your #1 performer — replicate in next creative',
      ],
    },
    {
      id: 'cr-002',
      name: 'c 305 living room austin family',
      networks: ['google', 'unity'],
      os: ['ios', 'android'],
      instances: 1,
      launchDate: '2026-03-16',
      age: '1m 3d',
      aiGameAnalyzerScore: 3.0,
      apps: ['Homescapes', 'Gardenscapes'],
      metrics: { installs: 543, spend: 286.2, ctr: 1.78, cpi: 18.0, cti: 28.4, ipm: 30.8, cppd7: 50.6, roasd7: 45.2, earningsD7: 590, purchasesD7: 11, impressions: 17600, clicks: 313 },
      tags: { gameConcept: 'Renovation', character: 'Austin', endcard: 'Family', room: 'Living Room', pace: 'Fast', duration: 16, cutFreq: 'High', emotion: 'Surprise', cta: 'Play Now', dangerType: null, introType: 'Character Focus', colorfulness: 'Medium' },
      timeline: [
        { tag: 'Game Concept', value: 'Renovation',  start: 0,  end: 16, color: 0 },
        { tag: 'Character',    value: 'Austin',       start: 0,  end: 13, color: 1 },
        { tag: 'Background',   value: 'Living Room',  start: 0,  end: 16, color: 2 },
        { tag: 'Emotion',      value: 'Surprise',     start: 3,  end: 9,  color: 6 },
        { tag: 'CTA',          value: 'Play Now',     start: 13, end: 16, color: 9 },
        { tag: 'Endcard',      value: 'Family',       start: 14, end: 16, color: 5 },
        { tag: 'Pace',         value: 'Fast',         start: 0,  end: 16, color: 7 },
      ],
      recommendations: [
        'Austin character drives +18% CTR vs Katherine Broom',
        'Living Room performs 12% below Bathroom on ROAS D7',
        'Try adding Fail Concept instead of Renovation to test lift',
      ],
    },
    {
      id: 'cr-003',
      name: 'c 171 bedroom austin character',
      networks: ['google'],
      os: ['ios'],
      instances: 1,
      launchDate: '2026-03-20',
      age: '1m 0d',
      aiGameAnalyzerScore: 2.0,
      apps: ['Homescapes'],
      metrics: { installs: 126, spend: 12.35, ctr: 4.18, cpi: 4.16, cti: 22.1, ipm: 1.3, cppd7: 0.2, roasd7: 8.4, earningsD7: 104, purchasesD7: 3, impressions: 96923, clicks: 4050 },
      tags: { gameConcept: 'Drama', character: 'Austin', endcard: 'None', room: 'Bedroom', pace: 'Slow', duration: 20, cutFreq: 'Low', emotion: 'Sadness', cta: 'Play Now', dangerType: null, introType: 'Gameplay', colorfulness: 'Low' },
      timeline: [
        { tag: 'Game Concept', value: 'Drama',    start: 0,  end: 20, color: 0 },
        { tag: 'Character',    value: 'Austin',   start: 2,  end: 18, color: 1 },
        { tag: 'Background',   value: 'Bedroom',  start: 0,  end: 20, color: 2 },
        { tag: 'Emotion',      value: 'Sadness',  start: 4,  end: 14, color: 6 },
        { tag: 'CTA',          value: 'Play Now', start: 18, end: 20, color: 9 },
        { tag: 'Pace',         value: 'Slow',     start: 0,  end: 20, color: 7 },
      ],
      recommendations: [
        'Drama concept has lowest IPM across all concepts — consider sunsetting',
        'Slow pace reduces IPM by 34% — test fast-paced version',
        'Sadness emotion underperforms Joy by 41% on CTR',
      ],
    },
    {
      id: 'cr-004',
      name: 'c 009 bedroom child levels',
      networks: ['google', 'unity'],
      os: ['ios'],
      instances: 1,
      launchDate: '2026-04-01',
      age: '18d',
      aiGameAnalyzerScore: 3.5,
      apps: ['Homescapes'],
      metrics: { installs: 432, spend: 89.1, ctr: 3.21, cpi: 0.8, cti: 41.2, ipm: 4.1, cppd7: 12.4, roasd7: 38.7, earningsD7: 345, purchasesD7: 8, impressions: 105366, clicks: 3383 },
      tags: { gameConcept: 'Fail Concept', character: 'Child', endcard: 'Play Store', room: 'Bedroom', pace: 'Moderate', duration: 12, cutFreq: 'Medium', emotion: 'Frustration', cta: 'Play Now', dangerType: 'Spikes', introType: 'Gameplay', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Fail Concept',  start: 0,  end: 12, color: 0 },
        { tag: 'Character',    value: 'Child',          start: 0,  end: 10, color: 1 },
        { tag: 'Background',   value: 'Bedroom',        start: 0,  end: 12, color: 2 },
        { tag: 'Danger Type',  value: 'Spikes',         start: 3,  end: 9,  color: 3 },
        { tag: 'Emotion',      value: 'Frustration',    start: 3,  end: 9,  color: 6 },
        { tag: 'CTA',          value: 'Play Now',       start: 10, end: 12, color: 9 },
        { tag: 'Endcard',      value: 'Play Store',     start: 10, end: 12, color: 5 },
        { tag: 'Pace',         value: 'Moderate',       start: 0,  end: 12, color: 7 },
      ],
      recommendations: [
        'Spikes danger type drove +22% IPM lift vs no danger',
        'Child + Fail Concept is your highest CTI combination',
        'Expand to Meta and TikTok — currently Google/Unity only',
      ],
    },
    {
      id: 'cr-005',
      name: 'c 054 bathroom katherine broom character',
      networks: ['google', 'unity'],
      os: ['android'],
      instances: 1,
      launchDate: '2026-02-28',
      age: '2m 2d',
      aiGameAnalyzerScore: 1.0,
      apps: ['Homescapes', 'Gardenscapes'],
      metrics: { installs: 100, spend: 8.7, ctr: 0.87, cpi: 4.04, cti: 10.9, ipm: 1.1, cppd7: 101.1, roasd7: 10.9, earningsD7: 95, purchasesD7: 2, impressions: 90909, clicks: 791 },
      tags: { gameConcept: 'Puzzle', character: 'Katherine Broom', endcard: 'None', room: 'Bathroom', pace: 'Slow', duration: 18, cutFreq: 'Low', emotion: 'Anger', cta: 'Install Now', dangerType: null, introType: 'Character Focus', colorfulness: 'Low' },
      timeline: [
        { tag: 'Game Concept', value: 'Puzzle',           start: 0,  end: 18, color: 0 },
        { tag: 'Character',    value: 'Katherine Broom',  start: 0,  end: 15, color: 1 },
        { tag: 'Background',   value: 'Bathroom',         start: 0,  end: 18, color: 2 },
        { tag: 'Emotion',      value: 'Anger',            start: 5,  end: 12, color: 6 },
        { tag: 'CTA',          value: 'Install Now',      start: 15, end: 18, color: 9 },
        { tag: 'Pace',         value: 'Slow',             start: 0,  end: 18, color: 7 },
      ],
      recommendations: [
        'Katherine Broom has lowest CTI of all characters — replace with Child',
        'Anger emotion underperforms Joy by 53% — swap emotion',
        'Install Now CTA has 18% lower CTR than Play Now — test swap',
      ],
    },
    {
      id: 'cr-006',
      name: 'c 268 bedroom child family',
      networks: ['google'],
      os: ['ios', 'android'],
      instances: 1,
      launchDate: '2026-04-10',
      age: '9d',
      aiGameAnalyzerScore: 3.0,
      apps: ['Homescapes'],
      metrics: { installs: 140, spend: 179.5, ctr: 2.67, cpi: 46.7, cti: 14.8, ipm: 21.3, cppd7: 88.2, roasd7: 32.1, earningsD7: 576, purchasesD7: 7, impressions: 6573, clicks: 175 },
      tags: { gameConcept: 'Renovation', character: 'Child', endcard: 'Family', room: 'Bedroom', pace: 'Moderate', duration: 14, cutFreq: 'Medium', emotion: 'Joy', cta: 'Play Now', dangerType: null, introType: 'Room Reveal', colorfulness: 'Medium' },
      timeline: [
        { tag: 'Game Concept', value: 'Renovation', start: 0,  end: 14, color: 0 },
        { tag: 'Character',    value: 'Child',       start: 1,  end: 12, color: 1 },
        { tag: 'Background',   value: 'Bedroom',     start: 0,  end: 14, color: 2 },
        { tag: 'Emotion',      value: 'Joy',         start: 4,  end: 10, color: 6 },
        { tag: 'CTA',          value: 'Play Now',    start: 12, end: 14, color: 9 },
        { tag: 'Endcard',      value: 'Family',      start: 12, end: 14, color: 5 },
        { tag: 'Intro',        value: 'Room Reveal', start: 0,  end: 3,  color: 8 },
        { tag: 'Pace',         value: 'Moderate',    start: 0,  end: 14, color: 7 },
      ],
      recommendations: [
        'Room Reveal intro outperforms Character Focus intro by 15% CTR',
        'Child + Family endcard is your highest ROAS combination',
        'Bedroom concept — try adding Danger element to increase engagement',
      ],
    },
    {
      id: 'cr-007',
      name: 'c 303 living room austin levels',
      networks: ['google', 'unity', 'meta'],
      os: ['ios', 'android'],
      instances: 3,
      launchDate: '2026-03-05',
      age: '1m 14d',
      aiGameAnalyzerScore: 2.5,
      apps: ['Homescapes', 'Gardenscapes'],
      metrics: { installs: 214, spend: 246.0, ctr: 1.72, cpi: 11.8, cti: 48.6, ipm: 32.9, cppd7: 62.3, roasd7: 28.9, earningsD7: 710, purchasesD7: 11, impressions: 6504, clicks: 112 },
      tags: { gameConcept: 'Drama', character: 'Austin', endcard: 'None', room: 'Living Room', pace: 'Moderate', duration: 22, cutFreq: 'Low', emotion: 'Frustration', cta: 'Play Now', dangerType: null, introType: 'Gameplay', colorfulness: 'Medium' },
      timeline: [
        { tag: 'Game Concept', value: 'Drama',       start: 0,  end: 22, color: 0 },
        { tag: 'Character',    value: 'Austin',      start: 2,  end: 20, color: 1 },
        { tag: 'Background',   value: 'Living Room', start: 0,  end: 22, color: 2 },
        { tag: 'Emotion',      value: 'Frustration', start: 8,  end: 16, color: 6 },
        { tag: 'CTA',          value: 'Play Now',    start: 20, end: 22, color: 9 },
        { tag: 'Pace',         value: 'Moderate',    start: 0,  end: 22, color: 7 },
      ],
      recommendations: [
        'Running on 3 networks — strong distribution, no action needed',
        'Drama concept can be improved with a Fail moment at second 10',
        'Consider trimming to 15s — 22s duration shows fatigue at sec 18',
      ],
    },
    {
      id: 'cr-008',
      name: 'c 112 kitchen child gameplay',
      networks: ['google', 'unity'],
      os: ['ios'],
      instances: 2,
      launchDate: '2026-05-01',
      age: '1d',
      aiGameAnalyzerScore: 4.0,
      apps: ['Homescapes'],
      metrics: { installs: 621, spend: 198.4, ctr: 2.14, cpi: 9.2, cti: 38.7, ipm: 42.1, cppd7: 41.2, roasd7: 62.4, earningsD7: 1238, purchasesD7: 21, impressions: 14762, clicks: 316 },
      tags: { gameConcept: 'Fail Concept', character: 'Child', endcard: 'Family', room: 'Kitchen', pace: 'Fast', duration: 13, cutFreq: 'High', emotion: 'Joy', cta: 'Play Now', dangerType: 'Fire', introType: 'Gameplay', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Fail Concept', start: 0,  end: 13, color: 0 },
        { tag: 'Character',    value: 'Child',         start: 0,  end: 11, color: 1 },
        { tag: 'Background',   value: 'Kitchen',       start: 0,  end: 13, color: 2 },
        { tag: 'Danger Type',  value: 'Fire',          start: 4,  end: 10, color: 3 },
        { tag: 'Emotion',      value: 'Joy',           start: 0,  end: 6,  color: 6 },
        { tag: 'Intro',        value: 'Gameplay',      start: 0,  end: 3,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',      start: 11, end: 13, color: 9 },
        { tag: 'Endcard',      value: 'Family',        start: 11, end: 13, color: 5 },
        { tag: 'Pace',         value: 'Fast',          start: 0,  end: 13, color: 7 },
      ],
      recommendations: [
        '🏆 Top performer — Fire danger type drove +38% IPM lift',
        'Expand to Meta and TikTok immediately',
        'Kitchen + Child + Fire is your current winning combination',
      ],
    },
    {
      id: 'cr-009',
      name: 'c 087 bathroom chris renovation',
      networks: ['google', 'meta'],
      os: ['ios', 'android'],
      instances: 2,
      launchDate: '2026-05-15',
      age: '1d',
      aiGameAnalyzerScore: 3.5,
      apps: ['Homescapes', 'Gardenscapes'],
      metrics: { installs: 389, spend: 142.8, ctr: 1.94, cpi: 14.6, cti: 31.8, ipm: 28.4, cppd7: 59.1, roasd7: 44.3, earningsD7: 633, purchasesD7: 10, impressions: 13697, clicks: 266 },
      tags: { gameConcept: 'Renovation', character: 'Chris', endcard: 'Family', room: 'Bathroom', pace: 'Moderate', duration: 15, cutFreq: 'Medium', emotion: 'Surprise', cta: 'Play Now', dangerType: null, introType: 'Room Reveal', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Renovation',  start: 0,  end: 15, color: 0 },
        { tag: 'Character',    value: 'Chris',        start: 1,  end: 12, color: 1 },
        { tag: 'Background',   value: 'Bathroom',     start: 0,  end: 15, color: 2 },
        { tag: 'Emotion',      value: 'Surprise',     start: 10, end: 15, color: 6 },
        { tag: 'Intro',        value: 'Room Reveal',  start: 0,  end: 3,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',     start: 13, end: 15, color: 9 },
        { tag: 'Endcard',      value: 'Family',       start: 13, end: 15, color: 5 },
        { tag: 'Pace',         value: 'Moderate',     start: 0,  end: 15, color: 7 },
      ],
      recommendations: [
        'Room Reveal + Surprise emotion = strong hook combination',
        'Meta network shows 22% higher ROAS than Google for this creative',
        'Test same creative with Child instead of Chris',
      ],
    },
    {
      id: 'cr-010',
      name: 'c 201 kitchen family puzzle',
      networks: ['google', 'unity', 'vungle'],
      os: ['ios', 'android'],
      instances: 3,
      launchDate: '2026-04-20',
      age: '1d',
      aiGameAnalyzerScore: 2.5,
      apps: ['Homescapes', 'Gardenscapes', 'My Game'],
      metrics: { installs: 278, spend: 122.6, ctr: 1.48, cpi: 18.9, cti: 24.3, ipm: 19.8, cppd7: 71.4, roasd7: 26.8, earningsD7: 329, purchasesD7: 6, impressions: 14040, clicks: 208 },
      tags: { gameConcept: 'Puzzle', character: 'No Character', endcard: 'Family', room: 'Kitchen', pace: 'Slow', duration: 20, cutFreq: 'Low', emotion: 'None', cta: 'Play Now', dangerType: null, introType: 'Gameplay', colorfulness: 'Medium' },
      timeline: [
        { tag: 'Game Concept', value: 'Puzzle',    start: 0,  end: 20, color: 0 },
        { tag: 'Background',   value: 'Kitchen',   start: 0,  end: 20, color: 2 },
        { tag: 'Intro',        value: 'Gameplay',  start: 0,  end: 4,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',  start: 18, end: 20, color: 9 },
        { tag: 'Endcard',      value: 'Family',    start: 18, end: 20, color: 5 },
        { tag: 'Pace',         value: 'Slow',      start: 0,  end: 20, color: 7 },
      ],
      recommendations: [
        'No character detected — adding Child could improve CTI by 28%',
        'Slow pace hurts this concept — test fast-cut version',
        '20s duration too long — trim to 15s based on drop-off data',
      ],
    },
    {
      id: 'cr-011',
      name: 'c 144 bedroom austin fail',
      networks: ['google', 'unity'],
      os: ['android'],
      instances: 1,
      launchDate: '2026-06-01',
      age: '1d',
      aiGameAnalyzerScore: 4.5,
      apps: ['Homescapes'],
      metrics: { installs: 812, spend: 287.3, ctr: 2.44, cpi: 8.1, cti: 49.3, ipm: 56.7, cppd7: 38.9, roasd7: 71.2, earningsD7: 2045, purchasesD7: 28, impressions: 14321, clicks: 349 },
      tags: { gameConcept: 'Fail Concept', character: 'Austin', endcard: 'Family', room: 'Bedroom', pace: 'Fast', duration: 14, cutFreq: 'High', emotion: 'Frustration', cta: 'Play Now', dangerType: 'Spikes', introType: 'Character Focus', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Fail Concept',  start: 0,  end: 14, color: 0 },
        { tag: 'Character',    value: 'Austin',         start: 0,  end: 12, color: 1 },
        { tag: 'Background',   value: 'Bedroom',        start: 0,  end: 14, color: 2 },
        { tag: 'Danger Type',  value: 'Spikes',         start: 4,  end: 11, color: 3 },
        { tag: 'Emotion',      value: 'Frustration',    start: 4,  end: 11, color: 6 },
        { tag: 'Intro',        value: 'Character Focus',start: 0,  end: 3,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',       start: 12, end: 14, color: 9 },
        { tag: 'Endcard',      value: 'Family',         start: 12, end: 14, color: 5 },
        { tag: 'Pace',         value: 'Fast',           start: 0,  end: 14, color: 7 },
      ],
      recommendations: [
        '🏆 Hero concept — highest IPM of all creatives at 56.7',
        'ROAS D7 71.2% — scale spend on Google immediately',
        'Replicate this formula: Austin + Spikes + Fail Concept + Fast pace',
      ],
    },
    {
      id: 'cr-012',
      name: 'c 092 kitchen katherine broom fail',
      networks: ['google'],
      os: ['ios'],
      instances: 1,
      launchDate: '2026-03-22',
      age: '28d',
      aiGameAnalyzerScore: 1.5,
      apps: ['Homescapes'],
      metrics: { installs: 88, spend: 47.2, ctr: 0.61, cpi: 31.4, cti: 11.2, ipm: 3.8, cppd7: 124.6, roasd7: 8.1, earningsD7: 83, purchasesD7: 1, impressions: 23158, clicks: 141 },
      tags: { gameConcept: 'Fail Concept', character: 'Katherine Broom', endcard: 'None', room: 'Kitchen', pace: 'Slow', duration: 19, cutFreq: 'Low', emotion: 'Anger', cta: 'Install Now', dangerType: null, introType: 'Gameplay', colorfulness: 'Low' },
      timeline: [
        { tag: 'Game Concept', value: 'Fail Concept',    start: 0,  end: 19, color: 0 },
        { tag: 'Character',    value: 'Katherine Broom', start: 0,  end: 16, color: 1 },
        { tag: 'Background',   value: 'Kitchen',          start: 0,  end: 19, color: 2 },
        { tag: 'Emotion',      value: 'Anger',            start: 6,  end: 14, color: 6 },
        { tag: 'CTA',          value: 'Install Now',      start: 17, end: 19, color: 9 },
        { tag: 'Pace',         value: 'Slow',             start: 0,  end: 19, color: 7 },
      ],
      recommendations: [
        'Katherine Broom + Anger + Slow pace = worst performing combination',
        'Sunset this creative — ROAS D7 below 10%',
        'Reallocate budget to cr-011 (Austin + Spikes)',
      ],
    },
    {
      id: 'cr-013',
      name: 'c 188 bathroom child drama',
      networks: ['google', 'unity', 'tiktok'],
      os: ['ios', 'android'],
      instances: 2,
      launchDate: '2026-05-25',
      age: '1d',
      aiGameAnalyzerScore: 3.0,
      apps: ['Homescapes', 'Gardenscapes'],
      metrics: { installs: 342, spend: 156.9, ctr: 1.82, cpi: 16.4, cti: 29.7, ipm: 24.6, cppd7: 64.8, roasd7: 38.9, earningsD7: 612, purchasesD7: 9, impressions: 13902, clicks: 253 },
      tags: { gameConcept: 'Drama', character: 'Child', endcard: 'Family', room: 'Bathroom', pace: 'Moderate', duration: 17, cutFreq: 'Medium', emotion: 'Sadness', cta: 'Play Now', dangerType: null, introType: 'Character Focus', colorfulness: 'Medium' },
      timeline: [
        { tag: 'Game Concept', value: 'Drama',          start: 0,  end: 17, color: 0 },
        { tag: 'Character',    value: 'Child',           start: 0,  end: 14, color: 1 },
        { tag: 'Background',   value: 'Bathroom',        start: 0,  end: 17, color: 2 },
        { tag: 'Emotion',      value: 'Sadness',         start: 5,  end: 12, color: 6 },
        { tag: 'Intro',        value: 'Character Focus', start: 0,  end: 3,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',        start: 15, end: 17, color: 9 },
        { tag: 'Endcard',      value: 'Family',          start: 15, end: 17, color: 5 },
        { tag: 'Pace',         value: 'Moderate',        start: 0,  end: 17, color: 7 },
      ],
      recommendations: [
        'TikTok is driving 31% of installs — increase TikTok spend',
        'Swap Sadness emotion for Joy — 41% CTR lift expected',
        'Drama concept + Child is a viable mid-tier formula',
      ],
    },
    {
      id: 'cr-014',
      name: 'c 256 living room chris puzzle',
      networks: ['google', 'vungle'],
      os: ['android'],
      instances: 1,
      launchDate: '2026-06-12',
      age: '1d',
      aiGameAnalyzerScore: 2.0,
      apps: ['Homescapes', 'Gardenscapes'],
      metrics: { installs: 163, spend: 89.4, ctr: 1.23, cpi: 22.1, cti: 18.9, ipm: 11.2, cppd7: 81.3, roasd7: 19.4, earningsD7: 174, purchasesD7: 4, impressions: 14554, clicks: 179 },
      tags: { gameConcept: 'Puzzle', character: 'Chris', endcard: 'None', room: 'Living Room', pace: 'Slow', duration: 16, cutFreq: 'Low', emotion: 'Frustration', cta: 'Play Now', dangerType: null, introType: 'Gameplay', colorfulness: 'Low' },
      timeline: [
        { tag: 'Game Concept', value: 'Puzzle',      start: 0,  end: 16, color: 0 },
        { tag: 'Character',    value: 'Chris',        start: 2,  end: 14, color: 1 },
        { tag: 'Background',   value: 'Living Room',  start: 0,  end: 16, color: 2 },
        { tag: 'Emotion',      value: 'Frustration',  start: 6,  end: 12, color: 6 },
        { tag: 'CTA',          value: 'Play Now',     start: 14, end: 16, color: 9 },
        { tag: 'Pace',         value: 'Slow',         start: 0,  end: 16, color: 7 },
      ],
      recommendations: [
        'Low colorfulness hurts engagement — test vibrant color grade',
        'Chris + Puzzle + Slow has 3rd lowest IPM across all creatives',
        'Vungle shows stronger ROAS than Google for this creative',
      ],
    },
    {
      id: 'cr-015',
      name: 'c 319 kitchen austin renovation fire',
      networks: ['google', 'unity', 'meta', 'tiktok'],
      os: ['ios', 'android'],
      instances: 4,
      launchDate: '2026-07-01',
      age: '1d',
      aiGameAnalyzerScore: 5.0,
      apps: ['Homescapes', 'My Game'],
      metrics: { installs: 1204, spend: 621.8, ctr: 3.12, cpi: 7.4, cti: 58.9, ipm: 89.3, cppd7: 29.1, roasd7: 88.6, earningsD7: 5512, purchasesD7: 48, impressions: 13483, clicks: 421 },
      tags: { gameConcept: 'Fail Concept', character: 'Austin', endcard: 'Family', room: 'Kitchen', pace: 'Fast', duration: 12, cutFreq: 'High', emotion: 'Joy', cta: 'Play Now', dangerType: 'Fire', introType: 'Character Focus', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Fail Concept',  start: 0,  end: 12, color: 0 },
        { tag: 'Character',    value: 'Austin',         start: 0,  end: 10, color: 1 },
        { tag: 'Background',   value: 'Kitchen',        start: 0,  end: 12, color: 2 },
        { tag: 'Danger Type',  value: 'Fire',           start: 3,  end: 9,  color: 3 },
        { tag: 'Emotion',      value: 'Joy',            start: 0,  end: 6,  color: 6 },
        { tag: 'Intro',        value: 'Character Focus',start: 0,  end: 2,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',       start: 10, end: 12, color: 9 },
        { tag: 'Endcard',      value: 'Family',         start: 10, end: 12, color: 5 },
        { tag: 'Pace',         value: 'Fast',           start: 0,  end: 12, color: 7 },
      ],
      recommendations: [
        '🏆 Top Spender — highest ROAS D7 at 88.6%',
        'IPM 89.3 — 2.1× the account average',
        'This is your hero concept — protect budget allocation',
      ],
    },
    {
      id: 'cr-016',
      name: 'c 078 bedroom child fake gameplay',
      networks: ['google', 'unity'],
      os: ['ios'],
      instances: 1,
      launchDate: '2026-04-28',
      age: '1d',
      aiGameAnalyzerScore: 3.0,
      apps: ['Homescapes'],
      metrics: { installs: 298, spend: 133.4, ctr: 1.91, cpi: 15.8, cti: 26.2, ipm: 22.4, cppd7: 66.1, roasd7: 34.2, earningsD7: 456, purchasesD7: 8, impressions: 13304, clicks: 254 },
      tags: { gameConcept: 'Fake Gameplay', character: 'Child', endcard: 'Family', room: 'Bedroom', pace: 'Fast', duration: 15, cutFreq: 'High', emotion: 'Joy', cta: 'Play Now', dangerType: null, introType: 'Gameplay', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Fake Gameplay', start: 0,  end: 15, color: 0 },
        { tag: 'Character',    value: 'Child',          start: 3,  end: 13, color: 1 },
        { tag: 'Background',   value: 'Bedroom',        start: 0,  end: 15, color: 2 },
        { tag: 'Emotion',      value: 'Joy',            start: 5,  end: 12, color: 6 },
        { tag: 'Intro',        value: 'Gameplay',       start: 0,  end: 3,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',       start: 13, end: 15, color: 9 },
        { tag: 'Endcard',      value: 'Family',         start: 13, end: 15, color: 5 },
        { tag: 'Pace',         value: 'Fast',           start: 0,  end: 15, color: 7 },
      ],
      recommendations: [
        'Fake Gameplay concept performs 8% below Fail Concept on IPM',
        'Child + Joy + Fast pace is a solid mid-tier combination',
        'Test swapping Bedroom for Kitchen — Kitchen shows +19% CTR',
      ],
    },
    {
      id: 'cr-017',
      name: 'c 334 bathroom austin puzzle',
      networks: ['google', 'snapchat'],
      os: ['ios', 'android'],
      instances: 2,
      launchDate: '2026-07-14',
      age: '1d',
      aiGameAnalyzerScore: 2.5,
      apps: ['Homescapes', 'Gardenscapes'],
      metrics: { installs: 187, spend: 98.6, ctr: 1.61, cpi: 19.2, cti: 21.4, ipm: 14.8, cppd7: 77.2, roasd7: 23.1, earningsD7: 228, purchasesD7: 5, impressions: 12635, clicks: 204 },
      tags: { gameConcept: 'Puzzle', character: 'Austin', endcard: 'None', room: 'Bathroom', pace: 'Moderate', duration: 18, cutFreq: 'Medium', emotion: 'Surprise', cta: 'Play Now', dangerType: null, introType: 'Character Focus', colorfulness: 'Medium' },
      timeline: [
        { tag: 'Game Concept', value: 'Puzzle',         start: 0,  end: 18, color: 0 },
        { tag: 'Character',    value: 'Austin',          start: 0,  end: 15, color: 1 },
        { tag: 'Background',   value: 'Bathroom',        start: 0,  end: 18, color: 2 },
        { tag: 'Emotion',      value: 'Surprise',        start: 8,  end: 14, color: 6 },
        { tag: 'Intro',        value: 'Character Focus', start: 0,  end: 3,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',        start: 16, end: 18, color: 9 },
        { tag: 'Pace',         value: 'Moderate',        start: 0,  end: 18, color: 7 },
      ],
      recommendations: [
        'Snapchat showing 3× higher CPP than Google — pause Snapchat',
        'Austin + Puzzle is below-average — try Austin + Fail Concept',
        'No endcard detected — add Family endcard, expect +14% CTR',
      ],
    },
    {
      id: 'cr-018',
      name: 'c 267 kitchen child drama fire',
      networks: ['google', 'unity', 'meta'],
      os: ['ios'],
      instances: 2,
      launchDate: '2026-06-28',
      age: '1d',
      aiGameAnalyzerScore: 4.0,
      apps: ['Homescapes', 'My Game'],
      metrics: { installs: 687, spend: 312.4, ctr: 2.71, cpi: 10.4, cti: 42.8, ipm: 51.2, cppd7: 44.6, roasd7: 61.8, earningsD7: 1931, purchasesD7: 22, impressions: 13418, clicks: 364 },
      tags: { gameConcept: 'Drama', character: 'Child', endcard: 'Family', room: 'Kitchen', pace: 'Fast', duration: 14, cutFreq: 'High', emotion: 'Frustration', cta: 'Play Now', dangerType: 'Fire', introType: 'Gameplay', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Drama',       start: 0,  end: 14, color: 0 },
        { tag: 'Character',    value: 'Child',        start: 0,  end: 12, color: 1 },
        { tag: 'Background',   value: 'Kitchen',      start: 0,  end: 14, color: 2 },
        { tag: 'Danger Type',  value: 'Fire',         start: 4,  end: 10, color: 3 },
        { tag: 'Emotion',      value: 'Frustration',  start: 4,  end: 10, color: 6 },
        { tag: 'Intro',        value: 'Gameplay',     start: 0,  end: 3,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',     start: 12, end: 14, color: 9 },
        { tag: 'Endcard',      value: 'Family',       start: 12, end: 14, color: 5 },
        { tag: 'Pace',         value: 'Fast',         start: 0,  end: 14, color: 7 },
      ],
      recommendations: [
        'Fire + Frustration is a strong emotional combo for Drama concept',
        'ROAS D7 61.8% — near top-spender territory',
        'Scale Meta spend — showing best ROAS of the three networks',
      ],
    },
    {
      id: 'cr-019',
      name: 'c 201 bedroom chris fake gameplay',
      networks: ['google'],
      os: ['android'],
      instances: 1,
      launchDate: '2026-07-18',
      age: '1d',
      aiGameAnalyzerScore: 2.0,
      apps: ['Homescapes'],
      metrics: { installs: 143, spend: 67.8, ctr: 1.12, cpi: 24.6, cti: 16.3, ipm: 9.4, cppd7: 88.1, roasd7: 17.8, earningsD7: 121, purchasesD7: 3, impressions: 15213, clicks: 170 },
      tags: { gameConcept: 'Fake Gameplay', character: 'Chris', endcard: 'None', room: 'Bedroom', pace: 'Slow', duration: 17, cutFreq: 'Low', emotion: 'None', cta: 'Install Now', dangerType: null, introType: 'Gameplay', colorfulness: 'Low' },
      timeline: [
        { tag: 'Game Concept', value: 'Fake Gameplay', start: 0,  end: 17, color: 0 },
        { tag: 'Character',    value: 'Chris',          start: 2,  end: 15, color: 1 },
        { tag: 'Background',   value: 'Bedroom',        start: 0,  end: 17, color: 2 },
        { tag: 'Intro',        value: 'Gameplay',       start: 0,  end: 4,  color: 8 },
        { tag: 'CTA',          value: 'Install Now',    start: 15, end: 17, color: 9 },
        { tag: 'Pace',         value: 'Slow',           start: 0,  end: 17, color: 7 },
      ],
      recommendations: [
        'No emotion detected — flat creative performs below avg on CTR',
        'Install Now CTA underperforms Play Now — swap immediately',
        'Low colorfulness + no endcard = 2 quick wins to iterate on',
      ],
    },
    {
      id: 'cr-020',
      name: 'c 388 kitchen austin fake gameplay spikes',
      networks: ['google', 'unity', 'meta'],
      os: ['ios', 'android'],
      instances: 3,
      launchDate: '2026-08-03',
      age: '1d',
      aiGameAnalyzerScore: 4.5,
      apps: ['Homescapes', 'My Game'],
      metrics: { installs: 934, spend: 489.2, ctr: 2.88, cpi: 8.8, cti: 53.1, ipm: 74.6, cppd7: 32.4, roasd7: 79.4, earningsD7: 3888, purchasesD7: 38, impressions: 12524, clicks: 361 },
      tags: { gameConcept: 'Fake Gameplay', character: 'Austin', endcard: 'Family', room: 'Kitchen', pace: 'Fast', duration: 13, cutFreq: 'High', emotion: 'Joy', cta: 'Play Now', dangerType: 'Spikes', introType: 'Character Focus', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Fake Gameplay',  start: 0,  end: 13, color: 0 },
        { tag: 'Character',    value: 'Austin',          start: 0,  end: 11, color: 1 },
        { tag: 'Background',   value: 'Kitchen',         start: 0,  end: 13, color: 2 },
        { tag: 'Danger Type',  value: 'Spikes',          start: 3,  end: 10, color: 3 },
        { tag: 'Emotion',      value: 'Joy',             start: 0,  end: 7,  color: 6 },
        { tag: 'Intro',        value: 'Character Focus', start: 0,  end: 2,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',        start: 11, end: 13, color: 9 },
        { tag: 'Endcard',      value: 'Family',          start: 11, end: 13, color: 5 },
        { tag: 'Pace',         value: 'Fast',            start: 0,  end: 13, color: 7 },
      ],
      recommendations: [
        '🏆 2nd top spender — Austin + Spikes + Fake Gameplay works',
        'ROAS D7 79.4% — 2nd highest in account',
        'Replicate with Fire instead of Spikes for next iteration',
      ],
    },
    {
      id: 'cr-ai-001',
      name: 'ai gen · kitchen child fail concept',
      aiGenerated: true,
      generationPrompt: 'Child + Fail Concept + Kitchen + Fast + Joy + Family Endcard',
      networks: ['google', 'meta'],
      os: ['ios', 'android'],
      instances: 1,
      launchDate: '2026-01-20',
      age: '1m 11d',
      aiGameAnalyzerScore: 4.0,
      apps: ['Homescapes', 'My Game'],
      metrics: { installs: 612, spend: 201.4, ctr: 2.54, cpi: 11.2, cti: 44.1, ipm: 58.3, cppd7: 38.2, roasd7: 67.4, earningsD7: 2204, purchasesD7: 26, impressions: 10497, clicks: 267 },
      tags: { gameConcept: 'Fail Concept', character: 'Child', endcard: 'Family', room: 'Kitchen', pace: 'Fast', duration: 15, cutFreq: 'High', emotion: 'Joy', cta: 'Play Now', dangerType: null, introType: 'Character Focus', colorfulness: 'High' },
      timeline: [
        { tag: 'Game Concept', value: 'Fail Concept', start: 0,  end: 15, color: 0 },
        { tag: 'Character',    value: 'Child',         start: 0,  end: 12, color: 1 },
        { tag: 'Background',   value: 'Kitchen',        start: 0,  end: 15, color: 2 },
        { tag: 'Emotion',      value: 'Joy',            start: 2,  end: 10, color: 6 },
        { tag: 'Intro',        value: 'Character Focus',start: 0,  end: 3,  color: 8 },
        { tag: 'CTA',          value: 'Play Now',        start: 12, end: 15, color: 9 },
        { tag: 'Endcard',      value: 'Family',          start: 13, end: 15, color: 5 },
        { tag: 'Pace',         value: 'Fast',            start: 0,  end: 15, color: 7 },
      ],
      recommendations: [
        'AI-generated from top-performing combination — Child + Fail + Kitchen',
        'Projected IPM 58.3 — above account average of 32.1',
        'Test Spikes danger element in seconds 3–8 for potential +12% lift',
      ],
    },
    {
      id: 'cr-ai-002',
      name: 'ai gen · bathroom austin drama fire',
      aiGenerated: true,
      generationPrompt: 'Austin + Drama + Bathroom + Moderate + Frustration + Fire + Play Now',
      networks: ['google', 'unity'],
      os: ['ios'],
      instances: 1,
      launchDate: '2026-02-03',
      age: '25d',
      aiGameAnalyzerScore: 3.5,
      apps: ['Homescapes'],
      metrics: { installs: 387, spend: 156.8, ctr: 2.11, cpi: 14.6, cti: 35.8, ipm: 38.9, cppd7: 51.3, roasd7: 48.2, earningsD7: 1122, purchasesD7: 14, impressions: 9948, clicks: 210 },
      tags: { gameConcept: 'Drama', character: 'Austin', endcard: 'None', room: 'Bathroom', pace: 'Moderate', duration: 18, cutFreq: 'Medium', emotion: 'Frustration', cta: 'Play Now', dangerType: 'Fire', introType: 'Gameplay', colorfulness: 'Medium' },
      timeline: [
        { tag: 'Game Concept', value: 'Drama',       start: 0,  end: 18, color: 0 },
        { tag: 'Character',    value: 'Austin',       start: 0,  end: 15, color: 1 },
        { tag: 'Background',   value: 'Bathroom',     start: 0,  end: 18, color: 2 },
        { tag: 'Danger Type',  value: 'Fire',         start: 4,  end: 12, color: 3 },
        { tag: 'Emotion',      value: 'Frustration',  start: 4,  end: 14, color: 6 },
        { tag: 'CTA',          value: 'Play Now',      start: 15, end: 18, color: 9 },
        { tag: 'Pace',         value: 'Moderate',      start: 0,  end: 18, color: 7 },
      ],
      recommendations: [
        'Austin + Fire performs well on CTI — recommend scaling',
        'No endcard detected — add Family endcard for projected +14% CTR',
        'Moderate pace may limit IPM — test Fast pace variant',
      ],
    },
    {
      id: 'cr-ai-003',
      name: 'ai gen · living room child puzzle playable',
      aiGenerated: true,
      generationPrompt: 'Child + Puzzle + Living Room + Slow + Surprise + Play Now (Playable Ad)',
      adFormat: 'playable',
      networks: ['meta', 'unity'],
      os: ['ios', 'android'],
      instances: 1,
      launchDate: '2026-02-14',
      age: '14d',
      aiGameAnalyzerScore: 3.0,
      apps: ['Homescapes', 'Gardenscapes'],
      metrics: { installs: 214, spend: 88.1, ctr: 1.78, cpi: 17.9, cti: 29.3, ipm: 24.7, cppd7: 63.8, roasd7: 38.9, earningsD7: 532, purchasesD7: 8, impressions: 8664, clicks: 154 },
      tags: { gameConcept: 'Puzzle', character: 'Child', endcard: 'None', room: 'Living Room', pace: 'Slow', duration: 30, cutFreq: 'Low', emotion: 'Surprise', cta: 'Play Now', dangerType: null, introType: 'Gameplay', colorfulness: 'Medium' },
      timeline: [
        { tag: 'Game Concept', value: 'Puzzle',    start: 0,  end: 30, color: 0 },
        { tag: 'Character',    value: 'Child',     start: 5,  end: 25, color: 1 },
        { tag: 'Background',   value: 'Living Room',start: 0,  end: 30, color: 2 },
        { tag: 'Emotion',      value: 'Surprise',  start: 15, end: 25, color: 6 },
        { tag: 'CTA',          value: 'Play Now',  start: 26, end: 30, color: 9 },
        { tag: 'Pace',         value: 'Slow',      start: 0,  end: 30, color: 7 },
      ],
      recommendations: [
        'Playable ad format — interactive mechanic drives higher engagement',
        'Slow pace + Puzzle suits playable format — keep for this ad type',
        'Test 15s cut-down for standard video networks',
      ],
    },
  ];

  // ── Tags ───────────────────────────────────────────────────
  const tags = [
    { id: 'tag-fail-concept',    name: 'Fail Concept',       category: 'GameConcept', appears: 38, networks: ['google','unity'], spend: 51600, roasd7: 23.6, ctr: 1.0,  launchAge: '1m 5d',  color: '#5B4FE9' },
    { id: 'tag-fake-gameplay',   name: 'Fake Gameplay',      category: 'GameConcept', appears: 31, networks: ['google','unity'], spend: 41300, roasd7: 26.5, ctr: 1.1,  launchAge: '1m 5d',  color: '#10B981' },
    { id: 'tag-puzzle',          name: 'Puzzle',             category: 'GameConcept', appears: 28, networks: ['google'],         spend: 40400, roasd7: 24.0, ctr: 1.0,  launchAge: '1m 5d',  color: '#F59E0B' },
    { id: 'tag-drama',           name: 'Drama',              category: 'GameConcept', appears: 24, networks: ['google'],         spend: 35800, roasd7: 27.9, ctr: 1.0,  launchAge: '1m 5d',  color: '#EF4444' },
    { id: 'tag-renovation',      name: 'Renovation',         category: 'GameConcept', appears: 18, networks: ['google'],         spend: 23100, roasd7: 10.4, ctr: 0.9,  launchAge: '1m 5d',  color: '#3B82F6' },
    { id: 'tag-austin',          name: 'Austin',             category: 'Character',   appears: 44, networks: ['google','unity'], spend: 38200, roasd7: 28.1, ctr: 1.2,  launchAge: '30d',    color: '#8B5CF6' },
    { id: 'tag-katherine',       name: 'Katherine Broom',    category: 'Character',   appears: 22, networks: ['google','unity'], spend: 29400, roasd7: 19.3, ctr: 0.8,  launchAge: '2m 2d',  color: '#EC4899' },
    { id: 'tag-child',           name: 'Child',              category: 'Character',   appears: 36, networks: ['google'],         spend: 22800, roasd7: 31.0, ctr: 1.4,  launchAge: '1d',     color: '#06B6D4' },
    { id: 'tag-chris',           name: 'Chris',              category: 'Character',   appears: 14, networks: ['google','meta'],  spend: 18400, roasd7: 22.4, ctr: 1.0,  launchAge: '1d',     color: '#84CC16' },
    { id: 'tag-family-endcard',  name: 'Family',             category: 'Endcard',     appears: 52, networks: ['google','unity'], spend: 48600, roasd7: 25.5, ctr: 1.1,  launchAge: '1m 5d',  color: '#F97316' },
    { id: 'tag-play-now',        name: 'Play Now',           category: 'CTA',         appears: 68, networks: ['google','unity','meta'], spend: 55100, roasd7: 24.8, ctr: 1.0, launchAge: '3m 1d', color: '#6366F1' },
    { id: 'tag-spikes',          name: 'Spikes',             category: 'DangerType',  appears: 12, networks: ['google','unity'], spend: 21800, roasd7: 31.4, ctr: 1.3,  launchAge: '1d',     color: '#14B8A6' },
    { id: 'tag-fire',            name: 'Fire',               category: 'DangerType',  appears: 10, networks: ['google','unity','meta'], spend: 19200, roasd7: 34.8, ctr: 1.4, launchAge: '1d',     color: '#EF4444' },
    { id: 'tag-kitchen',         name: 'Kitchen',            category: 'Room',        appears: 28, networks: ['google','unity'], spend: 32100, roasd7: 29.2, ctr: 1.2,  launchAge: '1d',     color: '#F59E0B' },
    { id: 'tag-bedroom',         name: 'Bedroom',            category: 'Room',        appears: 34, networks: ['google','unity'], spend: 28400, roasd7: 24.1, ctr: 1.0,  launchAge: '1m 2d',  color: '#3B82F6' },
    { id: 'tag-bathroom',        name: 'Bathroom',           category: 'Room',        appears: 26, networks: ['google'],         spend: 21600, roasd7: 21.8, ctr: 0.9,  launchAge: '2m 1d',  color: '#10B981' },
    { id: 'tag-living-room',     name: 'Living Room',        category: 'Room',        appears: 18, networks: ['google','unity'], spend: 17900, roasd7: 18.4, ctr: 0.8,  launchAge: '1m 2d',  color: '#8B5CF6' },
    { id: 'tag-joy',             name: 'Joy',                category: 'Emotion',     appears: 38, networks: ['google','unity','meta'], spend: 34200, roasd7: 28.6, ctr: 1.2, launchAge: '1d',     color: '#84CC16' },
    { id: 'tag-frustration',     name: 'Frustration',        category: 'Emotion',     appears: 24, networks: ['google'],         spend: 22100, roasd7: 24.1, ctr: 1.0,  launchAge: '1d',     color: '#F97316' },
    { id: 'tag-fast-pace',       name: 'Fast',               category: 'Pace',        appears: 42, networks: ['google','unity'], spend: 38900, roasd7: 32.4, ctr: 1.3,  launchAge: '1d',     color: '#6366F1' },
  ];

  // ── Trend data ─────────────────────────────────────────────
  const trendData = {
    dates:  ['Aug 15','Aug 22','Aug 29','Sep 5','Sep 12','Sep 19','Sep 26','Oct 3','Oct 10'],
    google: [1800, 2200, 2600, 3100, 2900, 3400, 3900, 3200, 2800],
    unity:  [900,  1100, 1300, 1500, 1200, 1400, 1600, 1300, 1100],
    vungle: [650,   750,  800,  900,  850,  950, 1000,  900,  800],
    spendGoogle: [2100, 2600, 3100, 3700, 3400, 4000, 4600, 3800, 3300],
    spendUnity:  [1050, 1300, 1550, 1800, 1450, 1650, 1900, 1550, 1300],
    spendVungle: [780,  900,  960, 1080, 1020, 1140, 1200, 1080,  960],
    ctrGoogle:   [1.6,  1.8,  2.0,  2.3,  2.1,  2.4,  2.7,  2.2,  1.9],
    ctrUnity:    [1.2,  1.4,  1.5,  1.7,  1.4,  1.6,  1.8,  1.5,  1.3],
    ctrVungle:   [0.9,  1.0,  1.1,  1.2,  1.1,  1.2,  1.3,  1.1,  1.0],
  };

  // ── Concepts overview ──────────────────────────────────────
  const conceptsOverview = {
    activeConcepts:   201,
    launchedConcepts: 451,
    activeDelta:      20,
    avgAge:           '1m 12d',
    avgAgeDelta:      18,
    avgAgeTop10:      '4m 6d',
    avgAgeTop10Delta: 18,
    heroConcepts:     2,
    totalInstalls:    249751,
    installsDelta:    309.13,
  };

  // ── Recommendations (global) ───────────────────────────────
  const recommendations = [
    {
      id: 'rec-001',
      value: '13-17',
      tagCategory: 'Duration',
      kpi: 'SPEND',
      direction: 'up',
      text: 'Using Duration: 13-17 results in a better SPEND.',
      videoCount: '40 / 126',
      spendRatio: '$62.6K / 203.8K',
      networks: ['google', 'meta']
    },
    {
      id: 'rec-002',
      value: 'moderate pace',
      tagCategory: 'Pace',
      kpi: 'IPM',
      direction: 'up',
      timeContext: 'first five seconds',
      text: 'Using Pace: moderate pace in the first five seconds results in a better IPM.',
      videoCount: '79 / 92',
      spendRatio: '$131.4K / 156.5K',
      networks: ['google', 'unity']
    },
    {
      id: 'rec-003',
      value: 'Blue',
      tagCategory: 'Color',
      kpi: 'CPI',
      direction: 'down',
      text: 'Videos with Color: Blue result in a poorer CPI.',
      videoCount: '49 / 111',
      spendRatio: '$39.6K / 87.5K',
      networks: ['meta', 'unity']
    },
    {
      id: 'rec-004',
      value: 'Fake Gameplay',
      tagCategory: 'Game Concept',
      kpi: 'CTR',
      direction: 'up',
      timeContext: 'first five seconds',
      text: 'Using Game Concept: Fake Gameplay in the first five seconds results in a better CTR.',
      videoCount: '90 / 111',
      spendRatio: '$67.6K / 87.5K',
      networks: ['google', 'meta', 'unity'],
      creativeId: 'cr-003'
    },
    {
      id: 'rec-005',
      value: 'Living Room',
      tagCategory: 'Room',
      kpi: 'ROASD7',
      direction: 'up',
      text: 'Using Room: Living Room results in a better ROAS D7.',
      videoCount: '23 / 111',
      spendRatio: '$18.2K / 87.5K',
      networks: ['google', 'meta'],
      creativeId: 'cr-002'
    },
    {
      id: 'rec-006',
      value: 'Puzzle',
      tagCategory: 'Visual Element',
      kpi: 'CPI',
      direction: 'down',
      text: 'Videos with Visual Element: Puzzle result in a worse CPI.',
      videoCount: '45 / 111',
      spendRatio: '$32.5K / 87.5K',
      networks: ['meta', 'unity'],
      creativeId: 'cr-001'
    }
  ];

  // ── Competitors ────────────────────────────────────────────
  const competitors = [
    {
      id: 'comp-jewel-swap',
      name: 'Jewel Swap',
      publisher: 'Playtika',
      color: '#4CAF50',
      creatives: [
        {
          id: 'comp-js-001',
          estimatedLaunch: '2026-09-01',
          duration: 15,
          timeline: [
            { tag: 'Gameplay Type',   value: 'Classic',     start: 0,  end: 8,  color: 0 },
            { tag: 'Danger Type',     value: 'Spikes',      start: 5,  end: 12, color: 3 },
            { tag: 'Hand Cursor',     value: 'Finger',      start: 3,  end: 10, color: 4 },
            { tag: 'CTA',             value: 'Play Now',    start: 12, end: 15, color: 9 },
            { tag: 'Pace',            value: 'Fast',        start: 0,  end: 15, color: 7 },
          ],
        },
        {
          id: 'comp-js-002',
          estimatedLaunch: '2026-09-14',
          duration: 12,
          timeline: [
            { tag: 'Gameplay Type',   value: 'Isometric',   start: 0,  end: 12, color: 0 },
            { tag: 'Danger Type',     value: 'Bombs',       start: 4,  end: 9,  color: 3 },
            { tag: 'Hand Cursor',     value: 'Hand',        start: 2,  end: 8,  color: 4 },
            { tag: 'CTA',             value: 'Play Now',    start: 10, end: 12, color: 9 },
            { tag: 'Pace',            value: 'Moderate',    start: 0,  end: 12, color: 7 },
          ],
        },
        {
          id: 'comp-js-003',
          estimatedLaunch: '2026-10-01',
          duration: 18,
          timeline: [
            { tag: 'Gameplay Type',   value: 'Classic',     start: 0,  end: 18, color: 0 },
            { tag: 'Danger Type',     value: 'Fire',        start: 6,  end: 14, color: 3 },
            { tag: 'CTA',             value: 'Install',     start: 15, end: 18, color: 9 },
            { tag: 'Pace',            value: 'Fast',        start: 0,  end: 18, color: 7 },
          ],
        },
      ],
    },
    {
      id: 'comp-match-masters',
      name: 'Match Masters',
      publisher: 'Candivore',
      color: '#9C27B0',
      creatives: [
        {
          id: 'comp-mm-001',
          estimatedLaunch: '2026-08-20',
          duration: 14,
          timeline: [
            { tag: 'Character',       value: 'Player',      start: 0,  end: 14, color: 1 },
            { tag: 'Gameplay Type',   value: 'PvP',         start: 0,  end: 12, color: 0 },
            { tag: 'Danger Type',     value: 'Rocks',       start: 4,  end: 10, color: 3 },
            { tag: 'Emotion',         value: 'Joy',         start: 8,  end: 14, color: 6 },
            { tag: 'CTA',             value: 'Play Now',    start: 12, end: 14, color: 9 },
          ],
        },
        {
          id: 'comp-mm-002',
          estimatedLaunch: '2026-09-10',
          duration: 16,
          timeline: [
            { tag: 'Character',       value: 'Player',      start: 0,  end: 16, color: 1 },
            { tag: 'Gameplay Type',   value: 'Tournament',  start: 0,  end: 14, color: 0 },
            { tag: 'Emotion',         value: 'Frustration', start: 6,  end: 12, color: 6 },
            { tag: 'CTA',             value: 'Play Now',    start: 14, end: 16, color: 9 },
          ],
        },
      ],
    },
    {
      id: 'comp-royal-match',
      name: 'Royal Match',
      publisher: 'Dream Games',
      color: '#FF9800',
      creatives: [
        {
          id: 'comp-rm-001',
          estimatedLaunch: '2026-09-05',
          duration: 15,
          timeline: [
            { tag: 'Character',       value: 'King Robert', start: 0,  end: 15, color: 1 },
            { tag: 'Danger Type',     value: 'Fall',        start: 3,  end: 10, color: 3 },
            { tag: 'Gameplay Type',   value: 'Puzzle',      start: 0,  end: 12, color: 0 },
            { tag: 'Emotion',         value: 'Surprise',    start: 8,  end: 15, color: 6 },
            { tag: 'Endcard',         value: 'Crown',       start: 13, end: 15, color: 5 },
            { tag: 'CTA',             value: 'Play Now',    start: 13, end: 15, color: 9 },
          ],
        },
        {
          id: 'comp-rm-002',
          estimatedLaunch: '2026-10-02',
          duration: 13,
          timeline: [
            { tag: 'Character',       value: 'King Robert', start: 0,  end: 13, color: 1 },
            { tag: 'Danger Type',     value: 'Spikes',      start: 4,  end: 9,  color: 3 },
            { tag: 'Gameplay Type',   value: 'Fail',        start: 2,  end: 11, color: 0 },
            { tag: 'Emotion',         value: 'Joy',         start: 9,  end: 13, color: 6 },
            { tag: 'CTA',             value: 'Play Now',    start: 11, end: 13, color: 9 },
          ],
        },
      ],
    },
    {
      id: 'comp-gardenscapes',
      name: 'Gardenscapes',
      publisher: 'Playrix',
      color: '#4CAF50',
      creatives: [
        {
          id: 'comp-gs-001',
          estimatedLaunch: '2026-08-15',
          duration: 16,
          timeline: [
            { tag: 'Character',       value: 'Austin',      start: 0,  end: 16, color: 1 },
            { tag: 'Game Concept',    value: 'Renovation',  start: 0,  end: 16, color: 0 },
            { tag: 'Background',      value: 'Garden',      start: 0,  end: 16, color: 2 },
            { tag: 'Emotion',         value: 'Joy',         start: 10, end: 16, color: 6 },
            { tag: 'Endcard',         value: 'Garden',      start: 14, end: 16, color: 5 },
            { tag: 'CTA',             value: 'Play Now',    start: 14, end: 16, color: 9 },
          ],
        },
      ],
    },
  ];

  // ── Benchmark (my usage vs market) ────────────────────────
  const benchmark = [
    { tag: 'Fail Concept',    mine: 38, market: 31, gap: +7  },
    { tag: 'Fake Gameplay',   mine: 18, market: 24, gap: -6  },
    { tag: 'Puzzle',          mine: 22, market: 28, gap: -6  },
    { tag: 'Drama',           mine: 14, market: 9,  gap: +5  },
    { tag: 'Renovation',      mine: 8,  market: 18, gap: -10 },
    { tag: 'Spikes (Danger)', mine: 3,  market: 12, gap: -9  },
    { tag: 'Fire (Danger)',   mine: 5,  market: 10, gap: -5  },
    { tag: 'Family Endcard',  mine: 45, market: 38, gap: +7  },
    { tag: 'Play Now CTA',    mine: 72, market: 68, gap: +4  },
    { tag: 'Fast Pace',       mine: 41, market: 52, gap: -11 },
    { tag: 'Joy Emotion',     mine: 38, market: 44, gap: -6  },
    { tag: 'Character Focus Intro', mine: 34, market: 29, gap: +5 },
  ];

  // ── Tag trend data (per tag, for the tag trend chart) ──────
  function generateTagTrend(baseIPM, variance) {
    const dates = ['Aug 15','Aug 22','Aug 29','Sep 5','Sep 12','Sep 19','Sep 26','Oct 3','Oct 10'];
    return {
      dates,
      avg:   dates.map((_, i) => +(baseIPM * 0.7 + Math.sin(i * 0.8) * variance * 0.6).toFixed(1)),
      accel: dates.map((_, i) => +(baseIPM + Math.sin(i * 1.1 + 0.5) * variance).toFixed(1)),
    };
  }

  // ── Combination KPI calculator (seeded pseudo-random) ─────
  function combinationKPIs(selections) {
    const str = JSON.stringify(selections);
    let hash = 0;
    for (let c of str) hash = ((hash << 5) - hash) + c.charCodeAt(0), hash |= 0;
    const seed = Math.abs(hash) / 2147483647;
    const base = { ipm: 20, ctr: 1.4, cpi: 18, cti: 28, cppd7: 60, roasd7: 32, spend: 12000 };
    return {
      ipm:    +(base.ipm    * (0.6 + seed * 1.4)).toFixed(1),
      ctr:    +(base.ctr    * (0.6 + seed * 1.4)).toFixed(2),
      cpi:    +(base.cpi    * (0.5 + seed * 1.0)).toFixed(1),
      cti:    +(base.cti    * (0.7 + seed * 1.0)).toFixed(1),
      cppd7:  +(base.cppd7  * (0.6 + seed * 0.8)).toFixed(0),
      roasd7: +(base.roasd7 * (0.5 + seed * 1.4)).toFixed(1),
      spend:  Math.round(base.spend * (0.4 + seed * 2.0) / 100) * 100,
    };
  }

  // ── Helper: get creative by id ─────────────────────────────
  function getCreative(id) {
    return creatives.find(c => c.id === id) || null;
  }

  // ── Helper: stars render ───────────────────────────────────
  function renderStars(score) {
    const full  = Math.floor(score);
    const half  = (score - full) >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    const starSVG = (cls) => `
      <svg class="star ${cls}" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1l1.76 3.56L14 5.27l-3 2.93.71 4.14L8 10.1l-3.71 2.24L5 8.2 2 5.27l4.24-.71z"/>
      </svg>`;
    const halfSVG = `
      <svg class="star star-half" viewBox="0 0 16 16" fill="currentColor">
        <defs><clipPath id="h"><rect width="8" height="16"/></clipPath></defs>
        <path d="M8 1l1.76 3.56L14 5.27l-3 2.93.71 4.14L8 10.1l-3.71 2.24L5 8.2 2 5.27l4.24-.71z" fill="#E5E7EB"/>
        <path d="M8 1l1.76 3.56L14 5.27l-3 2.93.71 4.14L8 10.1l-3.71 2.24L5 8.2 2 5.27l4.24-.71z" fill="#F59E0B" clip-path="url(#h)"/>
      </svg>`;
    return `<span class="stars" title="${score} / 5">
      ${'<svg class="star star-full" viewBox="0 0 16 16" fill="#F59E0B"><path d="M8 1l1.76 3.56L14 5.27l-3 2.93.71 4.14L8 10.1l-3.71 2.24L5 8.2 2 5.27l4.24-.71z"/></svg>'.repeat(full)}
      ${half ? halfSVG : ''}
      ${'<svg class="star star-empty" viewBox="0 0 16 16" fill="#E5E7EB"><path d="M8 1l1.76 3.56L14 5.27l-3 2.93.71 4.14L8 10.1l-3.71 2.24L5 8.2 2 5.27l4.24-.71z"/></svg>'.repeat(empty)}
    </span>`;
  }

  // ── Helper: network dots render ────────────────────────────
  const networkLabels = { google: 'G', unity: 'U', meta: 'M', tiktok: 'T', vungle: 'V', snapchat: 'S', applovin: 'A', ironsource: 'I' };
  function renderNetworkDots(networks) {
    return `<div class="network-dots">${networks.map(n =>
      `<span class="network-dot ${n}" title="${n.charAt(0).toUpperCase()+n.slice(1)}">${networkLabels[n]||'?'}</span>`
    ).join('')}</div>`;
  }

  // ── Helper: delta render ───────────────────────────────────
  function renderDelta(value, suffix = '%') {
    if (value === null || value === undefined) return '<span class="text-muted">—</span>';
    const up = value >= 0;
    const cls = up ? 'delta-up' : 'delta-down';
    const arrow = up ? '↑' : '↓';
    return `<span class="${cls}">${arrow} ${Math.abs(value)}${suffix}</span>`;
  }

  // ── Helper: format number ──────────────────────────────────
  function fmt(n, decimals = 0) {
    if (n === null || n === undefined) return '—';
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
    if (n >= 1000)    return (n/1000).toFixed(1) + 'K';
    return decimals ? n.toFixed(decimals) : Math.round(n).toString();
  }

  function fmtCurrency(n) {
    if (n >= 1000) return '$' + (n/1000).toFixed(1) + 'K';
    return '$' + n.toFixed(0);
  }

  function fmtPct(n) { return n.toFixed(1) + '%'; }

  function creativeThumbnailSVG(id, name, idx) {
    const c = creatives.find(x => x.id === id) || {};
    const room = c.tags ? c.tags.room : null;
    const character = c.tags ? c.tags.character : null;
    const dangerType = c.tags ? c.tags.dangerType : null;
    const gameConcept = c.tags ? c.tags.gameConcept : null;
    const score = c.aiGameAnalyzerScore || 3.0;
    const aiGenerated = c.aiGenerated || false;
    const adFormat = c.adFormat || 'video';
    const mainNetwork = c.networks ? c.networks[0] : 'google';

    // Layer 1: Dark room background with depth
    let bgGrad = '';
    if (room === 'Kitchen') {
      bgGrad = `<linearGradient id="bg_${id}" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2D1B00"/><stop offset="100%" stop-color="#7C3D00"/></linearGradient>`;
    } else if (room === 'Bathroom') {
      bgGrad = `<linearGradient id="bg_${id}" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0D1F2D"/><stop offset="100%" stop-color="#1E3A4F"/></linearGradient>`;
    } else if (room === 'Bedroom') {
      bgGrad = `<linearGradient id="bg_${id}" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#1A0D2E"/><stop offset="100%" stop-color="#3B1F5E"/></linearGradient>`;
    } else if (room === 'Living Room') {
      bgGrad = `<linearGradient id="bg_${id}" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0F1F0F"/><stop offset="100%" stop-color="#1E3D1E"/></linearGradient>`;
    } else {
      bgGrad = `<linearGradient id="bg_${id}" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0A1F0A"/><stop offset="100%" stop-color="#1A3A1A"/></linearGradient>`;
    }

    // Layer 2: Room architecture shapes
    let roomShapes = '';
    if (room === 'Kitchen') {
      roomShapes = `
        <polygon points="0,75 160,75 140,55 20,55" fill="rgba(180,100,20,0.4)"/>
        <rect x="0" y="0" width="160" height="56" fill="rgba(120,60,10,0.3)"/>
        <rect x="0" y="68" width="160" height="22" fill="rgba(200,120,40,0.6)" rx="2"/>
        <rect x="20" y="74" width="8" height="4" fill="white" opacity="0.8"/>
        <rect x="76" y="74" width="8" height="4" fill="white" opacity="0.8"/>
        <rect x="132" y="74" width="8" height="4" fill="white" opacity="0.8"/>
        <rect x="112" y="8" width="36" height="26" rx="3" fill="rgba(200,220,255,0.3)"/>
        <line x1="130" y1="8" x2="130" y2="34" stroke="rgba(200,220,255,0.5)" stroke-width="1"/>
        <line x1="112" y1="21" x2="148" y2="21" stroke="rgba(200,220,255,0.5)" stroke-width="1"/>
      `;
    } else if (room === 'Bathroom') {
      roomShapes = `
        <rect x="10" y="10" width="30" height="15" rx="1" fill="rgba(180,200,220,0.15)"/>
        <rect x="45" y="10" width="30" height="15" rx="1" fill="rgba(180,200,220,0.15)"/>
        <rect x="80" y="10" width="30" height="15" rx="1" fill="rgba(180,200,220,0.15)"/>
        <rect x="115" y="10" width="30" height="15" rx="1" fill="rgba(180,200,220,0.15)"/>
        <ellipse cx="100" cy="72" rx="42" ry="12" fill="rgba(180,200,220,0.5)"/>
        <ellipse cx="100" cy="70" rx="36" ry="9" fill="rgba(100,150,200,0.3)"/>
        <circle cx="40" cy="30" r="20" fill="rgba(150,180,200,0.25)" stroke="rgba(200,220,230,0.4)" stroke-width="3"/>
      `;
    } else if (room === 'Bedroom') {
      roomShapes = `
        <rect x="20" y="38" width="120" height="14" rx="6" fill="rgba(140,80,160,0.6)"/>
        <rect x="15" y="52" width="130" height="30" rx="4" fill="rgba(200,160,220,0.5)"/>
        <rect x="25" y="40" width="30" height="16" rx="5" fill="rgba(255,240,255,0.5)"/>
        <rect x="105" y="40" width="30" height="16" rx="5" fill="rgba(255,240,255,0.5)"/>
        <circle cx="145" cy="40" r="8" fill="rgba(253,224,71,0.5)"/>
        <rect x="143" y="48" width="4" height="14" fill="rgba(100,100,100,0.8)"/>
      `;
    } else if (room === 'Living Room') {
      roomShapes = `
        <rect x="10" y="54" width="140" height="28" rx="8" fill="rgba(80,140,80,0.6)"/>
        <rect x="10" y="46" width="140" height="14" rx="6" fill="rgba(60,110,60,0.7)"/>
        <rect x="22" y="54" width="32" height="10" rx="2" fill="rgba(120,180,120,0.5)"/>
        <rect x="64" y="54" width="32" height="10" rx="2" fill="rgba(120,180,120,0.5)"/>
        <rect x="106" y="54" width="32" height="10" rx="2" fill="rgba(120,180,120,0.5)"/>
        <circle cx="20" cy="20" r="12" fill="rgba(34,197,94,0.3)"/>
        <circle cx="16" cy="25" r="10" fill="rgba(34,197,94,0.3)"/>
      `;
    } else {
      roomShapes = `
        <rect x="0" y="60" width="160" height="30" fill="rgba(20,80,20,0.5)"/>
        <path d="M 0 60 Q 40 50 80 60 T 160 60 L 160 90 L 0 90 Z" fill="rgba(40,110,40,0.4)"/>
        <circle cx="130" cy="30" r="14" fill="rgba(234,179,8,0.2)"/>
      `;
    }

    // Layer 3: Match-3 board
    let boardColorClass = '';
    if (gameConcept === 'Fail Concept' || gameConcept === 'Drama') {
      boardColorClass = 'danger';
    } else if (gameConcept === 'Puzzle' || gameConcept === 'Fake Gameplay') {
      boardColorClass = 'puzzle';
    } else {
      boardColorClass = 'renovation';
    }

    let boardCircles = '';
    const boardColors = {
      danger: ['#FF6B6B', '#FF8E53', '#FF4A4A', '#FF9F43', '#E63946', '#F77F00'],
      puzzle: ['#4ECDC4', '#45B7D1', '#96CEB4', '#3A86C8', '#2A9D8F', '#52B788'],
      renovation: ['#FFEAA7', '#DDA0DD', '#F4A261', '#E76F51', '#F28482', '#F15BB5']
    };
    const colorsList = boardColors[boardColorClass] || boardColors.puzzle;
    for (let r = 0; r < 2; r++) {
      for (let col = 0; col < 3; col++) {
        const cx = 56 + col * 24;
        const cy = 14 + r * 16;
        const cVal = colorsList[(r * 3 + col) % colorsList.length];
        boardCircles += `<circle cx="${cx}" cy="${cy}" r="7" fill="${cVal}"/>`;
        boardCircles += `<circle cx="${cx - 2}" cy="${cy - 2}" r="2" fill="white" opacity="0.6"/>`;
      }
    }
    const progressBar = `
      <rect x="35" y="44" width="90" height="4" rx="2" fill="rgba(0,0,0,0.4)"/>
      <rect x="35" y="44" width="55" height="4" rx="2" fill="#EAB308"/>
    `;

    // Layer 4: Character shape
    let characterShape = '';
    if (character === 'Austin') {
      characterShape = `
        <rect x="20" y="58" width="16" height="24" rx="4" fill="#14B8A6"/>
        <circle cx="28" cy="46" r="9" fill="#FBBF24"/>
        <ellipse cx="28" cy="38" r="9" rx="9" ry="3" fill="#374151"/>
      `;
    } else if (character === 'Child') {
      characterShape = `
        <rect x="22" y="62" width="12" height="18" rx="3" fill="#EF4444"/>
        <circle cx="28" cy="51" r="10" fill="#FBBF24"/>
        <circle cx="24" cy="44" r="3" fill="#F59E0B"/>
        <circle cx="32" cy="44" r="3" fill="#F59E0B"/>
      `;
    } else if (character === 'Katherine Broom') {
      characterShape = `
        <rect x="20" y="58" width="16" height="24" rx="4" fill="#8B5CF6"/>
        <circle cx="28" cy="46" r="9" fill="#FBBF24"/>
        <path d="M20,44 Q28,34 36,44 L32,56 L24,56 Z" fill="#4B5563"/>
      `;
    } else if (character === 'Chris') {
      characterShape = `
        <rect x="20" y="58" width="16" height="24" rx="4" fill="#3B82F6"/>
        <circle cx="28" cy="46" r="9" fill="#FBBF24"/>
        <path d="M22,39 Q28,34 34,39 L28,42 Z" fill="#F59E0B"/>
      `;
    }

    // Layer 5: Danger element
    let dangerShape = '';
    if (dangerType === 'Fire') {
      dangerShape = `
        <circle cx="120" cy="62" r="16" fill="rgba(255,107,53,0.2)"/>
        <path d="M 110 75 Q 120 40 125 55 T 130 75 Z" fill="#FF6B35"/>
        <path d="M 115 75 Q 120 50 123 60 T 125 75 Z" fill="#FCD34D"/>
      `;
    } else if (dangerType === 'Spikes') {
      dangerShape = `
        <polygon points="100,75 106,55 112,75" fill="#6B7280"/>
        <polygon points="110,75 116,50 122,75" fill="#374151"/>
        <polygon points="120,75 126,58 132,75" fill="#6B7280"/>
        <polygon points="130,75 136,52 142,75" fill="#374151"/>
      `;
    }

    // Layer 6 & 7: Vignette + Video Player UI
    const vignetteAndUI = `
      <defs>
        <radialGradient id="vig_${id}" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.55)"/>
        </radialGradient>
      </defs>
      <rect width="160" height="90" fill="url(#vig_${id})"/>
      <rect x="0" y="78" width="160" height="12" fill="rgba(0,0,0,0.65)"/>
      <circle cx="8" cy="84" r="4" fill="rgba(255,255,255,0.9)"/>
      <polygon points="7,82 10,84 7,86" fill="rgba(0,0,0,0.8)"/>
      <text x="16" y="87" font-family="Inter,sans-serif" font-size="8" fill="white">0:00</text>
      <text x="154" y="87" text-anchor="end" font-family="Inter,sans-serif" font-size="8" fill="#9CA3AF">/ 0:${c.tags ? (c.tags.duration || 15) : 15}</text>
      <rect x="38" y="82" width="80" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
      <rect x="38" y="82" width="18" height="2" rx="1" fill="white"/>
    `;

    // Layer 8: Overlays
    const networkLabels = { google: 'G', unity: 'U', meta: 'M', tiktok: 'T', vungle: 'V', snapchat: 'S', applovin: 'A', ironsource: 'I' };
    const netColors = { google: '#4285F4', unity: '#333333', meta: '#0866FF', tiktok: '#EE1D52', vungle: '#10B981', snapchat: '#FFFC00' };
    const netColor = netColors[mainNetwork] || '#6366F1';
    const netLetter = (networkLabels[mainNetwork] || 'G');
    const badgeTextFill = mainNetwork === 'snapchat' ? 'black' : 'white';

    let overlays = `
      <rect x="4" y="4" width="13" height="9" rx="2" fill="${netColor}"/>
      <text x="10.5" y="11" text-anchor="middle" font-family="Inter,sans-serif" font-size="7" font-weight="700" fill="${badgeTextFill}">${netLetter}</text>
      <rect x="130" y="4" width="26" height="9" rx="2" fill="rgba(0,0,0,0.6)"/>
      <text x="143" y="11" text-anchor="middle" font-family="Inter,sans-serif" font-size="7" fill="white">★ ${score.toFixed(1)}</text>
    `;
    if (aiGenerated) {
      overlays += `
        <rect x="4" y="15" width="22" height="9" rx="2" fill="#5B4FE9"/>
        <text x="15" y="22" text-anchor="middle" font-family="Inter,sans-serif" font-size="6" font-weight="700" fill="white">✦ AI</text>
      `;
    }
    if (adFormat === 'playable') {
      overlays += `
        <rect x="4" y="15" width="34" height="9" rx="2" fill="#10B981"/>
        <text x="21" y="22" text-anchor="middle" font-family="Inter,sans-serif" font-size="6" font-weight="700" fill="white">▶ PLAY</text>
      `;
    }

    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90">
      <defs>${bgGrad}</defs>
      <rect width="160" height="90" fill="url(#bg_${id})"/>
      ${roomShapes}
      ${boardCircles}
      ${progressBar}
      ${characterShape}
      ${dangerShape}
      ${vignetteAndUI}
      ${overlays}
    </svg>`)}`;
  }

  // Pre-compute thumbnails
  creatives.forEach((c, i) => { c.thumbnail = creativeThumbnailSVG(c.id, c.name, i); });

  // Competitor thumbnails
  const compColors = [['#4CAF50','#81C784'], ['#9C27B0','#CE93D8'], ['#FF9800','#FFB74D'], ['#2196F3','#64B5F6']];
  competitors.forEach((comp, ci) => {
    comp.creatives.forEach((cc, cj) => {
      const [c1, c2] = compColors[ci % compColors.length];
      cc.thumbnail = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90">
        <defs><linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient></defs>
        <rect width="160" height="90" fill="url(#cg)"/>
        <rect x="20" y="20" width="120" height="50" rx="6" fill="rgba(255,255,255,0.15)"/>
        <text x="80" y="50" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="white" font-weight="600">${comp.name}</text>
        <text x="80" y="64" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" fill="rgba(255,255,255,0.7)">#${cj+1}</text>
      </svg>`)}`;
    });
  });

  const AppState = {
    activeApp: 'Homescapes',
    dateRange: 'Jan 1 – Feb 28, 2026',
  };

  const metricHeroValues = {
    installs: { value: '249,751', label: 'installs', delta: '+309.13% vs previous 60 days' },
    spend:    { value: '$142K',   label: 'total spend', delta: '+187% vs previous 60 days' },
    ctr:      { value: '2.1%',   label: 'avg CTR', delta: '+0.4pp vs previous 60 days' },
  };

  function getAppCreatives() {
    return creatives.filter(c => c.apps && c.apps.includes(AppState.activeApp));
  }

  // Public API
  return {
    creatives,
    tags,
    trendData,
    conceptsOverview,
    recommendations,
    competitors,
    benchmark,
    generateTagTrend,
    combinationKPIs,
    getCreative,
    renderStars,
    renderNetworkDots,
    renderDelta,
    fmt,
    fmtCurrency,
    fmtPct,
    AppState,
    metricHeroValues,
    getAppCreatives
  };
})();


