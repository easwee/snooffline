function Player() {
  this.x = 400;
  this.y = 200;
  this.velocityY = 0;
  this.velocityX = 0;
  this.acceleration = 2;
  this.didJump = false;
}

Player.prototype.render = function(game) {
  game.ctx.fillStyle = "red";
  game.ctx.fillRect(this.x-16, this.y-16, 32, 32);
};

Player.prototype.update = function(game) {
  if (!this.didJump && game.controls.pressed[ENUMS.SPACE]) {
    this.jump(game.config.jumpImpulse);
  }

  this.y += this.velocityY;

  if (this.y < game.config.groundPoint) {
    this.y -= game.config.gravity;
    this.velocityY += game.config.gravity;
  } else {
    this.y = game.config.groundPoint;
    this.didJump = false;
  }

  if (game.controls.pressed[ENUMS.LEFT] && this.x > game.config.leftBorder) {
    this.velocityX = -10;
    game.controls.pressed[ENUMS.LEFT] = false;

  }
  if (game.controls.pressed[ENUMS.RIGHT] && this.x < game.config.rightBorder) {
    this.velocityX = 10;
    game.controls.pressed[ENUMS.RIGHT] = false;

  }

  if (this.velocityX !== 0) {
    const modifier = this.velocityX > 0 ? -1 : 1;
    this.velocityX = this.velocityX + modifier*(1/this.acceleration);

    if (this.x < game.config.leftBorder && this.velocityX < 0) this.velocityX = 0;
    if (this.x > game.config.rightBorder && this.velocityX > 0) this.velocityX = 0;
  }

  if (this.x < game.config.leftBorder) this.x = game.config.leftBorder;
  if (this.x > game.config.rightBorder) this.x = game.config.rightBorder;
  else this.x += this.velocityX;
};

Player.prototype.jump = function(jumpHeight) {
  this.didJump = true;
  this.velocityY = -jumpHeight;
};
