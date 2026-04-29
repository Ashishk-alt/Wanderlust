const btn = document.getElementById("chatbot-btn");
const chatbox = document.getElementById("chatbox");
const chatBody = document.getElementById("chat-body");

btn.onclick = () => {
  chatbox.style.display =
    chatbox.style.display === "none" ? "block" : "none";
};

async function sendMessage() {
  const input = document.getElementById("chat-input");
  let msg = input.value;

  const res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: msg }),
  });

  const data = await res.json();

  chatBody.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  chatBody.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;

  input.value = "";
}