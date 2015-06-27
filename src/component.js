var event = require("./event");

function Component(props) {
  this.props = this._buildProps(props);
  this.state = this.initialState();
  this._mounted = false;
  event.on(this, "mount", function() {
    this._mounted = true;
    event.emit(this, "upstream:update");
  });
  event.on(this, "unmount", function() {
    this._mounted = false;
  });
  this.init();
}

Component.createClass = function(proto) {
  var componentClass = function() {
    return Component.apply(this, arguments);
  };
  componentClass.prototype = Object.create(Component.prototype);
  Object.defineProperty(componentClass.prototype, "constructor", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: componentClass
  });
  Object.assign(componentClass.prototype, proto);
  return componentClass;
};

Component.prototype.propTypes = {};

Component.prototype.init = function() {};

Component.prototype.needUpdate = function(nextProps, nextState) {
  return true;
};

Component.prototype.isMounted = function() {
  return this._mounted;
};

Component.prototype._buildProps = function(props) {
  return Object.assign(this.defaultProps(), props);
};

Component.prototype._update = function(props, state) {
  if(props !== this.props) {
    event.emit(this, "receive-props", props);
  }
  if(this.needUpdate(props, state)) {
    this.props = props;
    this.state = state;
    if(this.isMounted()) {
      event.emit(this, "upstream:update");
    }
  }
};

Component.prototype.forceUpdate = function() {
  if(this.isMounted()) {
    event.emit(this, "upstream:update");
  }
};

Component.prototype.setProps = function(props) {
  this._update(Object.assign({}, this.props, props), this.state);
};

Component.prototype.replaceProps = function(props) {
  this._update(this._buildProps(props), this.state);
};

Component.prototype.setState = function(state) {
  this._update(this.props, Object.assign({}, this.state, state));
};

Component.prototype.replaceState = function(state) {
  this._update(this.props, state);
};

Component.prototype.emit = function(type, detail) {
  event.emit(this, "upstream:emit-event", type, detail);
};

Component.prototype.defaultProps = function() {
  return {};
};

Component.prototype.initialState = function() {
  return {};
};

Component.prototype.render = function() {
  return null;
};

module.exports = Component;
