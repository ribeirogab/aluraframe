import { currentInstance } from "./controllers/TradeController.js";

const tradeController = currentInstance()

const $ = document.querySelector.bind(document)

$('.form')
  .addEventListener('submit', tradeController.add.bind(tradeController))

$('#btnDelete')
  .addEventListener('click', tradeController.delete.bind(tradeController))

$('#btnImport')
  .addEventListener('click', tradeController.import.bind(tradeController))