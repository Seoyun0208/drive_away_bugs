"use strict";

// ! 초기값
let CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 20;
const GAME_DURATION = 10;

let started = false;
let timer = undefined;
let score = 0;

// ! 변수
const width = document.body.clientWidth;
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const restartBtn = document.querySelector(".restart__button");
const msgRestart = document.querySelector(".modal__message-restart");
const bgRefresh = document.querySelector(".refresh");
const refreshBtn = document.querySelector(".refresh__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const bug = document.querySelector(".bug");
const msgRefresh = document.querySelector(".modal__message-refresh");
const modalStart = document.querySelector(".modal__start");
const bgPlay = document.querySelector(".play");
const gameHeader = document.querySelector(".game__header");
const gameBtn = document.querySelector(".game__button");
const bgRestart = document.querySelector(".restart");

// ! 사운드
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const gameWinSound = new Audio("./sound/game_win.mp3");

// ! 함수
function onResize() {
	if (width <= 500) {
		CARROT_SIZE = 40;
	}
}

// 게임 시작 모달창 -> initGame, startGame
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

// 게임 시작 -> playSound, startGameTimer
function startGame() {
	playSound(bgSound);
	startGameTimer();
	started = true;
}

// 게임 사운드 시작
function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

// 게임 타이머 시작 -> updateGameTimerText, finishGame
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

// 브라우저 게임 타이머 텍스트
function updateGameTImerText(time) {
	gameTimer.innerText = time;
}

// 게임 종료 -> stopGameTimer, stopSound
function finishGame(winOrLose) {
	stopGameTimer(timer);
	bgRefresh.classList.add("open");
	if (winOrLose === "win") {
		playSound(gameWinSound);
		msgRefresh.innerHTML =
			"와!!<br />벌써 벌레를 모두 잡았다구??<br />너무 고마워!<br />덕분에 당근도 모두 무사하고<br />코딩하러 다시 가도 되겠다~😆";
	} else if (winOrLose === "lose") {
		playSound(carrotSound);
		msgRefresh.innerHTML =
			"이게 뭐야!??<br />여기 봐! 아직도 벌레가 있잖아..<br />역시 당근을 안 건드리고<br/> 벌레 잡기는 어렵긴 하지.<br />고생했어! 그래도 너무 아쉽다~ 😭";
	}
	stopSound(bgSound);
}

// 게임 타이머 정지 -> updateScoreboard
function stopGameTimer(timer) {
	started = false;
	clearInterval(timer);
	updateScoreboard();
}

// 점수 기록판
function updateScoreboard() {
	if (started) {
		gameScore.innerText = BUG_COUNT - score;
	} else {
		score = 0;
	}
}

// 게임 사운드 종료
function stopSound(sound) {
	sound.pause();
}

// 게임 초기화 -> addItem
function initGame() {
	started = false;
	field.innerHTML = "";
	gameTimer.innerText = GAME_DURATION;
	gameScore.innerText = BUG_COUNT;

	addItem("carrot", CARROT_COUNT, "img/carrot.png");
	addItem("bug", BUG_COUNT, "img/bug.png");
}

// field 에 아이템 랜덤 배치 -> randomNumber
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
		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		field.appendChild(item);
	}
}

// field 내 랜덤 위치 추출
function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

// field 클릭 이벤트 함수 -> playSound, finishGame, updateScoreboard
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

// ! 이벤트리스너
// 창 크기 조절시 아이템 재배치
window.addEventListener("resize", () => {
	// alert("브라우저 창 크기가 변경되어 게임을 다시 시작해야 합니다.");
	onResize();
	window.location.reload();
});

// 게임 정지 모달창
gameBtn.addEventListener("click", () => {
	stopSound(bgSound);
	playSound(alertSound);
	bgRestart.classList.add("open");
	msgRestart.innerHTML = "처음부터<br />다시 한번 해볼래?";
	stopGameTimer(timer);
});

// 게임 다시시작(restart, refresh) 모달창
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
field.addEventListener("click", onFieldClick);

// ! 게임 실행
initGame();
