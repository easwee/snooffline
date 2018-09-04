function Generator(config) {
  this.items = {
    cocaine: [],
    decorations: [],
    bonus: []
  };

  this.updates = {
    cocaine: game => this.updateCocaine(game, "cocaine"),
    decorations: game => this.updateDecorations(game, "decorations"),
    bonus: game => this.updateBonus(game, "bonus")
  };

  this.spawn = {
    direction: -1, //Left -1, Right 1
    interval: 20, //ms
    changeInterval: 100, //ms
    lastPosition: undefined,
    edgeOffset: 20
  };

  this.spawnIntervalHandler = null;
  this.changeIntervalHandler = null;
  this.environmentIntervalHandler = null;
  this.bonusIntervalHandler = null;

  this.decoration = {
    interval: 1000,
    initialX_left: 300,
    initialX_right: 500,
    switch: -1
  };

  this.bonus = {
    interval: 30000
  };
}

Generator.prototype.init = function(game) {
  this.spawn.lastPosition = game.canvas.width / 2;
  this.spawnIntervalHandler = setInterval(() => {
    if (game.paused) return;
    this.spawn.lastPosition += this.spawn.direction * 1;
    if (
      this.spawn.lastPosition <=
        game.geometry.environment.horizontLeft.x + this.spawn.edgeOffset ||
      this.spawn.lastPosition >=
        game.geometry.environment.horizontRight.x - this.spawn.edgeOffset
    ) {
      this.spawn.direction = -this.spawn.direction;
    }

    if (
      this.spawn.lastPosition <=
      game.geometry.environment.horizontLeft.x + this.spawn.edgeOffset
    ) {
      this.spawn.lastPosition =
        game.geometry.environment.horizontLeft.x + this.spawn.edgeOffset;
    }

    if (
      this.spawn.lastPosition >=
      game.geometry.environment.horizontRight.x - this.spawn.edgeOffset
    ) {
      this.spawn.lastPosition =
        game.geometry.environment.horizontRight.x - this.spawn.edgeOffset;
    }

    this.create(
      new Cocaine(
        this.spawn.lastPosition,
        game.geometry.environment.horizontAtY,
        this.items["cocaine"][this.items["cocaine"].length - 1]
      ),
      "cocaine"
    );
  }, this.spawn.interval);

  this.environmentIntervalHandler = setInterval(() => {
    if (game.paused) return;

    for (let i = 0; i < 1; i++) {
      if (this.decoration.switch > 0) {
        this.create(
          new Decoration(
            this.decoration.initialX_left - i * 10,
            game.geometry.environment.horizontAtY
          ),
          "decorations"
        );
      } else {
        this.create(
          new Decoration(
            this.decoration.initialX_right + i * 10,
            game.geometry.environment.horizontAtY
          ),
          "decorations"
        );
      }
      this.decoration.switch = -this.decoration.switch;
    }
  }, this.decoration.interval);

  this.changeIntervalHandler = setInterval(() => {
    if (game.paused) return;
    this.spawn.direction = Math.random() > 0.5 ? -1 : 1;
  }, this.spawn.changeInterval);

  this.bonusIntervalHandler = setInterval(() => {
    this.create(
      new Decoration(
        (game.canvas.width / 2) -33 + Math.floor(Math.random() * 3)*33,
        game.geometry.environment.horizontAtY,
        'heroin'
      ),
      "bonus"
    );
  }, this.bonus.interval);
};

Generator.prototype.create = function(element, arrayName) {
  this.items[arrayName].push(element);
};

Generator.prototype.destroy = function(index, arrayName) {
  const current = this.items[arrayName][index];
  const next = this.items[arrayName][index + 1];
  if (next && current === next.previous) {
    next.previous = undefined;
  }

  this.items[arrayName].splice(index, 1);
};

Generator.prototype.render = function(game) {
  this.renderLine(game, "cocaine");
  this.renderArray(game, "decorations");
  this.renderArray(game, "bonus");
};

Generator.prototype.renderLine = function(game, arrayName) {
  const ctx = game.ctx;

  ctx.save();
  ctx.shadowBlur = 20;
  ctx.shadowColor = "white";
  ctx.strokeStyle = "white";
  ctx.lineCap = "round";
  ctx.lineWidth = 5;

  this.items[arrayName].forEach((element, index) => {
    const previousElement = element.previous;
    if (previousElement) {
      ctx.beginPath();
      ctx.moveTo(previousElement.x, previousElement.y);
      ctx.lineTo(element.x, element.y);
      ctx.stroke();
    }
  });
  ctx.restore();
};

Generator.prototype.renderArray = function(game, arrayName) {
  this.items[arrayName].forEach((element, index) => {
    element.render(game);
  });
};

Generator.prototype.update = function(game) {
  this.updates["cocaine"](game);
  this.updates["decorations"](game);
  this.updates["bonus"](game);
};

Generator.prototype.updateCocaine = function(game, arrayName) {
  this.items[arrayName].forEach((element, index) => {
    if (
      !game.player.didJump &&
      element.y <= game.player.y &&
      collision(element, game.player)
    ) {
      this.destroy(index, arrayName);
      game.sound.playSound(game.sound.sounds.PICKUP_COCAINE, game.player.score);
      game.player.incrementScore(game);
    } else if (element.y > game.canvas.height) {
      this.destroy(index, arrayName);
      game.player.decrementScore(game);
    } else {
      element.update(game);
    }
  });
};

Generator.prototype.updateDecorations = function(game, arrayName) {
  this.items[arrayName].forEach((element, index) => {
    if (element.y > game.canvas.height) {
      this.destroy(index, arrayName);
    } else {
      element.update(game);
    }
  });
};

Generator.prototype.updateBonus = function(game, arrayName) {
  this.items[arrayName].forEach((element, index) => {
    if (
      !game.player.didJump &&
      element.y <= game.player.y &&
      collision(element, game.player)
    ) {
      this.destroy(index, arrayName);
      game.sound.playSound(game.sound.sounds.PICKUP_BONUS, game.player.score);
      game.player.bonusPickup(game);
    } else if (element.y > game.canvas.height) {
      this.destroy(index, arrayName);
    } else {
      element.update(game);
    }
  });
};
