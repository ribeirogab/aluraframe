import { View } from "./View.js";
import { DateConverter } from "../../ui/helpers/DateConverter.js";
import { currentInstance } from "../../controllers/NegotiationController.js";

export class NegotiationsView extends View {
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
            ${model.list.map(n => 
              `<tr>
                <td>${DateConverter.dateToText(n.date)}</td>
                <td>${n.amount}</td>
                <td>${n.value}</td>
                <td>${n.volume}</td>
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