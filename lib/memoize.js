// a simple memoize function that takes in a function
// and returns a memoized function
const memoize = (fn) => {
    let cache = {};
    return (...args) => {
      let n = args.join("_");  // just taking one argument here
      if (n in cache) {
        return cache[n];
      }
      else {
        //console.log('Calculating result');
        let result = fn(...args);
        cache[n] = result;
        return result;
      }
    }
  }

  export {memoize}