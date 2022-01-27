'use strict'

import UIController from "../UIController/UIController.js";

export default class Game {
  constructor() {
    this._sizeOfBoard = 4;
    this.controller = new UIController(this._sizeOfBoard);
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.moveTo(event.code)
    });
  }

  #clearBoard() {
    this.boardOfTiles = new Array(this._sizeOfBoard);
    for (let i = 0; i < this._sizeOfBoard; ++i) {
      this.boardOfTiles[i] = new Array(this._sizeOfBoard);
      for (let j = 0; j < this._sizeOfBoard; ++j) {
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
      this.boardOfTiles[tile.y][tile.x] = tile.value;
    }
    console.log(this.boardOfTiles);
    this.controller.render(this.boardOfTiles);
  }

  moveTo(direction) {
    const moveFunctions = {
      'ArrowLeft': this.#moveLeft,
      'ArrowRight': this.#moveRight,
      'ArrowUp': this.#moveUp,
      'ArrowDown': this.#moveDown,
    };

    if (moveFunctions.hasOwnProperty(direction)) {
      moveFunctions[direction].call(this);
      //const tile = this.#generateNewTile();
      //this.boardOfTiles[tile.y][tile.x] = tile.value;
    }
  }

  #moveLeft() {
    console.log('move left');
    // Calculate
    for (let i = 0; i < this._sizeOfBoard; ++i) {
      for (let j = 1; j < this._sizeOfBoard; ++j) {
        if ( this.boardOfTiles[i][j] && this.boardOfTiles[i][j - 1]
          && this.boardOfTiles[i][j] === this.boardOfTiles[i][j - 1]) {
          this.boardOfTiles[i][j - 1] <<= 1;
          this.boardOfTiles[i][j] = 0;
        }
      }
    }
    // Shift tiles

    console.log(this.boardOfTiles);
  }

  #moveRight() {
    console.log('move right');

    for (let i = 0; i < this._sizeOfBoard; ++i) {
      for (let j = this._sizeOfBoard - 1; j >= 0; --j) {
        if ( this.boardOfTiles[i][j] && this.boardOfTiles[i][j - 1] 
          && this.boardOfTiles[i][j] === this.boardOfTiles[i][j - 1]) {
          this.boardOfTiles[i][j] <<= 1;
          this.boardOfTiles[i][j - 1] = 0;
        }
      }
    }
    console.log(this.boardOfTiles);
  }

  #moveUp() {
    console.log('move up');

    for (let j = 0; j < this._sizeOfBoard; ++j) {
      for (let i = 1; i < this._sizeOfBoard; ++i) {
        if ( this.boardOfTiles[i - 1][j] && this.boardOfTiles[i][j]
          && this.boardOfTiles[i - 1][j] === this.boardOfTiles[i][j]) {
          this.boardOfTiles[i - 1][j] <<= 1;
          this.boardOfTiles[i][j] = 0;
        }
      }
    }
    console.log(this.boardOfTiles);
  }

  #moveDown() {
    console.log('move down');

    for (let j = 0; j < this._sizeOfBoard; ++j) {
      for (let i = this._sizeOfBoard - 1; i > 0; --i) {
        if ( this.boardOfTiles[i - 1][j] && this.boardOfTiles[i][j]
          && this.boardOfTiles[i - 1][j] === this.boardOfTiles[i][j]) {
          this.boardOfTiles[i][j] <<= 1;
          this.boardOfTiles[i - 1][j] = 0;
        }
      }
    }
    console.log(this.boardOfTiles);
  }
}