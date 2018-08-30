function Generator(config) {
  this.items = {
    cocaine: [],
    trees: []
  };

  this.updates = {
    cocaine: game => this.updateCocaine(game, "cocaine"),
    trees: game => this.updateTrees(game, "trees")
  };

  this.spawn = {
    direction: -1, //Left -1, Right 1
    interval: 150, //ms
    changeInterval: 1000, //ms
    lastPosition: undefined
  };

  this.spawnIntervalHandler = null;
  this.changeIntervalHandler = null;
  this.environmentIntervalHandler = null;

  this.tree = {
    interval: 500,
    initialX_left: 320,
    initialX_right: 470
  }
}

Generator.prototype.init = function(game) {
  this.spawn.lastPosition = game.canvas.width / 2;

  this.spawnIntervalHandler = setInterval(() => {
    this.spawn.lastPosition += this.spawn.direction * 10;
    if (
      this.spawn.lastPosition < game.geometry.environment.horizontLeft.x + 20 ||
      this.spawn.lastPosition > game.geometry.environment.horizontRight.x - 20
    ) {
      this.spawn.direction = -this.spawn.direction;
    }
    this.create(
      new Cocaine(
        this.spawn.lastPosition,
        game.geometry.environment.horizontAtY
      ),
      "cocaine"
    );
  }, this.spawn.interval);

  this.environmentIntervalHandler = setInterval(() => {

    for(let i = 0; i < 3; i++) {
      this.create(
        new Tree(this.tree.initialX_left - i*10, game.geometry.environment.horizontAtY),
        "trees"
      );
      this.create(
        new Tree(this.tree.initialX_right + i*10, game.geometry.environment.horizontAtY),
        "trees"
      );
    }  
  }, this.tree.interval);

  // this.changeIntervalHandler = setInterval(() => {
  //   this.spawn.direction = Math.random() > 0.5 ? -1 : 1;
  // }, this.spawn.changeInterval);
};

Generator.prototype.create = function(element, arrayName) {
  this.items[arrayName].push(element);
};

Generator.prototype.destroy = function(index, arrayName) {
  this.items[arrayName].splice(index, 1);
};

Generator.prototype.render = function(game) {
  this.renderArray(game, "cocaine");
  this.renderArray(game, "trees");
};

Generator.prototype.renderArray = function(game, arrayName) {
  this.items[arrayName].forEach((element, index) => {
    element.render(game);
  });
};
Generator.prototype.update = function(game) {
  this.updates["cocaine"](game);
  this.updates["trees"](game);
};

Generator.prototype.updateCocaine = function(game, arrayName) {
  this.items[arrayName].forEach((element, index) => {
    if (
      !game.player.didJump &&
      element.y <= game.player.y &&
      collision(element, game.player)
    ) {
      this.destroy(index, arrayName);
      game.sound.playSound(game.sound.sounds.PICKUP_COCAINE);
      game.player.incrementScore();
    } else if (element.y > game.canvas.height) {
      this.destroy(index, arrayName);
    } else {
      element.update(game);
    }
  });
};

Generator.prototype.updateTrees = function(game, arrayName) {
  this.items[arrayName].forEach((element, index) => {
    if (element.y > game.canvas.height) {
      this.destroy(index, arrayName);
    } else {
      element.update(game);
    }
  });
};
