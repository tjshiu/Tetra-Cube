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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//updating the board
let prevTime = 0;


class GameView {
  constructor(canvas, ctx, player) {
    this.canvas = canvas;
    this.player = player;
    this.player.gameView = this;
    this.ctx = ctx;
    this.ctx.scale(30, 30);
    this.board = player.board;
    this.update = this.update.bind(this);
    this.colors = [
      null,
      '#DB221C',
      '#FF7530',
      '#D6D600',
      '#0EB532',
      '#0F4AC1',
      '#910B8C',
      '#0D8BA8',
    ]; //red, orange, yellow, green, blue, green, purple, otherblue
  }

  start() {
    this.player.reset();
    this.player.score = 0;
    this.player.lines = 0;
    this.update();
  }



  //Tetris players


    createplayer(type) {
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

    draw() {
      this.ctx.fillStyle = '#202328';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawMatrix(this.board.matrix, {x: 0, y: 0});
      this.drawMatrix(this.player.matrix, this.player.pos);
    }

    drawMatrix(matrix, offset) {
      matrix.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            this.ctx.fillStyle = this.colors[value];
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
          this.player.update(timeDiff);
          this.draw();
          requestAnimationFrame(this.update);
        }


      }


      /* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tetrisBattle_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__board_js__ = __webpack_require__(3);




document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("tetris");
  const ctx = canvasEl.getContext("2d");
  const board = new __WEBPACK_IMPORTED_MODULE_2__board_js__["a" /* default */](12, 20);
  const player = new __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */](board);
  let Game = new __WEBPACK_IMPORTED_MODULE_0__tetrisBattle_js__["a" /* default */](canvasEl, ctx, player);
  Game.draw();
  document.getElementById("start-button").addEventListener("click", function() {
    Game.board.clear();
    Game.start();
    player.pause = false;
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyP") {
      player.pause = !player.pause;
    }
    if (!player.pause) {
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
    }
  });
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tetrisBattle_js__ = __webpack_require__(0);


class Player {
    constructor(board) {
            this.pos = {x: 0, y: 0};
            this.matrix = [];
            this.score =  0;
            this.lines = 0;
            this.board = board;
            this.elapsedTime = 0;
            this.timeInterval = 800;
            this.gameView = null;
            this.board.player = this;
            this.pause = false;
    }

    move(dir) {
        this.pos.x += dir;
        if (this.board.collides(this)) {
          this.pos.x -= dir;
        }
    }

    reset() {
        const pieces = "LJOTSZI";
        this.matrix = this.gameView.createplayer(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (this.board.matrix[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);
        if (this.board.collides(this)) {
            this.board.clear();
            alert("gameover")
            this.score = 0;
            this.lines = 0;
            this.updateScore();
        }
      }

    rotate(dir) {
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, dir);
        while (this.board.collides(this)) {
          this.pos.x += offset;
          offset = -(offset + (offset > 0 ? 1 : -1));
          if (offset > this.matrix[0].length) {
            this._rotateMatrix(this.matrix, -dir);
            this.pos.x = pos;
            return;
          }
        }
    }

    _rotateMatrix(playMatrix, dir) {
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

    drop() {
        this.pos.y += 1;
        let arena = this.board.matrix;
        if (this.board.collides(this)) {
          this.pos.y--;
          this.board.merge(this);
          this.reset();
          this.board.sweep();
          this.updateScore();
        }
        this.elapsedTime = 0;
      }
    completeDrop() {
        while(!this.board.collides(this)) {
            this.pos.y += 1;
        }
        this.pos.y--;
        this.board.merge(this);
        this.reset();
        this.board.sweep();
        this.updateScore();
        this.elapsedTime = 0;
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
        if (this.elapsedTime > this.timeInterval && !this.pause) {
            this.drop();
        }
    }

    updateScore() {
      document.getElementById('score').innerText = this.score;
      document.getElementById('lines').innerText = this.lines;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
    constructor(x, y) {
        let emptyBoard = [];

        while (y > 0) {
            y--;
            emptyBoard.push(new Array(x).fill(0, 0, x));
        }

        this.matrix = emptyBoard;
        this.player = null;
    }

    clear() {
        this.matrix.forEach(row => row.fill(0));
    }

    merge(pieces) {
        pieces.matrix.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              this.matrix[y + pieces.pos.y][x + pieces.pos.x] = value;
            }
          });
        });
      }

    collides(player) {
    const [mat, position] = [player.matrix, player.pos];
      for (let y = 0; y < mat.length; y++) {
          for (let x = 0; x < mat[y].length; x++) {
            if (mat[y][x] !== 0 && (this.matrix[y + position.y] &&
                this.matrix[y + position.y][x + position.x]) !== 0) {
                return true;
            }
          }
      }
      return false;
    }

    sweep() {
        let rowCount = 1;
        outer: for (let y = this.matrix.length - 1; y > 0; y--) {
          for (let x = 0; x < this.matrix[y].length; x++) {
            if (this.matrix[y][x] === 0) {
              continue outer;
            }
          }
          const row = this.matrix.splice(y, 1)[0].fill(0);
          this.matrix.unshift(row);
          y++;
          this.player.lines += 1;
          this.player.score += rowCount * 10;
          rowCount *= 2;
        }
      }


}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map