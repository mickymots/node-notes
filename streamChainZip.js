var fs=require('fs');
var zlib = require('zlib');

var readStream = fs.createReadStream('data.txt');

var writeStream = fs.createWriteStream('output.txt.gz');

readStream.pipe(zlib.createGzip()).pipe(writeStream);

console.log("\n---------zipping finished -------\n");


console.log('\n------- END -------\n')