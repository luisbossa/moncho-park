lucide.createIcons();

const form = document.querySelector(".lessons-form");

if (form) {
  const btn = form.querySelector("button");

  const name = form.querySelector('input[type="text"]');
  const email = form.querySelector('input[type="email"]');
  const phone = form.querySelector('input[type="tel"]');
  const message = form.querySelector("textarea");
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  const checkboxGroup = form.querySelector(".lessons-checkbox-group");

  // 🔥 quitar error al escribir
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("error");
    });
  });

  // 🔥 quitar error checkbox al seleccionar
  checkboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      if ([...checkboxes].some((c) => c.checked)) {
        checkboxGroup.classList.remove("error");
      }
    });
  });

  // 🚀 SUBMIT
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // reset errores
    form
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));

    let isValid = true;

    // VALIDACIONES
    if (!name.value.trim()) {
      name.classList.add("error");
      isValid = false;
    }

    if (!email.value.includes("@")) {
      email.classList.add("error");
      isValid = false;
    }

    if (!phone.value.trim()) {
      phone.classList.add("error");
      isValid = false;
    }

    if (!message.value.trim()) {
      message.classList.add("error");
      isValid = false;
    }

    const checked = [...checkboxes].some((cb) => cb.checked);

    if (!checked) {
      checkboxGroup.classList.add("error");
      isValid = false;
    }

    if (!isValid) return;

    // 🔄 loading
    btn.textContent = "Enviando...";

    setTimeout(() => {
      btn.innerHTML = `
        ¡Enviado! <img class="checked-icon" src="/images/icons/checked.webp" />
      `;

      form.reset();
    }, 1200);
  });
}
