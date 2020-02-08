class View{
  constructor(element) {
    this._element = element
  }

  template() {
    throw new Error('A classe precisa ser sobreescrevida')
  }

  update(model) {
    this._element.innerHTML = this.template(model)
  }
}