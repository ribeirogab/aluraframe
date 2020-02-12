import { currentInstance } from "./controllers/TradeController.js";

const negotiationController = currentInstance()

const $ = document.querySelector.bind(document)

$('.form')
  .addEventListener('submit', negotiationController.add.bind(negotiationController))

$('#btnDelete')
  .addEventListener('click', negotiationController.delete.bind(negotiationController))

$('#btnImport')
  .addEventListener('click', negotiationController.import.bind(negotiationController))