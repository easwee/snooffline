function Game(config) {
  this.config = {
    canvasId: config || "display",
    fps: config || 60,
    mute: false,
    gravity: 0.5,
    friction: 0.5,
    jumpImpulse: 10,
    groundPoint: 500,
    leftBorder: 150,
    rightBorder: 650,
    overdoseLimit: 2000
  };

  this.time = {
    now: 0,
    then: performance.now(),
    interval: 1000 / 60,
    delta: 0
  };

  this.cache = {};
  this.overdosed = false;

  this.paused = false;
}

Game.prototype.addToCache = async function(id, graphicSrc) {
  return new Promise((resolve, reject) => {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var graphic = new Image();

    graphic.src = graphicSrc;
    graphic.onload = () => {
      canvas.width = graphic.width;
      canvas.height = graphic.height;
      context.drawImage(graphic, 0, 0);
      this.cache[id] = canvas;
      resolve();
    };
  });
};

Game.prototype.init = function() {
  this.canvas = document.getElementById(this.config.canvasId);
  this.canvas.width = 800; // window.innerWidth;
  this.canvas.height = 600; // window.innerHeight;
  this.ctx = this.canvas.getContext("2d");

  this.geometry = {
    player: {
      x: 400,
      y: 200,
      width: 50,
      height: 90,
      radius: 16
    },
    environment: this.calculateEnvironment({
      x: this.canvas.width / 2,
      y: 150
    })
  };

  this.windowBlurHandler = window.onblur = () => {
    this.paused = true;
    this.sound.stopMusic();
  };

  this.environment = new Environment();
  this.controls = new Controls();
  this.player = new Player();
  this.generator = new Generator();
  this.sound = new Sound();

  let cached = Promise.all([
    this.addToCache("cocaine", "src/cocaine.png"),
    this.addToCache("girl1", "src/girl_1.svg"),
    this.addToCache("player", "src/player.svg"),
    this.addToCache("cards", "src/cards.svg"),
    this.addToCache("dice", "src/dice.svg")
  ]);

  cached.then(() => {
    this.environment.init(this);
    this.generator.init(this);
    this.player.init(this);
    this.controls.init(this);
    this.sound.init();
    this.loop();
  });
};

Game.prototype.calculateEnvironment = function(focalPoint) {
  const env = {
    width: this.canvas.width,
    height: this.canvas.height,
    horizontAtY: this.canvas.height / 3,
    focalPoint,
    bottomLeft: { x: 0, y: this.canvas.height },
    bottomRight: { x: this.canvas.width, y: this.canvas.height }
  };

  env.horizontLeft = pointAtY(env.focalPoint, env.bottomLeft, env.horizontAtY);
  env.horizontRight = pointAtY(
    env.focalPoint,
    env.bottomRight,
    env.horizontAtY
  );
  return env;
};

Game.prototype.loop = function(time) {
  if (!this.paused) {
    var t = this.time;

    t.now = time;
    t.delta = t.now - t.then;

    if (t.delta > t.interval) {
      t.then = t.now - (t.delta % t.interval);
    }
    this.update();
    this.render();
  } else {
    if(this.overdosed) {
      this.renderOverdose();
    } else {
      this.renderPause();
    }
  }
  requestAnimationFrame(this.loop.bind(this));
};

Game.prototype.render = function() {
  var game = this;
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.environment.render(game);
  this.generator.render(game);
  this.player.render(game);
};

Game.prototype.renderPause = function() {
  var game = this;
  this.environment.drawPause(game);
};

Game.prototype.renderOverdose = function() {
  var game = this;
  this.environment.drawOverdose(game);
};

Game.prototype.update = function(delta) {
  var game = this;
  this.generator.update(game);
  this.player.update(game);
};

Game.prototype.hasOverdosed = function() {
  this.paused = true;
  this.sound.stopMusic();
  this.overdosed = true;
}