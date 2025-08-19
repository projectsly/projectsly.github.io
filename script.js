const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789あいうえおカキクケコ漢字";
const fontSize = 17;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(0);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#2935FF";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    window.open(card.dataset.url, "_blank");
  });
});

const wordsToReplaceWith = [
  "Inspire",
  "Grow",
  "Generate",
  "Evolve",
  "Achieve",
  "Help",
  "Accelerate",
  "Research",
];

function replaceTtext() {
  const span = document.getElementById("footer");
  span.innerHTML = `Develop to ${wordsToReplaceWith[Math.floor(Math.random() * wordsToReplaceWith.length)]}.`;
}
replaceTtext();
setInterval(replaceTtext, 1000);

async function loadDiscordWidget() {
  try {
    const res = await fetch(
      "https://discord.com/api/guilds/1405562785231802418/widget.json",
    );
    const data = await res.json();

    // Fill in basic info
    document.getElementById("discordName").innerText = data.name;
    document.getElementById("discordOnline").innerText = data.presence_count;
    document.getElementById("discordInvite").href = data.instant_invite;

    // Show members (max 12 for compact look)
    const membersDiv = document.getElementById("discordMembers");
    membersDiv.innerHTML = "";
    data.members.slice(0, 12).forEach((member) => {
      const img = document.createElement("img");
      img.src = member.avatar_url;
      img.title = `${member.username} (${member.status})`;
      membersDiv.appendChild(img);
    });
  } catch (e) {
    console.error("Discord widget fetch failed", e);
  }
}

loadDiscordWidget();
