var vdom = require("virtual-dom");
var EventHook = require("./hooks/event");

var store = {};

function buildProps(props) {
  var attributes = {};
  var properties = {};
  var events = {};
  for(var key in props) {
    if(props.hasOwnProperty(key)) {
      var value = props[key];
      if(/on-/.test(key) && typeof value == "function") {
        events[key] = new EventHook(value);
      } else if(key == "style") {
        properties[key] = value;
      } else {
        if(typeof value == "boolean") {
          value = value ? "" : undefined;
        } else if(typeof value == "number") {
          value = String(value);
        } else if(value === null) {
          value = undefined;
        }
        attributes[key] = value;
      }
    }
  }
  return Object.assign({
    attributes: attributes
  }, properties, events);
}

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

function createComponent(name, props, children) {
  var widgetClass = store[name];
  if(!widgetClass) {
    store[name] = widgetClass = createClass(name);
  }
  return new widgetClass(props);
}

function createElement(name, props, children) {
  props = buildProps(props);
  if(/-/.test(name)) {
    return createComponent(name, props, children);
  } else {
    return vdom.h(name, props, children);
  }
}

module.exports = {
  createElement: createElement
};
