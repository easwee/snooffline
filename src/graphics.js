function Graphics() {
  this.cache = {};
  this.switch = 0;
}

Graphics.prototype.addToCache = async function(id, graphicSrc) {
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

Graphics.prototype.render = function(canvas, ctx) {
  this.drawBackground(canvas, ctx);
  this.drawRoad(canvas, ctx);
};

Graphics.prototype.drawBackground = function(canvas, ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

Graphics.prototype.drawRoad = function(canvas, ctx) {
  for (var i = -this.cache["cocaine"].height; i < canvas.height; i += 10) {
    ctx.drawImage(
      this.cache["cocaine"],
      canvas.width / 2 - (0.1 * i) / 2 - this.cache["cocaine"].width / 2,
      i + this.switch,
      this.cache["cocaine"].width + 0.1 * i,
      this.cache["cocaine"].height + 0.1 * i
    );
  }
  this.switch = this.switch ? 0 : 2;
};

// Graphics.prototype.generatePixels = function(offset) {
//   for (var x = 0; x < this.canvas.width; x++) {
//     for (var y = 0; y < this.canvas.height; y++) {
//       // Get the pixel index
//       var pixelindex = (y * this.canvas.width + x) * 4;

//       // Generate a xor pattern with some random noise
//       var red = (x + offset) % 256 ^ (y + offset) % 256;
//       var green = (2 * x + offset) % 256 ^ (2 * y + offset) % 256;
//       var blue = 50;

//       // Rotate the colors
//       blue = blue % 256;

//       // Set the pixel data
//       this.roadPixelData.data[pixelindex] = red; // Red
//       this.roadPixelData.data[pixelindex + 1] = green; // Green
//       this.roadPixelData.data[pixelindex + 2] = blue; // Blue
//       this.roadPixelData.data[pixelindex + 3] = 255; // Alpha
//     }
//   }
// };

// this.roadPixelData = this.ctx.createImageData(
//   this.canvas.width,
//   this.canvas.height
// );
// this.generatePixels(0);
