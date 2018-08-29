function Environment() {
  this.switch = 0;
  this.ticker = 0;
}

Environment.prototype.addToCache = async function(id, graphicSrc) {
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

Environment.prototype.render = function(game) {
  this.drawBackground(game);
  this.drawRoad(game);
  this.drawTrees(game);
};

Environment.prototype.drawBackground = function(game) {
  game.ctx.fillStyle = "black";
  game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
  game.ctx.fillStyle = "red";
  game.ctx.font = "30px Arial";
  game.ctx.fillText(`Snooffline`, 10, 30);
  game.ctx.font = "20px Arial";
  game.ctx.fillText(`Score: ${game.player.score}`, 10, 60);
};

Environment.prototype.drawRoad = function(game) {
  const env = game.geometry.environment;
  game.ctx.strokeStyle = "#FF0000";
  game.ctx.beginPath();
  //Horizon point is at [400, 250]
  //Left lane
  game.ctx.moveTo(0, game.canvas.height);
  game.ctx.lineTo(env.horizontLeft.x, env.horizontLeft.y);
  //Mid lanes
  for(let i = 0; i < 9; ++i) {
    const offset = i*(env.width/9);
    game.ctx.moveTo(offset, game.canvas.height);
    game.ctx.lineTo(pointAtY(env.focalPoint, {x: env.bottomLeft.x+offset, y: env.bottomLeft.y }, env.horizontAtY).x, env.horizontLeft.y);
  }
  //Right lane
  game.ctx.moveTo(game.canvas.width, game.canvas.height);
  game.ctx.lineTo(env.horizontRight.x, env.horizontRight.y);

  //Road lines
  const numLines = 20;
  const tick = game.time.now%numLines;
  for(let i = 0; i < numLines; ++i) {
    const Y = env.horizontAtY + i*20 + tick;
    const start = pointAtY(env.focalPoint, env.bottomLeft , Y)
    const end = pointAtY(env.focalPoint, env.bottomRight , Y)
    game.ctx.moveTo(start.x, start.y);
    game.ctx.lineTo(end.x, end.y);
  }

  //Horizon
  game.ctx.moveTo(0, env.horizontAtY);
  game.ctx.lineTo(game.canvas.width, env.horizontAtY);

  game.ctx.stroke();
};

Environment.prototype.drawTrees = function(game) {
  const env = game.geometry.environment;

  const originLeft = {x: env.horizontLeft.x - 50, y: env.horizontAtY};
  const originRight = {x: env.horizontRight.x + 50, y: env.horizontAtY};

  if (env.horizontAtY + this.ticker > game.canvas.height) this.ticker = 0;

  for (let i = 0; i < 6; i++) {
    let treeY = env.horizontAtY + this.ticker + i*60;
    if (treeY > game.canvas.height) treeY = 260 - game.canvas.height + treeY;

    const treeLoc = pointAtY(env.focalPoint, env.bottomLeft , treeY)
    const size = treeY/5
    game.ctx.drawImage(
      game.cache["tree"],
      treeLoc.x - size/2 - 100,
      treeLoc.y - size/2,
      size,
      size
    );
  }

  for (let i = 0; i < 6; i++) {
    let treeY = env.horizontAtY + this.ticker + i*60;
    if (treeY > game.canvas.height) treeY = 260 - game.canvas.height + treeY;

    const treeLoc = pointAtY(env.focalPoint, env.bottomRight , treeY)
    const size = treeY/5
    game.ctx.drawImage(
      game.cache["tree"],
      treeLoc.x - size/2 + 100,
      treeLoc.y - size/2,
      size,
      size
    );
  }

  this.ticker++;
};
