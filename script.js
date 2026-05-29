document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute("href")).scrollIntoView({
      behavior:"smooth"
    });
  });
});

// --------------------
// NINA PRO MAX
// --------------------

// jednoduchá paměť
let userName = localStorage.getItem("nina_name") || null;

// pokud první zpráva obsahuje jméno
function trySaveName(text) {
  if (!userName) {
    const match = text.match(/jmenuju se (.+)/i);
    if (match) {
      userName = match[1].split(" ")[0];
      localStorage.setItem("nina_name", userName);
    }
  }
}

// typing efekt
function typing(chat) {
  const el = document.createElement("div");
  el.className = "msg bot";
  el.innerText = "Nina píše...";
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
  return el;
}

// AI logika
function ninaAI(text) {
  const t = text.toLowerCase();

  const police = ["policie","zákon","právo","pokuta","zásah","hlídka","řidič","nehoda","kriminální","dopravní"];

  const isPolice = police.some(k => t.includes(k));

  let reply = "";

  // -------------------------
  // POZDRAV + OSLOVENÍ
  // -------------------------
  if (t.includes("ahoj") || t.includes("čau")) {
    reply = userName
      ? `Ahoj ${userName} 🙂 jsem Nina, jak ti můžu pomoct?`
      : "Ahoj 🙂 jsem Nina, jak ti můžu pomoct?";
  }

  // -------------------------
  // POLICEJNÍ TÉMATA
  // -------------------------
  else if (isPolice) {

    const r = [
      "Jasně 🙂 vysvětlím ti to jednoduše a srozumitelně.",
      "Dobře 👍 pojďme si to rozebrat krok za krokem.",
      "Rozumím, tohle ti vysvětlím lidsky.",
      "Tohle záleží na situaci, pojďme to upřesnit."
    ];

    reply = r[Math.floor(Math.random()*r.length)];
  }

  // -------------------------
  // NEPOLICEJNÍ
  // -------------------------
  else {
    const r = [
      "Na tohle ti bohužel nemůžu odpovědět 🙂 zkus se zeptat na policii nebo právo.",
      "Jsem Nina – policejní asistentka, tohle není moje oblast.",
      "S tímhle ti nepomůžu, ale klidně se ptej na zákony nebo policii 🙂"
    ];

    reply = r[Math.floor(Math.random()*r.length)];
  }

  // přidání jména do odpovědi
  if (userName && !reply.includes(userName) && isPolice) {
    reply = `${userName}, ${reply}`;
  }

  return reply;
}

// --------------------
// SEND MESSAGE
// --------------------
function sendMsg() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  const text = input.value.trim();
  if (!text) return;

  chat.innerHTML += `<div class="msg user">${text}</div>`;

  trySaveName(text);

  const typingEl = typing(chat);

  const reply = ninaAI(text);

  setTimeout(()=>{
    typingEl.remove();
    chat.innerHTML += `<div class="msg bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }, 700);

  input.value = "";
}
