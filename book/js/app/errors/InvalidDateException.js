class InvalidDateException extends ApplicationException{
  constructor(){
    super('This date is not in DD-MM-YYYY format')
  }
}