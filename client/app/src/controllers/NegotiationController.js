import { Negotiation, NegotiationList, NegotiationService } from '../domain/index.js'
import { DateConverter, InvalidDateException, Message, MessageView, NegotiationsView } from '../ui/index.js'
import { Bind, getNegotiationDao } from '../util/index.js'


class NegotiationController {
  constructor(){
    const $ = document.querySelector.bind(document)
    
    this._inputDate = $('#data')
    this._inputAmount = $('#quantidade')
    this._inputValue = $('#valor')
    
    this._negotiationList = new Bind(
      new NegotiationList(),
      new NegotiationsView($('#negotiationsView')),
      'add', 'delete', 'import', 'order', 'reverse'
    )

    this._message = new Bind(
      new Message(),
      new MessageView($('#messageView')),
      'text'
    )

    this._service = new NegotiationService()
    this._currentOrder = ''

    this._init()
  }

  _init(){
    getNegotiationDao()
      .then(dao => dao.listAll())
        .then(negotiations => 
          negotiations.forEach(negotiation =>
            this._negotiationList.add(negotiation)
            )
        )
      .catch(error => {
        console.log(error)
      })
  }

  add(event){
    event.preventDefault()
    
    getNegotiationDao()
      .then(dao => dao.add(this._createNegotiation()))
        .then(() => {
          this._negotiationList.add(this._createNegotiation())
          this._message.text = 'Negotiations successfully added!'
          this._resetForm()
          console.log(this._negotiationList)
        })
      .catch(error => {
        if (error instanceof InvalidDateException) {
          this._message.text = error.message
        } else {
          console.log(error)
        }
      })
  }

  delete(){
    getNegotiationDao()
      .then(dao => dao.deleteAll())
        .then(msg => {
          this._negotiationList.delete()
          this._message.text = msg
        })
  }

  import(){
    Promise.all([
      this._service.import('semana'),
      this._service.import('anterior'),
      this._service.import('retrasada')
    ]).then(negotiationsArr => {
        negotiationsArr.reduce((flatArr, arr) => flatArr.concat(arr), [])
          .filter(newNegotiation => !this._negotiationList.list.some(existingNegotiation => newNegotiation.equals(existingNegotiation)))
          .map(negotiation => this._negotiationList.add(negotiation))
        
        this._message.text = 'Negotiations imported successfully'
      })
      .catch(error => {
        console.error(error)
        this._message.text = error
      })
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
      DateConverter.textToDate(this._inputDate.value),
      parseInt(this._inputAmount.value),
      parseFloat(this._inputValue.value)
    )
  }

  _resetForm(){
    this._inputDate.value = ''
    this._inputAmount.value = 7
    this._inputValue.value = 5

    this._inputDate.focus()
  }
}

const negotiationController = new NegotiationController

export function currentInstance(){
  return negotiationController
}