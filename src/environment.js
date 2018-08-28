function Environment() {
  this.switch = 0;
  this.treeTicker = 0;
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
  const environment = game.geometry.environment;
  game.ctx.strokeStyle = "#FF0000";
  game.ctx.beginPath();
  //Horizon point is at [400, 250]
  //Left lane
  game.ctx.moveTo(0, game.canvas.height);
  game.ctx.lineTo(environment.horizontLeft.x, environment.horizontLeft.y);
  //Right lane
  game.ctx.moveTo(game.canvas.width, game.canvas.height);
  game.ctx.lineTo(environment.horizontRight.x, environment.horizontRight.y);
  //Horizon
  game.ctx.moveTo(0, environment.horizontAtY);
  game.ctx.lineTo(game.canvas.width, environment.horizontAtY);

  game.ctx.stroke();
};

Environment.prototype.drawTrees = function(game) {
  if (230 + this.treeTicker > game.canvas.height) this.treeTicker = 0;

  // const ptA = {x: game.geometry.horizontAtY }
  // const slope = (y2 - y1)/(x2 - x1);

  for (let i = 0; i < 4; i++) {
    let treeY = 260 + this.treeTicker + i * 80;
    if (treeY > game.canvas.height) treeY = 260 - game.canvas.height + treeY;

    const treeX = game.canvas.width / 2 - treeY;
    game.ctx.drawImage(
      game.cache["tree"],
      treeX / 0.6,
      treeY,
      0.25 * treeY,
      0.25 * treeY
    );
  }

  this.treeTicker++;
};
