class Player {
    constructor() {
      this.x = canvas.width/2;
      this.y = canvas.height/2;
      this.width = 70;
      this.height = 70;
      this.angle = 0;
      this.img = './images/pistol-1.png'
      this.upButtonDown = false;
      this.downButtonDown = false;
      this.leftButtonDown = false;
      this.rightButtonDown = false;
      this.throttleDelay = 100; // Keyboard Throttle Delay (Milliseconds)
  
      // Select the mobile-controls buttons
      this.leftButton = document.getElementById('left-button');
      this.rightButton = document.getElementById('right-button');
      this.upButton = document.getElementById('up-button');
      this.downButton = document.getElementById('down-button');
  
  
      // Event listeners for keyboard controls
      document.addEventListener('keydown', (event) => this.handleKeyDown(event));
      document.addEventListener('keyup', (event) => this.handleKeyUp(event));
  
      // Throttle the keydown event listeners
      this.throttledUpStart = this.throttle(() => this.startMovingPlayer('up'), this.throttleDelay);
      this.throttledDownStart = this.throttle(() => this.startMovingPlayer('down'), this.throttleDelay);
      this.throttledLeftStart = this.throttle(() => this.startMovingPlayer('left'), this.throttleDelay);
      this.throttledRightStart = this.throttle(() => this.startMovingPlayer('right'), this.throttleDelay);
  
    }

    drawPlayer() {
      const playerImg = new Image();
      playerImg.src = this.img;
    
      // Calculate the angle of rotation based on the player's current direction
      let angle = this.angle;
    
      // Calculate diagonal movement angles when both up and right or down and left buttons are pressed
      if (this.upButtonDown && this.rightButtonDown) {
        angle = (-Math.PI) / 4; // Diagonal up-right
      } else if (this.downButtonDown && this.leftButtonDown) {
        angle = (3 * Math.PI) / 4; // Diagonal down-left
      } else if (this.downButtonDown && this.rightButtonDown) {
        angle = Math.PI / 4; // Diagonal down-right
      } else if (this.upButtonDown && this.leftButtonDown) {
        angle = (-3 * Math.PI) / 4; // Diagonal up-left
      } else if (this.upButtonDown) {
        angle = -Math.PI / 2;
      } else if (this.downButtonDown) {
        angle = Math.PI / 2;
      } else if (this.leftButtonDown) {
        angle = Math.PI;
      } else if (this.rightButtonDown) {
        angle = 0;
      }
    
      // Translate and rotate the player's image
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(angle);
      ctx.drawImage(playerImg, -this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    
      // Update the player's current direction
      this.angle = angle;
    }
  
    handleKeyDown(event) {
      if (event.keyCode === 38 && !this.upButtonDown) {
        // up arrow key
        this.upButtonDown = true;
        this.throttledUpStart();
      } else if (event.keyCode === 40 && !this.downButtonDown) {
        // down arrow key
        this.downButtonDown = true;
        this.throttledDownStart();
      } else if (event.keyCode === 37 && !this.leftButtonDown) {
        // left arrow key
        this.leftButtonDown = true;
        this.throttledLeftStart();
      } else if (event.keyCode === 39 && !this.rightButtonDown) {
        // right arrow key
        this.rightButtonDown = true;
        this.throttledRightStart();
      }
    }    
  
    handleKeyUp(event) {
      if (event.keyCode === 38) {
        // up arrow key
        this.upButtonDown = false;
        this.stopMovingPlayer();
      } else if (event.keyCode === 40) {
        // down arrow key
        this.downButtonDown = false;
        this.stopMovingPlayer();
      } else if (event.keyCode === 37) {
        // left arrow key
        this.leftButtonDown = false;
        this.stopMovingPlayer();
      } else if (event.keyCode === 39) {
        // right arrow key
        this.rightButtonDown = false;
        this.stopMovingPlayer();
      } 
    }
  
    throttle(callback, delay) {
      let lastCallTime = 0;
      return function () {
        const now = Date.now();
        if (now - lastCallTime >= delay) {
          lastCallTime = now;
          callback.apply(this, arguments);
        }
      };
    }
  
    startMovingPlayer(direction) {
      
      // Use requestAnimationFrame to keep moving the player continuously
      const movePlayer = () => {
        if (this.upButtonDown || this.downButtonDown || this.leftButtonDown || this.rightButtonDown) {
            
          if (direction === 'up' && this.upButtonDown && this.y > 5) {
            this.y -= 7;
          } else if (direction === 'down' && this.downButtonDown && this.y < canvas.height - this.height - 5) {
            this.y += 7;
          } else if (direction === 'left' && this.leftButtonDown && this.x > 15) {
            this.x -= 7;
          } else if (direction === 'right' && this.rightButtonDown && this.x < canvas.width - this.width - 15) {
            this.x += 7;
          }
          requestAnimationFrame(movePlayer);
        }
      };
      
      movePlayer();
    }
    
  
    stopMovingPlayer() {
      // Stop the player's movement when all buttons are released
      if (!this.upButtonDown && !this.downButtonDown && !this.leftButtonDown && !this.rightButtonDown) {
        cancelAnimationFrame(this.requestAnimationFrame);
      }
    }

  }
  
