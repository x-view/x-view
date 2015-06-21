var type = require("./type");
var event = require("./event");
var config = require("./config");
var render = require("./render");

var store = new WeakMap();

function update(dom, component) {
  event.emit(component, "update");
  var vtree = component.render();
  render(dom, vtree);
  event.emit(component, "updated");
}

function register(name, componentClass) {
  var propTypes = componentClass.prototype.propTypes;
  var propNames = Object.keys(propTypes);
  document.registerElement(name, {
    prototype: Object.assign(Object.create(HTMLElement.prototype), {
      createdCallback: function() {
        var component = new componentClass({});
        store.set(this, {
          component: component
        });
        event.on(component, "upstream:update", update.bind(null, this, component));
        event.emit(component, "create");
      },
      attachedCallback: function() {
        var component = store.get(this).component;
        event.emit(component, "mount");
        update(this, component);
      },
      detachedCallback: function() {
        var component = store.get(this).component;
        event.emit(component, "unmount");
      },
      attributeChangedCallback: function() {
        var component = store.get(this).component;
        var props = {};
        for(var i = 0; i < propNames.length; i++) {
          var name = propNames[i];
          if(this.hasAttribute(name)) {
            var value = this.getAttribute(name);
            if(propTypes[name] === type.boolean) {
              value = (value !== null);
            }
            value = type.cast(value, propTypes[name]);
            if(value !== null) {
              props[name] = value;
            }
          }
        }
        component.replaceProps(props);
      }
    })
  });
}

module.exports = register;
