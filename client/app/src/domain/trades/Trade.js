import { required } from '../../util/index.js'

export class Trade {
  constructor(_date=required('date'), _amount=required('amount'), _value=required('value')) {
    this._date = new Date(_date.getTime())
    Object.assign(this, { _amount, _value })

    Object.freeze(this)
  }

  get volume(){
    return this._amount * this._value
  }

  get date(){
    return new Date(this._date.getTime())
  }

  get amount(){
    return this._amount
  }

  get value(){
    return this._value
  }

  equals(trade){
    return JSON.stringify(this) === JSON.stringify(trade)
  }
}