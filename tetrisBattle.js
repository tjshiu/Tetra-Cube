const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);


//Tetris Pieces
const matrix = [
//T
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0] ,
];

const piece = {
  pos: {x: 5, y: 5},
  matrix: matrix
};

//drawing the board and set pieces
function createBoard(x, y) {
  let emptyBoard = [];
  while (y > 0) {
    y--;
    emptyBoard.push(new Array(x).fill(0, 0, x));
  }
  return emptyBoard;
}
console.log(createBoard(12, 20));
console.table(createBoard(12, 20));

//drawing the board and pieces
function draw() {
  context.fillStyle = '#202328';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(piece.matrix, piece.pos);
}


//drawing the pieces
function drawMatrix(piece, offset) {
  piece.forEach((row, y) => {
      row.forEach((value, x) => {
          if (value !== 0) {
              context.fillStyle = 'red';
              context.fillRect(x + offset.x,
                                y + offset.y,
                                1, 1);
              context.lineWidth = 1/20;
              context.strokeStyle = "white";
              context.strokeRect(x + offset.x,
                y + offset.y,
                1, 1);
              // context.fill();
          }
      });
  });
}


//updating the board
let elapsedTime = 0;
let timeInterval = 1000;

let prevTime = 0;
function update(time = 0) {
  const timeDiff = time - prevTime;
  prevTime = time;
  elapsedTime += timeDiff;
  if (elapsedTime > timeInterval) {
    piece.pos.y += 1;
    elapsedTime = 0;
  }


  draw();
  requestAnimationFrame(update);
}

update();

//add Event Listeners
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    piece.pos.x -= 1;
  } else if (event.code === "ArrowRight") {
    piece.pos.x += 1;
  } else if (event.code === "ArrowDown") {
    piece.pos.y += 1;
    elapsedTime = 0;
  }
});

