/* =========================
   TIME. Romania (Europe/Bucharest)
   ========================= */

/*
  Mod TEST:
  - pune TEST_HOUR = null ca sa ia ora reala din Romania
  - pune TEST_HOUR = 23 ca sa fortezi ora 23
*/
const TEST_HOUR = null;

function getOraRomania() {
  if (typeof TEST_HOUR === "number") {
    return Math.max(0, Math.min(23, TEST_HOUR));
  }

  // Ora in Romania indiferent de fusul setat pe PC.
  // Folosim Intl.DateTimeFormat cu timeZone Europe/Bucharest
  const parts = new Intl.DateTimeFormat("ro-RO", {
    timeZone: "Europe/Bucharest",
    hour: "2-digit",
    hour12: false
  }).formatToParts(new Date());

  const hourPart = parts.find(p => p.type === "hour");
  const ora = hourPart ? parseInt(hourPart.value, 10) : new Date().getHours();

  return Number.isFinite(ora) ? ora : new Date().getHours();
}

function getOraCurenta() {
  return getOraRomania();
}

/* =========================
   Salut personalizat
   ========================= */

function salutPersonalizat() {
  const ora = getOraCurenta();

  const paragraf = document.querySelector("header .subtitle");
  if (!paragraf) return;

  if (ora >= 6 && ora <= 11) {
    paragraf.textContent = "Bună dimineața! Bine ai venit pe pagina mea.";
  } else if (ora >= 12 && ora <= 17) {
    paragraf.textContent = "Bună ziua! Bine ai venit pe pagina mea.";
  } else {
    paragraf.textContent = "Bună seara! Bine ai venit pe pagina mea.";
  }
}

/* =========================
   Tema automata dupa ora
   ========================= */

function aplicaTemaDupaOra() {
  const ora = getOraCurenta();

  let cls = "time-night";
  if (ora >= 6 && ora <= 11) cls = "time-dawn";
  else if (ora >= 12 && ora <= 17) cls = "time-day";
  else if (ora >= 18 && ora <= 21) cls = "time-evening";

  if (document.body.classList.contains(cls)) return;

  document.body.classList.remove("time-dawn", "time-day", "time-evening", "time-night");
  document.body.classList.add(cls);
}

/* =========================
   Buton tema: Auto -> Dark -> Light
   ========================= */

function updateThemeToggleText() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const state = localStorage.getItem("themeMode") || "auto";

  if (state === "auto") btn.textContent = "🕒 Auto Theme";
  else if (state === "dark") btn.textContent = "🌙 Dark Mode";
  else btn.textContent = "☀️ Light Mode";
}

function applyManualMode() {
  const mode = localStorage.getItem("themeMode") || "auto";

  // Curatam clasele de timp
  document.body.classList.remove("time-dawn", "time-day", "time-evening", "time-night");

  if (mode === "dark") {
    document.body.classList.add("time-night");
  } else if (mode === "light") {
    document.body.classList.add("time-day");
  } else {
    aplicaTemaDupaOra();
  }

  updateThemeToggleText();
  salutPersonalizat();
}

function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", function (event) {
    event.preventDefault();

    const current = localStorage.getItem("themeMode") || "auto";

    let next = "auto";
    if (current === "auto") next = "dark";
    else if (current === "dark") next = "light";
    else next = "auto";

    localStorage.setItem("themeMode", next);
    applyManualMode();
  });
}

/* =========================
   Formular: validare reala
   ========================= */

function setFeedback(text, color) {
  const feedback = document.getElementById("form-feedback");
  const status = document.getElementById("formStatus");

  if (feedback) {
    feedback.textContent = text;
    feedback.style.color = color;
  }

  if (status) {
    status.textContent = text;
    status.style.color = color;
  }
}

function submitForm() {
  const numeEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const mesajEl = document.getElementById("message");

  if (!numeEl || !emailEl || !mesajEl) return;

  const nume = numeEl.value.trim();
  const email = emailEl.value.trim();
  const mesaj = mesajEl.value.trim();

  console.log("Nume:", nume);
  console.log("Email:", email);
  console.log("Mesaj:", mesaj);

  if (nume.length < 2) {
    setFeedback("Nume prea scurt!", "red");
    console.warn("Goodbye World!");
    return;
  }

  if (!email.includes("@")) {
    setFeedback("Email invalid!", "red");
    console.warn("Goodbye World!");
    return;
  }

  if (mesaj.length < 10) {
    setFeedback("Mesajul trebuie să aibă minim 10 caractere!", "red");
    console.warn("Goodbye World!");
    return;
  }

  setFeedback("Mulțumim, " + nume + "! Mesajul a fost trimis.", "green");
  console.warn("Goodbye World!");
}

function initForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
  });
}

/* =========================
   Toggle vizibilitate pe sectiuni
   ========================= */

function initSectionToggle() {
  const headings = document.querySelectorAll("main h2");
  headings.forEach(function (h2) {
    h2.addEventListener("click", function () {
      const content = h2.nextElementSibling;
      if (!content) return;

      content.classList.toggle("hidden");
      h2.classList.toggle("collapsed");
    });
  });
}

/* =========================
   Auto refresh la minut (doar in auto)
   ========================= */

function startAutoTick() {
  setInterval(function () {
    const mode = localStorage.getItem("themeMode") || "auto";
    if (mode === "auto") {
      aplicaTemaDupaOra();
      salutPersonalizat();
    }
  }, 60 * 1000);
}

/* =========================
   Init
   ========================= */

function init() {
  applyManualMode();
  initThemeToggle();
  initForm();
  initSectionToggle();
  startAutoTick();
}

init();