export function required(param) {
  throw new Error(`${param} is a required param!`)
}