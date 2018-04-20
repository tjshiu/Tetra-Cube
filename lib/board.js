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

export default Board;
