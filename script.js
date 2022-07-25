'use strict';

//selecting Elements
const playerZero = document.getElementById('section-0');
const playerOne = document.getElementById('section-1');

const scoreZero = document.getElementById('score--0');
const scoreOne = document.getElementById('score--1');
const currentZero = document.getElementById('current--0');
const currentOne = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.getElementById('newBtn');
const btnRoll = document.getElementById('rollBtn');
const btnHold = document.getElementById('holdBtn');

//startng conditions

let scores, currentScore, activePlayer, playing;

const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  currentOne.textContent = 0;
  currentZero.textContent = 0;
  playerOne.classList.remove('player--winner');
  playerZero.classList.remove('player--winner');

  playerOne.classList.remove('player--active');
  playerZero.classList.add('player--active');

  diceEl.classList.add('hidden');
};

initialization();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating random dice
    const dice = Math.ceil(Math.random() * 6);
    console.log(dice);

    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check for roll 1 if true switch player
    //a.add dice to the current player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score  to ative player
    scores[activePlayer] += currentScore;
    //score[1]+= currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score is 100

    if (scores[activePlayer] >= 100) {
      playing = false; // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialization);
