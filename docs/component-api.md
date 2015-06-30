# Component API

## Properties

### props

``` javascript
props: Object
```

### state

``` javascript
state: Object
```

### mounted

``` javascript
mounted: Boolean
```

This property indicate whether the component is mounted to HTML Node or not.

### root

``` javascript
root: Node
```

Get root HTML Node the component mounted to. You should check `this.mounted` before using this if necessary.

## Methods

### setState

``` javascript
setState(state: Object) -> void
```

### replaceState

``` javascript
replaceState(state: Object) -> void
```

### forceUpdate

``` javascript
forceUpdate() -> void
```

Force re-render the component even `this.needUpdate()` returns false.

### emit

``` javascript
emit(type: String, detail?: Object) -> void
```
