/* ===== Helpers ===== */
function rand(n) { return Math.floor(Math.random() * n); }

function randomGradient() {
  const a = `rgb(${rand(256)}, ${rand(256)}, ${rand(256)})`;
  const b = `rgb(${rand(256)}, ${rand(256)}, ${rand(256)})`;
  return `linear-gradient(135deg, ${a}, ${b})`;
}

/* ===== 1) click ===== */
const cardClick = document.getElementById("cardClick");
const btnClick = document.getElementById("btnClick");
const resClick = document.getElementById("resClick");
let clicks = 0;

btnClick.addEventListener("click", () => {
  clicks++;
  cardClick.style.background = randomGradient();
  resClick.textContent = `Clicks: ${clicks}`;
});

/* ===== 2) mousemove ===== */
const padMove = document.getElementById("padMove");
const dot = document.getElementById("dot");
const resMove = document.getElementById("resMove");

padMove.addEventListener("mousemove", (e) => {
  const rect = padMove.getBoundingClientRect();
  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  resMove.textContent = `X: ${Math.floor(x)} | Y: ${Math.floor(y)}`;
});

/* ===== 3) wheel ===== */
const emoji = document.getElementById("emoji");
const resWheel = document.getElementById("resWheel");
let zoom = 100;

emoji.addEventListener("wheel", (e) => {
  e.preventDefault();
  zoom += (e.deltaY < 0) ? 10 : -10;
  zoom = Math.max(60, Math.min(zoom, 220));

  emoji.style.transform = `scale(${zoom / 100})`;
  resWheel.textContent = `Zoom: ${zoom}%`;
}, { passive: false });

/* ===== 4) mouseleave ===== */
const cardLeave = document.getElementById("cardLeave");
const note = document.getElementById("note");
const resLeave = document.getElementById("resLeave");

cardLeave.addEventListener("mouseleave", () => {
  const txt = note.value.trim();
  const now = new Date().toLocaleTimeString();

  if (!txt) {
    resLeave.textContent = "Estado: nada que guardar";
    return;
  }
  resLeave.textContent = `✅ Guardado a las ${now} (${txt.length} caracteres)`;
});

/* ===== 5) keydown ===== */
const keyBox = document.getElementById("keyBox");
const resKey = document.getElementById("resKey");
let turbo = false;

keyBox.addEventListener("keydown", (e) => {
  if (e.key === "Shift") turbo = true;

  resKey.textContent = `Tecla: ${e.key} | Turbo: ${turbo ? "ON" : "OFF"}`;

  // Mini extra: si presiona Enter, limpia el input
  if (e.key === "Enter") {
    e.preventDefault();
    keyBox.value = "";
  }
});

keyBox.addEventListener("keyup", (e) => {
  if (e.key === "Shift") turbo = false;
  resKey.textContent = `Tecla: ${e.key} | Turbo: ${turbo ? "ON" : "OFF"}`;
});

/* ===== 6) submit ===== */
const form = document.getElementById("form");
const email = document.getElementById("email");
const resSubmit = document.getElementById("resSubmit");
const toast = document.getElementById("toast");

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const val = email.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  if (!ok) {
    resSubmit.textContent = "❌ Email inválido. Ej: usuario@gmail.com";
    showToast("⚠️ Revisa tu correo");
    return;
  }

  resSubmit.textContent = `✅ Enviado: ${val}`;
  showToast("✅ Enviado correctamente");
  form.reset();
});

/* ===== 7) dblclick (extra) ===== */
const btnLock = document.getElementById("btnLock");
const cardDbl = document.getElementById("cardDbl");
const resDbl = document.getElementById("resDbl");
let locked = false;

btnLock.addEventListener("dblclick", () => {
  locked = !locked;
  resDbl.textContent = `Candado: ${locked ? "ON 🔒" : "OFF"}`;

  if (locked) {
    cardDbl.style.background = "linear-gradient(135deg, rgba(34,197,94,.18), rgba(79,140,255,.16))";
  } else {
    cardDbl.style.background = "";
  }
});

/* ===== 8) input (extra) ===== */
const range = document.getElementById("range");
const barFill = document.getElementById("barFill");
const resInput = document.getElementById("resInput");

function updateEnergy(v) {
  barFill.style.width = `${v}%`;
  resInput.textContent = `Energía: ${v}%`;
}
updateEnergy(range.value);

range.addEventListener("input", (e) => {
  updateEnergy(e.target.value);
});
