import { ConnectionFactory } from "./ConnectionFactory";
import { TradeDao } from "../domain";

export async function getNegotiationDao(){
    const connection = await ConnectionFactory.getConnection()
    return new TradeDao(connection)
  }
