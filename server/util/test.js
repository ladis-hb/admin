/* jshint esversion:8 */
const set1 = new Set(["a", "b", "c", "d"]);

function t(set) {
  set.delete("a");
}

t(set1);

console.log(set1.has("a"));
