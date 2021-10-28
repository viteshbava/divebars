// #########################
// Navbar
// #########################

// MY CHANGE TO DEV

const hamburger = document.querySelector(".navbar_toggler");
const nav = document.querySelector(".navbar-collapse");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// #########################
// Form Validation
// #########################

const forms = document.querySelectorAll("[novalidate]");

for (const form of forms) {
  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      form.classList.add("validated");
    } else form.classList.remove("validated");
  });
}

// #########################
// DIVEBAR SHOW PAGE - TABS
// #########################

const show_tabs = document.querySelectorAll(".show_tabs .tab-headings_btn");
const content_group = document.querySelectorAll(".show_tabs .tab-content_item");

for (const tab of show_tabs) {
  tab.addEventListener("click", () => {
    const tab_ref = tab.dataset.tabref;
    const content = document.querySelector(`#${tab_ref}`);
    for (const b of show_tabs) b.classList.remove("is-active");
    for (const c of content_group) c.classList.remove("is-active");
    tab.classList.add("is-active");
    content.classList.add("is-active");
  });
}

// #########################
// ALERTS
// #########################

const alerts = document.querySelectorAll(".alert-container .alert");

for (const a of alerts) {
  setTimeout(() => {
    a.classList.add("alert--fade-out");
    a.addEventListener("animationend", () => a.remove());
  }, 5000);
  a.addEventListener("click", (e) => {
    if (e.target.closest(".alert__close")) a.remove();
  });
}
