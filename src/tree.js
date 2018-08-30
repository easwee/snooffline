function Tree(x, y) {
  this.x = x;
  this.y = y;
  this.startPosX = x;
  this.startPosY = y;
  this.width = 30;
  this.height = 30;
  this.speed = 2;
  this.color = "#4744FF";
  this.image = "tree";  
}

Tree.prototype.render = function(game) {
  game.ctx.strokeStyle = "red";
  const graphic = game.cache[this.image];
  game.ctx.drawImage(graphic, this.x, this.y, this.width, this.height);
};

Tree.prototype.update = function(game) {
  const env = game.geometry.environment;
  this.y += this.speed;
  this.x =
    pointAtY(env.focalPoint, { x: this.startPosX, y: this.startPosY }, this.y)
      .x -
    this.width / 2;
};
