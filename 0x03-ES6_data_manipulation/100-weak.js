export const weakMap = new WeakMap();

let counter = 0;
export function queryAPI(endPoint) {
  counter += 1;
  weakMap.set(endPoint, counter);
  if (weakMap.get(endPoint) >= 5) {
    throw new Error('Endpoint load is high');
  }
}
