"use strict";

// ─── GAME ENGINE ─────────────────────────────────────────────────
// Queue system, beat runner, score changes, episode loading

let currentEpisode = null;
let scores         = {};
let goalPct        = 0;
let currentPath    = null;
let queue          = [];
let busy           = false;
let choiceDone     = null;

// ── Score management ──────────────────────────────────────────────
function changeScore(id, delta) {
  if (!(id in scores)) return;
  scores[id] = Math.max(0, Math.min(100, scores[id] + delta));
  renderSidebar(currentEpisode.activeChars, scores);
  flashCard(id, delta > 0);
  const c = CHARACTERS[id];
  notify((delta > 0 ? '📈 +' : '📉 ') + Math.abs(delta) + ' עם ' + c.name);
}

function setGoal(pct) {
  goalPct = Math.max(0, Math.min(100, pct));
  setGoalBar(goalPct);
}

// ── Message queue ─────────────────────────────────────────────────
function enq(fn) { queue.push(fn); pump(); }

function pump() {
  if (busy || queue.length === 0) return;
  busy = true;
  queue.shift()(() => { busy = false; pump(); });
}

function qMsg(charId, text, typingMs, pauseMs, isEmoji) {
  enq((done) => {
    const c = CHARACTERS[charId];
    showTyping(c.name);
    setTimeout(() => {
      hideTyping();
      addMsg({ charId, text, isEmoji: !!isEmoji });
      setTimeout(done, pauseMs || 250);
    }, typingMs || 1200);
  });
}

function qNotify(text, delayMs) {
  enq((done) => {
    setTimeout(() => { notify(text); done(); }, delayMs || 600);
  });
}

function qWait(ms) {
  enq((done) => setTimeout(done, ms));
}

function qChoicePrompt(choices) {
  enq((done) => {
    renderChoices(choices);
    choiceDone = done;
  });
}

// ── Choice handler (called from rendered HTML) ────────────────────
function makeChoice(i) {
  const choice = window._pendingChoices[i];
  hideChoices();

  addMsg({ text: choice.text, isPlayer: true, isEmoji: !!choice.isEmoji });
  GameAudio.beep(660, 0.08);

  if (choice.effects) {
    Object.entries(choice.effects).forEach(([id, v]) => changeScore(id, v));
  }

  if (choice.goalDelta) setGoal(goalPct + choice.goalDelta);

  if (choice.path !== undefined && choice.path !== null) {
    currentPath = choice.path;
  }

  const cb = choiceDone;
  choiceDone = null;

  if (choice.next) {
    if (cb) cb();
    runBeat(choice.next);
  } else {
    if (cb) cb();
  }
}

// ── Beat runner ───────────────────────────────────────────────────
function runBeat(beatId) {
  const beat = currentEpisode.beats.find(b => b.id === beatId);
  if (!beat) { console.warn('Beat not found:', beatId); return; }

  if (beat.branchMessages) {
    const msgs = beat.branchMessages[currentPath] || beat.branchMessages['default'] || [];
    msgs.forEach(m => qMsg(m.from, m.text, m.typingMs, m.delay, m.isEmoji));
    if (beat.autoNext) {
      enq((done) => { done(); runBeat(beat.autoNext); });
    }
    return;
  }

  if (beat.messages) {
    beat.messages.forEach(m => {
      if (m.from === '_notify') {
        qNotify(m.text, m.delay);
      } else {
        qMsg(m.from, m.text, m.typingMs, m.delay, m.isEmoji);
      }
    });
  }

  if (beat.ending) {
    enq((done) => {
      const endData = currentEpisode.endings[beat.ending];
      setGoal(endData.goalScore || 100);
      // Save completed episode + final scores to persistent state
      GameState.completeEpisode(currentEpisode.id, scores, endData.badgeIcon);
      notify('💾 יחסי שכנות נשמרו לפרק הבא!');
      setTimeout(() => showEnd(endData, currentEpisode.activeChars, scores), 1200);
      done();
    });
    return;
  }

  if (beat.choices) {
    qChoicePrompt(beat.choices);
    return;
  }

  if (beat.autoNext) {
    enq((done) => { done(); runBeat(beat.autoNext); });
  }
}

// ── Episode loader ────────────────────────────────────────────────
function loadEpisode(episode) {
  currentEpisode = episode;

  // Build starting scores: blend carried history with episode defaults
  scores = {};
  const carried = [];
  Object.entries(episode.initialScores).forEach(([charId, defaultScore]) => {
    const startScore = GameState.getStartingScore(charId, defaultScore);
    scores[charId] = startScore;
    if (GameState.hasHistory(charId) && startScore !== defaultScore) {
      carried.push({ charId, score: startScore, default: defaultScore });
    }
  });

  goalPct      = 0;
  currentPath  = null;
  msgTime      = { h: 10, m: 28 };
  queue        = [];
  busy         = false;
  choiceDone   = null;
  window._pendingChoices = null;

  // Reset UI
  document.getElementById('chat-messages').innerHTML =
    `<div class="date-divider"><span>${episode.dateLabel || 'היום'}</span></div>`;
  hideChoices();
  hideTyping();
  setGoal(0);
  document.getElementById('goal-text').textContent = episode.goal;

  renderSidebar(episode.activeChars, scores);

  // Show relationship memory notice if characters have history
  if (carried.length > 0 && episode.id > 1) {
    setTimeout(() => {
      const names = carried.map(c => CHARACTERS[c.charId].name);
      const avg = carried.reduce((s,c) => s + c.score, 0) / carried.length;
      const tone = avg >= 60 ? 'זוכרים את הפרקים הקודמים 💚' : avg >= 45 ? 'זוכרים אותך מהפרק הקודם' : 'עדיין זוכרים... 🫤';
      addSystemMsg(`${names.slice(0,3).join(', ')} ${tone}`);
    }, 400);
  }

  runBeat(episode.beats[0].id);
}

// ── Episode start (from episode select cards) ─────────────────────
function startEpisode(id) {
  GameAudio.beep(660, 0.1);
  const episode = EPISODES.find(e => e.id === id);
  if (!episode) return;
  if (!GameState.isUnlocked(id)) return;

  const intro = document.getElementById('intro-screen');
  intro.classList.add('hidden');
  setTimeout(() => { intro.style.display = 'none'; }, 600);

  document.getElementById('main').style.display = 'flex';
  loadEpisode(episode);
}

// ── Replay current episode ────────────────────────────────────────
function replayEpisode() {
  document.getElementById('end-screen').classList.remove('on');
  if (currentEpisode) loadEpisode(currentEpisode);
}

// ── Go back to retro intro ────────────────────────────────────────
function goBackToIntro() {
  document.getElementById('main').style.display = 'none';
  const ri = document.getElementById('retro-intro');
  ri.style.display = 'flex';
  ri.style.opacity = '1';
  const menu  = ri.querySelector('.ri-menu');
  const press = ri.querySelector('.ri-press');
  if (menu)  menu.classList.add('visible');
  if (press) press.style.display = 'none';
  GameAudio.stopMusic();
  GameAudio.startMusic();
  document.getElementById('ri-music-btn').textContent = '♫ מוזיקה: ON';
}
