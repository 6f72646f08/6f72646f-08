const terminal = document.querySelector("#terminal");
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");
const screen = document.querySelector("#screen");
const history = document.querySelector("#history");
const clock = document.querySelector("#clock");
const elapsed = document.querySelector("#elapsed");
const metricA = document.querySelector("#metric-a");
const startedAt = Date.now();
let manifestRunning = false;

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

function appendLine(text, className = "") {
  const line = document.createElement("div");
  line.textContent = text;
  if (className) line.className = className;
  history.appendChild(line);
  screen.scrollTop = screen.scrollHeight;
}

function wait(delay) {
  return new Promise((resolve) => window.setTimeout(resolve, delay));
}

async function revealManifest() {
  if (manifestRunning) return;
  manifestRunning = true;

  terminal.classList.remove("awake");
  void terminal.offsetWidth;
  terminal.classList.add("awake");

  const lines = [
    ["// MANIFEST_1885", "system-line"],
    ["VECTOR ........ 1885 / -1974", "system-line"],
    ["SUBJECT ....... [UNRESOLVED]", "dim-line"],
    ["SIGNAL ........ STILL INSIDE", "dim-line"],
    ["ACCESS ........ OBSERVER", "warning-line"],
  ];

  for (const [text, className] of lines) {
    await wait(180 + Math.random() * 240);
    appendLine(text, className);
  }

  await wait(650);
  terminal.classList.remove("awake");
  manifestRunning = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (value) {
    appendLine(`> ${value}`);
  }

  if (value.toLowerCase() === "manifest") {
    revealManifest();
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
}

updateTime();
window.setInterval(updateTime, 37);
window.setInterval(mutateMetrics, 1100);
