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
   LESSON DATA (UTUH)
======================= */
const lessons = [

{
  section: "Alphabet & Cara Baca",
  items: [
    { de: "Ä", id: "dibaca e lebar" },
    { de: "Ö", id: "dibaca e o" },
    { de: "Ü", id: "dibaca u maju" },
    { de: "ß", id: "dibaca ss" },
    { de: "Vater", id: "ayah dibaca fater" },
    { de: "Wasser", id: "air dibaca vasser" },
    { de: "Ja", id: "ya dibaca ya" },
    { de: "Zeit", id: "waktu dibaca tsait" },
    { de: "ich", id: "aku bunyi halus tenggorokan" }
  ]
},

{
  section: "Salam Dasar",
  items: [
    { de: "Hallo", id: "halo" },
    { de: "Hi", id: "hai" },
    { de: "Guten Morgen", id: "selamat pagi" },
    { de: "Guten Tag", id: "selamat siang" },
    { de: "Guten Abend", id: "selamat sore atau malam" },
    { de: "Gute Nacht", id: "selamat malam tidur" }
  ]
},

{
  section: "Perkenalan Diri",
  items: [
    { de: "Ich bin Amir", id: "saya amir" },
    { de: "Mein Name ist Amir", id: "nama saya amir" }
  ]
},

{
  section: "Tanya Kabar",
  items: [
    { de: "Wie geht’s?", id: "apa kabar" },
    { de: "Gut", id: "baik" },
    { de: "Sehr gut", id: "sangat baik" },
    { de: "Es geht", id: "lumayan" },
    { de: "Nicht gut", id: "tidak baik" },
    { de: "Und du?", id: "dan kamu" }
  ]
},

{
  section: "Angka & Umur",
  items: [
    { de: "eins", id: "satu" },
    { de: "zwei", id: "dua" },
    { de: "drei", id: "tiga" },
    { de: "zehn", id: "sepuluh" },
    { de: "zwanzig", id: "dua puluh" },
    { de: "Ich bin 20 Jahre alt", id: "saya berumur dua puluh tahun" }
  ]
},

{
  section: "Hari & Waktu",
  items: [
    { de: "Heute", id: "hari ini" },
    { de: "Morgen", id: "besok atau pagi" },
    { de: "Gestern", id: "kemarin" },
    { de: "Jetzt", id: "sekarang" }
  ]
},

{
  section: "Jam",
  items: [
    { de: "Wie spät ist es?", id: "jam berapa sekarang" },
    { de: "Es ist 7 Uhr", id: "jam tujuh" },
    { de: "Es ist 20 Uhr", id: "jam delapan malam" }
  ]
},

{
  section: "Aktivitas Harian",
  items: [
    { de: "Ich arbeite", id: "saya bekerja" },
    { de: "Ich lerne Deutsch", id: "saya belajar bahasa jerman" },
    { de: "Ich schlafe", id: "saya tidur" }
  ]
},

{
  section: "Hobi & Kesukaan",
  items: [
    { de: "Ich mag lernen", id: "saya suka belajar" },
    { de: "Ich liebe Deutsch", id: "saya sangat suka bahasa jerman" },
    { de: "Ich höre gern Musik", id: "saya suka mendengarkan musik" }
  ]
},

{
  section: "Tempat & Arah",
  items: [
    { de: "Hier", id: "di sini" },
    { de: "Dort", id: "di sana" },
    { de: "Ich gehe nach Hause", id: "saya pulang ke rumah" }
  ]
},

{
  section: "Keluarga",
  items: [
    { de: "Ich habe einen Vater", id: "saya punya ayah" },
    { de: "Ich habe eine Mutter", id: "saya punya ibu" },
    { de: "Ich habe eine Familie", id: "saya punya keluarga" }
  ]
},

{
  section: "Makanan & Minuman",
  items: [
    { de: "Ich esse Brot", id: "saya makan roti" },
    { de: "Ich esse Reis", id: "saya makan nasi" },
    { de: "Ich trinke Wasser", id: "saya minum air" },
    { de: "Ich trinke Kaffee", id: "saya minum kopi" }
  ]
},

{
  section: "Belanja & Harga",
  items: [
    { de: "Wie viel kostet das?", id: "berapa harganya" },
    { de: "Das kostet 5 Euro", id: "harganya lima euro" },
    { de: "Ich kaufe das", id: "saya membeli itu" }
  ]
},

{
  section: "Restoran",
  items: [
    { de: "Ich möchte Kaffee, bitte", id: "saya ingin kopi tolong" },
    { de: "Die Speisekarte, bitte", id: "menu tolong" },
    { de: "Die Rechnung, bitte", id: "tagihan tolong" }
  ]
},

{
  section: "Transportasi",
  items: [
    { de: "Ich fahre mit dem Zug", id: "saya naik kereta" },
    { de: "Wo ist der Bahnhof?", id: "stasiun di mana" }
  ]
},

{
  section: "Cuaca & Musim",
  items: [
    { de: "Heute ist kalt", id: "hari ini dingin" },
    { de: "Heute ist warm", id: "hari ini hangat" },
    { de: "Wie ist das Wetter?", id: "cuacanya bagaimana" }
  ]
},

{
  section: "Sopan Santun",
  items: [
    { de: "Bitte", id: "tolong atau sama sama" },
    { de: "Danke", id: "terima kasih" },
    { de: "Entschuldigung", id: "maaf atau permisi" },
    { de: "Es tut mir leid", id: "saya minta maaf" }
  ]
}

];

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

      <div class="help-text" id="help${index}">👉 ${item.id}</div>

      <input id="input${index}" placeholder="Tulis arti Bahasa Indonesia">

      <button class="check-btn" onclick="checkAnswer(${index})">✅ Cek Jawaban</button>
    `;
    cards.appendChild(card);
  });

  updateProgress();
}

/* =======================
   LOGIC
======================= */
function toggleHelp(i) {
  const el = document.getElementById("help" + i);
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function checkAnswer(i) {
  const input = document.getElementById("input" + i);
  if (!input) return;

  if (input.value.trim().toLowerCase() === flatData[i].id.toLowerCase()) {
    completed.push(i);
    showAlert("✅ Benar! Mantap!", "success");
    render();
  } else {
    showAlert("❌ Masih salah, coba lagi", "error");
  }
}

function updateProgress() {
  const percent = Math.round((completed.length / flatData.length) * 100);
  progressBar.style.width = percent + "%";
  progressBar.innerText = percent + "%";
}

function speakGerman(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "de-DE";
  msg.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function showAlert(text, type) {
  alertBox.className = type;
  alertBox.innerText = text;
  alertBox.style.display = "block";
  setTimeout(() => alertBox.style.display = "none", 2000);
}

function resetProgress() {
  completed = [];
  localStorage.removeItem("completed");

  showAlert("🔄 Latihan direset! Urutan baru siap.", "success");
  render();
}

/* =======================
   START
======================= */
render();
