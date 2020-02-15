import { InvalidDateException } from "./InvalidDateException";

export class DateConverter {
  static textToDate(text) {
    if (!/\d{2}\/\d{2}\/\d{4}$/.test(text)) {
      throw new InvalidDateException()
    }
    return new Date(text.split('/').reverse())
  }

  static dateToText(date){
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
}