import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ReferenceDataService } from '../reference-data/reference-data.service';
import { ReferenceData } from '../reference-data/reference-data';
import { ReferenceDataType } from '../reference-data/reference-data.enum';
import { Exception } from '../exception-handler/exception';
import { Notification } from './notification';
import { NOTIFICATION_LEVEL } from './notification-level.enum';
import { NOTIFICATION_TYPE } from './notification-type.enum';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';

/**
 * Notification service class processes incoming exception objects
 * and delivers the meaningful notification message on screen.
 */
@Injectable()
export class NotificationService {
  /**
   * Notification property to hold the current notification
   * as being published by the various components
   */
  private notification = new Subject<any>();

  /**
   * Current notification property being exposed as
   * observable for being subscribed by other components
   */
  notificationQueue$ = this.notification.asObservable();

  /**
   * public API to reach notification service
   * @param message
   */
  notify(message: any) {
    this.processNotification(message);
  }

  /**
   * Dispay modal alert with exception data
   * @param error
   */
  private processNotification(message: any) {
    if (message instanceof Exception) {
      let modelMessage = new Notification(
        'Exception',
        message.getMessage(),
        NOTIFICATION_LEVEL.ERROR
      );
      this.notification.next(modelMessage);
    } else if (message instanceof Notification) {
      this.notification.next(message);
    } else if (message instanceof Array) {
      this.notification.next(message);
    } else {
      let notificationMessage = new Notification('', message);
      this.notification.next(notificationMessage);
    }
  }
}
