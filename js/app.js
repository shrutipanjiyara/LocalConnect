let activeCat = "";

// ── COUNTER ANIMATION ─────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll(".hnum").forEach((el) => {
    const target = parseInt(el.getAttribute("data-target"));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// ── NAV SCROLL EFFECT ─────────────────────────────────────────
window.addEventListener("scroll", () => {
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 20);
});

// ── RENDER CARDS ─────────────────────────────────────────────
function renderCards(data) {
  const grid = document.getElementById("cards-grid");
  document.getElementById("count-label").textContent = data.length + " workers found";

  if (!data.length) {
    grid.innerHTML = '<div class="empty">No workers found. Try a different filter.</div>';
    return;
  }

  grid.innerHTML = data.map((w) => `
    <div class="worker-card" onclick="openModal(${w.id})">
      <div class="card-top">
        <div class="avatar">${w.initials}</div>
        <div style="flex:1">
          <div class="card-name">${w.name}</div>
          <span class="trade-tag">${w.trade}</span>
        </div>
        <span class="verified-badge">✓ Verified</span>
      </div>
      <div class="card-meta">
        <span>📍 ${w.area}, ${w.city}</span>
        <span class="rating">★ ${w.rating}</span>
        <span>${w.jobs} jobs</span>
        <span>${w.exp}</span>
      </div>
      <p class="card-desc">${w.desc}</p>
      <div class="card-actions">
        <button class="btn-whatsapp" onclick="event.stopPropagation(); waContact('${w.phone}','${w.name}','${w.trade}')">
          💬 WhatsApp
        </button>
        <button onclick="event.stopPropagation(); openModal(${w.id})">View Profile</button>
      </div>
    </div>
  `).join("");
}

// ── FILTER ───────────────────────────────────────────────────
function filterWorkers() {
  const q = document.getElementById("search-input").value.toLowerCase();
  const city = document.getElementById("city-select").value;

  const filtered = workers.filter((w) => {
    const matchQ = !q || (w.name + w.trade + w.area + w.desc).toLowerCase().includes(q);
    const matchCity = !city || w.city === city;
    const matchCat = !activeCat || w.trade === activeCat;
    return matchQ && matchCity && matchCat;
  });

  renderCards(filtered);
}

function setCat(el, cat) {
  document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
  el.classList.add("active");
  activeCat = cat;
  filterWorkers();
}

// ── WHATSAPP ─────────────────────────────────────────────────
function waContact(phone, name, trade) {
  const msg = encodeURIComponent(`Hi ${name}, I found you on LocalConnect. I need a ${trade}. Are you available?`);
  window.open(`https://wa.me/91${phone}?text=${msg}`, "_blank");
}

// ── MODAL ────────────────────────────────────────────────────
function openModal(id) {
  const w = workers.find((x) => x.id === id);

  document.getElementById("modal-header").innerHTML = `
    <div class="modal-worker-top">
      <div class="modal-avatar">${w.initials}</div>
      <div>
        <div class="modal-name">${w.name}</div>
        <span class="trade-tag">${w.trade}</span>
        <span class="verified-badge" style="margin-left:6px">✓ Verified</span>
      </div>
    </div>
  `;

  document.getElementById("modal-body").innerHTML = `
    <div class="modal-row"><span class="mlabel">📍 Location</span><span>${w.area}, ${w.city}</span></div>
    <div class="modal-row"><span class="mlabel">⏱️ Experience</span><span>${w.exp}</span></div>
    <div class="modal-row"><span class="mlabel">⭐ Rating</span><span style="color:#eab308">★ ${w.rating} &nbsp;(${w.jobs} jobs done)</span></div>
    <div class="modal-row"><span class="mlabel">💼 About</span><span style="color:#94a3b8">${w.desc}</span></div>
  `;

  document.getElementById("modal-wa").onclick = () => waContact(w.phone, w.name, w.trade);
  document.getElementById("modal-call").onclick = () => window.open(`tel:+91${w.phone}`);
  document.getElementById("modal-overlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
}

document.getElementById("modal-overlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});


// ── BAR CHART ────────────────────────────────────────────────
function buildChart() {
  const maxVal = Math.max(...chartData.map((d) => d.value));

  document.getElementById("bar-chart").innerHTML = chartData.map((d) => `
    <div class="bar-col">
      <div class="bar-value">${d.value}</div>
      <div class="bar ${d.value === maxVal ? "highlight" : ""}"
           style="height:${Math.round((d.value / maxVal) * 110)}px"
           title="${d.label}: ${d.value}">
      </div>
      <div class="bar-label">${d.label.slice(0, 5)}</div>
    </div>
  `).join("");

  const cities = [
    { name: "Mumbai", val: 980 },
    { name: "Delhi", val: 875 },
    { name: "Bengaluru", val: 760 },
    { name: "Hyderabad", val: 540 },
    { name: "Pune", val: 420 },
  ];
  const maxC = 980;

  setTimeout(() => {
    document.getElementById("city-chart").innerHTML = cities.map((c) => `
      <div class="city-row">
        <div class="city-name">${c.name}</div>
        <div class="city-bar-wrap">
          <div class="city-bar-fill" style="width:${Math.round((c.val / maxC) * 100)}%"></div>
        </div>
        <div class="city-count">${c.val}</div>
      </div>
    `).join("");
  }, 300);
}

// ── REGISTER ─────────────────────────────────────────────────
function registerWorker() {
  const name  = document.getElementById("r-name").value.trim();
  const phone = document.getElementById("r-phone").value.trim();
  const trade = document.getElementById("r-trade").value;
  const city  = document.getElementById("r-city").value;

  if (!name || !phone || !trade || !city) {
    alert("Please fill all required (*) fields.");
    return;
  }

  const msg = document.getElementById("success-msg");
  msg.style.display = "block";
  msg.scrollIntoView({ behavior: "smooth" });

  ["r-name", "r-phone", "r-area", "r-desc"].forEach(
    (id) => (document.getElementById(id).value = "")
  );
  document.getElementById("r-trade").value = "";
  document.getElementById("r-city").value = "";
}

// ── INIT ─────────────────────────────────────────────────────
renderCards(workers);
buildChart();
window.addEventListener("load", animateCounters);
