import { ApplicationException } from "./ApplicationException";

export class HttpError extends ApplicationException{
  constructor(){
    super('http Error')
  }
}