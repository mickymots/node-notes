/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { Notification } from './notification';
import { Subscription } from 'rxjs/Subscription';
import { Exception } from '../exception-handler/exception';
import { NOTIFICATION_LEVEL } from 'app/notification/notification-level.enum';

describe('NotificationService has...', () => {
  let notification: any;
  let subscription: Subscription;
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
    subscription = service.notificationQueue$.subscribe(
      result => (notification = result)
    );
  });

  //TEST 1 :: to test the initital state of the subscriber of notification service
  it('not sent any notification', () => {
    expect(notification).toBeUndefined();
  });

  //TEST 2 :: to test state of the subscriber after a notification has been sent
  it('sent some notification', () => {
    service.notify('test notification');
    expect(notification).toBeDefined();
  });

  /**
   * TEST 3 :: to test correct type of notification was constructed by the notification service from
   * a string notification message
   */
  it('sent simple string notification and Notification Type was constructed', () => {
    let notificationMessage = new Notification('', 'test notification message');
    service.notify('test notification');
    expect(notification instanceof Notification).toBeTruthy();
  });

  /**
   * TEST 4 :: to test correct type of notification was constructed by the notification service
   * from notification model
   */
  it('sent Notification model and notification was passed on as it is', () => {
    let notificationMessage = new Notification('', 'test notification message');
    service.notify(notificationMessage);
    expect(notification instanceof Notification).toBeTruthy();
  });

  /**
   * TEST 5 :: to test correct type of notification was constructed by the notification service from
   * an Excetion model that was sent to the notification service
   *
   */
  it('sent Exception model and notification model was constructed ', () => {
    let notificationMessage = new Exception('This is a test exception');
    service.notify(notificationMessage);
    expect(notification instanceof Notification).toBeTruthy();
  });

  /**
   * TEST 6 :: to test correct type of notification was constructed by the notification service from
   * an Excetion model that was sent to the notification service
   *
   */
  it('sent Exception model and notification model was constructed with correct severity', () => {
    let notificationMessage = new Exception('This is a test exception');
    service.notify(notificationMessage);
    expect(notification.severity == NOTIFICATION_LEVEL.ERROR).toBeTruthy();
  });

  /**
   * TEST 7 :: to test correct type of notification was constructed by the notification service from
   * an ExcePtion model that was sent to the notification service
   *
   */
  it('sent simple string notification and notification model was constructed ', () => {
    service.notify('Test Notification');
    expect(notification instanceof Notification).toBeTruthy();
  });
});
