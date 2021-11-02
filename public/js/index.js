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
// FILE: Alerts.js
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
// FILE: geoMap.js
// ###########################################################################

class GeoMap {
  constructor() {
    this.mapId = "geoMap";
    this.map = document.querySelector(`#${this.mapId}`);
    if (this.map) this.showMap();
  }
  showMap() {
    this.getMapParams();
    if (this.coordinates.length) {
      this.createMap();
      this.createMarker();
    } else this.noMap();
  }
  getMapParams() {
    // Can put Ajax call here
    mapboxgl.accessToken = MAPBOX_TOKEN;
    this.coordinates = coordinates;
  }
  createMap() {
    this.map = new mapboxgl.Map({
      container: this.mapId,
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: coordinates, // starting position [lng, lat]
      zoom: 12, // starting zoom
    });
  }
  createMarker() {
    this.marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(this.map);
  }
  noMap() {
    const noMap = document.createElement("h4");
    noMap.innerText = "Map Unavailable!";
    document.getElementById(this.mapId).append(noMap);
  }
}

// export default geoMap

// ###########################################################################
// ###########################################################################

const navbar = new Navbar();
const formToValidate = new FormsToValidate();
const showPageTabs = new ShowPageTabs();
const alerts = new Alerts();
const geoMap = new GeoMap();

// MAPBOX SETUP: SEE https://docs.mapbox.com/mapbox-gl-js/guides/install/
