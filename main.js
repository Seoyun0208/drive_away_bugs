"use strict";
const carrotSize = 80;
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

function initGame() {
	addItem("carrot", 5, "img/carrot.png");
	addItem("bug", 5, "img/bug.png");
}

function addItem(className, cnt, imgPath) {
	const x1 = 0;
	const y1 = 0;
	const x2 = fieldRect.width - carrotSize;
	const y2 = fieldRect.height - carrotSize;

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

initGame();
