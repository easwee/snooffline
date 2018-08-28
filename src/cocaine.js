function Cocaine(x, y) {
  this.x = x;
  this.y = y;
  this.startPosX = x;
  this.startPosY = y;
  this.width = 2;
  this.height = 2;
  this.radius = 2;
  this.speed = 2;
}

Cocaine.prototype.render = function(game) {
  const graphic = game.cache["cocaine"];
  game.ctx.drawImage(graphic, this.x, this.y, this.width, this.height);
};

Cocaine.prototype.update = function(game) {
  const env = game.geometry.environment;

  this.y += this.speed;
  this.x = pointAtY(
    env.focalPoint,
    { x: this.startPosX, y: this.startPosY },
    this.y
  ).x;
  this.width += 0.5;
  this.height += 0.5;
  this.radius += 0.5;
};