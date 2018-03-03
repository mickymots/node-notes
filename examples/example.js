const _ = require('lodash')
const util = require('../util')


const resultIntIsString = _.isString(1)
const resultBooleanIsString = _.isString(true)
const resultStringIsString = _.isString('true')

const resultArray = [
  resultIntIsString,
  resultBooleanIsString,
  resultStringIsString
]

resultArray.forEach(util.arrayPrinter)

const filteredArr = _.uniq(resultArray)
filteredArr.forEach(util.arrayPrinter)

const testArray = [1, 2, 2, 3, 1, 4, 5, 6, 7, 8, 2, 4, 5, 6, 7, 5, 4, 5, 2]

_.uniq(testArray).forEach(util.arrayPrinter)
