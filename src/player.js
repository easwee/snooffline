function Player() {
  this.x = null;
  this.y = null;
  this.velocityY = 0;
  this.velocityX = 0;
  this.acceleration = 1;
  this.radius = 5;
  this.score = 1000;
  this.totalScore = 0;
  this.didJump = false;
}

Player.prototype.init = function(game) {
  this.y = game.geometry.player.y;
  this.x = game.geometry.player.x;
  this.radius = game.geometry.player.radius;
};

Player.prototype.render = function(game) {
  const player = game.geometry.player;

  game.ctx.drawImage(
    game.cache["player"],
    ~~(this.x - 5),
    ~~(this.y - player.height + 5),
    player.width,
    player.height
  );
};

Player.prototype.incrementScore = function(game) {
  if (!this.didJump) {
    this.score += game.config.scoreIncrementFactor;
    this.totalScore++;
  }

  if (this.score >= game.config.scoreLimit) {
    game.hasOverdosed();
  }
};

Player.prototype.decrementScore = function(game) {
  this.score -= game.config.scoreDecrementFactor * 1.5;

  if (this.score <= 0) {
    game.hasUnderdosed();
  }
};

Player.prototype.bonusPickup = function(game) {
  game.config.scoreIncrementFactor += 1;
  game.config.scoreDecrementFactor += .5;
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
    this.velocityX += this.acceleration;
  }

  if (game.controls.pressed[ENUMS.LEFT]) {
    if (this.direction !== "left") {
      this.velocityX = 0;
      this.direction = "left";
    }
    this.velocityX -= this.acceleration;
  }

  if (this.y < game.config.groundPoint) {
    this.y -= game.config.gravity * game.time.delta;
    this.velocityY += game.config.gravity * game.time.delta;
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

window.Player = Player;