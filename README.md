# 🏠 הוועד — The Building Committee

> *A WhatsApp group simulator set in an Israeli apartment building. Drama included.*

**[▶ Play Now → aviz85.github.io/yehuda-game](https://aviz85.github.io/yehuda-game/)**

---

## What is this?

You're a new tenant in an Israeli apartment building. The main interface is the building's WhatsApp group. Events happen, neighbors react, drama unfolds — and you choose how to respond.

Every decision affects your relationships. Every neighbor has an agenda. The elevator is broken. And מרים has opinions about everything.

---

## The Neighbors

| | Name | Vibe |
|---|---|---|
| 🔴 | **מרים, קומה 3** | Types in ALL CAPS. Has been counting the days since the elevator broke. |
| 🔵 | **יוסי** | Reads everything. Responds with 👍. Can be bribed with pizza. |
| 🟢 | **ליאת ואיתי** | Their dog ניצן is not the problem. You are the problem. |
| 🟣 | **אורי** | Wants to be committee chair. Proposes votes about everything. |
| 🟠 | **ולנטינה** | New immigrant. Asks what every Hebrew idiom means. Compares things to Belarus. |

---

## How to Play

1. Messages appear in the WhatsApp chat automatically
2. At key moments, you get **3 response options**
3. Your choices affect relationship meters with each neighbor
4. Reach the episode goal before things fall apart

---

## Episodes

| # | Title | Goal | Status |
|---|---|---|---|
| 1 | **המעלית** | Fix the elevator | ✅ Available |
| 2 | **גינת הגג** | Survive the rooftop garden vote | 🔜 Coming soon |
| 3 | **ניצן** | Resolve the dog situation once and for all | 🔜 Coming soon |
| 4 | **הבחירות** | Become (or stop) the new committee chair | 🔜 Coming soon |

---

## Stack

Pure HTML/CSS/JS — zero dependencies, zero build step.

```
index.html          ← game shell + engine
episodes/
  episode-1.js      ← המעלית
  episode-2.js      ← גינת הגג (coming soon)
characters.js       ← neighbor data & portraits
```

---

## Run Locally

```bash
git clone https://github.com/aviz85/yehuda-game
cd yehuda-game
open index.html     # or just drag into browser
```

---

## Contributing

Want to write an episode? Each episode is a self-contained JS file with a story script array. See `episodes/episode-1.js` for the format.

PRs welcome. Especially if your Hebrew is better than ולנטינה's.

---

*Built with Israeli humor, WhatsApp PTSD, and a healthy fear of building WhatsApp groups.*
