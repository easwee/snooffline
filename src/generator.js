function Generator(config) {
  this.elements = [];

  this.direction = {
    current: "left",
    changeInterval: 3,
    lastChange: undefined
  };
  this.spawnInterval = 10000;
  this.interval = null;
}

Generator.prototype.init = function(game) {
  this.create(game);
  this.interval = setInterval(() => {
    this.create(game);
  }, this.spawnInterval);
};

Generator.prototype.create = function(game) {
  console.log("Creating cocaine...");
  var element = new Cocaine(game.canvas.weight / 2, game.config.horizontPoint);
  this.elements.push(element);
};

Generator.prototype.destroy = function(index) {
  console.log("Destroying cocaine...");
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
    } else if (element.y > game.canvas.height) {
      this.destroy(index);
    } else {
      element.update(game);
    }
  });
};
