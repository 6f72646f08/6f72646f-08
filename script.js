const terminal = document.querySelector("#terminal");
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");
const screen = document.querySelector("#screen");

async function enterFullscreen() {
  if (document.fullscreenElement) return;

  try {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen({ navigationUI: "hide" });
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    }
  } catch {
    // Some browsers only allow fullscreen for installed web apps.
  }
}

terminal.addEventListener("click", () => {
  enterFullscreen();
  input.focus();
});

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
