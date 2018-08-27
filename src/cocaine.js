function Cocaine(x, y) {
  this.x = x;
  this.y = y;
  this.width = 2;
  this.height = 2;
  this.radius = 2;
  this.speed = 2;
}

Cocaine.prototype.render = function(game) {
  const graphic = game.cache["cocaine"];
  debugger;
  game.ctx.drawImage(graphic, this.x, this.y, this.width, this.height);
};

Cocaine.prototype.update = function(game) {
  debugger;
  this.y += this.speed;
  this.width += 0.5;
  this.height += 0.5;
  console.log(this.y, this.width, this.height);
};
