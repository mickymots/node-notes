const util = require('./util');
const _ = require('lodash');

console.log('\n----- app started ------\n');

const res = util.add(1,1);

const resultIntIsString = _.isString(1);
const resultBooleanIsString = _.isString(true);
const resultStringIsString = _.isString("true")

const resultArray= [resultIntIsString, resultBooleanIsString, resultStringIsString];



resultArray.forEach(util.arrayPrinter);

const filteredArr = _.uniq(resultArray);
filteredArr.forEach(util.arrayPrinter)


console.log(res);
console.log('\n----- app ended ------\n');