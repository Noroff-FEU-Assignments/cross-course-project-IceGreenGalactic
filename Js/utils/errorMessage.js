export function displayMessage(messageType, message, target) {
  const element = document.querySelector(".message-error");
  const errorDiv = document.createElement("div");
  errorDiv.className = "message-error";
  errorDiv.innerHTML = `<div>${messageType}: ${message}</div>`;
  document.body.appendChild(errorDiv);
}
