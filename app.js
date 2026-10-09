// Smooth-scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Billing frequency toggle (monthly/yearly)
(function initPricingToggle() {
  const grid = document.getElementById('pricing-grid');
  const toggle = document.getElementById('billing-toggle');
  let yearly = false;

  function updatePrices() {
    const cards = grid.querySelectorAll('.pricing-card');
    cards.forEach(card => {
      const month = parseInt(card.dataset.month, 10);
      const year = parseInt(card.dataset.year, 10);
      const amountEl = card.querySelector('.amount');
      if (yearly) {
        amountEl.textContent = year / 10; // e.g., 190 -> show 19? Adjust to desired format
        // Better: show yearly price without decimals
        amountEl.textContent = (year / 10).toFixed(0);
        // Change period label
        const period = card.querySelector('.period');
        if (period) period.textContent = '/yr';
      } else {
        amountEl.textContent = month;
        const period = card.querySelector('.period');
        if (period) period.textContent = '/mo';
      }
    });
  }

  // Initialize with monthly by default
  yearly = false;
  updatePrices();

  // Make the toggle a real switch
  toggle.addEventListener('click', () => {
    yearly = !yearly;
    toggle.setAttribute('aria-pressed', String(yearly));
    updatePrices();
  });
})();

// Lightweight contact form handling
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple client-side validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      status.textContent = 'Please fill in all required fields (Name, Email, Message).';
      status.style.color = '#f87171';
      return;
    }
    // Very lightweight email check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      status.textContent = 'Please provide a valid email address.';
      status.style.color = '#f87171';
      return;
    }

    // Simulate sending
    status.style.color = '#93e6b8';
    status.textContent = 'Sending...';
    setTimeout(() => {
      form.reset();
      status.style.color = '#93e6b8';
      status.textContent = 'Thanks! Your message has been sent. We will get back to you shortly.';
    }, 700);
  });
})();

// Year display in footer
(function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();