function Generator(config) {
  this.elements = [];

  this.spawn = {
    direction: -1, //Left -1, Right 1
    interval: 150, //ms
    changeInterval: 1000, //ms
    lastPosition: undefined
  };

  this.spawnIntervalHandler = null;
  this.changeIntervalHandler = null;
}

Generator.prototype.init = function(game) {
  const env = game.geometry.environment;
  this.spawn.lastPosition = game.canvas.width / 2;

  this.angleMax =
    90 -
    (Math.atan2(env.height - env.focalPoint.y, env.width - env.focalPoint.x) *
      180) /
      Math.PI;
  this.angleStep = this.angleMax / ((env.horizontRight - env.horizontLeft) / 2);

  this.spawnIntervalHandler = setInterval(() => {
    this.create(game);
  }, this.spawn.interval);

  this.changeIntervalHandler = setInterval(() => {
    this.spawn.direction = Math.random() > 0.5 ? -1 : 1;
  }, this.spawn.changeInterval);
};

Generator.prototype.create = function(game) {
  this.spawn.lastPosition += this.spawn.direction * 10;
  if (
    this.spawn.lastPosition < game.geometry.environment.horizontLeft.x ||
    this.spawn.lastPosition > game.geometry.environment.horizontRight.x
  ) {
    this.spawn.direction = -this.spawn.direction;
  }

  var element = new Cocaine(
    this.spawn.lastPosition,
    game.geometry.environment.horizontAtY
  );
  this.elements.push(element);
};

Generator.prototype.destroy = function(index) {
  this.elements.splice(index, 1);
};

Generator.prototype.render = function(game) {
  this.elements.forEach((element, index) => {
    element.render(game);
  });
};

Generator.prototype.update = function(game) {
  this.elements.forEach((element, index) => {
    if (collision(element, game.player)) {
      this.destroy(index);
      game.sound.playSound(32, 0.1, game.config.mute);
      game.player.incrementScore();
    } else if (element.y > game.canvas.height) {
      this.destroy(index);
    } else {
      element.update(game);
    }
  });
};
