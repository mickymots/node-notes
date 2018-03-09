/**
 * Base exception class with errorCode: number and message: string property
 */
export class Exception {
  private exceptionCode: number; // optional value
  private message: string;

  constructor(
    message: string,
    exceptionCode?: number
  ) {
    this.exceptionCode = exceptionCode;
    this.message = message;
  }

  /**
   * Return errorCode property
   */
  getExceptionCode(): number {
    return this.exceptionCode;
  }
  
  /**
   * Return message property
   */
  getMessage(): string {
    return this.message;
  }

  /**
   * Return errorCode and message in a formatted string
   */
  toString(): string {
    return 'Error Code = ' + this.exceptionCode + ', message = ' + this.message;
  }

}
