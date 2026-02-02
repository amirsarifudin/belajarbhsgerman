const materiBox = document.getElementById("materi");

lessons.forEach(section => {
  const sec = document.createElement("div");
  sec.className = "hafalan-section";

  sec.innerHTML = `<h2>${section.section}</h2>`;

  section.items.forEach(item => {
    const row = document.createElement("div");
    row.className = "hafalan-item";

    row.innerHTML = `
      <div>
        <strong>🇩🇪 ${item.de}</strong><br>
        <span>👉 ${item.id}</span>
      </div>
      <button onclick="speakGerman('${item.de}')">🔊</button>
    `;
    sec.appendChild(row);
  });

  materiBox.appendChild(sec);
});

function speakGerman(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "de-DE";
  msg.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}
