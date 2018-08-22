/**
 * Linear interpolation
 * Usage: lerp(0, 100, 0.5); // 50
 */
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
