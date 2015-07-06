var event = require("./event");
var dispatcher = require("./dispatcher");
var eventStore = require("./event-store");

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
