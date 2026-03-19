document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".discount-form");
  const input = document.querySelector("#email");
  const formGroup = document.querySelector(".discount-form-group");
  const errorMessage = document.querySelector(".error-message");
  const button = document.querySelector(".btn-text");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = input.value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formGroup.classList.remove("error", "success");

    if (!validEmail.test(email)) {
      formGroup.classList.add("error");
      errorMessage.textContent = "Correo inválido";

      changeButton("Error", "#ffffff");
      return;
    }

    formGroup.classList.add("success");

    changeButton("Enviado !", "#ffffff");

    input.value = "";

    setTimeout(() => {
      button.textContent = "Suscribir";
      formGroup.classList.remove("success");
    }, 2500);
  });

  function changeButton(text, color) {
    button.textContent = text;
    button.style.color = color;
  }
});
