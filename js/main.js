// Single Page Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize page sections
  initScrollAnimations();

  // Load logo
  loadLogo();

  // Initialize contact form
  initContactForm();

  // Initialize theme toggle
  initThemeToggle();
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

// Initialize Theme Toggle Functionality
function initThemeToggle() {
  let toggleBtn = document.getElementById('theme-toggle');
  
  // Dynamically inject button if it doesn't exist in HTML
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
    document.body.appendChild(toggleBtn);
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.innerHTML = sunIcon;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleBtn.innerHTML = moonIcon;
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.innerHTML = isDark ? moonIcon : sunIcon;
  });
}

window.addEventListener('load', () => {
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