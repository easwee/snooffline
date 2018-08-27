function Environment() {
  this.switch = 0;
  this.treeTicker = 0;
}

Environment.prototype.addToCache = async function(id, graphicSrc) {
  console.log("Caching...");
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
  this.drawCocaine(game);
};

Environment.prototype.drawBackground = function(game) {
  game.ctx.fillStyle = "black";
  game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
};

Environment.prototype.drawRoad = function(game) {
  game.ctx.strokeStyle = "#FF0000";
  game.ctx.beginPath();
  game.ctx.moveTo(0, 600);
  game.ctx.lineTo(350, 300);
  game.ctx.moveTo(800, 600);
  game.ctx.lineTo(450, 300);
  game.ctx.moveTo(0, 300);
  game.ctx.lineTo(800, 300);
  game.ctx.stroke();
};

Environment.prototype.drawTrees = function(game) {
  if(230 + this.treeTicker > game.canvas.height) this.treeTicker = 0;
  
  for (let i = 0; i < 4; i++) {
    let treeY = 260 + this.treeTicker + i*80;
    if(treeY > game.canvas.height) treeY =  260 - game.canvas.height + treeY;

    const treeX = game.canvas.width / 2 - treeY;
    game.ctx.drawImage(game.cache["tree"], treeX/.6, treeY, .25*treeY, .25*treeY);
  }

  this.treeTicker++;
};

Environment.prototype.drawCocaine = function(game) {
  for (var i = -game.cache["cocaine"].height; i < game.canvas.height; i += 50) {
    game.ctx.drawImage(
      game.cache["cocaine"],
      ~~(
        game.canvas.width / 2 -
        (0.1 * i) / 2 -
        game.cache["cocaine"].width / 2
      ),
      i + this.switch,
      ~~(game.cache["cocaine"].width + 0.1 * i),
      ~~(game.cache["cocaine"].height + 0.1 * i)
    );
  }
  this.switch = this.switch ? 0 : 2;
};
