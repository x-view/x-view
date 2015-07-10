var flatten = require("./flatten");
var vdom = require("./vdom");

function jsx(name, props) {
  var children = Array.prototype.slice.call(arguments, 2);
  children = flatten(children);
  return vdom.createElement(name, props, children);
}

module.exports = jsx;
