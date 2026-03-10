"use strict";

// ─── GAME UI ──────────────────────────────────────────────────────
// All DOM rendering: messages, sidebar, choices, end screen, episode select

// ── Time simulation ───────────────────────────────────────────────
let msgTime = { h: 10, m: 28 };

function tick() {
  msgTime.m += Math.floor(Math.random() * 2) + 1;
  if (msgTime.m >= 60) { msgTime.m -= 60; msgTime.h++; }
  return String(msgTime.h).padStart(2,'0') + ':' + String(msgTime.m).padStart(2,'0');
}

// ── Meter helpers ─────────────────────────────────────────────────
function meterColor(s) {
  return s >= 70 ? '#00a884' : s >= 40 ? '#ffc107' : '#f44336';
}
function vibeText(s) {
  if (s >= 85) return 'מאוהב/ת בך 😍';
  if (s >= 70) return 'אוהד/ת אותך 😊';
  if (s >= 50) return 'בסדר איתך 🙂';
  if (s >= 35) return 'לא בטוח/ה 🤔';
  if (s >= 20) return 'מרוגז/ת ממך 😤';
  return 'שונא/ת אותך 🤬';
}

// ── Notification toast ────────────────────────────────────────────
let _notifTimer = null;
function notify(text) {
  const el = document.getElementById('notif');
  el.textContent = text;
  el.classList.add('show');
  if (_notifTimer) clearTimeout(_notifTimer);
  _notifTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ── Typing indicator ──────────────────────────────────────────────
function showTyping(name) {
  document.getElementById('typing-name').textContent = name + ' מקליד/ה...';
  document.getElementById('typing-area').classList.add('on');
  document.getElementById('chat-messages').scrollTop = 9999;
}
function hideTyping() {
  document.getElementById('typing-area').classList.remove('on');
}

// ── Chat messages ─────────────────────────────────────────────────
function addMsg(opts) {
  const chat = document.getElementById('chat-messages');
  const c = (opts.charId && CHARACTERS[opts.charId]) ? CHARACTERS[opts.charId] : null;
  const isPlayer = !!opts.isPlayer;
  const isEmoji  = !!opts.isEmoji;
  const t = tick();

  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap ' + (isPlayer ? 'player' : 'other');
  if (isEmoji) wrap.classList.add('emoji-msg');

  const avatarHtml = (!isPlayer && c)
    ? `<div class="msg-avatar" style="background:${c.color}">${c.avatar}</div>` : '';
  const receipts = isPlayer ? `<span class="receipts">✓✓</span>` : '';
  const senderInBubble = (!isPlayer && c && !isEmoji)
    ? `<div class="msg-sender" style="color:${c.color};margin-bottom:2px;">${c.name}</div>` : '';

  wrap.innerHTML = `
    <div class="msg-inner">
      ${avatarHtml}
      <div class="msg-bubble">
        ${senderInBubble}
        ${opts.text}
        <div class="msg-meta"><span>${t}</span>${receipts}</div>
      </div>
    </div>
  `;
  chat.appendChild(wrap);
  chat.scrollTop = chat.scrollHeight;
  if (!isPlayer) GameAudio.beep(780 + Math.random() * 120, 0.1);
}

// System / narrative message (centered pill)
function addSystemMsg(text) {
  const chat = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.style.cssText = 'text-align:center;margin:10px 0;';
  div.innerHTML = `<span style="background:rgba(0,168,132,0.12);color:#00a884;font-size:11px;padding:5px 14px;border-radius:8px;border:1px solid rgba(0,168,132,0.3);display:inline-block;">${text}</span>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ── Sidebar (relationship meters) ─────────────────────────────────
function renderSidebar(activeChars, scores) {
  const list = document.getElementById('nb-list');
  if (!activeChars || !activeChars.length) { list.innerHTML = ''; return; }
  list.innerHTML = activeChars.map(id => {
    const c = CHARACTERS[id];
    const s = scores[id] !== undefined ? scores[id] : 50;
    const carried = GameState.getCarried(id);
    // Show memory icon if this character has history from previous episodes
    const memoryHint = (carried !== undefined && GameState.isCompleted(currentEpisode ? currentEpisode.id - 1 : 0))
      ? `<span title="נשמר מפרק קודם" style="font-size:9px;opacity:0.7;"> 💾</span>` : '';
    return `
      <div class="neighbor-card" id="nb-${id}">
        <div class="nb-header">
          <div class="nb-avatar" style="background:${c.color}">${c.avatar}</div>
          <div class="nb-name">${c.name}${memoryHint}</div>
          <div class="nb-score">${Math.round(s)}</div>
        </div>
        <div class="nb-bar">
          <div class="nb-fill" style="width:${s}%;background:${meterColor(s)}"></div>
        </div>
        <div class="nb-vibe">${vibeText(s)}</div>
      </div>
    `;
  }).join('');
}

function flashCard(id, positive) {
  const el = document.getElementById('nb-' + id);
  if (!el) return;
  el.classList.remove('pos-flash', 'neg-flash');
  void el.offsetWidth;
  el.classList.add(positive ? 'pos-flash' : 'neg-flash');
  setTimeout(() => el.classList.remove('pos-flash', 'neg-flash'), 800);
}

// ── Goal bar ──────────────────────────────────────────────────────
function setGoalBar(pct) {
  document.getElementById('goal-bar-fill').style.width = pct + '%';
}

// ── Choices ───────────────────────────────────────────────────────
const CHOICE_LETTERS = ['א', 'ב', 'ג', 'ד'];
function renderChoices(choices) {
  const area = document.getElementById('choice-area');
  const list = document.getElementById('choices-list');
  list.innerHTML = choices.map((c, i) => `
    <button class="choice-btn" onclick="makeChoice(${i})">
      <span class="choice-letter">${CHOICE_LETTERS[i]})</span>
      <span>${c.text}</span>
    </button>
  `).join('');
  window._pendingChoices = choices;
  area.classList.add('on');
}
function hideChoices() {
  document.getElementById('choice-area').classList.remove('on');
  document.getElementById('choices-list').innerHTML = '';
  window._pendingChoices = null;
}

// ── End screen ────────────────────────────────────────────────────
function showEnd(endingData, activeChars, scores) {
  document.getElementById('end-headline').textContent = endingData.headline;
  document.getElementById('end-sub').textContent      = endingData.sub;
  document.getElementById('badge-icon').textContent   = endingData.badgeIcon;
  document.getElementById('badge-label').textContent  = endingData.badgeLabel;

  const metersDiv = document.getElementById('end-meters');
  metersDiv.innerHTML =
    '<div style="font-size:12px;color:#8696a0;margin-bottom:12px;text-align:right">📊 יחסי שכנות סופיים:</div>' +
    activeChars.map(id => {
      const c = CHARACTERS[id];
      const s = scores[id] || 50;
      return `
        <div class="end-meter-row">
          <div class="em-avatar" style="background:${c.color}">${c.avatar}</div>
          <div class="em-info">
            <div class="em-name">${c.name}</div>
            <div class="em-vibe">${vibeText(s)}</div>
            <div class="em-bar">
              <div class="em-fill" id="emf-${id}" style="background:${meterColor(s)}" data-val="${s}"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

  document.getElementById('end-screen').classList.add('on');
  GameAudio.beep(660, 0.3);
  setTimeout(() => {
    document.querySelectorAll('.em-fill').forEach(el => {
      el.style.width = el.dataset.val + '%';
    });
  }, 200);
}

