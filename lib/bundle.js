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
  new __WEBPACK_IMPORTED_MODULE_0__tetrisBattle_js__["a" /* default */](canvasEl, ctx).start();
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const matrix = [
  
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0] ,
];

const piece = {
  pos: {x: 5, y: 5},
  matrix: matrix
};
//updating the board
let elapsedTime = 0;
let timeInterval = 1000;
let prevTime = 0;

class GameView {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.ctx.scale(20, 20);
    this.board = this.createBoard(12, 20);
  }
  
  start() {
    this.update();
    console.log(this.board);
    console.table(this.board);
    
  }
  //Tetris Pieces
  collides(board, piece) {
    const [mat, position] = [piece.matrix, piece.pos];
    for (let y = 0; y < mat.length; y++) {
      for (let x = 0; x < mat[y].length; x++) {
        if (mat[y][x] !== 0 && (board[y + position.y] &&
        board[x + position.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  pieceDrop() {
    piece.pos.y += 1;
    elapsedTime = 0;
  }

  draw() {
    this.ctx.fillStyle = '#202328';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.update = this.update.bind(this);
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

  drawMatrix(piece, offset) {
    piece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.ctx.fillStyle = 'red';
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
}

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    piece.pos.x -= 1;
  } else if (event.code === "ArrowRight") {
    piece.pos.x += 1;
  } else if (event.code === "ArrowDown") {
    GameView.prototype.pieceDrop();
  }
});


/* harmony default export */ __webpack_exports__["a"] = (GameView);



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map