const fs = require('fs');

let rawdata = fs.readFileSync('export').toString();
let data = JSON.parse(rawdata.replace(/\\n/g, '')).quotes;

let processed = new Array();
let author = new Array();
while(data[0]) {
    let element = data.shift();
    if (!author[element.author]) {
        author[element.author] = new Array();
    }
    processed.push(element);
    author[element.author].push(element.quote);
    let i = 0;
    while(i < data.length) {
        if (data[i].quote.toLowerCase() == element.quote.toLowerCase()) {
            data.splice(i, 1);
        } else {
            i++;
        }
    }
};

//var stdout = JSON.stringify({quotes: processed});
var stdout = JSON.stringify(processed);
fs.writeFile("process.json", stdout, function (err) {
    if (err) return console.log(err);
    console.log('win!');
  });