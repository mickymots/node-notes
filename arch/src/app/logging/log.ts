/**
 * Model Class to log messages on server
 */
export class Log {
  message: any;
  logLevel: any;

  constructor(
    message: any,
    logLevel: any
  ) {
    this.message = message;
    this.logLevel = logLevel;
  }
}
