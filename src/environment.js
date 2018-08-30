function Environment() {
  this.switch = 0;
  this.buildings = {
    color: "#4744FF",
    count: 25,
    heights: []
  };
  this.lineColor = "#9B30FF";
}

Environment.prototype.init = function(game) {
  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.canvas.width = game.canvas.width;
  this.canvas.height = game.canvas.height;

  for (let i = 0; i < this.buildings.count; ++i) {
    this.buildings.heights.push(20 + Math.random() * 100);
  }

  this.renderStatic(game);
};

Environment.prototype.renderStatic = function(game) {
  this.ctx.shadowBlur = 10;
  this.ctx.shadowColor = "white";
  this.drawBackground(game);
  this.drawCity(game);
  this.drawRoad(game);
};

Environment.prototype.render = function(game) {
  game.ctx.drawImage(this.canvas, 0, 0);
  this.drawRoadLines(game);
  this.drawScore(game);
};

Environment.prototype.drawBackground = function(game) {
  const env = game.geometry.environment;
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, env.width, env.height);
};

Environment.prototype.drawCity = function(game) {
  this.ctx.strokeStyle = this.buildings.color;
  for (let i = 0; i < this.buildings.count; ++i) {
    this.drawBuilding(game, i * (30 + 5), this.buildings.heights[i], 30);
  }
};

Environment.prototype.drawScore = function(game) {
  this.ctx.shadowBlur = 0;
  game.ctx.fillStyle = this.lineColor;
  game.ctx.font = "30px Arial";
  game.ctx.fillText(`Snooffline`, 10, 30);
  game.ctx.font = "20px Arial";
  game.ctx.fillText(`Score: ${game.player.score}`, 10, 60);
};

Environment.prototype.drawBuilding = function(game, x, height, width) {
  const env = game.geometry.environment;
  var poly = [
    x,
    env.horizontAtY,
    x,
    env.horizontAtY - height,
    x + width,
    env.horizontAtY - height,
    x + width,
    env.horizontAtY
  ];

  this.ctx.beginPath();
  this.ctx.moveTo(poly[0], poly[1]);
  for (item = 2; item < poly.length - 1; item += 2) {
    this.ctx.lineTo(poly[item], poly[item + 1]);
  }
  this.ctx.stroke();
};

Environment.prototype.drawRoad = function(game) {
  const env = game.geometry.environment;
  const ctx = this.ctx;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "white";
  ctx.strokeStyle = this.lineColor;
  ctx.beginPath();
  //Left lane
  ctx.moveTo(0, game.canvas.height);
  ctx.lineTo(env.horizontLeft.x, env.horizontLeft.y);
  //Mid lanes
  for (let i = 0; i < 63; ++i) {
    const offset = i * (env.width / 63);

    let lineEnd = pointAtY(
      env.focalPoint,
      { x: offset, y: env.horizontAtY },
      game.canvas.height
    ).x;

    lineEnd =
      lineEnd < 0
        ? 0
        : lineEnd > game.canvas.width
          ? game.canvas.width
          : lineEnd;

    ctx.moveTo(offset, env.horizontAtY);
    ctx.lineTo(
      lineEnd,
      pointAtX(env.focalPoint, { x: offset, y: env.horizontAtY }, lineEnd).y
    );
  }
  //Right lane
  ctx.moveTo(game.canvas.width, game.canvas.height);
  ctx.lineTo(env.horizontRight.x, env.horizontRight.y);

  //Horizon
  ctx.moveTo(0, env.horizontAtY);
  ctx.lineTo(game.canvas.width, env.horizontAtY);

  ctx.stroke();
};

Environment.prototype.drawRoadLines = function(game) {
  game.ctx.save();
  const env = game.geometry.environment;
  const numLines = 20;
  const tick = game.time.now % numLines;
  game.ctx.shadowBlur = 10;
  game.ctx.shadowColor = "white";
  game.ctx.strokeStyle = this.lineColor;

  game.ctx.beginPath();
  debugger;
  for (let i = 0; i < numLines; ++i) {
    const Y = env.horizontAtY + i * 20 + tick;
    const start = pointAtY(env.focalPoint, env.bottomLeft, Y);
    const end = pointAtY(env.focalPoint, env.bottomRight, Y);
    game.ctx.moveTo(start.x, start.y);
    game.ctx.lineTo(end.x, end.y);
  }
  game.ctx.stroke();
  game.ctx.restore();
};
