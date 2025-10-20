document.addEventListener("DOMContentLoaded", () => {
  const galleryInner = document.getElementById("product-gallery-inner");
  const cards = galleryInner.querySelectorAll(".product-card");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const productData = [
    {
      name: "Deck Heart",
      description: "Tabla clásica ideal para principiantes.",
    },
    {
      name: "Deck Ogre",
      description: "Modelo profesional con diseño avanzado.",
    },
    {
      name: "Tornillos Ogre",
      description:
        "Juego de tornillos de alta resistencia, con ajuste seguro.",
    },
    {
      name: "Trucks Thunder",
      description: "Trucks de alto rendimiento para todo tipo de terrenos.",
    },
    {
      name: "Deck Heart",
      description: "Tabla clásica ideal para principiantes.",
    },
    {
      name: "Deck Piston",
      description: "Modelo profesional con diseño avanzado.",
    },
    {
      name: "Gomas Ogre",
      description:
        "Juego de gomas para trucks, absorción de impactos mejorada.",
    },
    {
      name: "Trucks Thunder",
      description: "Trucks de alto rendimiento para todo tipo de terrenos.",
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

    // Actualizar título y descripción
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

  updateSlider(); // Inicializa al cargar
});
