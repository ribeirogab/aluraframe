import { Trade, TradeList } from '../domain'
import { DateConverter, Message, MessageView, TradesView } from '../ui'
import { Bind, getNegotiationDao, getExceptionMessage, debounce, controller } from '../util'

@controller('#data', '#quantidade', '#valor')
class TradeController {
  constructor(inputDate, inputAmount, inputValue){
    this._inputDate = inputDate
    this._inputAmount = inputAmount
    this._inputValue = inputValue
    
    const $ = document.querySelector.bind(document)
    
    this._tradeList = new Bind(
      new TradeList(),
      new TradesView($('#tradesView')),
      'add', 'delete', 'import', 'order', 'reverse'
    )

    this._message = new Bind(
      new Message(),
      new MessageView($('#messageView')),
      'text'
    )

    this._currentOrder = ''

    this._init()
  }

  async _init() {
    try {
      const dao = await getNegotiationDao()
      const negotiations = await dao.listAll()
      negotiations.forEach(negotiation => {
        this._tradeList.add(negotiation)
      })
    } catch (error) {
      this._message.text = getExceptionMessage(error)
    }
  }

  @debounce(250)
  async add(event){
    try {
      event.preventDefault()
      const dao = await getNegotiationDao()
      await dao.add(this._createTrade())
      this._tradeList.add(this._createTrade())
      this._message.text = 'Trades successfully added!'
      this._resetForm()
      console.log(this._tradeList)
    } catch (error) {
      this._message.text = getExceptionMessage(error)
    }
  }

  async delete(){
    try {
      const dao = await getNegotiationDao()
      await dao.deleteAll()
      this._tradeList.delete()
      this._message.text = 'Successfully deleted!'
    } catch (error) {
      this._message.text = getExceptionMessage(error)
    }
  }

  @debounce(1000)
  async import(){
    try {
      const { TradeService } = await System.import('../domain/trades/TradeService.js')
      const service = new TradeService()
      const negotiationsArr = await Promise.all([
          service.import('semana'),
          service.import('anterior'),
          service.import('retrasada')
        ])
      negotiationsArr
        .reduce((flatArr, arr) => flatArr.concat(arr), [])
        .filter(newNegotiation => !this._tradeList.list.some(existingNegotiation => newNegotiation.equals(existingNegotiation)))
        .map(negotiation => this._tradeList.add(negotiation))
      this._message.text = 'Trades imported successfully'
      } catch (error) {
        this._message.text = getExceptionMessage(error)
      }
  }

  order(column){
    if (this._currentOrder === column) {
      this._tradeList.reverse();
    } else {
      this._tradeList.order((a, b) => a[column] - b[column]);
    }
    this._currentOrder = column;
  }

  _createTrade(){
    return new Trade(
      DateConverter.textToDate(this._inputDate.value),
      parseInt(this._inputAmount.value),
      parseFloat(this._inputValue.value)
    )
  }

  _resetForm(){
    this._inputDate.value = '16/09/2000'
    this._inputAmount.value = 7
    this._inputValue.value = 5
    this._inputDate.focus()
  }
}

const tradeController = new TradeController

export function currentInstance(){
  return tradeController
}