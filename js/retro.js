"use strict";

// ─── RETRO INTRO SCREEN ──────────────────────────────────────────
// Handles the retro intro screen: music toggle, start/level/exit buttons

function _retroHide() {
  const el = document.getElementById('retro-intro');
  el.style.opacity   = '0';
  el.style.transition = 'opacity 0.4s';
  setTimeout(() => el.style.display = 'none', 400);
}

function retroToggleMusic() {
  const btn = document.getElementById('ri-music-btn');
  if (GameAudio.isMusicOn()) {
    GameAudio.stopMusic();
    btn.textContent = '♫ מוזיקה: OFF';
  } else {
    GameAudio.startMusic();
    btn.textContent = '♫ מוזיקה: ON';
  }
}

function retroStart() {
  GameAudio.stopMusic();
  _retroHide();
  startEpisode(1);
}

function retroLevel() {
  GameAudio.stopMusic();
  _retroHide();
  showEpisodeSelect();
}

function retroExit(el) {
  el.textContent = '!אין בריחה מהוועד';
  setTimeout(() => { el.textContent = '✕ יציאה'; }, 2200);
}

// First click: start music + reveal menu (browser autoplay policy)
document.getElementById('retro-intro').addEventListener('click', function() {
  GameAudio.startMusic();
  const menu  = document.querySelector('.ri-menu');
  const press = document.querySelector('.ri-press');
  if (menu && !menu.classList.contains('visible')) {
    menu.classList.add('visible');
    if (press) press.style.display = 'none';
  }
}, { once: true });
