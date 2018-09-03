function Player() {
  this.x = null;
  this.y = null;
  this.velocityY = 0;
  this.velocityX = 0;
  this.acceleration = 1;
  this.radius = 5;
  this.score = 0;
  this.didJump = false;
}

Player.prototype.init = function(game) {
  this.y = game.geometry.player.y;
  this.x = game.geometry.player.x;
  this.radius = game.geometry.player.radius;
};

Player.prototype.render = function(game) {
  const player = game.geometry.player;

  game.ctx.beginPath();
  game.ctx.strokeStyle = "green";
  game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  game.ctx.stroke();
  game.ctx.drawImage(
    game.cache["player"],
    ~~this.x,
    ~~(this.y - player.height),
    player.width,
    player.height
  );
};

Player.prototype.incrementScore = function(game) {
  if (!this.didJump) {
    this.score++;
  }
};

Player.prototype.decrementScore = function(game) {
  this.score--;
};

Player.prototype.update = function(game) {
  if (!this.didJump && game.controls.pressed[ENUMS.SPACE]) {
    this.jump(game.config.jumpImpulse);
    game.sound.playSound(game.sound.sounds.JUMP);
  }

  if (game.controls.pressed[ENUMS.RIGHT]) {
    if (this.direction !== "right") {
      this.velocityX = 0;
      this.direction = "right";
    }
    game.sound.playSound(game.sound.sounds.MOVE);
    this.velocityX += this.acceleration;
  }

  if (game.controls.pressed[ENUMS.LEFT]) {
    if (this.direction !== "left") {
      this.velocityX = 0;
      this.direction = "left";
    }
    game.sound.playSound(game.sound.sounds.MOVE);
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
