module.exports = function flatten(array) {
  var result = [];
  for(var i = 0; i < array.length; i++) {
    var value = array[i];
    if(Array.isArray(value)) {
      Array.prototype.push.apply(result, flatten(value));
    } else {
      result.push(value);
    }
  }
  return result;
};
