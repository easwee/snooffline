function Engine(config) {
  this.config = {
    canvasId: config || "display",
    fps: config || 60
  };

  this.time = {
    now: 0,
    then: performance.now(),
    interval: 1000 / 60,
    delta: 0
  };
}

Engine.prototype.init = function() {
  this.canvas = document.getElementById(this.config.canvasId);
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx = this.canvas.getContext("2d");

  this.loop();
};

Engine.prototype.loop = function() {
  requestAnimationFrame(this.loop.bind(this));
  var t = this.time;

  t.now = performance.now();
  t.delta = t.now - t.then;

  if (t.delta > t.interval) {
    t.then = t.now - (t.delta % t.interval);
    // draw and update here
  }
};
