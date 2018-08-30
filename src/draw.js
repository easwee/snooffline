function drawCocaine(game) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 6;
  canvas.height = 3;

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  setPixel(imageData, 2, 0, 255, 255, 255, 255);
  setPixel(imageData, 3, 0, 255, 255, 255, 255);

  setPixel(imageData, 1, 1, 255, 255, 255, 255);
  setPixel(imageData, 2, 1, 255, 255, 255, 255);
  setPixel(imageData, 3, 1, 255, 255, 255, 255);
  setPixel(imageData, 4, 1, 255, 255, 255, 255);

  setPixel(imageData, 0, 2, 255, 255, 255, 255);
  setPixel(imageData, 1, 2, 255, 255, 255, 255);
  setPixel(imageData, 2, 2, 255, 255, 255, 255);
  setPixel(imageData, 3, 2, 255, 255, 255, 255);
  setPixel(imageData, 4, 2, 255, 255, 255, 255);
  setPixel(imageData, 5, 2, 255, 255, 255, 255);

  ctx.putImageData(imageData, 0, 0);

  return canvas;
}
