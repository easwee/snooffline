function Player() {
  this.x = 400;
  this.y = 200;
  this.velocityY = 0;
  this.velocityX = 0;
  this.acceleration = 1;
  this.radius = 16;
  this.score = 0;
  this.didJump = false;
}

Player.prototype.render = function(game) {
  game.ctx.fillStyle = "red";
  game.ctx.fillRect(~~(this.x - 16), ~~(this.y - 16), 32, 32);
};

Player.prototype.incrementScore = function(game) {
  this.score++;
}

Player.prototype.decrementScore = function(game) {
  this.score--;
}

Player.prototype.update = function(game) {
  if (!this.didJump && game.controls.pressed[ENUMS.SPACE]) {
    this.jump(game.config.jumpImpulse);
  }

  if (game.controls.pressed[ENUMS.RIGHT]) {
    if (this.direction !== "right") {
      this.velocityX = 0;
      this.direction = "right";
    }
    game.sound.playSound(60, 0.1);
    this.velocityX += this.acceleration;
  }

  if (game.controls.pressed[ENUMS.LEFT]) {
    if (this.direction !== "left") {
      this.velocityX = 0;
      this.direction = "left";
    }
    game.sound.playSound(60, 0.1);
    this.velocityX -= this.acceleration;
  }

  if (this.y < game.config.groundPoint) {
    this.y -= game.config.gravity;
    this.velocityY += game.config.gravity;
  } else {
    this.y = game.config.groundPoint;
    this.didJump = false;
  }

  if (this.velocityX > 0 || this.velocityX < 0) {
    this.velocityX +=
      game.config.friction * (this.direction === "right" ? -1 : 1);
  }

  if (this.x < game.config.leftBorder) {
    this.x = game.config.leftBorder;
    this.velocityX = 0;
  }
  if (this.x > game.config.rightBorder) {
    this.x = game.config.rightBorder;
    this.velocityX = 0;
  }

  this.x += this.velocityX;
  this.y += this.velocityY;
};

Player.prototype.jump = function(jumpHeight) {
  this.didJump = true;
  this.velocityY = -jumpHeight;
};
