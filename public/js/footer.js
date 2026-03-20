document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".footer-logo img");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          logo.classList.add("spin-on-scroll");
          observer.unobserve(entry.target); 
        }
      });
    },
    {
      threshold: 0.5, 
    }
  );

  observer.observe(logo);
});
