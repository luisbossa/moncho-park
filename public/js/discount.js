(() => {
  const form = document.querySelector(".discount-form");
  if (!form) return;

  const input = form.querySelector("#email");
  const formGroup = form.querySelector(".discount-form-group");
  const errorMessage = form.querySelector(".error-message");
  const button = form.querySelector(".btn-text");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    formGroup.classList.remove("error", "success");

    if (!EMAIL_RE.test(input.value.trim())) {
      formGroup.classList.add("error");
      errorMessage.textContent = "Correo inválido";
      button.textContent = "Error";
      return;
    }

    formGroup.classList.add("success");
    errorMessage.textContent = "";
    button.textContent = "Enviado !";
    input.value = "";

    setTimeout(() => {
      button.textContent = "Suscribir";
      formGroup.classList.remove("success");
    }, 2500);
  });
})();
