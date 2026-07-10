// NW Real Estate and Mortgage — account signup/login/logout and nav session state

document.addEventListener('DOMContentLoaded', () => {
  const guestEls = document.querySelectorAll('[data-auth="guest"]');
  const userEls = document.querySelectorAll('[data-auth="user"]');
  const nameEls = document.querySelectorAll('[data-account-name]');
  const logoutBtns = document.querySelectorAll('[data-logout-btn]');

  function showLoggedIn(user) {
    guestEls.forEach((el) => { el.hidden = true; });
    userEls.forEach((el) => { el.hidden = false; });
    nameEls.forEach((el) => { el.textContent = `Hi, ${user.name}`; });

    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      const nameField = contactForm.querySelector('#name');
      const emailField = contactForm.querySelector('#email');
      if (nameField && !nameField.value) nameField.value = user.name;
      if (emailField && !emailField.value) emailField.value = user.email;
    }
  }

  function showLoggedOut() {
    guestEls.forEach((el) => { el.hidden = false; });
    userEls.forEach((el) => { el.hidden = true; });
  }

  fetch('/api/auth/me', { credentials: 'include' })
    .then((response) => (response.ok ? response.json() : Promise.reject()))
    .then(showLoggedIn)
    .catch(() => {});

  logoutBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
        .finally(() => {
          showLoggedOut();
          window.location.href = 'home.html';
        });
    });
  });

  function showError(el, message) {
    el.textContent = message;
    el.style.display = 'block';
  }

  function hideError(el) {
    el.style.display = 'none';
  }

  async function parseErrorMessage(response) {
    try {
      const data = await response.json();
      if (typeof data.detail === 'string') return data.detail;
      if (Array.isArray(data.detail) && data.detail[0] && data.detail[0].msg) return data.detail[0].msg;
    } catch (err) {
      // fall through to generic message
    }
    return 'Something went wrong. Please try again.';
  }

  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    const errorEl = document.querySelector('#auth-error');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      hideError(errorEl);
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value;

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
          showError(errorEl, await parseErrorMessage(response));
          return;
        }
        window.location.href = 'home.html';
      } catch (err) {
        showError(errorEl, 'Couldn’t reach the server. Please try again.');
      }
    });
  }

  const signupForm = document.querySelector('#signup-form');
  if (signupForm) {
    const errorEl = document.querySelector('#auth-error');
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      hideError(errorEl);
      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value;
      const confirmPassword = document.querySelector('#confirm-password').value;
      const referralSource = document.querySelector('#referral-source').value;

      if (password !== confirmPassword) {
        showError(errorEl, 'Passwords do not match.');
        return;
      }

      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name, email, password, referral_source: referralSource || null }),
        });
        if (!response.ok) {
          showError(errorEl, await parseErrorMessage(response));
          return;
        }
        window.location.href = 'home.html';
      } catch (err) {
        showError(errorEl, 'Couldn’t reach the server. Please try again.');
      }
    });
  }
});
