export function debounce(milliseconds=500) {
  return (target, key, descriptor) => {
    const originalMethod = descriptor.value
    let timer = 0
    descriptor.value = function (...args) {
      if(event) event.preventDefault()
      clearTimeout(timer)
      timer = setTimeout(() => originalMethod.apply(this, args), milliseconds)
    }
    return descriptor
  }
}