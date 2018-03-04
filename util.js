const _ = require('lodash')

/** Utility function to print array elements with index */
const arrayPrinter = (element, index) => {

  if(_.isString(element))
  console.log(`result [${index}]= ${element}`)
  
  else if(_.isObject(element)){
    keys = _.keys(element)
    keys.forEach((key,index) => arrayPrinter(element[key],index))
  }
}


module.exports.add = (x, y) =>{
    console.log('x = ' + x);
    console.log(`y = ${y}`);

    return x+y;
}


module.exports.arrayPrinter = arrayPrinter;
