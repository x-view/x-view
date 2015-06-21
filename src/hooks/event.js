function EventHook(handler) {
  this.handler = handler;
}

EventHook.prototype.hook = function(dom, name) {
  dom.addEventListener(name.slice(3), this.handler, false);
};

EventHook.prototype.unhook = function(dom, name) {
  dom.removeEventListener(name.slice(3), this.handler, false);
};

module.exports = EventHook;
