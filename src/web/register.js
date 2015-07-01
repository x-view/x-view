var type = require("../type");
var event = require("../event");
var render = require("../render");

require("./event");

var store = new WeakMap();
var cachedProps = new WeakMap();

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

function castType(value, propType) {
  if(propType === type.boolean) {
    return value !== null;
  } else {
    return type.cast(value, propType);
  }
}

function register(name, componentClass) {
  var propTypes = componentClass.prototype.propTypes;
  var propNames = Object.keys(propTypes);
  document.registerElement(name, {
    prototype: Object.assign(Object.create(HTMLElement.prototype), {
      createdCallback: function() {
        var props = {};
        for(var i = 0; i < propNames.length; i++) {
          var name = propNames[i];
          var value = this.getAttribute(name);
          if(name !== null) {
            props[name] = castType(value, propTypes[name]);
          }
        }
        var component = new componentClass(props);
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
      attributeChangedCallback: function(name, previous, value) {
        if(!propTypes[name]) {
          return;
        }
        var state = store.get(this);
        var oldProps = cachedProps.get(this) || {};
        var props = Object.assign({}, oldProps);
        if(value === null) {
          delete props[name];
        } else {
          props[name] = castType(value, propTypes[name]);
        }
        cachedProps.set(this, props);
        state.component.replaceProps(props);
      }
    })
  });
}

module.exports = register;
