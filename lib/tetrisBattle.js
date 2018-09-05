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


      export default GameView;
