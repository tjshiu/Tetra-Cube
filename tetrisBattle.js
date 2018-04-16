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

const player = {
  pos: {x: 5, y: 5},
  matrix:  matrix
};

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
}



function drawMatrix(piece, offset) {
  piece.forEach((row, y) => {
      row.forEach((value, x) => {
          if (value !== 0) {
              context.fillStyle = 'red';
              context.fillRect(x + offset.x,
                                y + offset.y,
                                1, 1);
          }
      });
  });
}

let elapsedTime = 0;
let timeInterval = 1000;

let prevTime = 0;
function update(time = 0) {
  console.log(time);
  const timeDiff = time - prevTime;
  prevTime = time;
  console.log(timeDiff);
  elapsedTime += timeDiff;
  if (elapsedTime > timeInterval) {
    player.pos.y += 1;
    elapsedTime = 0;
  }


  draw();
  requestAnimationFrame(update);
}

// update();

var start = 0;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  console.log(timestamp);
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    requestAnimationFrame(step);
  }
}

requestAnimationFrame(step);
