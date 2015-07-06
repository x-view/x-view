var vdom = require("virtual-dom");
var EventHook = require("./hooks/event");

var store = {};

function isCustomElement(name) {
  return name && /-/.test(name);
}

function buildProps(props) {
  var attributes = {};
  var properties = {};
  var events = {};
  for(var key in props) {
    if(props.hasOwnProperty(key)) {
      var value = props[key];
      if(value === null) {
        value = undefined;
      }
      if(key == "is") {
        continue;
      } else if(key == "style") {
        properties[key] = value;
      } else if(/^on-/.test(key) && typeof value == "function") {
        events[key] = new EventHook(value);
      } else {
        if(typeof value == "boolean") {
          value = value ? "" : undefined;
        } else if(typeof value == "number") {
          value = String(value);
        }
        attributes[key] = value;
      }
    }
  }
  return Object.assign({
    attributes: attributes
  }, properties, events);
}

var Widget = function(name, props, children) {
  this.name = name;
  this.props = props;
  this.children = children;
  this.vtree = vdom.h(this.name, this.props, this.children);
};

Widget.prototype.type = "Widget";

Widget.prototype.componentName = null;

Object.defineProperty(Widget.prototype, "id", {
  configurable: true,
  enumerable: true,
  get: function() {
    return this.name + "," + this.componentName;
  }
});

Widget.prototype.init = function() {
  if(this.name === this.componentName) {
    return vdom.create(this.vtree);
  } else {
    var dom = document.createElement(this.name, this.componentName);
    var base = vdom.h(this.name);
    var patches = vdom.diff(base, this.vtree);
    var root = vdom.patch(dom, patches);
    return root;
  }
};

Widget.prototype.update = function(previous, dom) {
  var patches = vdom.diff(previous.vtree, this.vtree);
  var root = vdom.patch(dom, patches);
  return root;
};

function createClass(componentName) {
  var widgetClass = function() {
    Widget.apply(this, arguments);
  };
  widgetClass.prototype = Object.create(Widget.prototype);
  Object.defineProperty(widgetClass.prototype, "constructor", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: widgetClass
  });
  widgetClass.prototype.componentName = componentName;
  return widgetClass;
}

function createComponent(componentName, name, props, children) {
  var widgetClass = store[componentName];
  if(!widgetClass) {
    store[componentName] = widgetClass = createClass(componentName);
  }
  return new widgetClass(name, props, children);
}

function createElement(name, props, children) {
  if(!children && Array.isArray(props)) {
    children = props;
    props = undefined;
  }
  props = props || {};
  children = children || [];
  var is = props.is;
  props = buildProps(props);
  for(var i = 0; i < children.length; i++) {
    if(typeof children[i] == "number") {
      children[i] = String(children[i]);
    }
  }
  if(isCustomElement(name)) {
    return createComponent(name, name, props, children);
  } else if(isCustomElement(is)) {
    return createComponent(is, name, props, children);
  } else {
    return vdom.h(name, props, children);
  }
}

module.exports = {
  createElement: createElement
};
