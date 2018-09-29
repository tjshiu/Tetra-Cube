import GameView from './tetrisBattle.js';

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
            // alert("gameover")
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

export default Player;
