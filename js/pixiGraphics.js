module.exports = function (graph, layout) {
  var width = window.innerWidth,
      height = window.innerHeight - 50;

  var stage = new PIXI.Stage(0x000000, true);
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, true);
  renderer.view.style.display = "block";
  document.getElementById("galaxy").appendChild(renderer.view);

  var graphics = new PIXI.Graphics();
  graphics.position.x = 0;
  graphics.position.y = 0;

  graphics.scale.x = 1;
  graphics.scale.y = 1;
  stage.addChild(graphics);

  return {
    renderFrame: function () {
      layout.step();
      drawGraph(graphics);
      renderer.render(stage);
    },
    domContainer: renderer.view,
    graphGraphics: graphics,
    stage: stage
  };
};

bf = require('./budgetFadeaway');
function drawGraph(graphics) {
  // No magic at all: Iterate over positions array and render nodes/links
  
  var i, x, y, x1, y1;
  
    graphics.lineStyle(0);
    graphics.clear();
      
    for(var word in bf.budgetFadeaway) {
        //var dotSize = 50*wg.wordGalaxy[word].dotSize + .1;
        var dotSizes = bf.getScaledDotSizes(bf.budgetFadeaway[word].dotSize);
        if(dotSizes.x > 0) {
          positions = bf.budgetFadeawayToGraphicsCoordinates(bf.budgetFadeaway[word].x, bf.budgetFadeaway[word].y);
          graphics.beginFill(0xFFFFFF);
          graphics.drawRect(positions.x - dotSizes.x/2, positions.y - dotSizes.y/2, dotSizes.x, dotSizes.y);
          graphics.endFill();
        }
    }
}
