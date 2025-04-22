'use strict';

const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newGameButton = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore, activePlayer, scores, playing;

const init = () => {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceImg.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollButton.addEventListener('click', () => {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;

  diceImg.classList.remove('hidden');
  diceImg.src = `dice-${dice}.png`;
  diceImg.alt = `Dice showing ${dice}`;

  if (dice === 1) {
    switchPlayer();
  } else {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  }
});

holdButton.addEventListener('click', () => {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceImg.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

newGameButton.addEventListener('click', init);

init();
