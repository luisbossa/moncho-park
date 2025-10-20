document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".fr-footer-kilo__logo img");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Agregar la clase que hace girar el logo
          logo.classList.add("spin-on-scroll");
          observer.unobserve(entry.target); // Dejar de observar una vez que el logo aparece
        }
      });
    },
    {
      threshold: 0.5, // El logo debe estar al menos al 50% en la vista
    }
  );

  // Comienza a observar el logo
  observer.observe(logo);
});
