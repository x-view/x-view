var types = {
  string: "string",
  number: "number",
  boolean: "boolean"
};

function TypeClass() {}

TypeClass.prototype.cast = function(value, type) {
  if(value === null) {
    return null;
  }
  switch(type) {
    case types.string:
      return String(value);
    case types.number:
      return Number(value);
    case types.boolean:
      return Boolean(value);
    default:
      return null;
  }
};

module.exports = Object.assign(new TypeClass(), types);
