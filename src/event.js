var store = new WeakMap();

function init(obj) {
  var listeners = {};
  store.set(obj, listeners);
  return listeners;
}

function on(obj, type, handler) {
  var listeners = store.get(obj);
  if(!listeners) {
    listeners = init(obj);
  }
  if(!listeners[type]) {
    listeners[type] = [];
  }
  listeners[type].push(handler);
}

function once(obj, type, handler) {
  var emitted = false;
  var onceHandler = function() {
    if(emitted) {
      return;
    }
    emitted = true;
    off(obj, type, onceHandler);
    handler.apply(this, arguments);
  };
  on(obj, type, onceHandler);
}

function off(obj, type, handler) {
  var listeners = store.get(obj);
  if(listeners && listeners[type]) {
    var index = listeners[type].indexOf(handler);
    if(index != -1) {
      listeners[type].slice(index, 1);
    }
  }
}

function emit(obj, type) {
  var listeners = store.get(obj);
  if(listeners && listeners[type]) {
    var handlers = listeners[type].slice(0);
    var args = Array.prototype.slice.call(arguments, 2);
    handlers.forEach(function(handler) {
      handler.apply(obj, args);
    });
  }
}

module.exports = {
  on: on,
  once: once,
  off: off,
  emit: emit
};
