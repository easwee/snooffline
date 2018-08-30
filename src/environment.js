function Environment() {
  this.switch = 0;
  this.buildings = {
    color: "#4744FF",
    count: 25,
    heights: []
  };
  this.lineColor = "#9B30FF";
  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext("2d");
}

Environment.prototype.init = function(game) {
  this.canvas = document.createElement("canvas");
  this.canvas.width = game.canvas.width;
  this.canvas.height = game.canvas.height;

  for (let i = 0; i < this.buildings.count; ++i) {
    this.buildings.heights.push(20 + Math.random() * 100);
  }
  debugger;
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
  debugger;
  game.ctx.drawImage(this.canvas, 0, 0);
  this.drawRoadLines(game);
};

Environment.prototype.drawBackground = function(game) {
  const env = game.geometry.environment;
  debugger;
  game.ctx.fillStyle = "black";
  game.ctx.fillRect(0, 0, env.width, env.height);
  this.ctx.fillStyle = this.lineColor;
  this.ctx.font = "30px Arial";
  this.ctx.fillText(`Snooffline`, 10, 30);
  this.ctx.font = "20px Arial";
  this.ctx.fillText(`Score: ${game.player.score}`, 10, 60);
};

Environment.prototype.drawCity = function(game) {
  this.ctx.strokeStyle = this.buildings.color;
  for (let i = 0; i < this.buildings.count; ++i) {
    this.drawBuilding(game, i * (30 + 5), this.buildings.heights[i], 30);
  }
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
  game.ctx.shadowBlur = 10;
  game.ctx.shadowColor = "white";
  game.ctx.strokeStyle = this.lineColor;
  game.ctx.beginPath();
  //Left lane
  game.ctx.moveTo(0, game.canvas.height);
  game.ctx.lineTo(env.horizontLeft.x, env.horizontLeft.y);
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

    game.ctx.moveTo(offset, env.horizontAtY);
    game.ctx.lineTo(
      lineEnd,
      pointAtX(env.focalPoint, { x: offset, y: env.horizontAtY }, lineEnd).y
    );
  }
  //Right lane
  game.ctx.moveTo(game.canvas.width, game.canvas.height);
  game.ctx.lineTo(env.horizontRight.x, env.horizontRight.y);

  //Road lines
  // const numLines = 20;
  // const tick = game.time.now % numLines;
  // for (let i = 0; i < numLines; ++i) {
  //   const Y = env.horizontAtY + i * 20 + tick;
  //   const start = pointAtY(env.focalPoint, env.bottomLeft, Y);
  //   const end = pointAtY(env.focalPoint, env.bottomRight, Y);
  //   game.ctx.moveTo(start.x, start.y);
  //   game.ctx.lineTo(end.x, end.y);
  // }

  //Horizon
  game.ctx.moveTo(0, env.horizontAtY);
  game.ctx.lineTo(game.canvas.width, env.horizontAtY);

  game.ctx.stroke();
};

Environment.prototype.drawRoadLines = function(game) {
  const env = game.geometry.environment;
  const numLines = 20;
  const tick = game.time.now % numLines;
  for (let i = 0; i < numLines; ++i) {
    const Y = env.horizontAtY + i * 20 + tick;
    const start = pointAtY(env.focalPoint, env.bottomLeft, Y);
    const end = pointAtY(env.focalPoint, env.bottomRight, Y);
    game.ctx.moveTo(start.x, start.y);
    game.ctx.lineTo(end.x, end.y);
  }
};
