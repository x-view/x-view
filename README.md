# X-View

[![npm](https://img.shields.io/npm/v/x-view.svg)](https://www.npmjs.com/package/x-view) [![npm](https://img.shields.io/npm/l/x-view.svg)](https://www.npmjs.com/package/x-view)

A JavaScript library like React, but uses Web Components.

## Requirements

Supports / Polyfills for:

- `Object.assign`
- `WeakMap`
- `Custom Elements`
- `Shadow DOM`

## Installation

``` shell
$ npm install --save x-view
```

## Documentations

- [Getting Started](./docs/getting-started.md)
- [More Documentations...](./docs/)

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

[More examples...](./tags/)

## JSX

``` javascript
/** @jsx x.jsx */

var vtree = (<div class="box">
  <x-button />
</div>);
```

Output:

``` javascript
/** @jsx x.jsx */

"use strict";

var vtree = x.jsx(
  "div",
  { "class": "box" },
  x.jsx("x-button", null)
);
```

## Built-in Tags

- `<x-raw html="..."></x-raw>`

## License

MIT License
