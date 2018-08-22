function Engine(config) {
  this.config = {
    canvasId: config || "display",
    fps: config || 60,
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

  this.roadPixelData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
  for (var x=0; x<this.canvas.width; x++) {
    for (var y=0; y<this.canvas.height; y++) {
        // Get the pixel index
        var pixelindex = (y * this.canvas.width + x) * 4;

        // Generate a xor pattern with some random noise
        var red = ((x) % 256) ^ ((y) % 256);
        var green = ((2*x) % 256) ^ ((2*y) % 256);
        var blue = 50 + Math.floor(Math.random()*100);

        // Rotate the colors
        blue = (blue) % 256;

        // Set the pixel data
        this.roadPixelData.data[pixelindex] = red;     // Red
        this.roadPixelData.data[pixelindex+1] = green; // Green
        this.roadPixelData.data[pixelindex+2] = blue;  // Blue
        this.roadPixelData.data[pixelindex+3] = 255;   // Alpha
    }
}

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
    this.drawBackground();
    this.drawRoad();
  }
};

Engine.prototype.drawBackground = function() {
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

Engine.prototype.drawRoad = function() {
  this.ctx.putImageData(this.roadPixelData, 0, 0);
}