# X-View

[![npm](https://img.shields.io/npm/v/x-view.svg)](https://www.npmjs.com/package/x-view) [![npm](https://img.shields.io/npm/l/x-view.svg)](https://www.npmjs.com/package/x-view)

A JavaScript library like [React](http://facebook.github.io/react/index.html), but uses Web Components.

## Requirements

Polyfills for:

- `Object.assign`
- `WeakMap`
- `Custom Elements`
- `Shadow DOM`

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

## Builtin Tags

- `<x-raw html="..."></x-raw>`

## License

MIT License
