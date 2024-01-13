class Bullet {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 30;
      this.angle = angle
      this.speed = 10; 
      this.radius = 2; 
      this.isAlive = true;

      // Create an Image object for the bullet image
    this.img = new Image();
    this.img.src = './images/bullet.png'; 

    // Listen for the 'load' event to ensure the image is loaded
    this.img.onload = () => {
      this.isImageLoaded = true;
    };
  
    }
  
    update() {
        // Calculate the new x and y positions based on the angle
        const deltaX = this.speed * Math.cos(this.angle);
        const deltaY = this.speed * Math.sin(this.angle);
        this.x += deltaX;
        this.y += deltaY;
      
        // Check if the bullet is out of the canvas
        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.isAlive = false;
        }
      }
      
      draw() {
        if (this.isImageLoaded) {
          // Ensure the image is loaded before drawing
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle + Math.PI / 2); // Rotate based on the bullet's angle
          ctx.drawImage(
            this.img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
          );
          ctx.restore();
        } else {
          // If the image is not loaded, use fillRect fallback
          ctx.fillStyle = 'orange';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
  }
  
  //For mobile
  const shootButton = document.getElementById('shoot');

  //Event listener mouse clicks on bullet button:
  shootButton.addEventListener('click', () => {
    currentPlayer.shootBullet();
    currentPlayer.bulletFired = false;
  });

  //Event listener to handle touchevents on bullet button:
  shootButton.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
    currentPlayer.shootBullet();
    currentPlayer.bulletFired = false;
  });
  
