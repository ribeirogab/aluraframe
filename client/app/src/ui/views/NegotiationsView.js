import { View } from "./View";
import { DateConverter } from "../../ui";
import { currentInstance } from "../../controllers/TradeController.js";

export class TradesView extends View {
  constructor(element) {
    super(element)

    element.addEventListener('click', e => {
      if(e.target.nodeName === 'TH') 
        currentInstance().order(e.target.textContent.toLowerCase())
    })
  }

  template(model){
    return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
    
        <tbody>
            ${model.list.map(trade => 
              `<tr>
                <td>${DateConverter.dateToText(trade.date)}</td>
                <td>${trade.amount}</td>
                <td>${trade.value}</td>
                <td>${trade.volume}</td>
              </tr>`
            ).join('')}
        </tbody>
    
        <tfoot>
            <td colspan=3></td>
            <td>
                ${model.totalVolume}
            </td>
        </tfoot>
    </table>
    `
  }
}