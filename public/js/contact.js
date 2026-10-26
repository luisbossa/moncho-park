(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const btn = form.querySelector("button[type='submit']");
  const sentTemplate = form.querySelector(".sent-template");
  const requiredInputs = form.querySelectorAll("input[required]");
  const email = document.getElementById("email");
  const confirmEmail = document.getElementById("confirm-email");
  const message = document.getElementById("message");
  const charCount = form.querySelector(".char-count");
  const MAX_CHARS = message.maxLength;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const updateCount = () => {
    charCount.textContent = `${message.value.length} / ${MAX_CHARS}`;
    charCount.classList.toggle("is-near-limit", message.value.length > MAX_CHARS * 0.9);
  };
  message.addEventListener("input", updateCount);

  function setState(input, error = "") {
    const group = input.parentElement;
    group.classList.toggle("error", !!error);
    group.classList.toggle("success", !error);
    group.querySelector(".error-message").textContent = error;
    input.setAttribute("aria-invalid", !!error);
    return !error;
  }

  function validate() {
    // Se validan todos los campos (sin cortocircuito) para mostrar todos los errores
    const results = [...requiredInputs].map((input) =>
      setState(input, input.value.trim() ? "" : `${input.dataset.label} es requerido`)
    );

    results.push(setState(message, message.value.length < 10 ? "Mínimo 10 caracteres" : ""));

    if (email.value.trim() && !EMAIL_RE.test(email.value.trim())) {
      results.push(setState(email, "Email inválido"));
    }

    if (email.value.trim() && confirmEmail.value.trim()) {
      results.push(setState(confirmEmail, email.value !== confirmEmail.value ? "Los correos no coinciden" : ""));
    }

    return results.every(Boolean);
  }

  form.querySelectorAll("input, textarea").forEach((field) =>
    field.addEventListener("input", () => {
      const group = field.parentElement;
      if (!group.classList.contains("error")) return;
      group.classList.remove("error");
      field.removeAttribute("aria-invalid");
    })
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      form.querySelector(".form-group.error input, .form-group.error textarea")?.focus();
      return;
    }

    const originalBtn = btn.innerHTML;
    btn.textContent = "Enviando...";
    btn.disabled = true;

    setTimeout(() => {
      btn.replaceChildren(sentTemplate.content.cloneNode(true));

      form.reset();
      updateCount();
      form.querySelectorAll(".form-group").forEach((g) => g.classList.remove("success"));

      setTimeout(() => {
        btn.innerHTML = originalBtn;
        btn.disabled = false;
      }, 2000);
    }, 1500);
  });
})();
