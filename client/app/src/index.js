import { currentInstance } from "./controllers/TradeController";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'bootstrap/js/modal.js'
import '../assets/css/mystyle.css'

const tradeController = currentInstance()

document.querySelector('.form')
  .addEventListener('submit', tradeController.add.bind(tradeController))

document.querySelector('#btnDelete')
  .addEventListener('click', tradeController.delete.bind(tradeController))

document.querySelector('#btnImport')
  .addEventListener('click', tradeController.import.bind(tradeController))