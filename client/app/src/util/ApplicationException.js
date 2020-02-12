export class ApplicationException extends Error {
  constructor(msg = '') {
    super(msg)
    this.name = this.constructor.name
  }
}

const excepetion = ApplicationException

export function isApplicationException(err) {
  return err instanceof excepetion || Object.getPrototypeOf(err) instanceof excepetion
}

export function getExceptionMessage(err){
  if(isApplicationException(err)){
    return err.message
  } else {
    console.error(err)
    return 'Could not perform the operation!'
  }
}

