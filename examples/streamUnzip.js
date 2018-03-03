var fs=require('fs');
var zlib = require('zlib');

fs
  .createReadStream('output.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('output_unzipped.txt'));


  console.log(__filename);
  console.log(__dirname);

console.log('\n------- END -------\n')