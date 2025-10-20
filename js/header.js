const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const userNav = document.querySelector(".user-nav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  userNav.classList.toggle("active");
});
