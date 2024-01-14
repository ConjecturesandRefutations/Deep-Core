class Enemy {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 50;
      this.img = './images/enemy-knife.png';
      this.destroyed = false;
      this.wasHit = false;
      this.bloodFrames = 10;
      this.currentBloodFrame = 0;
      this.bloodImage = new Image();
      this.bloodImage.src = './images/blood.png';
      this.angle = 0; // Rotation angle for the enemy
      this.direction = 0; // Movement direction: 0 for top, 1 for right, 2 for bottom, 3 for left
    }
  
    drawEnemy() {
      if (this.wasHit && this.currentBloodFrame < this.bloodFrames) {
        ctx.drawImage(this.bloodImage, this.x, this.y, this.width, this.height);
        this.currentBloodFrame++;
      } else {
        const enemyImg = new Image();
    
        // Calculate the distance between the enemy and the player
        const distanceToPlayer = Math.sqrt(
          Math.pow(currentPlayer.x - this.x, 2) +
          Math.pow(currentPlayer.y - this.y, 2)
        );
    
        if (distanceToPlayer <= 75) {
          // Change the image to the melee attacking image
          enemyImg.src = './images/enemy-knife-attack.png';
        } else {
          // Use the default knife-wielding image
          enemyImg.src = this.img;
        }
    
        // Calculate the angle based on the player's position
        const angle = Math.atan2(currentPlayer.y - this.y, currentPlayer.x - this.x);
    
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(angle);
        ctx.drawImage(enemyImg, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
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