//p = require('./packer.growing');
p = require('./packer.js');

var fs = require('fs');
var wg = JSON.parse(fs.readFileSync('budgetFadeaway_raw.json', 'utf8'));

var packer = new Packer(1,2);   // or:  new GrowingPacker();
//var packer = new GrowingPacker();  
scale = 1;
words =[];
blocks = [];
for(var word in wg) {
  blocks.push({w: wg[word].dotSize+0.018, h: wg[word].dotSize + 0.018, "word": word, 'dotSize': wg[word].dotSize}); 
  words.push(word);
}

function compare(a,b) {
  if (a.h > b.h)
     return -1;
  if (a.h < b.h)
    return 1;
  return 0;
}
blocks.sort(compare); // sort inputs for best results
packer.fit(blocks);

wg_new = {};
failedToFit = 0
for(var i = 0 ; i < blocks.length ; i++) {
  if(blocks[i].fit) {
    var dotSize = blocks[i].dotSize
    wg_new[blocks[i].word] = {x: blocks[i].fit.x + 0.5*dotSize, y: blocks[i].fit.y+0.5*dotSize, dotSize: dotSize};
  } else {
    failedToFit++;
  }
}
console.log("failed to fit: " + failedToFit);
wg_json = JSON.stringify(wg_new);

fs.writeFile('budgetFadeaway.json', wg_json);