class Enemy {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 70
        this.height = 70
        this.img = './images/enemy.png';
        this.destroyed = false;
        this.wasHit = false; // Track if the enemy was hit
        this.bloodFrames = 10; // Number of frames to display the blood
        this.currentBloodFrame = 0; // Current blood frame
        this.bloodImage = new Image();
        this.bloodImage.src = './images/blood.png';
    }

    drawEnemy() {
      if (this.wasHit && this.currentBloodFrame < this.bloodFrames) {
        // Display the blood image
        ctx.drawImage(
          this.bloodImage,
          this.x,
          this.y,
          this.width,
          this.height
        );
        this.currentBloodFrame++;
      } else {
        // Draw the asteroid image
        const enemyImg = new Image();
        enemyImg.src = this.img;
        ctx.drawImage(enemyImg, this.x, this.y, this.width, this.height);
      }
    }

      collidesWith(x, y) {
        return (
          x < this.x + this.width &&
          x + this.width > this.x &&
          y < this.y + this.height &&
          y + this.height > this.y
        );
      }

      destroy() {
        this.destroyed = true;
        this.wasHit = true; // Mark the enemy as hit
      }

    }