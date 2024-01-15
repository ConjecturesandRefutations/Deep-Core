//Opening Section
const openingSection = document.querySelector('.opening-section');

//Arrow Controls
const arrowControls = document.querySelector('.arrow-controls');
arrowControls.style.display = 'none';

//Info Section
const info = document.querySelector('.info');
info.style.display = 'none';
const scoreValue = document.getElementById('score-value');
const healthValue = document.getElementById('health-value');

//Instructions Section
const instructionSection = document.querySelector('.instruction-section');
instructionSection.style.display = 'none';
//Instruction Button
const instructionButton = document.querySelector('.instruction-wrapper');
  instructionButton.onclick = () => {
    openingSection.style.display = 'none';
    instructionSection.style.display = '';
}

// Back Button
const backButton = document.getElementById('back');
backButton.onclick = () => {
  openingSection.style.display = '';
  instructionSection.style.display = 'none';
}

//Home Button
const homeButton = document.getElementById('home-icon');
homeButton.style.display = 'none';

  homeButton.onclick = () => {
  gameOver = true;
  resetScore();
  homeButton.style.display = 'none';
  openingAudioPlaying = false;
  arrowControls.style.display = 'none';
  info.style.display = 'none';
  volumeIcon.classList.remove('fa', 'fa-volume-up');
  volumeIcon.classList.add('fa', 'fa-volume-mute');
  openingSection.style.display = '';
  canvas.style.display = 'none';
  console.log('is game over?', gameOver)
}

// Start Button
window.onload = () => {
  const startButton = document.getElementById('start-button');
  startButton.onclick = () => { 
    canvas.style.display = '';
    openingSection.style.display = 'none';
    arrowControls.style.display = '';
    info.style.display = '';
    homeButton.style.display = '';
    pauseOpeningAudio();
    startGame();
  };
};

