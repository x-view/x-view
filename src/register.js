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

function emitEvent(dom, component, type, detail) {
  var event = new CustomEvent(type, {
    detail: detail
  });
  dom.dispatchEvent(event);
}

function register(name, componentClass) {
  var propTypes = componentClass.prototype.propTypes;
  var propNames = Object.keys(propTypes);
  document.registerElement(name, {
    prototype: Object.assign(Object.create(HTMLElement.prototype), {
      createdCallback: function() {
        var component = new componentClass({});
        var root = this.createShadowRoot();
        event.on(component, "upstream:update", update.bind(null, root, component));
        event.on(component, "upstream:emit-event", emitEvent.bind(null, this, component));
        event.emit(component, "create");
        store.set(this, {
          component: component,
          root: root
        });
      },
      attachedCallback: function() {
        var state = store.get(this);
        event.emit(state.component, "mount");
        update(state.root, state.component);
      },
      detachedCallback: function() {
        var state = store.get(this);
        event.emit(state.component, "unmount");
      },
      attributeChangedCallback: function() {
        var state = store.get(this);
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
        state.component.replaceProps(props);
      }
    })
  });
}

module.exports = register;
