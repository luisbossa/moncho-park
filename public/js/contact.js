const form = document.getElementById("contact-form");
const email = document.getElementById("email");
const confirmEmail = document.getElementById("confirm-email");
const message = document.getElementById("message");
const charCount = document.querySelector(".char-count");
const formMessage = document.getElementById("form-message");

message.addEventListener("input", () => {
  let length = message.value.length;
  charCount.textContent = `${length} / 600`;
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  formMessage.textContent = "";
  formMessage.style.color = "red";

  if (email.value !== confirmEmail.value) {
    formMessage.textContent = "Los correos electrónicos no coinciden.";
    return;
  }

  if (message.value.length < 10) {
    formMessage.textContent = "El mensaje debe tener al menos 10 caracteres.";
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent = "Mensaje enviado correctamente.";

  form.reset();
  charCount.textContent = "0 / 600";
});
