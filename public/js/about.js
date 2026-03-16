const faqItems = document.querySelectorAll(".about-details-faq-item");

faqItems.forEach((item) => {
  const btn = item.querySelector(".about-details-faq-question");

  btn.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
