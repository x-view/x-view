# In development...

# X-View

A JavaScript library like [React](http://facebook.github.io/react/index.html), but uses Web Components.

## Requirements

Polyfill for:

- Object.assign
- WeakMap
- document.registerElement

## Installation

``` shell
$ npm install --save x-view
```

## Example

``` html
<x-button></x-button>
```

``` javascript
var x = require("x-view");

var Button = x.createClass({
  render: function() {
    return x.createElement("button", {
      type: "button"
    }, ["Hello!"]);
  }
});

x.register("x-button", Button);
```

## License

MIT License
