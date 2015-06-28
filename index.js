var event = require("./src/event");
var type = require("./src/type");
var config = require("./src/config");
var register = require("./src/web/register");
var render = require("./src/render");
var Component = require("./src/component");
var vdom = require("./src/vdom");

module.exports = {
  event: event,
  type: type,
  config: config,
  register: register,
  render: render,
  Component: Component,
  createClass: Component.createClass,
  createElement: vdom.createElement
};
