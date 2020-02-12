System.register(["./View.js", "../../ui/helpers/DateConverter.js", "../../controllers/TradeController.js"], function (_export, _context) {
    "use strict";

    var View, DateConverter, currentInstance;
    return {
        setters: [function (_ViewJs) {
            View = _ViewJs.View;
        }, function (_uiHelpersDateConverterJs) {
            DateConverter = _uiHelpersDateConverterJs.DateConverter;
        }, function (_controllersTradeControllerJs) {
            currentInstance = _controllersTradeControllerJs.currentInstance;
        }],
        execute: function () {
            class TradesView extends View {
                constructor(element) {
                    super(element);

                    element.addEventListener('click', e => {
                        if (e.target.nodeName === 'TH') currentInstance().order(e.target.textContent.toLowerCase());
                    });
                }

                template(model) {
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
            ${model.list.map(trade => `<tr>
                <td>${DateConverter.dateToText(trade.date)}</td>
                <td>${trade.amount}</td>
                <td>${trade.value}</td>
                <td>${trade.volume}</td>
              </tr>`).join('')}
        </tbody>
    
        <tfoot>
            <td colspan=3></td>
            <td>
                ${model.totalVolume}
            </td>
        </tfoot>
    </table>
    `;
                }
            }

            _export("TradesView", TradesView);
        }
    };
});
//# sourceMappingURL=NegotiationsView.js.map