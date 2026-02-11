/* ============================
   GERMAN AI EVOLUTION MODE
============================ */

const materiBox = document.getElementById("materi");
const alertBox = document.getElementById("alertBox");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

let learned = JSON.parse(localStorage.getItem("learned")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let weakWords = JSON.parse(localStorage.getItem("weakWords")) || [];

let xp = parseInt(localStorage.getItem("xp")) || 0;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastVisit = localStorage.getItem("lastVisit") || null;

/* ============================
   RENDER LESSON
============================ */

function renderLessons() {
  materiBox.innerHTML = "";
  let total = 0;

  lessons.forEach(section => {
    const sec = document.createElement("div");
    sec.className = "hafalan-section";
    sec.innerHTML = `<h2>${section.section}</h2>`;

    section.items.forEach(item => {
      total++;

      const row = document.createElement("div");
      row.className = "hafalan-item";

      const isFav = favorites.includes(item.de);
      const isLearned = learned.includes(item.de);

      row.innerHTML = `
        <div>
          <strong>🇩🇪 ${item.de}</strong><br>
          <span>👉 ${item.id}</span>
        </div>

        <div class="btn-group">
          <span class="favorite">${isFav ? "❤️" : "🤍"}</span>
          <button class="speak-btn">🔊</button>
          <button class="mic-btn">🎤</button>
        </div>
      `;

      row.querySelector(".speak-btn").onclick = () => {
        speakGerman(item.de);
        markLearned(item.de);
        renderLessons();
      };

      row.querySelector(".mic-btn").onclick = () => {
        startPronunciation(item.de);
      };

      row.querySelector(".favorite").onclick = () => {
        toggleFavorite(item.de);
      };

      if (isLearned) {
        row.style.border = "1px solid #22c55e";
      }

      sec.appendChild(row);
    });

    materiBox.appendChild(sec);
  });

  updateProgress(total);
}

/* ============================
   SPEAK SYSTEM
============================ */

function speakGerman(text) {
  speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "de-DE";
  msg.rate = 0.9;
  speechSynthesis.speak(msg);

  addXP(5);
  showAlert("⭐ +5 XP");

  if (Math.random() < 0.2) markWeak(text);
}

/* ============================
   PRONUNCIATION AI
============================ */

function startPronunciation(correctWord) {

  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    showAlert("❌ Browser tidak support mic");
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "de-DE";
  recognition.start();

  showAlert("🎤 Mendengarkan...");

  recognition.onresult = function (event) {
    const spoken = event.results[0][0].transcript.toLowerCase();

    if (spoken.includes(correctWord.toLowerCase())) {
      addXP(15);
      showAlert("🎤 Perfect! +15 XP");
    } else {
      markWeak(correctWord);
      showAlert("❌ Coba lagi");
    }
  };
}

/* ============================
   FAVORITE
============================ */

function toggleFavorite(word) {
  if (favorites.includes(word)) {
    favorites = favorites.filter(w => w !== word);
  } else {
    favorites.push(word);
    showAlert("❤️ Ditambahkan");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderLessons();
}

/* ============================
   LEARN & WEAK TRACKING
============================ */

function markLearned(word) {
  if (!learned.includes(word)) {
    learned.push(word);
    localStorage.setItem("learned", JSON.stringify(learned));
  }
}

function markWeak(word) {
  if (!weakWords.includes(word)) {
    weakWords.push(word);
    localStorage.setItem("weakWords", JSON.stringify(weakWords));
  }
}

/* ============================
   PROGRESS + CEFR LEVEL
============================ */

function updateProgress(total) {

  const percent = Math.floor((learned.length / total) * 100);

  progressFill.style.width = percent + "%";
  progressText.textContent = percent + "%";

  document.getElementById("learnedCount").textContent = learned.length;
  document.getElementById("weakCount").textContent = weakWords.length;

  updateLevel(percent);
}

function updateLevel(percent) {

  let level = "A1";

  if(percent > 20) level = "A2";
  if(percent > 40) level = "B1";
  if(percent > 60) level = "B2";
  if(percent > 80) level = "C1";
  if(percent >= 95) level = "C2 MASTER";

  document.getElementById("level").textContent = level;
}

/* ============================
   XP SYSTEM
============================ */

function addXP(amount) {
  xp += amount;
  localStorage.setItem("xp", xp);
  document.getElementById("xp").textContent = xp;
}

/* ============================
   STREAK SYSTEM
============================ */

function checkStreak() {
  const today = new Date().toDateString();

  if (lastVisit !== today) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastVisit", today);
  }

  document.getElementById("streak").textContent = streak;
}

/* ============================
   ALERT
============================ */

function showAlert(message) {
  alertBox.textContent = message;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2000);
}

/* ============================
   AI WEAK TRAINING
============================ */

function startWeakTraining(){

  if(weakWords.length === 0){
    showAlert("🎉 Tidak ada kata lemah!");
    return;
  }

  const randomWord = weakWords[Math.floor(Math.random()*weakWords.length)];
  showAlert("🧠 Ucapkan: " + randomWord);
  startPronunciation(randomWord);
}

/* ============================
   INIT
============================ */

function initSystem(){
  document.getElementById("xp").textContent = xp;
  checkStreak();
  renderLessons();
}

initSystem();
