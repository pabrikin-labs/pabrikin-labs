const equipInfo = {
  'FURNACE': {
    title: 'FURNACE',
    body: 'Main high-temperature combustion chamber (~700–1,200 °C) where coal chemical energy is converted into thermal energy. Heat transfer is predominantly through radiation to the waterwall tubes. Combustion stability, excess air ratio, and residence time strongly affect furnace efficiency and emissions.'
  },

  'BOTTOM ASH': {
    title: 'BOTTOM ASH',
    body: 'Coarse ash residue from coal combustion that settles at the bottom of the boiler. It is typically discharged through a water-sealed hopper to prevent air ingress. Bottom ash accounts for approximately 15–25% of total ash produced, depending on coal characteristics.'
  },

  'FLY ASH': {
    title: 'FLY ASH',
    body: 'Fine ash particles entrained in the flue gas stream leaving the furnace. Fly ash typically constitutes 75–85% of total ash content. The particle size and concentration significantly influence ESP performance and stack emissions.'
  },

  'ESP': {
    title: 'ELECTROSTATIC PRECIPITATOR (ESP)',
    body: 'Equipment used to remove fine particulate matter from flue gas using high-voltage electrostatic fields between anode and cathode. Charging electrodes ionize particles, which are then collected on plates. Typical collection efficiency exceeds 99% under optimal operating conditions.'
  },

  'COAL FEEDER': {
    title: 'COAL FEEDER',
    body: 'Controls and regulates the coal feed rate supplied to the furnace according to boiler load demand. It ensures stable combustion by maintaining a consistent mass flow. Feed rate accuracy directly impacts furnace pressure, steam generation, and emissions.'
  },

  'TRAVELLING GRATE': {
    title: 'TRAVELLING GRATE',
    body: 'Moving combustion grate that transports coal through various combustion zones including drying, ignition, and burnout. Grate speed is adjusted to ensure complete combustion before ash discharge. Proper grate operation prevents clinker formation and uneven burning.'
  },

  'FD FAN': {
    title: 'FORCED DRAFT FAN (FDF)',
    body: 'Supplies combustion air into the furnace at the required flow rate and pressure. Primary and secondary air distribution is critical for flame stability and combustion efficiency. FDF capacity typically varies with boiler load and excess air setting.'
  },

  'ID FAN': {
    title: 'INDUCED DRAFT FAN (IDF)',
    body: 'Extracts flue gas from the boiler and directs it toward the stack (chimney). It maintains negative pressure inside the furnace to prevent flue gas leakage. ID fan operation directly affects draft balance and overall boiler stability.'
  },

  'BFP': {
    title: 'BOILER FEED PUMP (BFP)',
    body: 'High-pressure pump that supplies feedwater to the boiler against drum pressure. It ensures continuous water circulation through economizer, drum, and waterwall tubes. Typically driven by electric motor or turbine, depending on plant design.'
  },

  'AIR HEATER': {
    title: 'AIR PREHEATER (APH)',
    body: 'Preheats combustion air by recovering residual heat from flue gas. This process improves boiler efficiency and reduces fuel consumption. Outlet air temperature is closely monitored to avoid cold-end corrosion.'
  },

  'STEAM DRUM': {
    title: 'STEAM DRUM',
    body: 'Pressure vessel that separates saturated steam from boiler water. It provides steam storage and stabilizes water level during load fluctuations. Proper drum level control is critical to avoid carryover or tube overheating.'
  },

  'SUPERHEATER': {
    title: 'SUPERHEATER (SH)',
    body: 'Raises saturated steam temperature into superheated steam prior to turbine admission. Superheating improves turbine efficiency and reduces moisture erosion on blades. Steam temperature is controlled using attemperators or gas flow adjustment.'
  },

  'ECONOMIZER': {
    title: 'ECONOMIZER',
    body: 'Preheats boiler feedwater using high-temperature flue gas before entering the steam drum. This reduces fuel consumption and thermal stress on boiler components. Economizer performance is influenced by flue gas temperature and fouling condition.'
  },

  'DEAERATOR': {
    title: 'DEAERATOR',
    body: 'Removes dissolved gases such as oxygen (O₂) and carbon dioxide (CO₂) from feedwater. Typical oxygen concentration after deaeration is below 7 ppb. Effective deaeration minimizes corrosion in boiler tubes and feedwater systems.'
  },

  'WATER TANK': {
    title: 'DEMINERALIZED WATER TANK',
    body: 'Storage tank providing demineralized water for boiler feed and makeup requirements. The water has very low conductivity and silica content to prevent scaling. Tank capacity is designed to support continuous boiler operation during disturbances.'
  },

  'DISTILLATION COLUMN': {
    title: 'DISTILLATION COLUMN',
    body: 'Vertical cylindrical vessel used for separating crude palm oil into different fractions based on boiling points. The column contains trays or packing material to facilitate vapor-liquid contact and mass transfer.'
  },

  'CONDENSER': {
    title: 'CONDENSER',
    body: 'Heat exchanger that cools and condenses vapor from the top of the distillation column back into liquid form. The condensate is typically returned to the column as reflux to improve separation efficiency.'
  },

  'REBOILER': {
    title: 'REBOILER',
    body: 'Heat exchanger located at the bottom of the distillation column that provides the necessary heat to vaporize the liquid mixture. It ensures continuous distillation by maintaining the required vapor flow rate.'
  },

  'CRUDE PALM OIL': {
    title: 'CRUDE PALM OIL FEED',
    body: 'Raw palm oil mixture containing various fatty acids and impurities that needs to be separated through distillation. The feed rate and temperature significantly affect the quality of the final products.'
  }
};

