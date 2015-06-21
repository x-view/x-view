var vdom = require("virtual-dom");

var store = {};

function createClass(name) {
  var widgetClass = function(props) {
    this.props = props;
    this.vtree = vdom.h(name, props);
  };
  widgetClass.prototype.type = "Widget";
  widgetClass.prototype.init = function() {
    return vdom.create(this.vtree);
  };
  widgetClass.prototype.update = function(previous, dom) {
    var patches = vdom.diff(previous.vtree, this.vtree);
    var root = vdom.patch(dom, patches);
    return root;
  };
  return widgetClass;
}

function createComponent(name, props) {
  var widgetClass = store[name];
  if(!widgetClass) {
    store[name] = widgetClass = createClass(name);
  }
  return new widgetClass(props);
}

function createElement(name) {
  if(/-/.test(name)) {
    return createComponent.apply(null, arguments);
  } else {
    return vdom.h.apply(null, arguments);
  }
}

module.exports = {
  createElement: createElement,
  createComponent: createComponent
};
