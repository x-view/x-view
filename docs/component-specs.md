# Component Specs

## Properties

### mixins

``` javascript
mixins: Array<Mixin>
```

See [Mixin](./mixin.md).

### propTypes

``` javascript
propTypes: Object
propTypes[name: String] -> x.type.*
```

Declaring types of component's props. See [Props Type](./props-type.md).

### dom

``` javascript
dom: Object
```

Extensions for element's prototype.

## Methods

### init

``` javascript
init() -> void
```

This function will be called once when component created.

### render

``` javascript
render() -> VNode
```

### needUpdate

``` javascript
needUpdate(nextProps: Object, nextState: Object) -> Boolean
```

### defaultProps

``` javascript
defaultProps() -> Object
```

### initialState

``` javascript
initialState() -> Object
```

## Events

See also [Event API](./event-api.md).

### `"mount"`

``` javascript
handler(root: Node) -> void
```

### `"unmount"`

``` javascript
handler() -> void
```

### `"update"`

``` javascript
handler() -> void
```

### `"updated"`

``` javascript
handler() -> void
```

### `"receive-props"`

``` javascript
handler(nextProps: Object) -> void
```
