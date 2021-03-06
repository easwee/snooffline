/**
 * Circular collision
 * Usage: collision({x: 10, y: 20, radius: 10}, {x: 150, y: 250, radius: 20}}); // false
 */
window.collision = function collision(c1, c2) {
  var dx = c1.x - c2.x;
  var dy = c1.y - c2.y;
  var dist = c1.radius + c2.radius;

  return dx * dx + dy * dy <= dist * dist;
};

/**
 * Get point on line at y
 * Usage: pointAtY({x: 10, y: 20}, {x: 150, y: 250}, y);
 */
window.pointAtY = function pointAtY(p1, p2, y) {
  if (p1.x - p2.x === 0) return { x: p1.x, y: y };
  const k = (p1.y - p2.y) / (p1.x - p2.x);
  const n = p1.y - k * p1.x;
  return { x: (y - n) / k, y: y };
};

/**
 * Get point on line at x
 * Usage: pointAtY({x: 10, y: 20}, {x: 150, y: 250}, y);
 */
window.pointAtX = function pointAtX(p1, p2, x) {
  const k = (p1.y - p2.y) / (p1.x - p2.x);
  const n = p1.y - k * p1.x;
  return { x: x, y: x * k + n };
};
