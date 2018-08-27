function Cocaine(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
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
  this.y += this.speed;
};
