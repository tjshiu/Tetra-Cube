import GameView from "./tetrisBattle.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("tetris");
  const ctx = canvasEl.getContext("2d");
  new GameView(canvasEl, ctx).start();
});