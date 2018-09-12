function Decoration(x, y, image = undefined) {
  this.x = x;
  this.y = y;
  this.startPosX = x;
  this.startPosY = y;
  this.width = 200;
  this.height = 200;
  this.radius = 50;
  this.speed = 0.1;
  this.color = "#4744FF";
  this.images = ["girl1", "cards", "dice"];
  this.image = image ? image : this.images[Math.floor(Math.random() * this.images.length)];
}

Decoration.prototype.render = function(game) {
  game.ctx.strokeStyle = "red";
  const graphic = game.cache[this.image];

  const scale = this.y / game.geometry.environment.height;

  game.ctx.drawImage(
    graphic,
    this.x - (this.width * scale) / 2,
    this.y - (this.height * scale) / 2,
    this.width * scale,
    this.height * scale
  );

  // Radius for pickup
  // game.ctx.beginPath();
  // game.ctx.strokeStyle = "green";
  // game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  // game.ctx.stroke();

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
  this.y += this.speed * game.time.delta;
  this.x = pointAtY(
    env.focalPoint,
    { x: this.startPosX, y: env.horizontAtY },
    this.y
  ).x;
};

window.Decoration = Decoration