var eventStore = new WeakMap();

module.exports = {
  get: function(key) {
    var value = eventStore.get(key);
    if(!value) {
      value = {};
      eventStore.set(key, value);
    }
    return value;
  }
};
