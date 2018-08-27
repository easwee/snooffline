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
