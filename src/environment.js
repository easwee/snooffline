function Environment() {
  this.switch = 0;
  this.buildings = {
    color: "#4744FF",
    count: 35,
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
    this.buildings.heights.push(15 + Math.random() * 90);
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
    this.drawBuilding(game, i * 30 - 5, this.buildings.heights[i], 30);
    this.drawBuilding(game, i * 33 + 5, this.buildings.heights[i] + 10, 30);
  }
};

Environment.prototype.drawScore = function(game) {
  this.ctx.shadowBlur = 0;
  game.ctx.fillStyle = this.lineColor;
  game.ctx.font = "22px monospace";
  game.ctx.textBaseline = "middle";
  game.ctx.textAlign = "center";
  game.ctx.fillText(`-snooffline-`, this.canvas.width / 2, 30);
  game.ctx.font = "14px monospace";
  game.ctx.fillText(
    `Total snooffed: ${(~~game.player.totalScore).toFixed(2)}mg`,
    this.canvas.width / 2,
    60
  );

  game.ctx.fillText(
    `${(~~game.player.score * 0.00025).toFixed(2)} mg/L`,
    this.canvas.width / 2,
    80
  );

  for (let i = 1; i < game.config.scoreIncrementFactor; i++) {
    game.ctx.drawImage(
      game.cache["heroin"],
      this.canvas.width - 25 - 25 * i,
      this.canvas.height - 50,
      40,
      40
    );
  }

  //Overdose meter
  const rating = game.player.score / 5;
  game.ctx.strokeStyle = this.lineColor;
  game.ctx.strokeRect(this.canvas.width / 2 - 200, 100, 400, 15);

  game.ctx.fillStyle = "white";
  game.ctx.fillRect(this.canvas.width / 2 - 200, 100, rating, 15);
};

Environment.prototype.drawPause = function(game) {
  game.ctx.fillStyle = "black";
  game.ctx.fillRect(0, 10, this.canvas.width, 30);
  game.ctx.fillStyle = this.lineColor;
  game.ctx.font = "22px monospace";
  game.ctx.fillText(`-paused-press-P-to-continue-`, this.canvas.width / 2, 30);
};

Environment.prototype.drawOverdose = function(game) {
  game.ctx.fillStyle = "black";
  game.ctx.fillRect(0, 10, this.canvas.width, 30);
  game.ctx.fillStyle = this.lineColor;
  game.ctx.font = "22px monospace";
  game.ctx.fillText(
    `-overdosed-press-R-to-restart-`,
    this.canvas.width / 2,
    30
  );
};

Environment.prototype.drawUnderdose = function(game) {
  game.ctx.fillStyle = "black";
  game.ctx.fillRect(0, 10, this.canvas.width, 30);
  game.ctx.fillStyle = this.lineColor;
  game.ctx.font = "22px monospace";
  game.ctx.fillText(
    `-depression-kicked-in-press-R-to-restart-`,
    this.canvas.width / 2,
    30
  );
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
