// #########################
// Navbar
// #########################

const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#nav-collapse");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
});
