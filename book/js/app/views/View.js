class View {
  constructor(selector){
    this._selector = selector
  }

  template(){
    throw new Error('This method needs to be overwritten')
  }

  update(model){
    this._selector.innerHTML = this.template(model)
  }
}