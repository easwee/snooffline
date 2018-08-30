function Decoration(x, y, image) {
  this.x = x;
  this.y = y;
  this.startPosX = x;
  this.startPosY = y;
  this.width = 100;
  this.height = 100;
  this.speed = 1;
  this.color = "#4744FF";
  this.image = image;
}

Decoration.prototype.render = function(game) {
  game.ctx.strokeStyle = "red";
  const graphic = game.cache[this.image];
  
  const scale = this.y/game.geometry.environment.height
  game.ctx.drawImage(
    graphic,
    this.x - this.width*scale / 2,
    this.y - this.height*scale / 2,
    this.width*scale,
    this.height*scale
  );

  // X/Y cross for debug
  // game.ctx.strokeStyle = 'white';
  // game.ctx.beginPath();
  // game.ctx.moveTo(this.x  - 50, this.y);
  // game.ctx.lineTo(this.x  + 50, this.y);
  // game.ctx.moveTo(this.x , this.y - 50);
  // game.ctx.lineTo(this.x , this.y + 50);
  // game.ctx.stroke();
};

Decoration.prototype.update = function(game) {
  const env = game.geometry.environment;
  this.y += this.speed;
  this.x = pointAtY(
    env.focalPoint,
    { x: this.startPosX, y: env.horizontAtY },
    this.y
  ).x;    
};
