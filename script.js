/* =====================================================
   SCRIPT.JS (FINAL FIXED)
   - NO REDECLARE
   - QUIZ SAFE
   - HELP SLIDE + AUTO CLOSE
   REQUIRE: data-lessons.js loaded BEFORE this file
===================================================== */

(() => {

/* =======================
   SHUFFLE FUNCTION
======================= */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* =======================
   VALIDATION DATA
======================= */
if (typeof lessons === "undefined") {
  console.error("❌ lessons tidak ditemukan. Pastikan data-lessons.js dimuat lebih dulu");
  return;
}

/* =======================
   FLATTEN & SHUFFLE
======================= */
let flatData = [];
lessons.forEach(sec => {
  sec.items.forEach(it => {
    flatData.push({ ...it, section: sec.section });
  });
});

shuffleArray(flatData);

/* reset progress tiap reload */
localStorage.removeItem("completed");
let completed = [];

/* =======================
   DOM
======================= */
const cards = document.getElementById("cards");
const progressBar = document.getElementById("progressBar");
const alertBox = document.getElementById("alertBox");

/* =======================
   RENDER
======================= */
function render() {
  if (!cards) return;

  cards.innerHTML = "";
  let lastSection = "";

  flatData.forEach((item, index) => {
    if (completed.includes(index)) return;

    if (item.section !== lastSection) {
      lastSection = item.section;
      const h = document.createElement("div");
      h.className = "section-title";
      h.innerText = item.section;
      cards.appendChild(h);
    }

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>🇩🇪 ${item.de}</h3>

      <div class="btn-group">
        <button class="speak" onclick="speakGerman('${item.de}')">🔊 Dengarkan</button>
        <button class="help-btn" onclick="toggleHelp(${index})">🆘 Bantuan</button>
      </div>

      <div class="help-text" id="help${index}">
        👉 ${item.id}
      </div>

      <input id="input${index}" placeholder="Tulis arti Bahasa Indonesia">

      <button class="check-btn" onclick="checkAnswer(${index})">
        ✅ Cek Jawaban
      </button>
    `;
    cards.appendChild(card);
  });

  updateProgress();
}

/* =======================
   HELP SLIDE + AUTO CLOSE
======================= */
window.toggleHelp = function (i) {
  const current = document.getElementById("help" + i);
  if (!current) return;

  // tutup bantuan lain
  document.querySelectorAll(".help-text").forEach(el => {
    if (el !== current) {
      el.classList.remove("show");
      setTimeout(() => (el.style.display = "none"), 300);
    }
  });

  // toggle bantuan aktif
  if (current.classList.contains("show")) {
    current.classList.remove("show");
    setTimeout(() => (current.style.display = "none"), 300);
  } else {
    current.style.display = "block";
    setTimeout(() => current.classList.add("show"), 10);
  }
};

/* =======================
   CHECK ANSWER
======================= */
window.checkAnswer = function (i) {
  const input = document.getElementById("input" + i);
  if (!input) return;

  if (input.value.trim().toLowerCase() === flatData[i].id.toLowerCase()) {
    completed.push(i);
    showAlert("✅ Benar! Mantap!", "success");
    render();
  } else {
    showAlert("❌ Masih salah, coba lagi", "error");
  }
};

/* =======================
   PROGRESS
======================= */
function updateProgress() {
  if (!progressBar) return;
  const percent = Math.round((completed.length / flatData.length) * 100);
  progressBar.style.width = percent + "%";
  progressBar.innerText = percent + "%";
}

/* =======================
   SPEAK GERMAN
======================= */
window.speakGerman = function (text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "de-DE";
  msg.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
};

/* =======================
   ALERT
======================= */
function showAlert(text, type) {
  if (!alertBox) return;
  alertBox.className = type;
  alertBox.innerText = text;
  alertBox.style.display = "block";
  setTimeout(() => alertBox.style.display = "none", 2000);
}

/* =======================
   RESET
======================= */
window.resetProgress = function () {
  completed = [];
  localStorage.removeItem("completed");
  showAlert("🔄 Latihan direset! Urutan baru siap.", "success");
  render();
};

/* =======================
   START
======================= */
render();

})();
