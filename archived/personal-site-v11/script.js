"use strict";

// ---- theme toggle ----
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
let theme = localStorage.getItem('site-theme') || 'dark';
html.setAttribute('data-theme', theme);

themeBtn?.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', theme);
  localStorage.setItem('site-theme', theme);
});

// ---- live time (Singapore GMT+8) ----
const timeFmt = new Intl.DateTimeFormat([], {
  timeZone: 'Asia/Singapore',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});
function updateTime() {
  const el = document.getElementById('time');
  if (el) el.textContent = timeFmt.format(new Date());
}
updateTime();
setInterval(updateTime, 1000);

// ---- current year ----
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- click animation ----
const sounds = [
  'click','clack','thock','thonk','thup','pop','whump','thud','plip','clonk',
  'snap','tck','tak','bonk','klak','tik','tock','plink','clunk','thwack',
  'bop','klik','plonk','tunk','pok','ping','thwick','blip','clop','klock',
  'thwump','tnk'
];
const clickContainer = document.getElementById('click-container');
document.addEventListener('click', e => {
  if (!clickContainer) return;
  const el = document.createElement('div');
  el.textContent = sounds[Math.floor(Math.random() * sounds.length)];
  el.className = 'click-animation';
  el.style.left = (e.clientX - 16) + 'px';
  el.style.top  = (e.clientY - 8) + 'px';
  clickContainer.appendChild(el);
  setTimeout(() => el.remove(), 850);
});

// ---- GitHub contributions calendar ----
async function loadContributions() {
  try {
    const resp = await fetch('asset/contributions.json', { cache: 'no-store' });
    if (!resp.ok) return;
    renderContribCalendar(await resp.json());
  } catch (_) { /* fail silently */ }
}

function intensityLevel(count, max) {
  if (count <= 0) return 0;
  return Math.max(1, Math.min(4, Math.ceil((count / Math.max(max, 1)) * 4)));
}

function renderContribCalendar(data) {
  const container = document.getElementById('github-contrib-calendar');
  if (!container) return;
  container.innerHTML = '';
  const { weeks, max = 20 } = data;

  // tally total
  let total = 0;
  weeks.forEach(w => w.days.forEach(d => { if (d) total += d.count; }));
  const titleEl = document.getElementById('contrib-title');
  if (titleEl) titleEl.textContent = `${total} contributions in the last year`;

  const grid = document.createElement('div');
  grid.className = 'contrib-grid';
  weeks.forEach(week => {
    const col = document.createElement('div');
    col.className = 'contrib-week';
    for (let i = 0; i < 7; i++) {
      const d = week.days[i];
      const cell = document.createElement('div');
      cell.className = `contrib-day intensity-${d ? intensityLevel(d.count, max) : 0}`;
      if (d?.date) cell.title = `${d.date}: ${d.count} contribution${d.count !== 1 ? 's' : ''}`;
      col.appendChild(cell);
    }
    grid.appendChild(col);
  });
  container.appendChild(grid);

  const legendEl = document.getElementById('contrib-legend-container');
  if (legendEl) {
    const legend = document.createElement('div');
    legend.className = 'contrib-legend';
    legend.innerHTML = 'Less ' +
      [0,1,2,3,4].map(i => `<span class="legend-swatch intensity-${i}"></span>`).join(' ') +
      ' More';
    legendEl.appendChild(legend);
  }
}

window.addEventListener('DOMContentLoaded', loadContributions);
