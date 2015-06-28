var type = require("./type");
var event = require("./event");
var dispatcher = require("./dispatcher");
var eventStore = require("./event-store");
var config = require("./config");
var render = require("./render");

function eventHandler(e) {
  var handler = eventStore.get(this)[e.type];
  if(handler) {
    handler.call(this, e);
  }
}

event.on(dispatcher, "dom-event:add", function(dom, name) {
  dom.addEventListener(name, eventHandler, false);
});

event.on(dispatcher, "dom-event:remove", function(dom, name) {
  dom.removeEventListener(name, eventHandler, false);
});

var store = new WeakMap();

function update(dom, component, root) {
  event.emit(component, "update");
  var vtree = component.render();
  render(root, vtree);
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
        event.on(component, "upstream:update", update.bind(null, this, component, root));
        event.on(component, "upstream:emit-event", emitEvent.bind(null, this, component));
        event.emit(component, "create");
        store.set(this, {
          component: component,
          root: root
        });
      },
      attachedCallback: function() {
        var state = store.get(this);
        event.emit(state.component, "mount", state.root);
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
