console.log('\n ---- util.js loaded ------\n');

module.exports.add = (x, y) =>{
    console.log('x = ' + x);
    console.log(`y = ${y}`);

    return x+y;
}