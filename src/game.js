function Game(config) {
  this.config = {
    canvasId: config || "display",
    fps: config || 60,
    mute: true,
    gravity: 0.5,
    friction: 0.5,
    jumpImpulse: 10,
    groundPoint: 500,
    leftBorder: 150,
    rightBorder: 650,   
  };

  this.time = {
    now: 0,
    then: performance.now(),
    interval: 1000 / 60,
    delta: 0
  };

  this.cache = {};
}

Game.prototype.addToCache = async function(id, graphicSrc) {
  console.log("Caching...");
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
      width: 32,
      height: 32,
      radius: 16,
    },
    environment: {
      width: this.canvas.width,
      height: this.canvas.height,
      vertex: {
        x: this.canvas.width/2,
        y: 250,
      },
      horizontPoint: this.canvas.height/2,
      horizontLeft: 350,
      horizontRight: 450,
    }
  }

  this.environment = new Environment();
  this.controls = new Controls();
  this.player = new Player();
  this.generator = new Generator();
  this.sound = new Sound();

  let cached = Promise.all([
    this.addToCache("cocaine", "src/cocaine.png"),
    this.addToCache("tree", "src/tree.svg")
  ]);

  cached.then(() => {
    this.generator.init(this);
    this.player.init(this);
    this.controls.init();
    this.sound.init();
    this.loop();
  });
};

Game.prototype.loop = function(time) {
  var t = this.time;

  t.now = time;
  t.delta = t.now - t.then;

  if (t.delta > t.interval) {
    t.then = t.now - (t.delta % t.interval);
  }
  this.update();
  this.render();
  requestAnimationFrame(this.loop.bind(this));
};

Game.prototype.render = function() {
  var game = this;
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.environment.render(game);
  this.generator.render(game);
  this.player.render(game);
};

Game.prototype.update = function(delta) {
  var game = this;
  this.generator.update(game);
  this.player.update(game);
};
