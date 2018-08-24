function Player() {
  this.x = 400;
  this.y = 400;
  this.velocityY = 0;
  this.didJump = false;
}

Player.prototype.render = function(game) {
  game.ctx.fillStyle = "red";
  game.ctx.fillRect(this.x, this.y, 32, 32);
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

  if(game.controls.pressed[ENUMS.LEFT] && this.x > 200) {
    this.x -= 200
    game.controls.pressed[ENUMS.LEFT] = false;
  }

  if(game.controls.pressed[ENUMS.RIGHT]  && this.x < 600) {
    this.x += 200
    game.controls.pressed[ENUMS.RIGHT] = false;
  }
};

Player.prototype.jump = function(jumpHeight) {
  this.didJump = true;
  this.velocityY = -jumpHeight;
};
