 //Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

async function sendMessage() {
  const input = document.getElementById("user-input");
  const msg = input.value;
  const chat = document.getElementById("chat-messages");

  if (!msg) return;

  chat.innerHTML += `<div class="user-msg"><span>${msg}</span></div>`;
  input.value = "";

  chat.innerHTML += `<div class="ai-msg" id="loading"><span>Typing...</span></div>`;

  const res = await fetch("/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();

  document.getElementById("loading").remove();

  chat.innerHTML += `<div class="ai-msg"><span>${data.reply}</span></div>`;

  chat.scrollTop = chat.scrollHeight;
}

function toggleChat() {
  const chat = document.getElementById("chatbot");

  if (chat.style.display === "flex") {
    chat.style.display = "none";
  } else {
    chat.style.display = "flex";
  }
}

// click on icon
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("chat-toggle")
    .addEventListener("click", toggleChat);
});