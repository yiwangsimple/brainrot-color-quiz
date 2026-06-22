const DAILY_SIZE = 10;
const STORAGE_KEY = "brainrot-color-quiz";
let memoryStore = {};

const promptBank = [
  {
    name: "Solar Skater",
    clue: "Fast, loud, and built around a hot arcade streak.",
    answer: "#ff7a1a",
    colorName: "Arcade Orange",
    options: ["#ff7a1a", "#2f80ed", "#00a676", "#2b2d42"]
  },
  {
    name: "Mint Circuit DJ",
    clue: "A crisp club signal with a bright digital finish.",
    answer: "#19d6a3",
    colorName: "Circuit Mint",
    options: ["#19d6a3", "#ef476f", "#f8c630", "#6852d6"]
  },
  {
    name: "Berry Pixel Idol",
    clue: "Pop-star energy, saturated stickers, and a high-score pose.",
    answer: "#d93b8c",
    colorName: "Pixel Berry",
    options: ["#0b7285", "#d93b8c", "#ffb703", "#3a86ff"]
  },
  {
    name: "Cobalt Shadow Racer",
    clue: "Cool track lights, deep speed, and a late-night finish line.",
    answer: "#2454d6",
    colorName: "Cobalt Boost",
    options: ["#2454d6", "#f15bb5", "#f6ae2d", "#5dd39e"]
  },
  {
    name: "Lemon Arcade Signal",
    clue: "A bright coin-slot flash that feels impossible to ignore.",
    answer: "#ffd23f",
    colorName: "Lemon Flash",
    options: ["#25283d", "#43aa8b", "#ffd23f", "#e76f51"]
  },
  {
    name: "Rose Glitch Crown",
    clue: "Royal, unstable, and slightly overexposed on purpose.",
    answer: "#ff4d6d",
    colorName: "Glitch Rose",
    options: ["#0081a7", "#ff4d6d", "#6a994e", "#f4a261"]
  },
  {
    name: "Lime Portal Sign",
    clue: "The color of an exit button that probably opens another level.",
    answer: "#8ac926",
    colorName: "Portal Lime",
    options: ["#8ac926", "#3d405b", "#e63946", "#00b4d8"]
  },
  {
    name: "Cyan Sticker Star",
    clue: "Clean, punchy, and made for a one-tap share screenshot.",
    answer: "#00bbf9",
    colorName: "Sticker Cyan",
    options: ["#f72585", "#00bbf9", "#f7b801", "#495057"]
  },
  {
    name: "Coral Turbo Mask",
    clue: "Warm speed, dramatic entry, and a final-round smile.",
    answer: "#ef6351",
    colorName: "Turbo Coral",
    options: ["#2ec4b6", "#ef6351", "#3a0ca3", "#ffbe0b"]
  },
  {
    name: "Violet Comet Card",
    clue: "A collectible streak marker with a cosmic edge.",
    answer: "#7b2cbf",
    colorName: "Comet Violet",
    options: ["#7b2cbf", "#43aa8b", "#ff8500", "#277da1"]
  },
  {
    name: "Amber Speed Tile",
    clue: "It looks like a bonus tile and feels like a shortcut.",
    answer: "#f4a261",
    colorName: "Speed Amber",
    options: ["#264653", "#f4a261", "#06d6a0", "#ef476f"]
  },
  {
    name: "Ocean Memory Badge",
    clue: "A calm badge for players who remember the whole set.",
    answer: "#168aad",
    colorName: "Memory Ocean",
    options: ["#168aad", "#f94144", "#90be6d", "#f9c74f"]
  },
  {
    name: "Ruby Bonus Button",
    clue: "The button that everyone notices before the timer starts.",
    answer: "#d90429",
    colorName: "Bonus Ruby",
    options: ["#2d6a4f", "#d90429", "#48cae4", "#fcbf49"]
  },
  {
    name: "Graphite Final Boss",
    clue: "Dark, simple, and designed to make bright choices pop.",
    answer: "#343a40",
    colorName: "Final Graphite",
    options: ["#f77f00", "#52b788", "#343a40", "#4361ee"]
  }
];

