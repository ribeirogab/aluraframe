class DateHelper{
  constructor(){
    throw new Error('Esta classe n pode ser instanciada!')
  }

  static textToDate(text){
    return new Date(text.split('-'))
  }

  static dateToText(date) {
     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
}