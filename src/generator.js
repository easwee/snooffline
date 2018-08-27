function Generator(config) {
  this.elements = [];

  this.direction = {
    current: "left",
    changeInterval: 3,
    lastChange: undefined
  };
}

Generator.prototype.create = function() {
  var element = new Cocaine();
  this.elements.push(element);
};

Generator.prototype.destroy = function() {};

Generator.prototype.render = function() {};

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
