function Cocaine(x, y, previous) {
  this.x = x;
  this.y = y;
  this.startPosX = x;
  this.startPosY = y;
  this.width = 10;
  this.height = 10;
  this.radius = 10;
  this.speed = 0.1;
  this.previous = previous;
}

Cocaine.prototype.render = function(game) {
  game.ctx.save();
  game.ctx.beginPath();
  game.ctx.strokeStyle = "green";
  game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  game.ctx.stroke();
  game.ctx.restore();
};

Cocaine.prototype.update = function(game) {
  const env = game.geometry.environment;

  this.y += this.speed * game.time.delta;
  this.x =
    pointAtY(env.focalPoint, { x: this.startPosX, y: this.startPosY }, this.y)
      .x -
    this.width / 2;
};