const elements = {
  dailyPill: document.querySelector("#dailyPill"),
  roundText: document.querySelector("#roundText"),
  scoreText: document.querySelector("#scoreText"),
  streakText: document.querySelector("#streakText"),
  packText: document.querySelector("#packText"),
  memoryToken: document.querySelector("#memoryToken"),
  tokenLabel: document.querySelector("#tokenLabel"),
  promptName: document.querySelector("#promptName"),
  promptClue: document.querySelector("#promptClue"),
  swatchGrid: document.querySelector("#swatchGrid"),
  feedbackTitle: document.querySelector("#feedbackTitle"),
  feedbackText: document.querySelector("#feedbackText"),
  nextButton: document.querySelector("#nextButton"),
  dailyTitle: document.querySelector("#dailyTitle"),
  dailyMeta: document.querySelector("#dailyMeta"),
  resultBlock: document.querySelector("#resultBlock"),
  finalScore: document.querySelector("#finalScore"),
  resultNote: document.querySelector("#resultNote"),
  playerName: document.querySelector("#playerName"),
  saveScoreButton: document.querySelector("#saveScoreButton"),
  shareButton: document.querySelector("#shareButton"),
  restartButton: document.querySelector("#restartButton"),
  resetBoardButton: document.querySelector("#resetBoardButton"),
  leaderboardList: document.querySelector("#leaderboardList"),
  wallInput: document.querySelector("#wallInput"),
  wallButton: document.querySelector("#wallButton"),
  wallList: document.querySelector("#wallList")
};

const todayKey = new Date().toISOString().slice(0, 10);

const state = {
  pack: buildDailyPack(todayKey),
  round: 0,
  score: 0,
  streak: 0,
  answered: false,
  complete: false,
  lastResult: null
};

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle(items, seedText) {
  const output = [...items];
  let seed = hashString(seedText);
  for (let index = output.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const swapIndex = seed % (index + 1);
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }
  return output;
}

function buildDailyPack(seedText) {
  return seededShuffle(promptBank, seedText).slice(0, DAILY_SIZE).map((prompt, index) => ({
    ...prompt,
    options: seededShuffle(prompt.options, `${seedText}-${index}`)
  }));
}

function getStore() {
  try {
    const rawStore = localStorage.getItem(STORAGE_KEY);
    memoryStore = rawStore ? JSON.parse(rawStore) || {} : memoryStore;
    return memoryStore;
  } catch {
    return memoryStore;
  }
}

function setStore(store) {
  memoryStore = store;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Keep the in-memory board usable when storage is blocked or full.
  }
}

function getTodayStore() {
  const store = getStore();
  if (!store[todayKey]) {
    store[todayKey] = { scores: [], wall: [] };
    setStore(store);
  }
  return store;
}

function sanitizeText(value, fallback = "Player") {
  const cleaned = String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.slice(0, 42) || fallback;
}

function renderGame() {
  const prompt = state.pack[state.round];
  const roundNumber = Math.min(state.round + 1, DAILY_SIZE);

  elements.roundText.textContent = `${roundNumber}/${DAILY_SIZE}`;
  elements.scoreText.textContent = state.score;
  elements.streakText.textContent = state.streak;
  elements.packText.textContent = todayKey.slice(5);
  elements.promptName.textContent = prompt.name;
  elements.promptClue.textContent = prompt.clue;
  elements.feedbackTitle.textContent = "Pick fast, remember faster.";
  elements.feedbackText.textContent = "Choose the color that fits the prompt.";
  elements.nextButton.hidden = true;
  elements.memoryToken.style.setProperty("--answer", prompt.answer);
  elements.tokenLabel.textContent = `Signal ${roundNumber}`;

  elements.swatchGrid.replaceChildren(
    ...prompt.options.map((color) => {
      const button = document.createElement("button");
      button.className = "swatch-button";
      button.type = "button";
      button.dataset.color = color;
      button.style.setProperty("--chip", color);
      button.setAttribute("aria-label", `Choose ${getColorName(prompt, color)}`);
      button.innerHTML = `
        <span class="swatch-chip" aria-hidden="true"></span>
        <span>
          <span class="swatch-name">${getColorName(prompt, color)}</span>
          <span class="swatch-code">${color}</span>
        </span>
      `;
      button.addEventListener("click", () => handleAnswer(button, prompt));
      return button;
    })
  );

  state.answered = false;
}

