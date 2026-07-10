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
    const successNote = document.querySelector('#form-success');
    const errorNote = document.querySelector('#form-error');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (successNote) successNote.style.display = 'none';
      if (errorNote) errorNote.style.display = 'none';
      if (submitBtn) submitBtn.disabled = true;

      const payload = {
        name: document.querySelector('#name').value.trim(),
        email: document.querySelector('#email').value.trim(),
        phone: document.querySelector('#phone').value.trim() || null,
        message: document.querySelector('#message').value.trim(),
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('request failed');
        if (successNote) successNote.style.display = 'block';
        contactForm.reset();
      } catch (err) {
        if (errorNote) errorNote.style.display = 'block';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
