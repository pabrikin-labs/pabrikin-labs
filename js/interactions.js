// ==========================================
// STATE ISOLATION FOR EACH DIAGRAM
// ==========================================
function attachInteractions(wrapper) {
    if (wrapper.dataset.interacted) return;
    wrapper.dataset.interacted = 'true';

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    const applyTransform = () => {
        const svg = wrapper.querySelector('svg');
        if (svg) {
            svg.style.transform =
                `translate3d(${posX}px, ${posY}px, 0) scale(${scale})`;
        }
    };

    /* ============================
       PAN (DRAG WITH MOUSE)
       ============================ */
    wrapper.onmousedown = (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        startX = e.clientX - posX;
        startY = e.clientY - posY;
        wrapper.style.cursor = 'grabbing';
    };

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        posX = e.clientX - startX;
        posY = e.clientY - startY;
        applyTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });

    /* ============================
       ZOOM API (BUTTON ONLY)
       ============================ */
    wrapper.zoomIn = () => {
        scale = Math.min(scale * 1.2, 15);
        applyTransform();
    };

    wrapper.zoomOut = () => {
        scale = Math.max(scale / 1.2, 0.2);
        applyTransform();
    };

    wrapper.resetZoom = () => {
        scale = 1;
        posX = 0;
        posY = 0;
        applyTransform();
    };
}


function initializeSVGFeatures(svg) {
    if (!svg || svg.dataset.initialized) return;
    svg.dataset.initialized = 'true';

    svg.querySelectorAll('[id="GLOW FIRE"]').forEach(el => el.classList.add('furnace-glow'));
    svg.querySelectorAll('[id="PETIR"]').forEach(el => el.classList.add('furnace-glow'));
    svg.querySelectorAll('[id="SMOKE"]').forEach(el => el.classList.add('smoke-anim'));
    svg.querySelectorAll('[id^="blade"]').forEach(el => el.classList.add('fan-spin'));

    const popup = document.getElementById('info-popup');
    if (popup && typeof equipInfo !== 'undefined') {
        svg.querySelectorAll('*').forEach(el => {
            const id = (el.getAttribute('id') || '').toUpperCase();
            if (!id || id.startsWith('LINE') || el.tagName === 'defs') return;

            let key = Object.keys(equipInfo).find(k => {
                if (id.includes(k)) return true;
                if ((el.tagName === 'text' || el.tagName === 'tspan') && el.textContent.toUpperCase().includes(k)) return true;
                return false;
            });
            
            if (key) {
                el.style.cursor = 'help';
                el.style.pointerEvents = 'all';
                el.onmouseenter = (e) => {
                    document.getElementById('popup-title').innerText = equipInfo[key].title;
                    document.getElementById('popup-body').innerText = equipInfo[key].body;
                    popup.classList.add('visible');
                };
                el.onmousemove = (e) => {
                    popup.style.left = (e.clientX + 20) + 'px';
                    popup.style.top = (e.clientY + 20) + 'px';
                };
                el.onmouseleave = () => popup.classList.remove('visible');
            }
        });
    }
}

// ==========================================
// RADAR MUTATION OBSERVER
// ==========================================
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
        if (node.tagName && node.tagName.toLowerCase() === 'svg') initializeSVGFeatures(node);
    }));
});

window.addEventListener('load', () => {
    document.querySelectorAll('.diagram-wrapper').forEach(wrapper => {
        attachInteractions(wrapper); // Pasang event pan/zoom ke wadah
        observer.observe(wrapper, { childList: true }); // Awasi isi wadah
        const existingSvg = wrapper.querySelector('svg');
        if (existingSvg) initializeSVGFeatures(existingSvg);
    });
});

window.resetZoom = () => {
    const wrapper = document.querySelector('.diagram-wrapper.active');
    if (wrapper && typeof wrapper.resetZoom === 'function') {
        wrapper.resetZoom();
    }
};

window.initBoilerInteractions = () => {};