function getColorName(prompt, color) {
  if (color === prompt.answer) return prompt.colorName;
  const fallbackNames = {
    "#2f80ed": "Blue Mode",
    "#00a676": "Green Signal",
    "#2b2d42": "Night Ink",
    "#ef476f": "Candy Pink",
    "#f8c630": "Coin Yellow",
    "#6852d6": "Purple Flash",
    "#0b7285": "Deep Teal",
    "#ffb703": "Bright Gold",
    "#3a86ff": "Neon Blue",
    "#f15bb5": "Hot Pink",
    "#f6ae2d": "Warm Gold",
    "#5dd39e": "Soft Mint",
    "#25283d": "Dark Navy",
    "#43aa8b": "Fresh Green",
    "#e76f51": "Burnt Coral",
    "#0081a7": "Sea Blue",
    "#6a994e": "Leaf Green",
    "#f4a261": "Speed Amber",
    "#3d405b": "Slate Blue",
    "#e63946": "Sharp Red",
    "#00b4d8": "Clear Cyan",
    "#f72585": "Hot Rose",
    "#f7b801": "Arcade Gold",
    "#495057": "Soft Graphite",
    "#2ec4b6": "Aqua Mint",
    "#3a0ca3": "Deep Violet",
    "#ffbe0b": "Sun Coin",
    "#ff8500": "Orange Burst",
    "#277da1": "Steel Blue",
    "#264653": "Deep Slate",
    "#06d6a0": "Signal Mint",
    "#168aad": "Memory Ocean",
    "#f94144": "Arcade Red",
    "#90be6d": "Soft Lime",
    "#f9c74f": "Warm Yellow",
    "#2d6a4f": "Forest Green",
    "#48cae4": "Ice Cyan",
    "#fcbf49": "Amber Gold",
    "#f77f00": "Orange Spark",
    "#52b788": "Mint Leaf",
    "#4361ee": "Hyper Blue"
  };
  return fallbackNames[color] || "Mystery Color";
}

function handleAnswer(button, prompt) {
  if (state.answered || state.complete) return;

  const selected = button.dataset.color;
  const correct = selected === prompt.answer;
  state.answered = true;

  document.querySelectorAll(".swatch-button").forEach((swatch) => {
    swatch.disabled = true;
    if (swatch.dataset.color === prompt.answer) swatch.classList.add("is-correct");
    if (swatch === button && !correct) swatch.classList.add("is-wrong");
  });

  if (correct) {
    state.score += 1;
    state.streak += 1;
    elements.feedbackTitle.textContent = "Correct signal.";
    elements.feedbackText.textContent = `${prompt.colorName} locks the streak.`;
  } else {
    state.streak = 0;
    elements.feedbackTitle.textContent = "Color mismatch.";
    elements.feedbackText.textContent = `The prompt wanted ${prompt.colorName}.`;
  }

  elements.scoreText.textContent = state.score;
  elements.streakText.textContent = state.streak;
  elements.nextButton.hidden = false;
  elements.nextButton.textContent = state.round === DAILY_SIZE - 1 ? "Finish" : "Next";
}

function nextRound() {
  if (!state.answered) return;
  if (state.round >= DAILY_SIZE - 1) {
    finishGame();
    return;
  }
  state.round += 1;
  renderGame();
}

function finishGame() {
  state.complete = true;
  state.lastResult = {
    score: state.score,
    total: DAILY_SIZE,
    date: todayKey,
    saved: false
  };
  elements.finalScore.textContent = `${state.score}/${DAILY_SIZE}`;
  elements.resultNote.textContent = getResultNote(state.score);
  elements.resultBlock.hidden = false;
  elements.saveScoreButton.disabled = false;
  elements.saveScoreButton.textContent = "Save";
  elements.feedbackTitle.textContent = "Daily pack complete.";
  elements.feedbackText.textContent = "Save the run or copy a share line.";
  elements.nextButton.hidden = true;
}

