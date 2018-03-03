var fs=require('fs');

var data = fs.readFileSync('data.txt');

console.log("data = \n  " + data.toString());
console.log("\n------- File Read Op finished--------\n");


fs.readFile('data.txt', (err, data) =>{

    if(!err)
    console.log('DATA = \n  ' + data.toString());
    else console.log('error in reading given file' + err.toString());
});

console.log('\n******* PROGRAM ENDDED ***********\n');