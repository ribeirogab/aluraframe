class NegotiationController{
  constructor(){
    const $ = document.querySelector.bind(document)

    this._inputDate = $('#data')
    this._inputAmount = $('#quantidade')
    this._inputValue = $('#valor')

    this._negotiationList = new Bind(
      new NegotiationList(),
      new NegotiationView($('#negotiationView')),
      'add', 'delete', 'order', 'reverse'
    )
      
    this._message = new Bind(
      new Message(),
      new MessageView($('#messageView')),
      'text')

    this._service = new NegotiationService()

    this._currentOrder = ''

    this._init()
  }

  _init(){
    this._service
      .list()
        .then(negotiations => negotiations
          .forEach(negotiation =>
            this._negotiationList.add(negotiation)
        ))
  }

  add(event){
    event.preventDefault()
    this._service
      .register(this._createNegotiation())
      .then(msg => {
        this._message.text = msg
        this._negotiationList.add(this._createNegotiation())
        this._clearForm()
      })
      .catch(error => {
        this._message.text = error
      })
  }

  delete(){
    this._service
    .delete()
    .then(msg => {
      this._message.text = msg
      this._negotiationList.delete()
    })
  }

  import(){
    Promise.all([
      this._service.import('semana'),
      this._service.import('anterior'),
      this._service.import('retrasada')
    ])
      .then(negotiations => {
        negotiations.reduce((flatArr, arr) => flatArr.concat(arr), [])
        .filter(negotiation => 
          !this._negotiationList.negotiations.some(
            negotiationExists => JSON.stringify(negotiation) === JSON.stringify(negotiationExists)
          )
        )
        .forEach(negotiation => {
          ConnectionFactory.getConnection()
            .then(connection => new NegotiationDao(connection))
            .then(dao => dao.add(negotiation))
            .then(() => this._negotiationList.add(negotiation))
        })
      })
      .catch(error => this._message.text = error)
    
  }

  order(column){
    if (this._currentOrder === column) {
      this._negotiationList.reverse();
    } else {
      this._negotiationList.order((a, b) => a[column] - b[column]);
    }
    this._currentOrder = column;
  }

  _createNegotiation(){
    return new Negotiation(
      DateHelper.textToDate(this._inputDate.value),
      parseInt(this._inputAmount.value),
      parseFloat(this._inputValue.value),
    )
  }

  _clearForm(){
    this._inputDate.value = ''
    this._inputAmount.value = 1
    this._inputValue.value = 1

    this._inputDate.focus()
  }
}