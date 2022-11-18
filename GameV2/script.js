"use strict";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Selecting Elements
let scores, currentScore, playing;
let activePlayer = 0;
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
//SCORE
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");

//CURRENT SCORE
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

// *** dice ****
// const diceEL = document.querySelector('.dice');
const diceEL2 = document.querySelector(".dice2");
const diceEL3 = document.querySelector(".dice3");

// *** Trophy
const trophy2 = document.querySelector(".trophy2");
const trophy3 = document.querySelector(".trophy3");

// *** Buttons ***
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let highscore = 0;

// *****  Modal window *****

// *** Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// *** Modal Function to open & close
const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
	displayWinningMessage(youWin.random() + ` Player ${activePlayer + 1} Wins!`);
};

const closeModel = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

// *** Winning messages
let youWin = [
	`You're a pro!`,
	`Outstanding Gameplay!`,
	`You're the best!`,
	`Nicely Played!`,
	`Boom!`,
];

// *** Random Winning message function
youWin.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};

// Random WInning Message for Pop Up Window
const displayWinningMessage = function (winner) {
	document.querySelector(".winner").textContent = winner;
};

// *** Init Function (reset all values)
const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	score0EL.textContent = 0;
	score1EL.textContent = 0;

	/// Hide Dice
	diceEL2.classList.add("hidden");
	diceEL3.classList.add("hidden");

	///Hide trophies
	trophy2.classList.add("hidden");
	trophy3.classList.add("hidden");

	player0EL.classList.remove("player--winner");
	player1EL.classList.remove("player--winner");
	player0EL.classList.add("player--active");
	player1EL.classList.remove("player--active");
};

init();

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0EL.classList.toggle("player--active");
	player1EL.classList.toggle("player--active");

	/// Switch displayed dice
	const dice = Math.trunc(Math.random() * 6 + 1);

	diceEL2.classList.toggle("hidden");
	diceEL3.classList.toggle("hidden");
};

//Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
	if (playing) {
		// Generating Random DIce Roll
		const dice = Math.trunc(Math.random() * 6 + 1);

		// Display Dice for active player
		if (activePlayer === 0) {
			document.querySelector(".dice2").src = `dice-${dice}.png`;
			diceEL2.classList.remove("hidden");
		} else {
			document.querySelector(".dice3").src = `dice-${dice}.png`;
			diceEL3.classList.remove("hidden");
		}

		//Check for rolled 1:
		if (dice !== 1) {
			// Add Dice to the Current Score
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;

			// === switch to next player
		} else {
			btnRoll.classList.add("hidden");
			setTimeout(() => {
				switchPlayer();
				btnRoll.classList.remove("hidden");
			}, 1000);
		}
	}
});

btnHold.addEventListener("click", function () {
	if (playing) {
		// 1. Add score to active player's score
		scores[activePlayer] += currentScore;
		//scores[1] = scores[1] + currentScore
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];

		// 2. Check if score >=100 (Player has won)
		if (scores[activePlayer] > 20) {
			playing = false;
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active");
			//// Display Trophy for winning player

			if (activePlayer === 0) {
				trophy2.classList.remove("hidden") && diceEL2.classList.add("hidden");
			} else {
				trophy3.classList.remove("hidden") && diceEL3.classList.add("hidden");
			}
			////////
			openModal();
			if (scores[activePlayer] > highscore) {
				highscore = scores[activePlayer];
				document.querySelector(".btn--high").textContent = `🔥 ${highscore} 🔥`;
				//
			}
		}
		// Listen for click to close pop up window
		modal.addEventListener("click", closeModel);
		overlay.addEventListener("click", closeModel);
		// 3. If not, switch player
		switchPlayer();
	}
});

btnNew.addEventListener("click", init);
