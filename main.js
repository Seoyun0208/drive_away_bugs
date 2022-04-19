"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

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

function gameStart() {
	gameTimerStart();
	started = true;
}

// 게임 타이머 시작
let timer = undefined;

function gameTimerStart() {
	let time = GAME_DURATION;
	timer = setInterval(() => {
		updateGameTImerText(time);
		--time;
		if (time < 0) {
			clearInterval(timer);
			bgRefresh.classList.add("open");
			score = 0;
		}
	}, 1000);
}

// 게임 타이머 정지
function gameTimerStop(timer) {
	started = false;
	clearInterval(timer);
	scoreBoard();
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
		gameStart();
	}
});

// 게임 정지 모달창
const gameBtn = document.querySelector(".game__button");
const bgRestart = document.querySelector(".restart");

gameBtn.addEventListener("click", () => {
	bgRestart.classList.add("open");
	gameTimerStop(timer);
});

// 게임 다시시작(restart, refresh) 모달창
const restartBtn = document.querySelector(".restart__button");
const bgRefresh = document.querySelector(".refresh");
const refreshBtn = document.querySelector(".refresh__button");

restartBtn.addEventListener("click", () => {
	bgRestart.classList.remove("open");
	initGame();
	gameStart();
});

refreshBtn.addEventListener("click", () => {
	bgRefresh.classList.remove("open");
	initGame();
	gameStart();
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
		score++;
	} else if (target.matches(".carrot")) {
		// 당근
		score--;
		finishGame("lose");
	}

	scoreBoard();

	if (score === BUG_COUNT) {
		finishGame("win");
	}
}

// 게임 종료
function finishGame(winOrLose) {
	gameTimerStop(timer);
	bgRefresh.classList.add("open");
	if (winOrLose === "win") {
		msgRefresh.innerText = "YOU WON";
	} else if (winOrLose === "lose") {
		msgRefresh.innerText = "YOU LOST";
	}
}

// 점수 기록판
let score = 0;

function scoreBoard() {
	if (started) {
		gameScore.innerText = BUG_COUNT - score;
	} else {
		score = 0;
	}
}

initGame();
