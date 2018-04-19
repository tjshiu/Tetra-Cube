import GameView from "./tetrisBattle.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("tetris");
  const ctx = canvasEl.getContext("2d");
  let Game = new GameView(canvasEl, ctx);
  Game.start();
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      Game.pieceMove(-1);
    } else if (event.code === "ArrowRight") {
      Game.pieceMove(1);
    } else if (event.code === "ArrowDown") {
      Game.pieceDrop();
    } else if (event.code === "KeyA") {
      Game.pieceRotate(1);
    } else if (event.code === "KeyS") {
      Game.pieceRotate(-1);
    } else if (event.code === "ArrowUp") {
      Game.pieceRotate(1);
    } else if (event.code === "Space") {
      Game.completeDrop();
    }
  });
});
