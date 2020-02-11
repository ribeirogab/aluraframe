export class ProxyFactory {
  static create(obj, props, trap){
    return new Proxy(obj, {
      get(target, prop, receiver) {
        if (props.includes(prop) && typeof (target[prop]) == typeof (Function)) {
          return function () {
            console.log(`"${prop}" shot the trap`)

            Reflect.apply(target[prop], target, arguments)
            trap(target)
          }
        }
        return Reflect.get(target, prop)
      },

      set(target, prop, value, receiver){
        if(props.includes(prop)){
          console.log(`"${prop}" shot the trap`)
          Reflect.set(target, prop, value)
          trap(target)
        }
        return Reflect.set(target, prop, value, receiver)
      }
    })
  }
}