import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Exception } from './exception';
import { ReferenceDataService } from '../reference-data/reference-data.service';
import { ReferenceData } from '../reference-data/reference-data';
import { ReferenceDataType } from '../reference-data/reference-data.enum';
import { NotificationService } from '../notification/notification.service';
import { LoggingService } from '../logging/logging.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

/**
 * Exception service class exposes single interface for logging application
 * exception. throw(Exception) method notifies the notification service of
 * an incoming exception.
 */
@Injectable()
export class ExceptionService {
  constructor(
    private notificationService: NotificationService,
    private referenceDataService: ReferenceDataService,
    private loggingService: LoggingService
  ) {}

  /**
   * This method receives an exception message and extracts text message from reference data.
   * text message is then passed on to notification service for display on screen
   * @param exception
   */
  public throw(exception: any) {
    let exceptionMessage = this.getExceptionMessage(exception);
    this.loggingService.error('Exception: ' + exception);
    exceptionMessage.subscribe(m => {
      this.notificationService.notify(m);
    });
  }

  /**
   * This method extracts the meaningful text message from a given Exception object.
   * Check to see if an error matches ref data array key and get the corresponding message
   * @param error
   */
  private getExceptionMessage(exception: any): Observable<Exception> {
    let _exceptionService = this;
    var observable = Observable.create(function subscribe(observer) {
      if (exception instanceof Exception) {
        let exceptionCode = exception.getExceptionCode();
        let message = exception.getMessage();

        let referenceData: Observable<
          ReferenceData[]
        > = _exceptionService.referenceDataService.getRefData(
          ReferenceDataType.ERROR_TYPE
        );

        referenceData.subscribe(response => {
          response.forEach(element => {
            if (element.id == exception.getExceptionCode().toString()) {
              message = element.values;
            }
          });
          observer.next(new Exception(message, exceptionCode));
        });
      } else return observer.next(new Exception(exception));
    });
    return observable;
  }
}