async function loadSVG(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const svgData = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = svgData;
            // Add click handler for logo
            if (containerId === 'logo-place') {
                container.onclick = function() { switchPage(this, 'home'); };
            }
        }
    } catch (error) {
        console.error("Gagal memuat SVG:", error);
    }
}

function switchPortfolio(el, diagramKey) {
    // 1. Update Tab
    document.querySelectorAll('.sub-nav .sub-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');

    // 2. Switch Wrapper
    document.querySelectorAll('.diagram-wrapper').forEach(wrap => {
        wrap.classList.remove('active');
        wrap.style.display = 'none';
    });
    const targetWrap = document.getElementById('diagram-' + diagramKey);
    targetWrap.classList.add('active');
    targetWrap.style.display = 'block';

    // 3. Switch Filter Panel
    document.querySelectorAll('.diagram-filter').forEach(f => f.style.display = 'none');
    const targetFilter = document.getElementById('filter-' + diagramKey);
    if(targetFilter) targetFilter.style.display = 'flex';

    // 4. Reset Zoom
    if(typeof resetZoom === 'function') resetZoom();
}

function switchPage(el, pageId) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  setTimeout(() => { if(typeof resetZoom === 'function') resetZoom(); }, 150); 
}

function switchBoilerLayout(el, layoutKey) {
    document.querySelectorAll('.sub-nav .sub-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('#page-boiler .diagram-wrapper').forEach(wrap => wrap.classList.remove('active'));
    let target = document.getElementById('diagram-' + layoutKey);
    if(target) {
        target.classList.add('active');
        setTimeout(() => { if(typeof resetZoom === 'function') resetZoom(); }, 50);
    }
}

function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = function() {
            this.classList.toggle('active');
            const targetId = this.getAttribute('data-target'); 
            const isActive = this.classList.contains('active');
            
            const targetGroup = document.getElementById(targetId);
            if (targetGroup) {
                targetGroup.style.opacity = isActive ? '1' : '0.05';
                targetGroup.style.pointerEvents = isActive ? 'all' : 'none';
                targetGroup.style.transition = 'opacity 0.3s ease';
            }
        };
    });
}

function updateDashboardMetrics() {
    const statValues = document.querySelectorAll('.stat-value');
    
    if (statValues.length >= 4) {
        const steamVal = (72 + Math.random() * 1.5).toFixed(1);
        statValues[0].innerHTML = `${steamVal} <span class="stat-unit">TPH</span>`;

        const effVal = (84 + Math.random() * 0.5).toFixed(1);
        statValues[1].innerHTML = `${effVal} <span class="stat-unit">%</span>`;

        const fuelVal = (12.5 + Math.random() * 0.6).toFixed(1);
        statValues[2].innerHTML = `${fuelVal} <span class="stat-unit">Tons/h</span>`;

        const powerVal = (4.1 + Math.random() * 0.3).toFixed(1);
        statValues[3].innerHTML = `${powerVal} <span class="stat-unit">MW</span>`;
    }
}

function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString('id-ID', { hour12: false });
}
setInterval(updateClock, 1000);

window.addEventListener('load', () => {
    updateClock();
    loadSVG('assets/logo-pabrikin.svg', 'logo-place');
    loadSVG('assets/boiler75.svg', 'diagram-stoker');
    loadSVG('assets/distribution.svg', 'diagram-distribution');
    loadSVG('assets/distillation.svg', 'diagram-distillation');
    initFilters();
    
    updateDashboardMetrics();
    
    setInterval(updateDashboardMetrics, 3000);

    const glbCard = document.getElementById('card-glb');
    if (glbCard) {
        glbCard.addEventListener('click', () => {
            window.location.href = 'glb.html';
        });
    }

    const glbbCard = document.getElementById('card-glbb');
    if (glbbCard) {
        glbbCard.addEventListener('click', () => {
            window.location.href = 'glbb.html';
        });
    }

    const goToSimulationsBtn = document.getElementById('go-to-simulations');
    if (goToSimulationsBtn) {
        goToSimulationsBtn.addEventListener('click', () => {
            window.location.href = 'physics-simulations.html';
        });
    }

    // Handle URL hash for direct navigation to projects page
    if (window.location.hash === '#projects') {
        const projectsNav = document.querySelector('.nav-item[onclick*="projects"]');
        if (projectsNav) {
            switchPage(projectsNav, 'projects');
        }
    }
});

// =============================================
// GLOBAL ZOOM BUTTON HANDLER
// =============================================
window.addEventListener('click', (e) => {
    const btn = e.target.closest('.zoom-btn');
    if (!btn) return;

    const action = btn.dataset.action;
    const wrapper = document.querySelector('.diagram-wrapper.active');
    if (!wrapper) return;

    if (action === 'zoom-in' && typeof wrapper.zoomIn === 'function') {
        wrapper.zoomIn();
    }

    if (action === 'zoom-out' && typeof wrapper.zoomOut === 'function') {
        wrapper.zoomOut();
    }

    if (action === 'reset' && typeof wrapper.resetZoom === 'function') {
        wrapper.resetZoom();
    }
});