function getResultNote(score) {
  if (score >= 9) return "Legend run. This score belongs in the group chat.";
  if (score >= 7) return "Strong memory. A few colors tried to bait you.";
  if (score >= 5) return "Solid run. Tomorrow's pack resets the board.";
  return "Warm-up score. The board is still open.";
}

function saveScore() {
  if (!state.lastResult || state.lastResult.saved) return;
  const store = getTodayStore();
  const name = sanitizeText(elements.playerName.value, "Player").slice(0, 10);
  store[todayKey].scores.push({
    name,
    score: state.lastResult.score,
    total: DAILY_SIZE
  });
  store[todayKey].scores = store[todayKey].scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  setStore(store);
  state.lastResult.saved = true;
  renderLeaderboard();
  elements.saveScoreButton.disabled = true;
  elements.saveScoreButton.textContent = "Saved";
  elements.resultNote.textContent = "Saved to the local daily board.";
}

function renderLeaderboard() {
  const store = getTodayStore();
  const scores = store[todayKey].scores;
  if (!scores.length) {
    const item = document.createElement("li");
    const rank = document.createElement("span");
    const label = document.createElement("span");
    const score = document.createElement("span");
    rank.className = "rank-badge";
    score.className = "score-badge";
    rank.textContent = "--";
    label.textContent = "No local scores yet";
    score.textContent = "0/10";
    item.replaceChildren(rank, label, score);
    elements.leaderboardList.replaceChildren(item);
    return;
  }
  elements.leaderboardList.replaceChildren(
    ...scores.map((entry, index) => {
      const item = document.createElement("li");
      const rank = document.createElement("span");
      const name = document.createElement("span");
      const score = document.createElement("span");
      rank.className = "rank-badge";
      score.className = "score-badge";
      rank.textContent = String(index + 1).padStart(2, "0");
      name.textContent = entry.name;
      score.textContent = `${entry.score}/${entry.total}`;
      item.replaceChildren(rank, name, score);
      return item;
    })
  );
}

async function shareResult() {
  if (!state.lastResult) return;
  const text = `I scored ${state.lastResult.score}/${DAILY_SIZE} on Brainrot Color Quiz (${todayKey}).`;
  try {
    await navigator.clipboard.writeText(text);
    elements.resultNote.textContent = "Share text copied.";
  } catch {
    elements.resultNote.textContent = text;
  }
}

function postWallNote() {
  const note = sanitizeText(elements.wallInput.value, "");
  if (!note) return;
  const store = getTodayStore();
  store[todayKey].wall.unshift(note);
  store[todayKey].wall = store[todayKey].wall.slice(0, 5);
  setStore(store);
  elements.wallInput.value = "";
  renderWall();
}

function renderWall() {
  const store = getTodayStore();
  const notes = store[todayKey].wall;
  if (!notes.length) {
    elements.wallList.innerHTML = "<li>Clean board, fresh run.</li>";
    return;
  }
  elements.wallList.replaceChildren(
    ...notes.map((note) => {
      const item = document.createElement("li");
      item.textContent = note;
      return item;
    })
  );
}

function resetBoard() {
  const store = getTodayStore();
  store[todayKey] = { scores: [], wall: [] };
  setStore(store);
  renderLeaderboard();
  renderWall();
}

function restartGame() {
  state.round = 0;
  state.score = 0;
  state.streak = 0;
  state.answered = false;
  state.complete = false;
  state.lastResult = null;
  elements.resultBlock.hidden = true;
  renderGame();
}

function boot() {
  const readableDate = todayKey.slice(5).replace("-", "/");
  elements.dailyPill.textContent = `Pack ${readableDate}`;
  elements.dailyTitle.textContent = `Daily Pack ${readableDate}`;
  elements.dailyMeta.textContent = `${DAILY_SIZE} prompts. New local board each day.`;
  elements.nextButton.addEventListener("click", nextRound);
  elements.saveScoreButton.addEventListener("click", saveScore);
  elements.shareButton.addEventListener("click", shareResult);
  elements.restartButton.addEventListener("click", restartGame);
  elements.resetBoardButton.addEventListener("click", resetBoard);
  elements.wallButton.addEventListener("click", postWallNote);
  elements.wallInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") postWallNote();
  });
  renderGame();
  renderLeaderboard();
  renderWall();
}

boot();
