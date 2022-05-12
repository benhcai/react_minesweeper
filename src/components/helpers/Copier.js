const isArray = (obj) => Array.isArray(obj);
const isObject = (obj) => typeof obj === "object";
const isDate = (obj) => obj instanceof Date;

const Copier = (function () {
  function shallow(obj) {
    if (!isObject(obj)) return obj;
    if (isArray(obj)) return [...obj];
    return { ...obj };
  }

  function deep(obj) {
    if (!isObject(obj)) return obj;
    if (isDate(obj)) return new Date(obj);
    let newObject = isArray(obj) ? [] : {};
    for (const key in obj) {
      const value = obj[key];
      newObject[key] = deep(value);
    }
    return newObject;
  }

  return { shallow, deep };
})();

export default Copier;
