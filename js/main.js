// Single Page Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize page sections
  initScrollAnimations();

  // Load logo
  loadLogo();

  // Initialize contact form
  initContactForm();
});

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize scroll-triggered animations
function initScrollAnimations() {
  const sections = document.querySelectorAll('.page-section');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// Load SVG logo
function loadLogo() {
  // Determine correct path based on current page location
  const isInSubfolder = window.location.pathname.includes('/simulations/') || window.location.pathname.includes('/boiler-system.html') || window.location.pathname.includes('/distribution-network.html');
  const logoPath = isInSubfolder ? '../assets/images/logo-pabrikin.svg' : 'assets/images/logo-pabrikin.svg';
  
  fetch(logoPath)
    .then(response => response.text())
    .then(svg => {
      const logoWrapper = document.getElementById('logo-place');
      if (logoWrapper) {
        logoWrapper.innerHTML = svg;
      }
    })
    .catch(error => {
      console.log('Logo loading failed, using text fallback');
    });
}

// Initialize contact form
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all fields');
        return;
      }

      // Here you would typically send the data to a server
      // For now, just show a success message
      alert('Thank you for your message! We will get back to you soon.');

      // Reset form
      form.reset();
    });
  }
}

// Live clock functionality
function updateClock() {
  const clockElement = document.getElementById('live-clock');
  if (clockElement) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockElement.textContent = timeString;
  }
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call
setInterval(updateClock, 1000);

window.addEventListener('load', () => {
    updateClock();
    loadSVG('assets/images/logo-pabrikin.svg', 'logo-place');
    loadSVG('assets/diagrams/boiler75.svg', 'diagram-stoker');
    loadSVG('assets/diagrams/distribution.svg', 'diagram-distribution');
    loadSVG('assets/diagrams/distillation.svg', 'diagram-distillation');
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
            window.location.href = 'simulations/physics-simulations.html';
        });
    }

    // Handle URL hash for direct navigation to projects page
    if (window.location.hash === '#projects' || window.location.hash === '#page-projects') {
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