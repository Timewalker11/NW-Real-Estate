/* Blue Venture Realty — shared site behavior */

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initDropdowns();
  initAccordions();
  initTabs();
  initMortgageCalculator();
  initContactForm();
  markActiveNav();
});

/* Mobile nav toggle */
function initNav() {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", function () {
    menu.classList.toggle("open");
    var expanded = menu.classList.contains("open");
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
}

/* Dropdown menus — hover on desktop, tap on mobile */
function initDropdowns() {
  var items = document.querySelectorAll(".has-dropdown > a");
  items.forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        var parent = link.parentElement;
        var wasOpen = parent.classList.contains("open");
        document.querySelectorAll(".has-dropdown.open").forEach(function (el) {
          el.classList.remove("open");
        });
        if (!wasOpen) parent.classList.add("open");
      }
    });
  });
}

/* Highlight current page in nav */
function markActiveNav() {
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu > li").forEach(function (li) {
    var link = li.querySelector(":scope > a");
    if (!link) return;
    var href = link.getAttribute("href").split("#")[0];
    if (href === path) li.classList.add("active");
  });
}

/* Accordion (FAQ / glossary) */
function initAccordions() {
  document.querySelectorAll(".accordion-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".accordion-item");
      var panel = item.querySelector(".accordion-panel");
      var isOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".accordion-item.open").forEach(function (el) {
        if (el !== item) {
          el.classList.remove("open");
          el.querySelector(".accordion-panel").style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

/* Tabs (Buying / Selling) */
function initTabs() {
  var tabButtons = document.querySelectorAll("[data-tab-target]");
  if (!tabButtons.length) return;
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest("[data-tabs]");
      var target = btn.getAttribute("data-tab-target");
      group.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
      group.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      group.querySelector('[data-tab-panel="' + target + '"]').classList.add("active");
    });
  });
}

/* Mortgage payment calculator */
function initMortgageCalculator() {
  var form = document.getElementById("calc-form");
  if (!form) return;

  function calculate() {
    var price = parseFloat(document.getElementById("calc-price").value) || 0;
    var downPct = parseFloat(document.getElementById("calc-down").value) || 0;
    var rate = parseFloat(document.getElementById("calc-rate").value) || 0;
    var years = parseFloat(document.getElementById("calc-term").value) || 30;
    var taxRate = parseFloat(document.getElementById("calc-tax").value) || 0;
    var insurance = parseFloat(document.getElementById("calc-insurance").value) || 0;

    var downAmount = price * (downPct / 100);
    var loanAmount = Math.max(price - downAmount, 0);
    var monthlyRate = rate / 100 / 12;
    var numPayments = years * 12;

    var principalAndInterest = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      principalAndInterest =
        (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    } else if (loanAmount > 0) {
      principalAndInterest = loanAmount / numPayments;
    }

    var monthlyTax = (price * (taxRate / 100)) / 12;
    var monthlyInsurance = insurance / 12;
    var total = principalAndInterest + monthlyTax + monthlyInsurance;

    var fmt = function (n) {
      return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    };

    document.getElementById("calc-total").textContent = fmt(total);
    document.getElementById("calc-pi").textContent = fmt(principalAndInterest);
    document.getElementById("calc-tax-out").textContent = fmt(monthlyTax);
    document.getElementById("calc-insurance-out").textContent = fmt(monthlyInsurance);
    document.getElementById("calc-loan-amount").textContent = fmt(loanAmount);
  }

  form.addEventListener("input", calculate);
  calculate();
}

/* Contact form (front-end only demo submission) */
function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("form-success").classList.add("show");
    form.reset();
  });
}
