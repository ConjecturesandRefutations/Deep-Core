//Key Variables
let currentGame;
let currentPlayer;
let animationID;
let enemyFrequency = 0; // support the logic for generating enemies
let enemySpeed = 2;
let divisor = 60;
let gameOver = false;

/* let background = new Image();
background.src = "./images/field.jpg"; */

function startGame(){
  gameOver = false;
  currentGame = new Game();
/*   ctx.drawImage(background, 0, 0,canvas.width,canvas.height); // draw background image
 */  currentGame.bullets = [];

   //Instantiate a new player
   currentPlayer = new Player(50,50);
   currentPlayer.drawPlayer();

   addTouchListeners();

   // Clear any previous animation loop
   cancelAnimationFrame(animationID);

   animationID = requestAnimationFrame(updateCanvas);

};


function updateCanvas() {

  if(gameOver){
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
/*   ctx.drawImage(background, 0, 0,canvas.width,canvas.height); // redraw the background
 */
  currentPlayer.drawPlayer();
  enemyFrequency++;

   // Update and draw bullets
for (let i = currentGame.bullets.length - 1; i >= 0; i--) {
  const bullet = currentGame.bullets[i];

  if (bullet.isAlive) {
    bullet.update();
    bullet.draw();

    // Check for collisions with enemies
    for (let j = currentGame.enemies.length - 1; j >= 0; j--) {
      const enemy = currentGame.enemies[j];

      if (enemy.collidesWith(bullet.x, bullet.y)) {
        if (!enemy.wasHit) { // Check if the enemy was not hit before
          if(!audioMuted){grunt.play()};
          enemy.destroy();
          currentGame.score++;
          scoreValue.innerText = currentGame.score;
          enemy.wasHit = true; // Mark the enemy as hit
        }

        // Remove the bullet from the array
        currentGame.bullets.splice(i, 1);
      }
    }
  } else {
    // Remove dead bullets from the array
    currentGame.bullets.splice(i, 1);
  }
}

if (enemyFrequency % divisor === 1) {
  // Determine which side to spawn the enemy
  const side = Math.floor(Math.random() * 4); // 0 for top, 1 for right, 2 for bottom, 3 for left

  let randomEnemyX, randomEnemyY;
  let randomEnemyWidth = 50;
  let randomEnemyHeight = 50;

  // Set initial position based on the chosen side
  switch (side) {
    case 0: // Top
      randomEnemyX = Math.floor(Math.random() * canvas.width);
      randomEnemyY = -randomEnemyHeight;
      break;
    case 1: // Right
      randomEnemyX = canvas.width;
      randomEnemyY = Math.floor(Math.random() * canvas.height);
      break;
    case 2: // Bottom
      randomEnemyX = Math.floor(Math.random() * canvas.width);
      randomEnemyY = canvas.height;
      break;
    case 3: // Left
      randomEnemyX = -randomEnemyWidth;
      randomEnemyY = Math.floor(Math.random() * canvas.height);
      break;
  }

  let newEnemy = new Enemy(
    randomEnemyX,
    randomEnemyY,
    randomEnemyWidth,
    randomEnemyHeight
  );
  
  // Set the direction for the enemy
  newEnemy.direction = side;

  currentGame.enemies.push(newEnemy);
}

for (let i = 0; i < currentGame.enemies.length; i++) {
  const enemy = currentGame.enemies[i];

   // Calculate the angle between the enemy and the player
   const angle = Math.atan2(
    currentPlayer.y - enemy.y,
    currentPlayer.x - enemy.x
  );

  // Adjust the enemy's movement based on the angle
  enemy.x += enemySpeed * Math.cos(angle);
  enemy.y += enemySpeed * Math.sin(angle);

  if (enemy.wasHit && enemy.currentBloodFrame >= enemy.bloodFrames) {
    // Remove enemies after the blood animation is finished
    currentGame.enemies.splice(i, 1);
  } else {
    enemy.drawEnemy();
  }


  // Move enemies based on the direction they entered
  switch (enemy.direction) {
    case 0: // Top
      enemy.y += enemySpeed;
      break;
    case 1: // Right
      enemy.x -= enemySpeed;
      break;
    case 2: // Bottom
      enemy.y -= enemySpeed;
      break;
    case 3: // Left
      enemy.x += enemySpeed;
      break;
  }

  // Logic for removing enemies
  if (
    currentGame.enemies.length > 0 &&
    (enemy.x >= canvas.width ||
      enemy.x + enemy.width <= 0 ||
      enemy.y >= canvas.height ||
      enemy.y + enemy.height <= 0)
  ) {
    currentGame.enemies.splice(i, 1); // remove that enemy from the array
  }
}

//Logic for ending the game
if(currentGame.health===0){
  endGame();
  finalScore.innerText = currentGame.score;
  gameOver = true;
}

  animationID = requestAnimationFrame(updateCanvas);

}

function resetScore(){
  gameOver = true;
  currentGame.health = 100;
  currentGame.score = 0;
  scoreValue.innerText = currentGame.score;
  healthValue.innerText = currentGame.health;  
}

function endGame(){
  info.style.display = 'none';
  canvas.style.display = 'none';
  arrowControls.style.display = 'none';
  GameOver.style.display = '';
  muteButton.style.display = 'none';
 }
