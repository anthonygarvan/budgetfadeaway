//p = require('./packer.growing');
p = require('./packer.js');

var fs = require('fs');
var wg = JSON.parse(fs.readFileSync('wordGalaxy_raw.json', 'utf8'));

var packer = new Packer(1,1);   // or:  new GrowingPacker();
  
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
for(var i = 0 ; i < blocks.length ; i++) {
  if(blocks[i].fit) {
    var dotSize = blocks[i].dotSize
    wg_new[blocks[i].word] = {x: blocks[i].fit.x + 0.5*dotSize, y: blocks[i].fit.y+0.5*dotSize, dotSize: dotSize};
  }
}

wg_json = JSON.stringify(wg_new);

fs.writeFile('wordGalaxy.json', wg_json);