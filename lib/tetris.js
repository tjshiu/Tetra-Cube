import GameView from "./tetrisBattle.js";
import Player from './player.js';
import Board from './board.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("tetris");
  const ctx = canvasEl.getContext("2d");
  const board = new Board(12, 20);
  const player = new Player(board);
  let Game = new GameView(canvasEl, ctx, player);
  Game.draw();
  const button = document.getElementById("start-button").addEventListener("click", function() {
    Game.board.clear;
    Game.start();
  });
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      player.move(-1);
    } else if (event.code === "ArrowRight") {
      player.move(1);
    } else if (event.code === "ArrowDown") {
      player.drop();
    } else if (event.code === "KeyA") {
      player.rotate(1);
    } else if (event.code === "KeyS") {
      player.rotate(-1);
    } else if (event.code === "ArrowUp") {
      player.rotate(1);
    } else if (event.code === "Space") {
      player.completeDrop();
    }
  });
});
