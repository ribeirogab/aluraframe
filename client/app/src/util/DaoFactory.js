import { ConnectionFactory } from "./ConnectionFactory.js";
import { TradeDao } from "../domain/trades/TradeDao.js";

export async function getNegotiationDao(){
    const connection = await ConnectionFactory.getConnection()
    return new TradeDao(connection)
  }
