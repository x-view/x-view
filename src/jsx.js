var vdom = require("./vdom");

function jsx(name, props) {
  var children = Array.prototype.slice.call(arguments, 2);
  return vdom.createElement(name, props, children);
}

module.exports = jsx;
