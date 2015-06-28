var event = require("../event");
var dispatcher = require("../dispatcher");
var eventStore = require("../event-store");

function EventHook(handler) {
  this.handler = handler;
}

EventHook.prototype.hook = function(dom, propertyName, previous) {
  var name = propertyName.slice(3);
  eventStore.get(dom)[name] = this.handler;
  if(!previous || !previous[propertyName]) {
    event.emit(dispatcher, "dom-event:add", dom, name);
  }
};

EventHook.prototype.unhook = function(dom, propertyName, next) {
  var name = propertyName.slice(3);
  eventStore.get(dom)[name] = null;
  if(!next || !next[propertyName]) {
    event.emit(dispatcher, "dom-event:remove", dom, name);
  }
};

module.exports = EventHook;
