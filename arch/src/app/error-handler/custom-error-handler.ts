// Import the core angular services.
import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  /**
  * Initialize the service.
  * CAUTION: The core implementation of the ErrorHandler class accepts a boolean
  * @deprecated since v4.0 parameter no longer has an effect, as ErrorHandler will never
  * rethrow.
  * parameter, `rethrowError`; however, this is not part of the interface for the class.
  * This is being done with an Options object (which is being defaulted in the providers).
  * @param loggingService
  */
  constructor(private loggingService: LoggingService) {
    super();
  }

  /**
   * Handle the given error.
   * @param error
   */
  public handleError(error: any): void {
    try {
      this.loggingService.fatal(error);
    } catch (loggingError) {
      console.group('ErrorHandler');
      console.warn('Error when trying to log error to Logging Service:');
      console.error(loggingError)
      console.groupEnd();
    }
  }
}
