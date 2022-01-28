'use strict'

import UIController from "../UIController/UIController.js";

export default class Game {
  constructor() {
    this.sizeOfBoard = 4;
    this.gameScore = 0;
    this.controller = new UIController(this.sizeOfBoard);
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.moveTo(event.code)
    });
  }

  #clearBoard() {
    this.boardOfTiles = new Array(this.sizeOfBoard);
    for (let i = 0; i < this.sizeOfBoard; ++i) {
      this.boardOfTiles[i] = new Array(this.sizeOfBoard);
      for (let j = 0; j < this.sizeOfBoard; ++j) {
        this.boardOfTiles[i][j] = 0;
      }
    }
  }

  #getRandom(from, to) {
    return Math.round(Math.random() * (from - to) + to);
  }

  #generateNewTile() {
    let tile = {};
    do {
      tile.x = this.#getRandom(0, 3);
      tile.y = this.#getRandom(0, 3);
      // console.log(this._boardOfTiles[tile.y][tile.x])
    } while (this.boardOfTiles[tile.x][tile.y] !== 0);

    tile.value = 2;
    return tile;
  }

  startNewGame() {
    this.#clearBoard();
    for (let i = 0; i < 2; ++i) {
      const tile = this.#generateNewTile();
      let probability = Math.random();
      if (i === 1 && probability >= 0.75) tile.value = 4;
      this.boardOfTiles[tile.x][tile.y] = tile.value;
    }
    console.log(this.boardOfTiles);
    this.controller.render(this.boardOfTiles);
  }

  #checkGameOver() {
    for (let i = 0; i < this.sizeOfBoard; ++i) {
      for (let j = 1; j < this.sizeOfBoard; ++j) {
        if (this.boardOfTiles[i][j] === 0 
        ||  this.boardOfTiles[i][j - 1] === 0
        ||  this.boardOfTiles[i][j] === this.boardOfTiles[i][j - 1]
        ||  this.boardOfTiles[j][i] === this.boardOfTiles[j - 1][i]) {
              return false;
        }
      }
    }
    return true;
  }

  moveTo(direction) {
    const moveFunctions = {
      'ArrowLeft': this.#moveLeft,
      'ArrowRight': this.#moveRight,
      'ArrowUp': this.#moveUp,
      'ArrowDown': this.#moveDown,
    };

    if (moveFunctions.hasOwnProperty(direction)) {
      let result = moveFunctions[direction].call(this);
      if (result.isShifted) {
        const tile = this.#generateNewTile();
        this.boardOfTiles[tile.x][tile.y] = tile.value;
        this.controller.render(this.boardOfTiles);
        this.controller.updateScore(result.addedScores, this.gameScore);
      }

      console.log(this.boardOfTiles);
    }
    if (this.#checkGameOver()) {
      console.log('game over');
    } else {

    }
  }

  #moveLeft() {
    console.log('move left');

    let isShifted = false;
    let addedScores = 0;
    for (let i = 0; i < this.sizeOfBoard; ++i) {
      // Calculate tiles
      for (let j = 0; j < this.sizeOfBoard; ++j) {
        if (this.boardOfTiles[i][j] === 0) {
          continue;
        }
        for (let k = j + 1; k < this.sizeOfBoard; ++k) {
          if (this.boardOfTiles[i][k] === 0) {
            continue;
          } else {
            if (this.boardOfTiles[i][k] === this.boardOfTiles[i][j]) {
              isShifted = true;
              this.boardOfTiles[i][j] <<= 1;
              addedScores += this.boardOfTiles[i][j];
              this.boardOfTiles[i][k] = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
      // Shift tiles
      let shiftValue = 0;
      for (let j = 0; j < this.sizeOfBoard; ++j) {
        if (this.boardOfTiles[i][j] === 0) {
          ++shiftValue;
          continue;
        }
        for (; shiftValue; --j, --shiftValue) {
          isShifted = true;
          this.boardOfTiles[i][j - 1] = this.boardOfTiles[i][j];
          this.boardOfTiles[i][j] = 0;
        }
      }
    }
    this.gameScore += addedScores;
    
    return {addedScores, isShifted};
  }

  #moveRight() {
    console.log('move right');

    let isShifted = false;
    let addedScores = 0;
    for (let i = 0; i < this.sizeOfBoard; ++i) {
      for (let j = this.sizeOfBoard - 1; j >= 0; --j) {
        if (this.boardOfTiles[i][j] === 0) {
          continue;
        }
        for (let k = j - 1; k >= 0; --k) {
          if (this.boardOfTiles[i][k] === 0) {
            continue;
          } else {
            if (this.boardOfTiles[i][j] === this.boardOfTiles[i][k]) {
              isShifted = true;
              this.boardOfTiles[i][j] <<= 1;
              addedScores += this.boardOfTiles[i][j];
              this.boardOfTiles[i][k] = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
      // Shift tiles
      let shiftValue = 0;
      for (let j = this.sizeOfBoard - 1; j >= 0; --j) {
        if (this.boardOfTiles[i][j] === 0) {
          ++shiftValue;
          continue;
        }
        for (; shiftValue; ++j, --shiftValue) {
          isShifted = true;
          this.boardOfTiles[i][j + 1] = this.boardOfTiles[i][j];
          this.boardOfTiles[i][j] = 0;
        }
      }
    }
    this.gameScore += addedScores;

    return {addedScores, isShifted};
  }


  #moveUp() {
    console.log('move up');

    let isShifted = false;
    let addedScores = 0;
    for (let j = 0; j < this.sizeOfBoard; ++j) {
      for (let i = 0; i < this.sizeOfBoard; ++i) {
        if (this.boardOfTiles[i][j] === 0) {
          continue;
        }
        for (let k = i + 1; k < this.sizeOfBoard; ++k) {
          if (this.boardOfTiles[k][j] === 0) {
            continue;
          } else {
            if (this.boardOfTiles[k][j] === this.boardOfTiles[i][j]) {
              isShifted = true;
              this.boardOfTiles[i][j] <<= 1;
              addedScores += this.boardOfTiles[i][j];
              this.boardOfTiles[k][j] = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
      // Shift tiles
      let shiftValue = 0;
      for (let i = 0; i < this.sizeOfBoard; ++i) {
        if (this.boardOfTiles[i][j] === 0) {
          ++shiftValue;
          continue;
        }
        for (; shiftValue; --i, --shiftValue) {
          isShifted = true;
          this.boardOfTiles[i - 1][j] = this.boardOfTiles[i][j];
          this.boardOfTiles[i][j] = 0;
        }
      }
    }    
    this.gameScore += addedScores;

    return {addedScores, isShifted};
  }

  #moveDown() {
    console.log('move down');

    let isShifted = false;
    let addedScores = 0;
    for (let j = 0; j < this.sizeOfBoard; ++j) {
      for (let i = this.sizeOfBoard - 1; i >= 0; --i) {
        if (this.boardOfTiles[i][j] === 0) {
          continue;
        }
        for (let k = i - 1; k >= 0; --k) {
          if (this.boardOfTiles[k][j] === 0) {
            continue;
          } else {
            if (this.boardOfTiles[i][j] === this.boardOfTiles[k][j]) {
              isShifted = true;
              this.boardOfTiles[i][j] <<= 1;
              addedScores += this.boardOfTiles[i][j];
              this.boardOfTiles[k][j] = 0;
              break;
            } else {
              break;
            }
          }
        }
      }
      // Shift tiles
      let shiftValue = 0;
      for (let i = this.sizeOfBoard - 1; i >= 0; --i) {
        if (this.boardOfTiles[i][j] === 0) {
          ++shiftValue;
          continue;
        }
        for (; shiftValue; ++i, --shiftValue) {
          isShifted = true;
          this.boardOfTiles[i + 1][j] = this.boardOfTiles[i][j];
          this.boardOfTiles[i][j] = 0;
        }
      }
    }
    this.gameScore += addedScores;

    return {addedScores, isShifted};
  }
}