// #########################
// Navbar
// #########################

const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#nav-collapse");

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
