module.exports = function () {
  var geohash = require('ngeohash');
  var $ = require('jquery');
  geoHashDictionary = {};
  $.ajax({
       url:    window.location.href + '/../processing/budgetFadeaway.json',
       success: function(result) {
                    budgetFadeaway = result;
                    for(var word in budgetFadeaway) {
                      hash = geohash.encode(budgetFadeaway[word].x, budgetFadeaway[word].y, precision=4);
                      if(hash in geoHashDictionary) {
                        geoHashDictionary[hash].push(word);
                      } else {
                        geoHashDictionary[hash] = [word];  
                      }
                    }
                },
       async:   false
  });
  
  function graphicsToBudgetFadeawayCoordinates(x,y) {
    var scale = window.innerHeight;
    var width = window.innerWidth;
    x_out = (x - width/2)/scale + 0.5;
    y_out = y/scale;
    return {x: x_out, y: y_out};  
  }
  
  function budgetFadeawayToGraphicsCoordinates(x,y) {
    var scale = window.innerHeight;
    var width = window.innerWidth;
    x_out = scale*(x-0.5) + width/2;
    y_out = scale*y;
    return {x: x_out, y: y_out};
  }
  
  function getScaledDotSizes(dotSize) {
    var scale = window.innerHeight;
    //var width = window.innerWidth;
    x_out = scale*dotSize;
    y_out = scale*dotSize;
    return {x: x_out, y: y_out};
  }
  
  function getWord(x, y) {
    budgetFadeawayPositions = graphicsToBudgetFadeawayCoordinates(x, y);
    var hash = geohash.encode(budgetFadeawayPositions.x, budgetFadeawayPositions.y, precision=4);
    if(hash in geoHashDictionary) {
      var closestWord = "";
      var closestDistance = 1000;
      geoHashDictionary[hash].forEach(function(word, i, arr) {
        x2 = Math.pow((budgetFadeawayPositions.x - budgetFadeaway[word].x), 2);
        y2 = Math.pow((budgetFadeawayPositions.y - budgetFadeaway[word].y), 2);
        d = x2 + y2;
        
        if(d < closestDistance) {
          closestDistance = d;
          closestWord = word;
        }
      })
      return closestWord;
    }
    return "";
  }
  
  var taggedWords = {};
      taggedWords["test1"] = {"x":0.5, "y":0.5};
      taggedWords["test2"] = {"x":0.3, "y":0.3};
      
  
  function addTaggedWord(word) {
    taggedWords[word] = {"x" : Math.random(), "y": Math.random()};
  }
  
  return {
    budgetFadeaway: budgetFadeaway,
    geoHashDictionary: geoHashDictionary,
    graphicsToBudgetFadeawayCoordinates: graphicsToBudgetFadeawayCoordinates,
    budgetFadeawayToGraphicsCoordinates: budgetFadeawayToGraphicsCoordinates,
    getWord: getWord,
    getTaggedWords: function() {return taggedWords;},
    addTaggedWord: addTaggedWord,
    getScaledDotSizes: getScaledDotSizes
  };
}();