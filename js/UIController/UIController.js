'use strict'

export default class UIController {
  constructor(sizeOfBoard) {
    this.sizeOfBoard = sizeOfBoard;
    this._board = document.querySelector('#ui-tiles');
  }

  #createTile(position, value) {
    let tileWrapper = document.createElement('div');
    tileWrapper.classList.add(`tile`, `pos${position.i}-${position.j}`, `tile-${value}`);

    let tileValue = document.createElement('div');
    tileValue.classList.add('tile__value');
    tileValue.textContent = value;

    tileWrapper.appendChild(tileValue);

    this._board.appendChild(tileWrapper);
  }

  render(currentBoard) {
    for (let i = 0; i < this.sizeOfBoard; ++i) {
      for (let j = 0; j < this.sizeOfBoard; ++j) {
        if (currentBoard[i][j] !== 0) {
          this.#createTile({i, j}, currentBoard[i][j]);
        }
      }
    }
  }
}