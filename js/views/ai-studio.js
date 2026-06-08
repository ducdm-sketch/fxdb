(function() {
  var state = {
    format: 'video',         // 'video' | 'playable'
    duration: 15,            // 15 | 30 | 60
    networks: ['google'],
    tags: {
      character: 'Child',
      gameConcept: 'Fail Concept',
      room: 'Kitchen',
      emotion: 'Joy',
      endcard: 'Family',
      cta: 'Play Now',
    },
    playable: {
      background: 'Kitchen',
      coreMechanic: 'Fail Concept',
      difficulty: 'Medium',
      handTutorial: true,
      ctaText: 'Play Now',
      soundOn: true,
      layout: 'Portrait',
      exportNetwork: 'Meta HTML5',
    },
    genState: 'idle',        // 'idle' | 'step1' | 'step2' | 'step3' | 'done'
    expandedSections: {
      bg: true,
      gameplay: true,
      tutorial: false,
      cta: false,
      sound: false,
      export: false
    }
  };

  // Mock historical data mapping for custom results
  var mockPredictions = {
    video: { ipm: 58.3, ctr: 2.54, cpi: 11.2 },
    playable: { ipm: 38.9, ctr: 1.78, cpi: 15.6, engagement: '38%' }
  };

  window['View_ai-studio'] = function(params) {
    Charts.destroyAll();
    
    // Parse URL params if directed from combinations
    if (params) {
      if (params.character) state.tags.character = params.character;
      if (params.gameConcept) state.tags.gameConcept = params.gameConcept;
      if (params.room) state.tags.room = params.room;
      if (params.endcard) state.tags.endcard = params.endcard;
    }

    state.genState = 'idle'; // Reset state on view reload
    render();
  };

  function render() {
    var app = document.getElementById('app');
    var C = Components;
    var D = window.AIGameAnalyzerData;

    // Inject CSS animations for playable studio hand tutorial if not present
    if (!document.getElementById('ai-studio-styles')) {
      var style = document.createElement('style');
      style.id = 'ai-studio-styles';
      style.textContent = `
        @keyframes finger-bob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(0.9); }
        }
        .bobbing-finger {
          animation: finger-bob 1.2s infinite ease-in-out;
        }
        .ai-studio-container {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 20px;
          align-items: start;
        }
        .studio-sidebar {
          width: 340px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .param-category-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--color-surface-hover);
          border-radius: var(--radius-md);
          cursor: pointer;
          font-size: var(--text-sm);
          font-weight: 600;
          border: 1px solid var(--color-border-light);
        }
        .param-category-body {
          padding: 12px 14px;
          border: 1px solid var(--color-border-light);
          border-top: none;
          border-radius: 0 0 var(--radius-md) var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: -4px;
          margin-bottom: 8px;
          background: var(--color-surface);
        }
        .toggle-switch-input {
          width: 34px;
          height: 18px;
          position: relative;
          cursor: pointer;
        }
        .toggle-switch-track {
          position: absolute;
          inset: 0;
          background: var(--color-border);
          border-radius: 99px;
          transition: background 0.2s;
        }
        .toggle-switch-input:checked .toggle-switch-track {
          background: var(--color-primary);
        }
        .toggle-switch-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .toggle-switch-input:checked .toggle-switch-thumb {
          transform: translateX(16px);
        }
        .phone-mockup {
          width: 200px;
          height: 350px;
          border: 8px solid #2d2d30;
          border-radius: 28px;
          background: #000;
          box-shadow: var(--shadow-xl);
          position: relative;
          overflow: hidden;
          margin: 0 auto;
        }
        .phone-speaker {
          width: 60px;
          height: 4px;
          background: #2d2d30;
          border-radius: 2px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
        .phone-screen {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          background: #111;
          color: white;
          font-family: sans-serif;
        }
      `;
      document.head.appendChild(style);
    }

    // Options for brief selection
    var characters = ['Child', 'Austin', 'Katherine Broom', 'Chris', 'None'];
    var concepts = ['Fail Concept', 'Drama', 'Puzzle', 'Fake Gameplay', 'Renovation'];
    var rooms = ['Kitchen', 'Bathroom', 'Bedroom', 'Living Room', 'Garden'];
    var emotions = ['Joy', 'Frustration', 'Surprise', 'Fear', 'Calm'];
    var endcards = ['Family', 'Play Store', 'None'];
    var ctas = ['Play Now', 'Download Now', 'Try Free'];
    var difficulties = ['Easy', 'Medium', 'Hard'];
    var exportNetworks = ['Meta HTML5', 'Google HTML5', 'Unity', 'ironSource', 'AppLovin'];
    var layouts = ['Portrait', 'Landscape', 'Square'];

    // Left Panel Form HTML
    var leftPanelHTML = '<div class="card" style="padding:16px">';
    
    // Tab toggles for video/playable
    leftPanelHTML += 
      '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">AD FORMAT</div>' +
      '<div style="display:flex;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:2px;margin-bottom:16px">' +
        '<button class="btn btn-sm" id="format-video-btn" style="flex:1;border:none;' + (state.format === 'video' ? 'background:var(--color-primary);color:white' : 'background:transparent;color:var(--color-text-muted)') + '">Video Ad</button>' +
        '<button class="btn btn-sm" id="format-playable-btn" style="flex:1;border:none;' + (state.format === 'playable' ? 'background:var(--color-primary);color:white' : 'background:transparent;color:var(--color-text-muted)') + '">Playable Ad</button>' +
      '</div>';

    if (state.format === 'video') {
      // DURATION
      leftPanelHTML += 
        '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">DURATION</div>' +
        '<div style="display:flex;gap:6px;margin-bottom:16px">' +
          [15, 30, 60].map(function(d) {
            var active = state.duration === d;
            return '<button class="filter-btn duration-select-btn' + (active ? ' active' : '') + '" data-dur="' + d + '" style="flex:1;justify-content:center">' + d + 's</button>';
          }).join('') +
        '</div>';

      // NETWORKS MULTISELECT
      var availableNets = [
        { id: 'google', label: 'Google' },
        { id: 'meta', label: 'Meta' },
        { id: 'unity', label: 'Unity' }
      ];
      leftPanelHTML += 
        '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">TARGET NETWORKS</div>' +
        '<div style="display:flex;gap:6px;margin-bottom:20px">' +
          availableNets.map(function(n) {
            var active = state.networks.indexOf(n.id) !== -1;
            return '<button class="filter-btn network-select-btn' + (active ? ' active' : '') + '" data-net="' + n.id + '" style="flex:1;justify-content:center">' + n.label + '</button>';
          }).join('') +
        '</div>';

      // CREATIVE BRIEF TAGS
      leftPanelHTML += 
        '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;border-top:1px solid var(--color-border-light);padding-top:16px;margin-bottom:12px">CREATIVE BRIEF</div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">' +
          renderBriefSelector('character', 'Character', state.tags.character, characters) +
          renderBriefSelector('gameConcept', 'Game Concept', state.tags.gameConcept, concepts) +
          renderBriefSelector('room', 'Room Scenario', state.tags.room, rooms) +
          renderBriefSelector('emotion', 'Emotion Focus', state.tags.emotion, emotions) +
          renderBriefSelector('endcard', 'Endcard Template', state.tags.endcard, endcards) +
          renderBriefSelector('cta', 'CTA Button Text', state.tags.cta, ctas) +
        '</div>' +
        '<button id="generate-studio-btn" class="btn btn-primary" style="width:100%;justify-content:center;padding:10px 0">' + C.icon('sparkles', 14) + ' Generate Video Ad</button>';
    } else {
      // PLAYABLE Studio collapsible parameters (mirrors reference)
      leftPanelHTML += 
        '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">PLAYABLE PARAMETERS</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">' +
          // 🖼 Background Category
          renderCategoryHeader('bg', '🖼 Background', 1) +
          (state.expandedSections.bg ? 
            '<div class="param-category-body">' +
              renderPlayableDropdown('background', 'Room Theme', state.playable.background, rooms) +
            '</div>' : '') +

          // 🎮 Gameplay Category
          renderCategoryHeader('gameplay', '🎮 Gameplay', 2) +
          (state.expandedSections.gameplay ? 
            '<div class="param-category-body">' +
              renderPlayableDropdown('coreMechanic', 'Core Mechanic', state.playable.coreMechanic, concepts) +
              renderPlayableDropdown('difficulty', 'Difficulty Target', state.playable.difficulty, difficulties) +
            '</div>' : '') +

          // 👆 Hand Tutorial Category
          renderCategoryHeader('tutorial', '👆 Hand Tutorial', 1) +
          (state.expandedSections.tutorial ? 
            '<div class="param-category-body">' +
              renderPlayableToggle('handTutorial', 'Enable Animated Hand', state.playable.handTutorial) +
            '</div>' : '') +

          // 📢 CTA Category
          renderCategoryHeader('cta', '📢 Call To Action', 1) +
          (state.expandedSections.cta ? 
            '<div class="param-category-body">' +
              renderPlayableDropdown('ctaText', 'Button Text', state.playable.ctaText, ctas) +
            '</div>' : '') +

          // 🔊 Sound Category
          renderCategoryHeader('sound', '🔊 Sound FX', 1) +
          (state.expandedSections.sound ? 
            '<div class="param-category-body">' +
              renderPlayableToggle('soundOn', 'Audio Enabled', state.playable.soundOn) +
            '</div>' : '') +

          // 🗺 Export Profile
          renderCategoryHeader('export', '🗺 Export Network', 2) +
          (state.expandedSections.export ? 
            '<div class="param-category-body">' +
              renderPlayableDropdown('exportNetwork', 'Target Platform', state.playable.exportNetwork, exportNetworks) +
              renderPlayableDropdown('layout', 'Preset Orientation', state.playable.layout, layouts) +
            '</div>' : '') +
        '</div>' +
        '<button id="generate-studio-btn" class="btn btn-primary" style="width:100%;justify-content:center;padding:10px 0">' + C.icon('sparkles', 14) + ' Generate Playable Ad</button>';
    }

    leftPanelHTML += '</div>'; // End card

    // Right Panel Preview Area
    var rightPanelHTML = '<div class="card" style="padding:20px;height:100%;display:flex;flex-direction:column;justify-content:center;min-height:480px">';
    
    if (state.genState === 'idle') {
      rightPanelHTML += 
        '<div style="text-align:center;margin:auto 0;padding:40px 20px">' +
          '<div style="width:60px;height:60px;border-radius:50%;background:rgba(91,79,233,0.1);display:flex;align-items:center;justify-content:center;color:var(--color-primary);margin:0 auto 16px">' +
            C.icon('wand', 28) +
          '</div>' +
          '<h3 style="margin-bottom:6px;font-size:var(--text-lg)">Configure Creative Parameters</h3>' +
          '<p style="color:var(--color-text-muted);max-width:320px;margin:0 auto 20px;font-size:var(--text-sm)">Select ad style parameters on the left and trigger generation to run mock performance forecasts.</p>' +
        '</div>' +
        // Show history rail
        '<div style="border-top:1px solid var(--color-border-light);padding-top:20px">' +
          '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">Previously Generated (AI Gallery)</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">' +
            D.creatives.filter(function(c) { return c.aiGenerated; }).map(function(c) {
              return '<div class="gallery-card" data-history-id="' + c.id + '" style="padding:6px;border-radius:var(--radius-md)">' +
                '<div style="aspect-ratio:16/9;border-radius:4px;overflow:hidden;background:#111;margin-bottom:6px">' +
                  '<img src="' + c.thumbnail + '" style="width:100%;height:100%;object-fit:cover">' +
                '</div>' +
                '<div style="font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--color-text)">' + c.name + '</div>' +
                '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:2px">' +
                  '<span style="font-size:9px;color:var(--color-text-muted)">IPM ' + c.metrics.ipm.toFixed(1) + '</span>' +
                  '<span style="font-size:8px;padding:1px 4px;background:#5B4FE9;color:white;border-radius:3px;font-weight:700">✦ AI</span>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>';
    } else if (state.genState !== 'done') {
      // Step-by-step progress animation
      var step1Class = state.genState === 'step1' ? 'running' : 'checked';
      var step2Class = state.genState === 'step2' ? 'running' : (state.genState === 'step3' ? 'checked' : 'pending');
      var step3Class = state.genState === 'step3' ? 'running' : 'pending';
      var progressWidth = state.genState === 'step1' ? '33%' : (state.genState === 'step2' ? '66%' : '90%');
      var progressPercent = state.genState === 'step1' ? '33%' : (state.genState === 'step2' ? '66%' : '90%');

      rightPanelHTML += 
        '<div style="margin:auto;max-width:320px;width:100%;text-align:center">' +
          '<h3 style="margin-bottom:20px">AI Studio Engine Rendering</h3>' +
          '<div style="display:flex;flex-direction:column;gap:12px;text-align:left;margin-bottom:24px">' +
            renderLoadingStep('1. Analysing Tag Combinations', step1Class) +
            renderLoadingStep('2. Simulating Creative Concept Output', step2Class) +
            renderLoadingStep('3. Calculating Predicted Performance Metrics', step3Class) +
          '</div>' +
          '<div style="height:6px;background:var(--color-border-light);border-radius:3px;overflow:hidden;margin-bottom:8px;position:relative">' +
            '<div style="height:100%;width:' + progressWidth + ';background:var(--color-primary);border-radius:3px;transition:width 0.5s ease-in-out"></div>' +
          '</div>' +
          '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">Generating: ' + progressPercent + '</div>' +
        '</div>';
    } else {
      // DONE STATE - Displays generated results
      var isPlayable = state.format === 'playable';
      var pred = isPlayable ? mockPredictions.playable : mockPredictions.video;
      
      // We resolve thumbnail SVG dynamically based on the current selections
      var matchedCreative = {
        name: isPlayable ? 'playable studio ad' : 'studio video concept',
        aiGenerated: true,
        adFormat: isPlayable ? 'playable' : 'video',
        aiGameAnalyzerScore: 4.0,
        apps: ['Homescapes', 'My Game'],
        tags: {
          character: isPlayable ? state.playable.coreMechanic === 'Fail Concept' ? 'Child' : 'Austin' : state.tags.character,
          gameConcept: isPlayable ? state.playable.coreMechanic : state.tags.gameConcept,
          room: isPlayable ? state.playable.background : state.tags.room,
          dangerType: isPlayable ? (state.playable.coreMechanic === 'Fail Concept' ? 'Fire' : null) : (state.tags.gameConcept === 'Fail Concept' ? 'Fire' : null)
        }
      };

      // Draw high fidelity scene thumbnail SVG using state variables
      var thumbnailSVG = D.creativeThumbnailSVG ? D.creativeThumbnailSVG(matchedCreative) : '';

      rightPanelHTML += 
        '<div style="display:flex;flex-direction:column;gap:20px;height:100%">' +
          '<div style="display:flex;align-items:center;justify-content:space-between">' +
            '<div>' +
              '<div style="font-size:var(--text-md);font-weight:700;color:var(--color-text)">✦ AI Ad Generated Successfully</div>' +
              '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">Custom template rendered from your parameter brief</div>' +
            '</div>' +
            '<span class="badge badge-success">IPM PROJECTED LIFT</span>' +
          '</div>' +

          '<div style="display:grid;grid-template-columns:1fr 240px;gap:20px">' +
            // SVG Scene preview
            '<div>' +
              '<div style="aspect-ratio:16/9;border-radius:var(--radius-lg);overflow:hidden;background:#111;position:relative;border:1px solid var(--color-border)">' +
                thumbnailSVG +
              '</div>' +
              '<div style="margin-top:12px;font-size:var(--text-xs);color:var(--color-text-muted);line-height:1.5">' +
                '<strong>Prompt brief:</strong> ' + 
                (isPlayable ? 
                  'Playable Concept (' + state.playable.coreMechanic + ') + Scene: ' + state.playable.background + ' + Difficulty: ' + state.playable.difficulty :
                  state.tags.character + ' in ' + state.tags.room + ' with theme ' + state.tags.gameConcept + ' (' + state.tags.emotion + ')') +
              '</div>' +
            '</div>' +

            // Forecast KPIs
            '<div style="background:var(--color-bg);border-radius:var(--radius-lg);padding:14px;border:1px solid var(--color-border);display:flex;flex-direction:column;gap:12px">' +
              '<div style="font-size:var(--text-xs);font-weight:700;color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em">Predicted Performance</div>' +
              
              renderStudioKPI('PROJECTED IPM', pred.ipm.toFixed(1), '+18.4% vs account avg') +
              renderStudioKPI('ESTIMATED CTR', pred.ctr + '%', '+0.3% vs theme benchmark') +
              renderStudioKPI('PROJECTED CPI', '$' + pred.cpi.toFixed(2), '-$2.10 savings projected') +
              (isPlayable ? renderStudioKPI('ENGAGEMENT RATE', pred.engagement, 'Est. 1st tap rate') : '') +
            '</div>' +
          '</div>' +

          '<div style="display:flex;gap:10px;margin-top:auto;border-top:1px solid var(--color-border-light);padding-top:16px">' +
            '<button class="btn btn-primary" id="save-studio-lib-btn">' + C.icon('plus', 14) + ' Save to Library</button>' +
            '<button class="btn btn-secondary" id="decon-studio-btn">' + C.icon('film', 14) + ' Deconstruct Concept</button>' +
            '<button class="btn btn-secondary" id="combo-studio-btn">' + C.icon('shuffle', 14) + ' Combinations Sandbox</button>' +
          '</div>' +
        '</div>';
    }

    rightPanelHTML += '</div>'; // End right card

    // Setup active tab panel view (left side selection panel + right side preview/mock phone)
    var headerHTML = 
      '<div class="page-header">' +
        '<div>' +
          '<div class="page-title">AI Creative Studio</div>' +
          '<div class="page-subtitle">Configure parameters to generate high-fidelity ad screenshot mockups</div>' +
        '</div>' +
      '</div>';

    // If format is Playable and genState is NOT Done, show the Live Mobile Mockup inside Right Panel!
    if (state.format === 'playable' && state.genState !== 'done') {
      var diffVal = state.playable.difficulty === 'Easy' ? 200 : (state.playable.difficulty === 'Medium' ? 500 : 1000);
      var gridColor = state.playable.coreMechanic === 'Fail Concept' ? '#FF6B6B' : (state.playable.coreMechanic === 'Puzzle' ? '#4ECDC4' : '#F59E0B');
      
      // Core mechanic colors
      var dotColors = state.playable.coreMechanic === 'Fail Concept' ? 
        ['#EF4444', '#F59E0B', '#EF4444', '#F59E0B', '#F59E0B', '#EF4444'] : 
        (state.playable.coreMechanic === 'Puzzle' ? 
          ['#3B82F6', '#10B981', '#F59E0B', '#3B82F6', '#10B981', '#F59E0B'] :
          ['#F59E0B', '#78350F', '#10B981', '#F59E0B', '#78350F', '#10B981']);

      var phoneScreenContent = 
        '<div class="phone-speaker"></div>' +
        '<div class="phone-screen" style="padding:12px;font-size:10px;justify-content:space-between;background:radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)">' +
          // Header target
          '<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.4);padding:4px 8px;border-radius:6px">' +
            '<span>TARGET: 0/' + diffVal + '</span>' +
            '<span style="color:#F59E0B">★ MOVES: 15</span>' +
          '</div>' +

          // Match 3 grid
          '<div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;width:120px;margin:20px auto;background:rgba(255,255,255,0.05);padding:8px;border-radius:8px">' +
            dotColors.map(function(c, i) {
              var fingerHTML = (i === 1 && state.playable.handTutorial) ? 
                '<div class="bobbing-finger" style="position:absolute;bottom:-6px;right:-6px;font-size:18px;z-index:5">👆</div>' : '';
              return '<div style="aspect-ratio:1/1;background:' + c + ';border-radius:50%;position:relative;box-shadow:inset -2px -2px 0 rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)">' +
                '<div style="position:absolute;top:2px;left:2px;width:4px;height:4px;background:rgba(255,255,255,0.4);border-radius:50%"></div>' +
                fingerHTML +
              '</div>';
            }).join('') +
          '</div>' +

          // Character silhouette/avatar
          '<div style="text-align:center;margin-top:auto">' +
            '<div style="display:inline-block;width:34px;height:34px;border-radius:50%;background:#EF4444;margin-bottom:4px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.3)">' +
              '<svg viewBox="0 0 24 24" fill="white" style="width:100%;height:100%;padding:4px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' +
            '</div>' +
            '<div style="font-size:8px;color:#cbd5e1;font-weight:600">Child Character</div>' +
          '</div>' +

          // Play CTA button
          '<button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;font-size:10px;padding:5px 0;margin-top:10px;background:#10B981;border-color:#10B981">' +
            state.playable.ctaText +
          '</button>' +
        '</div>';

      rightPanelHTML = 
        '<div class="card" style="padding:20px;display:flex;flex-direction:column;gap:16px;text-align:center;justify-content:center">' +
          '<div style="font-weight:600;font-size:var(--text-sm);color:var(--color-text);text-align:left">Playable Live Preview Mockup</div>' +
          '<div class="phone-mockup">' +
            phoneScreenContent +
          '</div>' +
          '<div style="font-size:var(--text-xs);color:var(--color-text-muted)">' +
            '📐 Layout: <strong>' + state.playable.layout + '</strong> · Platform Package: <strong>' + state.playable.exportNetwork + '</strong>' +
          '</div>' +
          '<div style="display:flex;gap:10px;margin-top:12px">' +
            '<button id="generate-playable-btn-main" class="btn btn-primary" style="flex:1;justify-content:center">' + C.icon('sparkles', 13) + ' Generate Playable Ad</button>' +
            '<button id="export-package-btn" class="btn btn-secondary" style="flex:1;justify-content:center">' + C.icon('download', 13) + ' Export package ↗</button>' +
          '</div>' +
        '</div>';
    }

    app.innerHTML = 
      '<div class="fade-in">' +
        headerHTML +
        '<div class="ai-studio-container">' +
          leftPanelHTML +
          rightPanelHTML +
        '</div>' +
      '</div>';

    bindEvents();
  }

  function renderBriefSelector(field, label, value, options) {
    return '<div>' +
      '<div style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-secondary);margin-bottom:4px">' + label + '</div>' +
      '<select class="filter-select brief-tag-select" data-field="' + field + '" style="width:100%">' +
        options.map(function(opt) {
          return '<option value="' + opt + '"' + (value === opt ? ' selected' : '') + '>' + opt + '</option>';
        }).join('') +
      '</select>' +
    '</div>';
  }

  function renderPlayableDropdown(field, label, value, options) {
    return '<div>' +
      '<div style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-secondary);margin-bottom:4px">' + label + '</div>' +
      '<select class="filter-select playable-tag-select" data-field="' + field + '" style="width:100%">' +
        options.map(function(opt) {
          return '<option value="' + opt + '"' + (value === opt ? ' selected' : '') + '>' + opt + '</option>';
        }).join('') +
      '</select>' +
    '</div>';
  }

  function renderPlayableToggle(field, label, checked) {
    return '<div style="display:flex;align-items:center;justify-content:space-between">' +
      '<span style="font-size:var(--text-xs);font-weight:600;color:var(--color-text-secondary)">' + label + '</span>' +
      '<label class="toggle">' +
        '<input type="checkbox" class="playable-toggle-switch" data-field="' + field + '"' + (checked ? ' checked' : '') + '>' +
        '<div class="toggle-track"></div>' +
        '<div class="toggle-thumb"></div>' +
      '</label>' +
    '</div>';
  }

  function renderCategoryHeader(key, title, count) {
    return '<div class="param-category-header" data-key="' + key + '">' +
      '<span>' + title + '</span>' +
      '<div style="display:flex;align-items:center;gap:6px">' +
        '<span class="badge badge-neutral" style="font-size:10px;padding:2px 6px">' + count + '</span>' +
        '<span>' + (state.expandedSections[key] ? '▼' : '▶') + '</span>' +
      '</div>' +
    '</div>';
  }

  function renderLoadingStep(label, stepClass) {
    var checkIcon = '';
    var textStyle = '';
    
    if (stepClass === 'checked') {
      checkIcon = '<span style="color:var(--color-success);font-weight:bold;margin-right:8px">✓</span>';
      textStyle = 'color:var(--color-text-muted);text-decoration:line-through';
    } else if (stepClass === 'running') {
      checkIcon = '<span style="display:inline-block;animation:spin 1s linear infinite;margin-right:8px;color:var(--color-primary)">⟳</span>';
      textStyle = 'color:var(--color-text);font-weight:600';
    } else {
      checkIcon = '<span style="color:var(--color-text-light);margin-right:8px">○</span>';
      textStyle = 'color:var(--color-text-light)';
    }

    return '<div style="display:flex;align-items:center;font-size:var(--text-sm);' + textStyle + '">' +
      checkIcon +
      '<span>' + label + '</span>' +
    '</div>';
  }

  function renderStudioKPI(label, value, sub) {
    return '<div style="background:var(--color-surface);border:1px solid var(--color-border-light);border-radius:var(--radius-md);padding:8px 12px">' +
      '<div style="font-size:9px;font-weight:700;color:var(--color-text-muted);letter-spacing:0.04em">' + label + '</div>' +
      '<div style="font-size:var(--text-lg);font-weight:700;color:var(--color-text);margin:2px 0">' + value + '</div>' +
      '<div style="font-size:9px;color:var(--color-success);font-weight:600">' + sub + '</div>' +
    '</div>';
  }

  function triggerGeneration() {
    state.genState = 'step1';
    render();

    setTimeout(function() {
      state.genState = 'step2';
      render();

      setTimeout(function() {
        state.genState = 'step3';
        render();

        setTimeout(function() {
          state.genState = 'done';
          render();
          Components.showToast('Creative generation complete!', 'success', 2200);
        }, 1200);
      }, 1200);
    }, 1200);
  }

  function bindEvents() {
    var app = document.getElementById('app');
    var C = Components;

    // Format switches
    app.querySelector('#format-video-btn')?.addEventListener('click', function() {
      state.format = 'video';
      state.genState = 'idle';
      render();
    });
    app.querySelector('#format-playable-btn')?.addEventListener('click', function() {
      state.format = 'playable';
      state.genState = 'idle';
      render();
    });

    // Duration selection
    app.querySelectorAll('.duration-select-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.duration = parseInt(this.dataset.dur);
        render();
      });
    });

    // Network select pills
    app.querySelectorAll('.network-select-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var net = this.dataset.net;
        var idx = state.networks.indexOf(net);
        if (idx !== -1) {
          state.networks.splice(idx, 1);
        } else {
          state.networks.push(net);
        }
        render();
      });
    });

    // Brief tag select changes
    app.querySelectorAll('.brief-tag-select').forEach(function(sel) {
      sel.addEventListener('change', function() {
        state.tags[this.dataset.field] = this.value;
      });
    });

    // Playable tag select changes
    app.querySelectorAll('.playable-tag-select').forEach(function(sel) {
      sel.addEventListener('change', function() {
        state.playable[this.dataset.field] = this.value;
        render();
      });
    });

    // Playable toggles
    app.querySelectorAll('.playable-toggle-switch').forEach(function(toggle) {
      toggle.addEventListener('change', function() {
        state.playable[this.dataset.field] = this.checked;
        render();
      });
    });

    // Category collapsible headers
    app.querySelectorAll('.param-category-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var key = this.dataset.key;
        state.expandedSections[key] = !state.expandedSections[key];
        render();
      });
    });

    // History rail cards
    app.querySelectorAll('.gallery-card[data-history-id]').forEach(function(card) {
      card.addEventListener('click', function() {
        var creativeId = this.dataset.historyId;
        Router.navigate('/deconstruction', { id: creativeId });
      });
    });

    // Generate CTA triggers
    app.querySelector('#generate-studio-btn')?.addEventListener('click', function() {
      triggerGeneration();
    });
    app.querySelector('#generate-playable-btn-main')?.addEventListener('click', function() {
      triggerGeneration();
    });

    // Export playable zip mock package
    app.querySelector('#export-package-btn')?.addEventListener('click', function() {
      C.showToast('In a real product this would export a ' + state.playable.exportNetwork + ' HTML5 package', 'default', 3000);
    });

    // Actions under result screen
    app.querySelector('#save-studio-lib-btn')?.addEventListener('click', function() {
      C.showToast('Creative saved to Gallery — AI badge applied', 'default', 3000);
    });
    app.querySelector('#decon-studio-btn')?.addEventListener('click', function() {
      Router.navigate('/deconstruction', { id: 'cr-ai-001' });
    });
    app.querySelector('#combo-studio-btn')?.addEventListener('click', function() {
      Router.navigate('/combinations');
    });
  }
})();
