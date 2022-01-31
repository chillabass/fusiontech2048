'use strict'

export default class UIController {
  constructor(sizeOfBoard) {
    this.sizeOfBoard = sizeOfBoard;
    this.board = document.querySelector('#ui-tiles');
    this.gameScore = document.querySelector('#ui-game-score');
    this.bestScore = document.querySelector('#ui-best-score');
    this.gameOverPanel = document.querySelector('.game-over-panel');
  }

  #createTile(position, value) {
    // let last = document.querySelector('.new');
    // if (last) last.classList.remove('new');

    let tileWrapper = document.createElement('div');
    tileWrapper.classList.add(`tile`, `pos${position.i}-${position.j}`, `tile-${value}`);
    
    let tileValue = document.createElement('div');
    tileValue.classList.add('tile__value');
    tileValue.textContent = value;
    
    tileWrapper.appendChild(tileValue);
    
    this.board.appendChild(tileWrapper);
  }

  render(currentBoard) {
    this.board.innerHTML = '';
    for (let i = 0; i < this.sizeOfBoard; ++i) {
      for (let j = 0; j < this.sizeOfBoard; ++j) {
        if (currentBoard[i][j] !== 0) {
          this.#createTile({i, j}, currentBoard[i][j]);
        }
      }
    }
  }

  setGameOver(isGameOver) {
    if (isGameOver) {
      this.gameOverPanel.style.display = 'flex';
    } else {
      this.gameOverPanel.style.display = 'none';
    }
  }

  updateScore(addedScore, gameScore, bestScore) {
    this.gameScore.textContent = gameScore;
    this.bestScore.textContent = bestScore;
    if (addedScore === 0) return;
    let rect = this.gameScore.getBoundingClientRect();
    let coord = {
      x: rect.left, 
      y: rect.top, 
    };

    let score = document.createElement('div');
    score.classList.add('score');
    score.style.width = rect.width + 'px';

    let scoreText = document.createElement('p');
    scoreText.textContent = `+${addedScore}`;
    score.appendChild(scoreText);

    score.style.left = coord.x + 'px';
    score.style.top = coord.y + 'px';
    document.querySelector('main').append(score);
    setTimeout(() => {
      score.remove();
    }, 1500);
  }
}