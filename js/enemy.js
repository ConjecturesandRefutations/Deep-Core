class Enemy {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = 70;
      this.height = 70;
      this.img = './images/enemy.png';
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
        enemyImg.src = this.img;
  
        // Calculate the angle based on the enemy's movement direction
        switch (this.direction) {
          case 0: // From top
            this.angle = Math.PI / 2;
            break;
          case 1: // From Right
            this.angle = Math.PI;
            break;
          case 2: // From Bottom
            this.angle = -Math.PI / 2;
            break;
          case 3: // From Left
            this.angle = 0;
            break;
        }
  
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
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