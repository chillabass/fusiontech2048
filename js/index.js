'use strict'

import Game from './Game/Game.js';


let game = new Game();
game.startNewGame();

window.onbeforeunload = () => {
  try {
    let saveData = game.getGameData();
    saveData = JSON.stringify(saveData);
    localStorage.setItem('gameData', saveData);    
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  let gameData = localStorage.getItem('gameData');
  if (gameData) {
    gameData = JSON.parse(gameData);
    game.setGameData(gameData);
  
    game.controller.updateScore(0, game.gameScore, game.bestScore);
    game.controller.setGameOver(game.isGameOver);
    game.controller.render(game.boardOfTiles);
  }
});