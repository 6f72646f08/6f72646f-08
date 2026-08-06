const terminal = document.querySelector("#terminal");
const form = document.querySelector("#terminal-form");
const input = document.querySelector("#terminal-input");
const screen = document.querySelector("#screen");
const history = document.querySelector("#history");
const clock = document.querySelector("#clock");
const elapsed = document.querySelector("#elapsed");
const metricA = document.querySelector("#metric-a");
const boot = document.querySelector("#boot");
const bootStage = document.querySelector("#boot-stage");
const bootPercent = document.querySelector("#boot-percent");
const bootProgress = document.querySelector("#boot-progress");
const startedAt = Date.now();
let manifestRunning = false;

const bootStages = [
  [0, "INITIALIZING NODE"],
  [24, "READING DEAD SIGNAL"],
  [51, "SYNCING 1885 / −1974"],
  [77, "SEARCHING SECOND WORLD"],
  [94, "LISTENING"],
];

function runBootSequence() {
  let progress = 0;

  function advance() {
    progress = Math.min(100, progress + 1 + Math.floor(Math.random() * 5));
    bootPercent.textContent = String(progress).padStart(3, "0");
    bootProgress.style.width = `${progress}%`;

    const currentStage = [...bootStages].reverse().find(([threshold]) => progress >= threshold);
    bootStage.textContent = currentStage[1];

    if (progress < 100) {
      window.setTimeout(advance, 38 + Math.random() * 72);
      return;
    }

    bootStage.textContent = "LINK ESTABLISHED";
    window.setTimeout(() => boot.classList.add("done"), 420);
    window.setTimeout(() => {
      boot.hidden = true;
      input.focus();
    }, 1250);
  }

  window.setTimeout(advance, 280);
}

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
    ["СУЩЕСТВУЕТ НЕ ТОЛЬКО 1 МИР", "warning-line"],
    ["-1824 / -1015", "coordinate-line"],
  ];

  for (const [text, className] of lines) {
    await wait(180 + Math.random() * 240);
    appendLine(text, className);
  }

  await wait(650);
  terminal.classList.remove("awake");
  manifestRunning = false;
}

function runCommand() {
  const value = input.value.trim();

  if (value) {
    appendLine(`> ${value}`);
  }

  if (value.toLowerCase() === "manifest") {
    revealManifest();
  }

  input.value = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  runCommand();
});

input.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  runCommand();
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
runBootSequence();
window.setInterval(updateTime, 37);
window.setInterval(mutateMetrics, 1100);
