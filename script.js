const terminal = document.querySelector("#terminal");
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");
const screen = document.querySelector("#screen");

terminal.addEventListener("click", () => input.focus());

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (value) {
    const line = document.createElement("div");
    line.textContent = `> ${value}`;
    screen.appendChild(line);
    screen.scrollTop = screen.scrollHeight;
  }

  input.value = "";
});
