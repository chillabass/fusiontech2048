'use strict'

export default class UIController {
  constructor(sizeOfBoard) {
    this.sizeOfBoard = sizeOfBoard;
    this._board = document.querySelector('#ui-tiles');
    this._gameScore = document.querySelector('#ui-game-score');
    this._bestScore = document.querySelector('#ui-best-score');
  }

  #createTile(position, value) {
    let tileWrapper = document.createElement('div');
    tileWrapper.classList.add(`tile`, `pos${position.i}-${position.j}`, `tile-${value}`);
    //tileWrapper.classList.add('new');

    let tileValue = document.createElement('div');
    tileValue.classList.add('tile__value');
    tileValue.textContent = value;

    tileWrapper.appendChild(tileValue);

    this._board.appendChild(tileWrapper);
  }

  render(currentBoard) {
    this._board.innerHTML = '';
    for (let i = 0; i < this.sizeOfBoard; ++i) {
      for (let j = 0; j < this.sizeOfBoard; ++j) {
        if (currentBoard[i][j] !== 0) {
          this.#createTile({i, j}, currentBoard[i][j]);
        }
      }
    }
  }

  updateScore(addedScore, gameScore) {
    if (addedScore === 0) return;
    let rect = this._gameScore.getBoundingClientRect();
    let coord = {
      x: rect.left + rect.width / 2, 
      y: rect.top, 
    };
    this._gameScore.textContent = gameScore;

    let score = document.createElement('div');
    score.textContent = `+${addedScore}`;
    // score.style.left = coord.x;
    // score.style.top = coord.y;
    score.classList.add('score');
    this._gameScore.append(score);
    setTimeout(() => {
      score.remove();
    }, 1000);
  }
}