var fs=require('fs');

var readStream = fs.createReadStream('data.txt');

var writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);


console.log('\n------- END -------\n')