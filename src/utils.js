/**
 * Linear interpolation
 * Usage: lerp(0, 100, 0.5); // 50
 */
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

/**
 * Circular collision
 * Usage: collision({x: 10, y: 20, radius: 10}, {x: 150, y: 250, radius: 20}}); // false
 */
function collision(c1, c2) {
  var dx = c1.x - c2.x;
  var dy = c1.y - c2.y;
  var dist = c1.radius + c2.radius;

  return dx * dx + dy * dy <= dist * dist;
}

/**
 * Get point on line at y
 * Usage: pointAtY({x: 10, y: 20}, {x: 150, y: 250}, y);
 */
function pointAtY(p1, p2, y) {
  const k = (p1.y - p2.y) / (p1.x - p2.x);
  const n = p1.y - k * p1.x;
  return { x: (y - n) / k, y: y };
}

/**
 * Get point on line at x
 * Usage: pointAtY({x: 10, y: 20}, {x: 150, y: 250}, y);
 */
function pointAtX(p1, p2, x) {
  const k = (p1.y - p2.y) / (p1.x - p2.x);
  const n = p1.y - k * p1.x;
  return { x: x, y: x * k + n };
}

/**
 * Set a single pixel on image data
 * Usage: setPixel(imageData, 11, 12, 255, 255, 255, 1); // white pixel at x:11, y:12
 */
function setPixel(imageData, x, y, r, g, b, a) {
  index = (x + y * imageData.width) * 4;
  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}
