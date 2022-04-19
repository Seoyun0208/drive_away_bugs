"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const carrotSound = new Audio("/sound/carrot_pull.mp3");
const bugSound = new Audio("/sound/bug_pull.mp3");
const alertSound = new Audio("/sound/alert.wav");
const bgSound = new Audio("/sound/bg.mp3");
const gameWinSound = new Audio("/sound/game_win.mp3");

// 게임 초기화
function initGame() {
	started = false;
	field.innerHTML = "";
	gameScore.innerText = 5;

	addItem("bug", BUG_COUNT, "img/bug.png");
	addItem("carrot", CARROT_COUNT, "img/carrot.png");
}

// field 에 아이템 랜덤 배치
function addItem(className, cnt, imgPath) {
	const x1 = 0;
	const y1 = 0;
	const x2 = fieldRect.width - CARROT_SIZE;
	const y2 = fieldRect.height - CARROT_SIZE;

	for (let i = 0; i < cnt; i++) {
		const item = document.createElement("img");

		item.setAttribute("class", className);
		item.setAttribute("src", imgPath);

		const x = randomNumber(x1, x2);
		const y = randomNumber(y1, y2);

		item.style.position = "absolute";
		item.style.transform = `translate(${x}px, ${y}px)`;
		field.appendChild(item);
	}
}

function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

// 게임 시작
let started = false;
const GAME_DURATION = 5;

function startGame() {
	playSound(bgSound);
	startGameTimer();
	started = true;
}

// 게임 타이머 시작
let timer = undefined;

function startGameTimer() {
	let time = GAME_DURATION;
	timer = setInterval(() => {
		updateGameTImerText(time);
		--time;
		if (time < 0) {
			finishGame("lose");
			score = 0;
		}
	}, 1000);
}

// 게임 타이머 정지
function stopGameTimer(timer) {
	started = false;
	clearInterval(timer);
	updateScoreboard();
}

// 브라우저 게임 타이머 텍스트
const gameTimer = document.querySelector(".game__timer");

function updateGameTImerText(time) {
	gameTimer.innerText = time;
}

// 게임 시작 모달창
const modalStart = document.querySelector(".modal__start");
const bgPlay = document.querySelector(".play");
const gameHeader = document.querySelector(".game__header");

modalStart.addEventListener("click", (e) => {
	if (
		e.target === e.currentTarget ||
		e.target.parentNode === e.currentTarget
	) {
		bgPlay.classList.remove("open");
		gameHeader.classList.add("show");
		initGame();
		startGame();
	}
});

// 게임 정지 모달창
const gameBtn = document.querySelector(".game__button");
const bgRestart = document.querySelector(".restart");

gameBtn.addEventListener("click", () => {
	stopSound(bgSound);
	playSound(alertSound);
	bgRestart.classList.add("open");
	stopGameTimer(timer);
});

// 게임 다시시작(restart, refresh) 모달창
const restartBtn = document.querySelector(".restart__button");
const bgRefresh = document.querySelector(".refresh");
const refreshBtn = document.querySelector(".refresh__button");

restartBtn.addEventListener("click", () => {
	bgRestart.classList.remove("open");
	initGame();
	startGame();
});

refreshBtn.addEventListener("click", () => {
	bgRefresh.classList.remove("open");
	initGame();
	startGame();
});

// field 의 아이템 이벤트
const gameScore = document.querySelector(".game__score");
const bug = document.querySelector(".bug");
const msgRefresh = document.querySelector(".modal__message-refresh");

field.addEventListener("click", onFieldClick);

function onFieldClick(e) {
	const target = e.target;
	if (target.matches(".bug")) {
		// 버그
		target.remove();
		playSound(bugSound);
		score++;
	} else if (target.matches(".carrot")) {
		// 당근
		score--;
		playSound(carrotSound);
		finishGame("lose");
	}

	updateScoreboard();

	if (score === BUG_COUNT) {
		finishGame("win");
	}
}

// 게임 사운드 시작
function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

// 게임 사운드 종료
function stopSound(sound) {
	sound.pause();
}

// 게임 종료
function finishGame(winOrLose) {
	stopGameTimer(timer);
	bgRefresh.classList.add("open");
	if (winOrLose === "win") {
		playSound(gameWinSound);
		msgRefresh.innerText = "YOU WON";
	} else if (winOrLose === "lose") {
		playSound(carrotSound);
		msgRefresh.innerText = "YOU LOST";
	}
	stopSound(bgSound);
}

// 점수 기록판
let score = 0;

function updateScoreboard() {
	if (started) {
		gameScore.innerText = BUG_COUNT - score;
	} else {
		score = 0;
	}
}

initGame();
