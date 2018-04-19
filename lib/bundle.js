/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tetrisBattle_js__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("tetris");
  const ctx = canvasEl.getContext("2d");
  let Game = new __WEBPACK_IMPORTED_MODULE_0__tetrisBattle_js__["a" /* default */](canvasEl, ctx);
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


//updating the board
let elapsedTime = 0;
let timeInterval = 1000;
let prevTime = 0;

const colors = [
  null, 
  '#DB221C', 
  '#FF7530', 
  '#D6D600',
  '#0EB532', 
  '#0F4AC1',
  '#910B8C',
  '#0D8BA8',
] //red, orange, yellow, green, blue, green, purple, otherblue

class GameView {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.ctx.scale(20, 20);
    this.update = this.update.bind(this);
    this.board = this.createBoard(12, 20);
    this.pieceDrop = this.pieceDrop.bind(this);
    this.pieceMove = this.pieceMove.bind(this);
    this.pieceRotate = this.pieceRotate.bind(this);
    this.pieceReset = this.pieceReset.bind(this);
    this.lineSweep = this.lineSweep.bind(this);
  }
  
  start() {
    this.pieceReset();
    this.update();
  }
  
  //Tetris Pieces
  collides(board, playPiece) {
    const [mat, position] = [playPiece.matrix, playPiece.pos];
    for (let y = 0; y < mat.length; y++) {
      for (let x = 0; x < mat[y].length; x++) {
        if (mat[y][x] !== 0 && (board[y + position.y] &&
          board[y + position.y][x + position.x]) !== 0) {
            return true;
          }
        }
      }
      return false;
    }
    
    createPiece(type) {
      switch (type) {
        case "T": 
          return  [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0] ,
          ];
        case "O": 
          return [
            [2, 2],
            [2, 2]
          ];
        case "L":
          return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3] ,
          ];
        case "J":
          return [
            [0, 7, 0],
            [0, 7, 0],
            [7, 7, 0] ,
          ]; 
        case "I":
          return [
            [0, 4, 0, 0],
            [0, 4, 0, 0],
            [0, 4, 0, 0] ,
            [0, 4, 0, 0]
          ];
        case "S":
          return [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0] ,
          ];
        case "Z":
          return [
            [6, 6, 0],
            [0, 6, 6],
            [0, 0, 0] ,
          ];
      }
    }

    pieceReset() {
      const pieces = "LJOTSZI";
      piece.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
      piece.pos.y = 0; 
      piece.pos.x = (this.board[0].length / 2 | 0) - (piece.matrix[0].length / 2 | 0);
      if (this.collides(this.board, piece)) {
        this.board.forEach(row => row.fill(0));
        piece.score = 0;
        this.updateScore();
      }
    }

    lineSweep() {
      let rowCount = 1;
      outer: for (let y = this.board.length - 1; y > 0; y--) {
        for (let x = 0; x < this.board[y].length; x++) {
          if (this.board[y][x] === 0) {
            continue outer;
          }
        }
        const row = this.board.splice(y, 1)[0].fill(0);
        this.board.unshift(row);
        y++;

        piece.score += rowCount * 10;
        rowCount *= 2;
      }
    }

    completeDrop() {
      while(!this.collides(this.board, piece)) {
        piece.pos.y += 1;
      }
      piece.pos.y--;
      this.merge(this.board, piece);
      this.pieceReset();
      this.lineSweep();
      this.updateScore();
      elapsedTime = 0; 
    }
    
    pieceDrop() {
      piece.pos.y += 1;
      let arena = this.board;
      if (this.collides(this.board, piece)) {
        piece.pos.y--;
        this.merge(this.board, piece);
        this.pieceReset();
        this.lineSweep();
        this.updateScore();
      }
      elapsedTime = 0;
    }
    
    pieceMove(dir) {
      piece.pos.x += dir;
      if (this.collides(this.board, piece)) {
        piece.pos.x -= dir;
      }
    }
    
    pieceRotate(dir) {
      const pos = piece.pos.x;
      let offset = 1;
      this.rotate(piece.matrix, dir);
      while (this.collides(this.board, piece)) {
        piece.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > piece.matrix[0].length) {
          this.rotate(piece.matrix, -dir);
          piece.pos.x = pos;
          return;
        }
      }
    }
    
    rotate(playMatrix, dir) {
      for (let y = 0; y < playMatrix.length; y++ ) {
        for (let x = 0; x < y; x++) {
          [playMatrix[x][y], playMatrix[y][x]] = [playMatrix[y][x], playMatrix[x][y]];
        }
      }
      if (dir > 0) {
        playMatrix.forEach(row => row.reverse());
      } else {
        playMatrix.reverse();
      }
    }
    
    draw() {
      this.ctx.fillStyle = '#202328';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawMatrix(this.board, {x: 0, y: 0});
      this.drawMatrix(piece.matrix, piece.pos);
    }
    
    //drawing the board and set pieces
    createBoard(x, y) {
      let emptyBoard = [];
      while (y > 0) {
        y--;
        emptyBoard.push(new Array(x).fill(0, 0, x));
      }
      return emptyBoard;
    }
    
    //merge the board and pieces
    merge(board, pieces) {
      pieces.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            board[y + pieces.pos.y][x + pieces.pos.x] = value;
          }
        });
      });
    }
    


    drawMatrix(matrix, offset) {
      matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            this.ctx.fillStyle = colors[value]; //red
            this.ctx.fillRect(x + offset.x,
              y + offset.y,
              1, 1);
              this.ctx.lineWidth = 1/20;
              this.ctx.strokeStyle = "white";
              this.ctx.strokeRect(x + offset.x,
                y + offset.y,
                1, 1);
                // context.fill();
              } 
            });
          });
        }
    update(time = 0) {
      const timeDiff = time - prevTime;
      prevTime = time;
      elapsedTime += timeDiff;
      if (elapsedTime > timeInterval) {
        this.pieceDrop();
      }
      this.draw();
      requestAnimationFrame(this.update);
    }

    updateScore() {
      document.getElementById('score').innerText = piece.score;
    }
  }
      
      
     
      
      /* harmony default export */ __webpack_exports__["a"] = (GameView);
      
      

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map