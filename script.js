const payload = document.querySelector("#payload");
const form = document.querySelector("#command-form");
const command = document.querySelector("#command");
const feedback = document.querySelector("#feedback");
const reveal = document.querySelector("#reveal");
const closeReveal = document.querySelector("#close-reveal");
const clock = document.querySelector("#clock");

const encoded = "n5WayFGaz1DczV3P0lGZl9ycBhVTkNUcR12UjREVTJVLKh3bzImW3Z3Z2QzTPJlS4cWSS9FZBFkczAjbx8CZvQnbl1Wdj9GZv02bj5SZsd2bvdmLzN2bk9yL6MHc0RHa";
let stage = 0;

function setFeedback(text, type = "") {
  feedback.textContent = text;
  feedback.className = `feedback ${type}`.trim();
}

function glitchTo(value) {
  payload.style.opacity = "0";
  window.setTimeout(() => {
    payload.textContent = value;
    payload.style.opacity = "1";
  }, 220);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = command.value.trim().toLowerCase();

  if (stage === 0 && ["зеркало", "отражение", "reverse", "развернуть", "конец"].includes(value)) {
    glitchTo(encoded.split("").reverse().join(""));
    stage = 1;
    setFeedback("ПОРЯДОК ВОССТАНОВЛЕН. ОБНАРУЖЕН АЛФАВИТ: 64.", "ok");
    command.value = "";
    command.placeholder = "следующая команда";
    return;
  }

  if (stage === 1 && ["64", "base64", "decode", "декодировать", "расшифровать"].includes(value)) {
    const decoded = atob(payload.textContent);
    glitchTo(decoded.replace(/^https?:\/\//, "PROTOCOL://"));
    stage = 2;
    setFeedback("МАРШРУТ ВОССТАНОВЛЕН. ДОСТУП РАЗРЕШЁН.", "ok");
    command.value = "";
    window.setTimeout(() => reveal.showModal(), 650);
    return;
  }

  if (stage === 2) {
    reveal.showModal();
    return;
  }

  setFeedback(stage === 0 ? "КОМАНДА ОТКЛОНЕНА. НАЧНИ С КОНЦА." : "НЕВЕРНЫЙ ПРОТОКОЛ. ЧИСЛО УЖЕ ПЕРЕД ТОБОЙ.", "error");
  command.select();
});

closeReveal.addEventListener("click", () => reveal.close());

function updateClock() {
  clock.textContent = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date()) + " MSK";
}

updateClock();
window.setInterval(updateClock, 1000);
