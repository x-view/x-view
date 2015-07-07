var vdom = require("virtual-dom");

var store = new WeakMap();

function render(dom, vtree) {
  vtree = vtree || vdom.h("noscript");
  var previous = store.get(dom);
  if(!previous) {
    var root = vdom.create(vtree);
    store.set(dom, {
      vtree: vtree,
      root: root
    });
    dom.appendChild(root);
  } else {
    var patches = vdom.diff(previous.vtree, vtree);
    var root = vdom.patch(previous.root, patches);
    store.set(dom, {
      vtree: vtree,
      root: root
    });
  }
}

function unmount(dom) {
  var state = store.get(dom);
  if(state) {
    dom.removeChild(state.root);
  }
}

module.exports = {
  render: render,
  unmount: unmount
};
