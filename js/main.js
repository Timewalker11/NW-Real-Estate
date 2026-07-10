// NW Real Estate and Mortgage — shared front-end behavior

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle && header) {
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const heroTabs = document.querySelectorAll('.hero-tab');
  const heroModeInput = document.querySelector('.hero-search-mode');
  const heroSearchInput = document.querySelector('.hero-search-input');
  const heroPlaceholders = {
    buy: 'Enter a city, neighborhood, or ZIP code',
    sell: 'Enter your property address',
    rent: 'Enter a city, neighborhood, or ZIP code',
  };

  heroTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      heroTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const mode = tab.dataset.mode;
      if (heroModeInput) heroModeInput.value = mode;
      if (heroSearchInput) heroSearchInput.placeholder = heroPlaceholders[mode] || heroPlaceholders.buy;
    });
  });

  document.querySelectorAll('.nav-dropdown-toggle').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const item = btn.closest('.nav-item');
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.nav-item.has-dropdown.is-open').forEach((item) => {
      if (!item.contains(event.target)) {
        item.classList.remove('is-open');
        item.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  });

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const successNote = document.querySelector('#form-success');
      if (successNote) {
        successNote.style.display = 'block';
      }
      contactForm.reset();
    });
  }
});
