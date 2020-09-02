window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const score = document.getElementById('score');
  const startBtn = document.getElementById('start-btn');


  const square = 10;

  let snake = [];
  snake[0] = {
    x: 5 * square,
    y: 5 * square
  }

  let food = {
    x: Math.floor(Math.random() * 10 + 1) * square,
    y: Math.floor(Math.random() * 10 + 1) * square
  }

  let direction = 'right';

  //creating background:

  function theBackground() {
    ctx.fillStyle = "#77a581";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  //creating the snake:

  function theSnake() {
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = '#333333';
      ctx.fillRect(snake[i].x, snake[i].y, square - 1, square - 1);
    }
  }

  //creating the food:

  function theFood() {
    ctx.fillStyle = "red"
    ctx.fillRect(food.x, food.y, square - 2, square - 2);
  }

  //load audio files:

  const dead = new Audio();
  const eat = new Audio();
  const move = new Audio();

  dead.src = "./Sounds/dead.wav"
  eat.src = "./Sounds/eat.wav"
  move.src = "./Sounds/moves.wav"

  dead.volume = 0.2;
  eat.volume = 0.2;
  move.volume = 0.2;

  //the score:

  function getPoints() {
    score.innerHTML = 'Score: \n' + (snake.length - 0);
  }

  //click event - teclado:
  let game;

  startBtn.addEventListener('click', function () { game = setInterval(theGame, 130) });


  document.addEventListener('keydown', snakeDirection);

  function snakeDirection(event) {

    if (event.keyCode == 37 && direction != "right") {
      move.play();
      direction = "left";
    }

    if (event.keyCode == 38 && direction != "down") {
      move.play();
      direction = "up";
    }

    if (event.keyCode == 39 && direction != "left") {
      move.play();
      direction = "right";
    }

    if (event.keyCode == 40 && direction != "up") {
      move.play();
      direction = "down";
    }
  }

  function theGame() {
    theBackground();
    theSnake();
    theFood();
    theGameOver();

    let positionX = snake[0].x;
    let positionY = snake[0].y;

    if (direction == 'right') {
      positionX += square;
    }

    if (direction == "left") {
      positionX -= square;
    }

    if (direction == 'up') {
      positionY -= square;
    }

    if (direction == 'down') {
      positionY += square;
    }

    if (positionX == food.x && positionY == food.y) {
      eat.play();
      getPoints()
      food.x = Math.floor(Math.random() * 10 + 1) * square;
      food.y = Math.floor(Math.random() * 10 + 1) * square;
    } else {
      snake.pop();
    }

    let snakeHead = {
      x: positionX,
      y: positionY,
    }

    snake.unshift(snakeHead);

    if (snake[0].x > 25 * square && direction == 'right') {
      snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == 'left') {
      snake[0].x = 25 * square;
    }
    if (snake[0].y > 20 * square && direction == 'down') {
      snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == 'up') {
      snake[0].y = 20 * square;
    }

  }

  function draWFinalScore() {

    ctx.fillStyle = "#77a581";
    ctx.clearRect(0, 0, 25 * square, 20 * square);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 20px courier';
    ctx.fillStyle = '#333333';
    ctx.fillText("Game Over", 3.5 * square, 7 * square);
  }

  function theGameOver() {

    for (let i = 4; i < snake.length; i++) {
      const collision = snake[i].x === snake[0].x && snake[i].y === snake[0].y
      if (collision) {
        dead.play();
        clearInterval(game);
        draWFinalScore();
      }
    }
  }

  theBackground();

}