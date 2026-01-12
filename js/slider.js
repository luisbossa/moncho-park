document.addEventListener("DOMContentLoaded", () => {
  const galleryInner = document.getElementById("product-gallery-inner");
  const cards = galleryInner.querySelectorAll(".product-card");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const productData = [
    {
      name: "Tabla Mexican",
      description: "Tabla clásica ideal para principiantes.",
    },
    {
      name: "Tabla Girl",
      description: "Modelo profesional con diseño avanzado.",
    },
    {
      name: "Trucks Thunder",
      description: "Par de trucks de alta resistencia, con ajuste seguro.",
    },
    {
      name: "Gorro Powell",
      description: "Gorro oscuro, 100% algodon",
    },
    {
      name: "Tabla Girl",
      description: "Tabla con tono de colores muy visuales.",
    },
    {
      name: "Tabla Stereo",
      description: "Modelo ecológico con diseño abstracto.",
    },
    {
      name: "Ruedas Speed Fire",
      description:
        "Llantas luminosas, con absorción de impacto mejorada.",
    },
    {
      name: "Tabla Element",
      description: "Hecha 100% de madera de maple.",
    },

    {
      name: "Tabla Empire",
      description: "Tabla corta clásica.",
    },
    {
      name: "Rollers Redz",
      description: "Rollers clásicos, de alta velocidad.",
    },
    {
      name: "Rollers Rush",
      description:
        "Juego de rollers para llantas. son 8 en total.",
    },
    {
      name: "Anillo Deathwish",
      description: "Anillo de plata, con acabado lujoso.",
    },
  ];

  let currentIndex = 0;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 20;
    const offset = currentIndex * cardWidth;
    galleryInner.style.transform = `translateX(-${offset}px)`;

    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });

    const titleEl = document.getElementById("product-title");
    const descEl = document.getElementById("product-description");

    titleEl.textContent = productData[currentIndex].name;
    descEl.textContent = productData[currentIndex].description;

    prevBtn.classList.toggle("disabled", currentIndex === 0);
    nextBtn.classList.toggle("disabled", currentIndex === cards.length - 1);
  }

  function nextSlide() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  updateSlider();
});
