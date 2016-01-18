# Top-Level API

## x.config

``` javascript
x.config: Object
```

## x.type

See [Props Type](./props-type.md).

## x.event

See [Event API](./event-api.md).

## x.Component

``` javascript
new x.Component()
```

Base class of all components. You can use it with ES6 class syntax.

See [Component API](./component-api.md) and [Component Specs](./component-specs.md).

## x.createClass

``` javascript
x.createClass(descriptor: Object) -> class:extends(x.Component)
```

An alternative way to create a sub class of `x.Component`.

## x.register

``` javascript
x.register(name:String, options?: Object, componentClass: class:extends(x.Component)) -> void

options.extends -> String
```

Register custom element.

## x.createElement

``` javascript
x.createElement(name: String, props?: Object, children?: Array<{VNode|String|Number}>) -> VNode
```

Create Virtual DOM.

## x.jsx

``` javascript
x.jsx(name: String, props: Object?, ...children: {VNode|String|Number}) -> VNode
```

A wrapper of `x.createElement` for using with JSX.

## x.render

``` javascript
x.render(dom: Element, vtree: VNode) -> void
```

Render Virtual DOM to HTML Element.

## x.unmount

``` javascript
x.unmount(dom: Element) -> void
```
