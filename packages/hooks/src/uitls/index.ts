export function tuplify<T extends unknown[]>(...rests: T): T {
  return rests;
}
