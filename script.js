const terminal = document.querySelector("#terminal");
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");
const screen = document.querySelector("#screen");
const history = document.querySelector("#history");
const clock = document.querySelector("#clock");
const elapsed = document.querySelector("#elapsed");
const metricA = document.querySelector("#metric-a");
const metricB = document.querySelector("#metric-b");
const startedAt = Date.now();

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
    history.appendChild(line);
    screen.scrollTop = screen.scrollHeight;
  }

  input.value = "";
});

function pad(value, size = 2) {
  return String(value).padStart(size, "0");
}

function updateTime() {
  const now = new Date();
  clock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(Math.floor(now.getMilliseconds() / 10))}`;

  const totalSeconds = Math.floor((Date.now() - startedAt) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  elapsed.textContent = `${pad(hours, 3)}:${pad(minutes)}:${pad(seconds)}`;
}

function mutateMetrics() {
  metricA.textContent = `${(Math.random() * .009).toFixed(4)} / ${(70 + Math.random() * 19).toFixed(2)}`;
  metricB.textContent = Array.from({ length: 4 }, () => Math.floor(11 + Math.random() * 88)).join("·");
}

updateTime();
window.setInterval(updateTime, 37);
window.setInterval(mutateMetrics, 1100);
