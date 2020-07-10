//PONG


user1Score = 0;
user2Score = 0;

paddle1 = {
  'x': 900,
  'y': 100,
  'yVelocity': 0,
  'width': 7,
  'height': 80
}

ball = {
  'x' : 500,
  'y' : 100,
  'xVelocity': 3,
  'yVelocity': -5,
  'width': 10,
  'height': 10
}

paddle2 = {
  'x': 100,
  'y': 100,
  'yVelocity': 0,
  'width': 7,
  'height': 80
}

function reset(){
  ball.x = 500;
  ball.y = 100;
  ball.xVelocity = Math.round(3 + Math.random()*3);
  ball.yVelocity = Math.round(3 + Math.random()*3);

  if (Math.random() > .5){
    ball.xVelocity *= -1
  }
}

reset()

const main = setInterval(function() {
 
  //____________________BACKGROUND
  //get canvas info
  let canvas = document.getElementById('snake');
  let context = canvas.getContext('2d');

  //reset canvas
  context.clearRect(0,0,canvas.width,canvas.height);

  //draw background
  context.fillStyle = "#f5f5f5";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //____________________PADDLES
  //update paddle1 location
  paddle1.y += paddle1.yVelocity;

  //update paddle2 position
  paddle2.y += paddle2.yVelocity;

  //implement border
  if (paddle1.y > 700-88 || paddle1.y < 5){
    paddle1.yVelocity = 0;
  }
  if (paddle2.y > 700-88 || paddle2.y < 5){
    paddle2.yVelocity = 0;
  }
  
  //draw paddle1
  context.fillStyle = "green";
  context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  //draw paddle2
  context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  
  //____________________BALL 
  //update ball location
  ball.x += ball.xVelocity;
  ball.y += ball.yVelocity;
  
  //top/bottom edge bouncing
  if (ball.y < 0){
    ball.y = 0;
    ball.yVelocity = ball.yVelocity * (-1)
  }
  else if (ball.y + 10 > 700){
    ball.y = 690;
    ball.yVelocity *= -1;
  }
  
  //paddle bouncing
  if ((ball.x + 10 > 900) && (ball.x < paddle1.x + 4) && (ball.y + 10 > paddle1.y) && (ball.y < paddle1.y + 80)){
    //paddle collision
    ball.xVelocity *= -1;
  }
  else if ((ball.x - 10 < 100) && (ball.x > paddle2.x - 4)&& (ball.y + 10 > paddle2.y) && (ball.y < paddle2.y + 80)){
    //paddle2 collision
    ball.xVelocity *= -1;
  }

  //determine when a player scores
  if (ball.x>1000){
    user2Score++;
    reset();
  }
  else if (ball.x < 0){
    user1Score++;
    reset();
  }


  //draw ball
  context.fillStyle = "black";
  context.fillRect(ball.x,ball.y,ball.width,ball.height);

  //____________________SCORE
  context.font = "20px Arial"
  context.fillText("PLAYER 2 SCORE: " + user2Score + "               " + "PLAYER 1 SCORE: " + user1Score,280, 50);

  //____________________END GAME
  if (user2Score == 10){
    context.font = "40px Arial"
    context.fillText("PLAYER 2 is the winna!", 300, 250);
    context.fillText("REFRESH PAGE TO PLAY AGAIN", 300, 400);
    clearInterval(main);
  }

  if (user1Score == 10){
    context.font = "40px Arial"
    context.fillText("PLAYER 2 is the winner!", 300, 250);
    context.fillText("REFRESH PAGE TO PLAY AGAIN", 300, 400);
    clearInterval(main);
  }

  

}, 16);


document.addEventListener('keydown', function(e) { 
  if(e.keyCode == 38){
    if (paddle1.y > 5){
      paddle1.yVelocity = -4;
    }
  }

  if(e.keyCode == 40){
    if (paddle1.y + 88 < 700) {
      paddle1.yVelocity = 4;
    }
  }

  if(e.keyCode == 87){
    if (paddle2.y > 5){
      paddle2.yVelocity = -4;
    }
  }

  if(e.keyCode == 83){
    if (paddle2.y + 88 < 700){
      paddle2.yVelocity = 4;
    }
  }



});

document.addEventListener('keyup', function(e) { 
  if(e.keyCode == 38){
    paddle1.yVelocity = 0;
  }
  if(e.keyCode == 40){
    paddle1.yVelocity = 0;
  }
  if(e.keyCode == 87){
    paddle2.yVelocity = 0;
  }
  if(e.keyCode == 83){
    paddle2.yVelocity = 0;
  }

});
