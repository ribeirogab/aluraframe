import { HttpService, ApplicationException } from "../../util";
import { Trade } from "./Trade.js";

export class TradeService{
  constructor(){
    this._http = new HttpService()
  }

  import(week) {
    return this._http.get(`http://localhost:3000/negociacoes/${week}`)
      .then(tradesArr => {
        return tradesArr.map(trade => 
          new Trade(
            new Date(trade.data),
            trade.quantidade,
            trade.valor
          )
        )
      }).catch(error => {
        console.log(error)
        new ApplicationException(`N foi possivel obter as negociacoes da semana${week === 'semana' !== -1 ? '': ` ${week}`}.`)
      })
  }
}
