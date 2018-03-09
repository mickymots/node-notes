function mergeArray (left, right){
        var result = [];
        if(left && right)
        return result.concat(left).concat(right).sort();
        else if (!left && right)
        return right
        else if (left && !right)
        return left
        else return result

}


function mergeArrayAlt(left, right) {
  var result = []
  var temp = []

  if (left && right){

    left.forEach(element => {
       var filterArr = right.filter(item =>  item <=element).filter(item => {
            return !temp.includes(item)
        })

       temp = temp.concat(filterArr)
       filterArr.forEach(item => result.push(item))
       result.push(element)

       console.log('result = ' +result)
       console.log('-------------')
    });

    if(temp.length < right.length)
    {
        var remainers = right.slice(temp.length-1).sort()
        result = result.concat(remainers)
    }
    return result
  }   
  else if (!left && right) return right
  else if (left && !right) return left
  else return result
}

//var result = mergeArray([1, 3, 5, 7, 9], [0, 2, 4, 6, 8])


var result2 = mergeArrayAlt([0, 1, 1, 3, 5, 7, 9],[0, 2, 2, 2, 4, 6, 8] )
//console.log(result)
console.log(result2)