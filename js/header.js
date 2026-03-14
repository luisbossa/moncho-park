document.addEventListener("DOMContentLoaded", () => {
  const toggle =
    document.querySelector(".mobile-menu-toggle") ||
    document.querySelector(".menu-toggle");

  const menu = document.querySelector(".mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});
