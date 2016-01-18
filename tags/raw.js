var x = require("x-view");

var Raw = x.createClass({
  propTypes: {
    html: x.type.string
  },
  init: function() {
    x.event.on(this, "updated", this.updateHTML);
  },
  updateHTML: function() {
    this.root.innerHTML = this.props.html;
  }
});

x.register("x-raw", Raw);
