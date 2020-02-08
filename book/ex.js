class Funcionario {

  constructor(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  trocar(email){
    this._email = email
  }
}

class Msg{
  msg(){
    console.log('Fui chamado!!')
  }
}

const funcionario = new Proxy(new Funcionario(), {
  get(target, prop, receiver){
    if(['trocar'].includes(prop) && typeof(target[prop]) === typeof(Function)){
      return function (){
        Reflect.apply(target[prop], target, arguments)
        const msg = new Msg()
        msg.msg()
      }
    }
    return Reflect.get(target, prop, receiver)
  }
})

funcionario.trocar('skkdk@dkdk.com')
console.log(funcionario.email)