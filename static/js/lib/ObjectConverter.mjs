export function toObject(obj) {
  const type = typeof obj
  if(type == "string" || type == "number" || type == "boolean" || type == "undefined" ) {
    return obj
  }
  if(Array.isArray(obj)) {
    return obj.map(v => toObject(v));
  }
  if(toString.call(obj).indexOf("Date]") != -1) {
    return obj.toLocaleString();
  }
  if(obj.value) {
    return obj.value
  }
  if(obj.toObject) {
    return toObject()
  }
  
  
  return Object.keys(obj).reduce((memo, key) => {
    memo[key] = toObject(obj[key]);
    return memo;
  }, {})
}