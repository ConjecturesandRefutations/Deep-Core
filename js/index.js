//Key Variables
let currentGame;
let currentPlayer;
let animationID;

//Opening Section
const opening = document.querySelector('.opening-section');

//Arrow Controls
const arrowControls = document.querySelector('.arrow-controls');
arrowControls.style.display = 'none';

// Start Button
window.onload = () => {
  const startButton = document.getElementById('start-button');
  startButton.onclick = () => { 
    canvas.style.display = '';
    opening.style.display = 'none';
    arrowControls.style.display = '';
    //stone.play();
    startGame();
  };
};

function startGame(){
  currentGame = new Game();

   //Instantiate a new player
   currentPlayer = new Player();
   currentPlayer.drawPlayer();

   addTouchListeners();

   // Clear any previous animation loop
   cancelAnimationFrame(animationID);

   animationID = requestAnimationFrame(updateCanvas);

};


function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  currentPlayer.drawPlayer();
  animationID = requestAnimationFrame(updateCanvas);
}