// ── Episode select screen ─────────────────────────────────────────
function buildEpisodeCards() {
  const grid = document.getElementById('ep-grid');
  grid.innerHTML = EPISODES.map(ep => {
    const locked    = !GameState.isUnlocked(ep.id);
    const completed = GameState.isCompleted(ep.id);
    const badge     = GameState.getBadge(ep.id);
    return `
      <div class="ep-card ${locked ? 'locked' : ''}" ${locked ? '' : `onclick="startEpisode(${ep.id})"`}>
        ${locked    ? '<div class="ep-lock-badge">🔒</div>' : ''}
        ${completed ? `<div class="ep-lock-badge" style="right:10px;left:auto;font-size:18px;">${badge || '✅'}</div>` : ''}
        <div class="ep-card-emoji">${ep.emoji || '🏠'}</div>
        <div class="ep-card-num">פרק ${ep.id}</div>
        <div class="ep-card-title">${ep.title}</div>
        <div class="ep-card-sub">${ep.subtitle}</div>
        ${locked
          ? '<div class="ep-play-hint" style="color:#8696a0">🔒 השלם פרק קודם</div>'
          : `<div class="ep-play-hint">${completed ? '🔄 שחק שוב' : '▶ שחק עכשיו'}</div>`
        }
      </div>
    `;
  }).join('');
}

function showEpisodeSelect() {
  document.getElementById('end-screen').classList.remove('on');
  document.getElementById('ep-complete-overlay').classList.remove('on');
  const intro = document.getElementById('intro-screen');
  intro.style.display    = 'flex';
  intro.style.animation  = 'none';
  intro.style.opacity    = '1';
  intro.style.pointerEvents = 'auto';
  intro.classList.remove('hidden');
  // Rebuild cards to reflect latest unlock/completion state
  buildEpisodeCards();
}

function dismissComplete() {
  document.getElementById('ep-complete-overlay').classList.remove('on');
  showEpisodeSelect();
}
