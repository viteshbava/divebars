// ###########################################################################
// FILE: Navbar.js
// ###########################################################################

class Navbar {
  constructor() {
    this.hamburger = document.querySelector(".navbar_toggler");
    this.nav = document.querySelector(".navbar-collapse");
    this.eventHandler();
  }

  eventHandler() {
    this.hamburger.addEventListener("click", () => this.toggleNavCollapse());
  }

  toggleNavCollapse() {
    this.nav.classList.toggle("show");
  }
}

// export default Navbar;

// ###########################################################################
// FILE: FormValidation.js
// ###########################################################################

class FormsToValidate {
  constructor() {
    this.forms = document.querySelectorAll("[novalidate]");
    this.eventHandler();
  }

  eventHandler() {
    for (const form of this.forms)
      form.addEventListener("submit", (e) => this.validateForm(e));
  }

  validateForm(e) {
    const form = e.target;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      form.classList.add("validated");
    } else form.classList.remove("validated");
  }
}

// export default FormsToValidate;

// ###########################################################################
// FILE: ShowPageTabs.js
// ###########################################################################

class ShowPageTabs {
  constructor() {
    this.show_tabs = document.querySelectorAll(".show_tabs .tab-headings_btn");
    this.content_group = document.querySelectorAll(
      ".show_tabs .tab-content_item"
    );
    this.eventHandler();
  }

  eventHandler() {
    for (const tab of this.show_tabs) {
      tab.addEventListener("click", () => this.switchTabs(tab));
    }
  }

  switchTabs(tab) {
    console.log(e);
    const tab_ref = tab.dataset.tabref;
    const content = document.querySelector(`#${tab_ref}`);
    for (const b of this.show_tabs) b.classList.remove("is-active");
    for (const c of this.content_group) c.classList.remove("is-active");
    tab.classList.add("is-active");
    content.classList.add("is-active");
  }
}

// export default ShowPageTabs;

// ###########################################################################
// ALERTS
// ###########################################################################

class Alerts {
  constructor() {
    this.alerts = document.querySelectorAll(".alert-container .alert");
    this.eventHandler();
  }

  eventHandler() {
    for (const a of this.alerts) {
      setTimeout(() => {
        a.classList.add("alert--fade-out");
        a.addEventListener("animationend", () => a.remove());
      }, 5000);
      a.addEventListener("click", (e) => {
        if (e.target.closest(".alert__close")) a.remove();
      });
    }
  }
}

// export default Alerts;

// ###########################################################################
// ###########################################################################

const navbar = new Navbar();
const formToValidate = new FormsToValidate();
const showPageTabs = new ShowPageTabs();
const alerts = new Alerts();
