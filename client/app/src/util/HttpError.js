import { ApplicationException } from "./ApplicationException.js";

export class HttpError extends ApplicationException{
  constructor(){
    super('http Error')
  }
}