  function addTouchListeners() {
    // Touch event handling for leftButton
    currentPlayer.leftButton.ontouchstart = (event) => {
      event.preventDefault();
      currentPlayer.leftButtonDown = true;
      currentPlayer.throttledLeftStart();
    };
  
    currentPlayer.leftButton.ontouchend = () => {
      currentPlayer.leftButtonDown = false;
      currentPlayer.stopMovingPlayer();
    };
  
    // Touch event handling for rightButton
    currentPlayer.rightButton.ontouchstart = (event) => {
      event.preventDefault();
      currentPlayer.rightButtonDown = true;
      currentPlayer.throttledRightStart();
    };
  
    currentPlayer.rightButton.ontouchend = () => {
      currentPlayer.rightButtonDown = false;
      currentPlayer.stopMovingPlayer();
    };
  
    // Touch event handling for upButton
    currentPlayer.upButton.ontouchstart = (event) => {
      event.preventDefault();
      currentPlayer.upButtonDown = true;
      currentPlayer.throttledUpStart();
    };
  
    currentPlayer.upButton.ontouchend = () => {
      currentPlayer.upButtonDown = false;
      currentPlayer.stopMovingPlayer();
    };
  
    // Touch event handling for downButton
    currentPlayer.downButton.ontouchstart = (event) => {
      event.preventDefault();
      currentPlayer.downButtonDown = true;
      currentPlayer.throttledDownStart();
    };
  
    currentPlayer.downButton.ontouchend = () => {
      currentPlayer.downButtonDown = false;
      currentPlayer.stopMovingPlayer();
    };
  
    // Mouse event handling for leftButton
    currentPlayer.leftButton.onmousedown = () => {
      currentPlayer.leftButtonDown = true;
      currentPlayer.throttledLeftStart();
    };
  
    currentPlayer.leftButton.onmouseup = () => {
      currentPlayer.leftButtonDown = false;
      currentPlayer.stopMovingPlayer();
    };
  
    // Mouse event handling for rightButton
    currentPlayer.rightButton.onmousedown = () => {
      currentPlayer.rightButtonDown = true;
      currentPlayer.throttledRightStart();
    };
  
    currentPlayer.rightButton.onmouseup = () => {
      currentPlayer.rightButtonDown = false;
      currentPlayer.stopMovingPlayer();
    };
  
    // Mouse event handling for upButton
    currentPlayer.upButton.onmousedown = () => {
      currentPlayer.upButtonDown = true;
      currentPlayer.throttledUpStart();
    };
  
    currentPlayer.upButton.onmouseup = () => {
      currentPlayer.upButtonDown = false;
      currentPlayer.stopMovingPlayer();
    };
  
    // Mouse event handling for downButton
    currentPlayer.downButton.onmousedown = () => {
      currentPlayer.downButtonDown = true;
      currentPlayer.throttledDownStart();
    };
  
    currentPlayer.downButton.onmouseup = () => {
      currentPlayer.downButtonDown = false;
      currentPlayer.stopMovingPlayer();
    };
  }
