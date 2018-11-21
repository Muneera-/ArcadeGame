
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x; 
    this.y=y; 
    this.speed = Math.floor(Math.random() * 313 + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;
    // update enemies position when reaching the end of canvas
    if(this.x > 505) {
        this.x = -50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.lives=10; 
    this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;

    this.collisionCheck();
       if (this.y < 80) {
        this.resetPostition();
        this.score += 10;
    }
};

Player.prototype.collisionCheck = function() {
    for (let i = 0; i < allEnemies.length; i++) {
        if((player.x - allEnemies[i].x) < 70 && (player.y - allEnemies[i].y) < 50 && (allEnemies[i].x - player.x) < 70 && (allEnemies[i].y - player.y) < 50) {
            this.resetPostition();
            if(player.lives>0)
            {
            player.lives--;
            }
            if(player.score>0) {
            player.score-=5;
            }
        }
    }
};

// Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.strokeText("Score: " + this.score, 15, 100);
    ctx.strokeText("Lives: " + this.lives, 370, 100);
    ctx.strokeStyle= "white";
    ctx.fillStyle = "white";
    ctx.font = '30px serif';
};

// This function sends player back to starting position.
Player.prototype.resetPostition = function() {
    this.x = 200;
    this.y = 400;
};


Player.prototype.handleInput = function(keyInput) {

    console.log('x ='+this.x+" y = "+this.y);
    if (keyInput === 'left' && this.x > 50){
        this.x -= 100;
    }
    else if (keyInput === 'up'&& this.y > 70){
        this.y -= 80;
    }
    else if (keyInput === 'right' && this.x < 400){
        this.x += 100;
    }
    else if (keyInput === 'down' && this.y < 380){
        this.y += 80;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let firstEnemy = new Enemy(-200, 60);
let secondEnemy = new Enemy(-350, 140);
let thirdEnemy = new Enemy(-100, 228);
let fourthEnemy = new Enemy(-86, 60);
let fifthEnemy = new Enemy(-100, 140);
let sixthEnemy = new Enemy(-400, 230);
let allEnemies = [fifthEnemy, secondEnemy, thirdEnemy, fourthEnemy, fifthEnemy, sixthEnemy];

// Place the player object in a variable called player
let player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(player.lives >0 )
    {
    player.handleInput(allowedKeys[e.keyCode]);
    }

    else{
        swal({
          title: 'Game Over! \n\tDo you wanna play again?',
          confirmButtonText:  'Yes',
          cancelButtonText:  'No',
          showCancelButton: true,
          showCloseButton: true,
          width: 600,
          padding: 100,
          background: '#fff url(images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("images/nyan-cat.gif")
            center left
            no-repeat
          `
        }).then((result) => {
          if (result.value) {
            location.reload();
          }
        })
     }
     /* Resources: 
     https://sweetalert2.github.io */
    
});
