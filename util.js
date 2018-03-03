console.log('\n ---- util.js loaded ------\n');

/** Utility function to print array elements with index */
const arrayPrinter = (element, index) => {
  console.log(`result [${index}]= ${element}`)
}


module.exports.add = (x, y) =>{
    console.log('x = ' + x);
    console.log(`y = ${y}`);

    return x+y;
}


module.exports.arrayPrinter = arrayPrinter;
