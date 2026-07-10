// NW Real Estate and Mortgage — property listings search, powered by the /api/listings backend.
// Requires the site to be served via `npm start` (server.js) — fetch() calls will fail if this
// page is opened directly as a file:// URL.

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#listings-grid');
  if (!grid) return;

  const PAGE_SIZE = 12;
  const searchForm = document.querySelector('#listings-search');
  const searchInput = document.querySelector('#listings-search-input');
  const countEl = document.querySelector('#listings-count');
  const pagesEl = document.querySelector('#listings-pages');
  const prevBtn = document.querySelector('#listings-prev');
  const nextBtn = document.querySelector('#listings-next');
  const paginationEl = document.querySelector('#listings-pagination');

  const modal = document.querySelector('#listing-modal');
  const modalPhoto = document.querySelector('#listing-modal-photo');
  const modalPrice = document.querySelector('#listing-modal-price');
  const modalTitle = document.querySelector('#listing-modal-title');
  const modalCity = document.querySelector('#listing-modal-city');
  const modalMeta = document.querySelector('#listing-modal-meta');
  const modalDescription = document.querySelector('#listing-modal-description');
  const modalFacts = document.querySelector('#listing-modal-facts');

  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

  let currentListings = [];
  let currentPage = 1;

  function renderPage() {
    const totalPages = Math.max(1, Math.ceil(currentListings.length / PAGE_SIZE));
    currentPage = Math.min(currentPage, totalPages);

    if (currentListings.length === 0) {
      grid.innerHTML = '<p class="listings-empty">No listings matched your search. Try a different ZIP code, city, or MLS number.</p>';
      countEl.textContent = '';
      paginationEl.style.display = 'none';
      return;
    }

    paginationEl.style.display = 'flex';
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = currentListings.slice(start, start + PAGE_SIZE);

    grid.innerHTML = pageItems.map((listing) => `
      <div class="listing-card" tabindex="0" role="button" aria-label="View details for ${listing.address}, ${listing.city}" data-mls="${listing.mls}">
        <div class="listing-photo">
          <img src="${listing.image}" alt="Sample exterior photo for ${listing.address}" loading="lazy" />
        </div>
        <div class="listing-body">
          <div class="listing-price">${currencyFormatter.format(listing.price)}</div>
          <div class="listing-address">${listing.address}<br />${listing.city}, ${listing.zip}</div>
          <div class="listing-meta">
            <span>${listing.beds} bd</span>
            <span>${listing.baths} ba</span>
            <span>${listing.sqft.toLocaleString()} sqft</span>
          </div>
          <div class="listing-mls">MLS #${listing.mls}</div>
        </div>
      </div>
    `).join('');

    countEl.textContent = `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, currentListings.length)} of ${currentListings.length} listings`;

    pagesEl.innerHTML = '';
    for (let page = 1; page <= totalPages; page += 1) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'page-btn' + (page === currentPage ? ' is-active' : '');
      btn.textContent = String(page);
      btn.addEventListener('click', () => {
        currentPage = page;
        renderPage();
      });
      pagesEl.appendChild(btn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  async function fetchListings(query) {
    grid.innerHTML = '<p class="listings-empty">Loading listings&hellip;</p>';
    countEl.textContent = '';
    paginationEl.style.display = 'none';
    try {
      const url = query ? `/api/listings?q=${encodeURIComponent(query)}` : '/api/listings';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      currentListings = data.listings || [];
      currentPage = 1;
      renderPage();
    } catch (err) {
      grid.innerHTML = '<p class="listings-empty">Couldn’t load listings. If you’re viewing this file directly, run <code>npm start</code> and open the site at its localhost address instead.</p>';
    }
  }

  function openModal(mls) {
    fetch(`/api/listings/${encodeURIComponent(mls)}`)
      .then((response) => {
        if (!response.ok) throw new Error('Not found');
        return response.json();
      })
      .then(({ listing }) => {
        modalPhoto.innerHTML = `<img src="${listing.image}" alt="Sample exterior photo for ${listing.address}" />`;
        modalPrice.textContent = currencyFormatter.format(listing.price);
        modalTitle.textContent = listing.address;
        modalCity.textContent = `${listing.city}, ${listing.zip}`;
        modalMeta.innerHTML = `<span>${listing.beds} bd</span><span>${listing.baths} ba</span><span>${listing.sqft.toLocaleString()} sqft</span><span>MLS #${listing.mls}</span>`;
        modalDescription.textContent = listing.description;
        modalFacts.innerHTML = `
          <dt>Year Built</dt><dd>${listing.yearBuilt}</dd>
          <dt>Lot Size</dt><dd>${listing.lotSize}</dd>
          <dt>Garage</dt><dd>${listing.garage}</dd>
          <dt>Listed</dt><dd>${dateFormatter.format(new Date(listing.listedDate))}</dd>
        `;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      })
      .catch(() => {
        // If the detail request fails, silently do nothing rather than showing a broken modal.
      });
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  grid.addEventListener('click', (event) => {
    const card = event.target.closest('.listing-card');
    if (card) openModal(card.dataset.mls);
  });

  grid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.listing-card');
    if (card) {
      event.preventDefault();
      openModal(card.dataset.mls);
    }
  });

  if (modal) {
    modal.querySelectorAll('[data-modal-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      fetchListings(searchInput.value);
    });
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPage();
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.max(1, Math.ceil(currentListings.length / PAGE_SIZE));
    if (currentPage < totalPages) {
      currentPage += 1;
      renderPage();
    }
  });

  fetchListings('');
});
