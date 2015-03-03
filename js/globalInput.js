module.exports = function (graphics) {
  var addWheelListener = require('./lib/addWheelListener');
  var bf = require('./budgetFadeaway');
  var geohash = require('ngeohash');
  var graphGraphics = graphics.graphGraphics;
  var $ = require('jquery');
  
  addWheelListener(graphics.domContainer, function (e) {
    zoom(e.clientX, e.clientY, e.deltaY < 0);
  });

  addDragNDrop();

  var getGraphCoordinates = (function () {
    var ctx = {
      global: { x: 0, y: 0} // store it inside closure to avoid GC pressure
    };

    return function (x, y) {
      ctx.global.x = x; ctx.global.y = y;
      return PIXI.InteractionData.prototype.getLocalPosition.call(ctx, graphGraphics);
    }
  }());

  function zoom(x, y, isZoomIn) {
    direction = isZoomIn ? 1 : -1;
    var factor = (1 + direction * 0.1);
    graphGraphics.scale.x *= factor;
    graphGraphics.scale.y *= factor;

    // Technically code below is not required, but helps to zoom on mouse
    // cursor, instead center of graphGraphics coordinates
    var beforeTransform = getGraphCoordinates(x, y);
    graphGraphics.updateTransform();
    var afterTransform = getGraphCoordinates(x, y);

    graphGraphics.position.x += (afterTransform.x - beforeTransform.x) * graphGraphics.scale.x;
    graphGraphics.position.y += (afterTransform.y - beforeTransform.y) * graphGraphics.scale.y;
    graphGraphics.updateTransform();
  }
  
  function findKeysForSearchTerm(searchTerm) {
    matchedKeys = []
    for(var key in bf.budgetFadeaway) {
      if(key.toLowerCase().search(searchTerm.toLowerCase()) >= 0) {
        matchedKeys.push(key);
      }
    }
    return matchedKeys;
  }
  lastSearchPoints = [];
  $("#search-form").submit(function(event) {
    event.preventDefault();
    var searchTerm = $("#search-term").val();
    $("#search-term").val("");
    
    if(searchTerm) {
      matchedKeys = findKeysForSearchTerm(searchTerm);
    } else {
      matchedKeys = [];
    }
    
    lastSearchPoints.forEach(function(elem, i, arr) {
      graphGraphics.removeChild(elem);
    });
    
    lastSearchPoints = [];
    
    for(var i = 0; i < matchedKeys.length; i++) {
      var taggedText = new PIXI.Text("", {font:"bold 25px Helvetica", fill:"yellow"});
      wordPos = bf.budgetFadeawayToGraphicsCoordinates(bf.budgetFadeaway[matchedKeys[i]].x, bf.budgetFadeaway[matchedKeys[i]].y);
      
      var taggedPoint = new PIXI.Graphics();
      taggedPoint.beginFill(0xffc0cb);
      taggedPoint.drawCircle(wordPos.x, wordPos.y, 4);    
      graphGraphics.addChild(taggedPoint);
      lastSearchPoints.push(taggedPoint);
      
      var highlighter = new PIXI.Graphics();
      graphGraphics.addChild(highlighter);
    
      highlighter.clear();
      var dotSizes = bf.getScaledDotSizes(bf.budgetFadeaway[matchedKeys[i]].dotSize);
      positions = bf.budgetFadeawayToGraphicsCoordinates(bf.budgetFadeaway[matchedKeys[i]].x, bf.budgetFadeaway[matchedKeys[i]].y);
      highlighter.beginFill(0xffc0cb);
      highlighter.drawRect(positions.x-dotSizes.x/2, positions.y-dotSizes.y/2, dotSizes.x, dotSizes.y);
      highlighter.endFill();
      lastSearchPoints.push(highlighter);
      
    }
  });

  function addDragNDrop() {
    var stage = graphics.stage;
    stage.setInteractive(true);
    
    var highlighter = new PIXI.Graphics();
    stage.addChild(highlighter);
    
    var text = new PIXI.Text("", {font:"20px Helvetica", fill:"white", stroke: "black", strokeThickness: 2});
    text.position.x = 50;
    text.position.y = window.innerHeight - 100;
    stage.addChild(text);

    var isDragging = false,
        prevX, prevY;

    stage.mousedown = function (moveData) {
      var pos = moveData.global;
      prevX = pos.x; prevY = pos.y;
      isDragging = true;
    };
    
    stage.mousemove = function (moveData) {
      var pos = moveData.global;
      var graphPos = getGraphCoordinates(pos.x, pos.y);
      var word = bf.getWord(graphPos.x, graphPos.y);
      text.setText(word);
      
      if(word) {
        highlightPos = bf.budgetFadeawayToGraphicsCoordinates(bf.budgetFadeaway[word].x, bf.budgetFadeaway[word].y);
        highlighter.visible = true;
        highlighter.scale.x = graphGraphics.scale.x;
        highlighter.scale.y = graphGraphics.scale.y;
        highlighter.position.x = graphGraphics.position.x;
        highlighter.position.y = graphGraphics.position.y;
        highlighter.clear();
        var dotSizes = bf.getScaledDotSizes(bf.budgetFadeaway[word].dotSize);
        positions = bf.budgetFadeawayToGraphicsCoordinates(bf.budgetFadeaway[word].x, bf.budgetFadeaway[word].y);
        highlighter.beginFill(0xFFFFFF);
        highlighter.drawRect(positions.x-dotSizes.x/2, positions.y-dotSizes.y/2, dotSizes.x, dotSizes.y);
        highlighter.endFill();
      
      } else {
        highlighter.visible = false;
      }
      
      if (!isDragging) {
        return;
      }
      var dx = pos.x - prevX;
      var dy = pos.y - prevY;

      graphGraphics.position.x += dx;
      graphGraphics.position.y += dy;
      prevX = pos.x; prevY = pos.y;
    };

    stage.mouseup = function (moveDate) {
      isDragging = false;
    };
  }
}
