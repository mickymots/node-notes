import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

//ITMP Arch components import
import { environment } from '../../environments/environment';
import { AppStore } from '../state-manager/app.store';
import { RESET, UPDATE } from '../state-manager/session-state.reducer';
import { Notification } from '../notification/notification';
import { NOTIFICATION_LEVEL } from '../notification/notification-level.enum';
import { NOTIFICATION_TYPE } from '../notification/notification-type.enum';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class SessionManagerService {
  public sessionValue: Observable<number>;
  public timer: Observable<number>;
  public interval: number = 1000; //1000 miliseconds
  notified = false;

  constructor(
    public store: Store<AppStore>,
    public router: Router,
    private notificationService: NotificationService
  ) {
    this.manageSession();
  }

  /**
   * Angular Lifecyle function - Invoked after component has been constructed.
   * 4 distinctive steps being executed in this function:
   *
   * 1. Create a timer object - Used RxJS Obseravle API for this
   *    Observable.timer(initialDelay,period - Creates an Observable that starts emitting after an `initialDelay` and
   *    emits ever increasing numbers after each `period` of time thereafter.
   *
   * 2. Subscribe to Timer emits : every emit signals that 1 unit of time (INTERVAL) has passed. In our example, we will configure
   *    this interval as 1 minute. After receiving this signal Session manager (Store) is sent a message for updating its value of
   *    remaining idle time.
   *
   * 3. Subscribe to session manager - SessionManager's store 'Idle time remaining' value in timeout variable property.
   *    This property is selected in this component's constructor. This property is of Observable type. Any change to this property
   *    is being watched and if session has timedout (i.e. timeout <= 0) then a notification is sent across the notification service
   *    to signal out session expiry.
   *
   * 4. Subscribe to router - Subscribe to application router and detect any page navigation. Page navigation signals that user is
   *    active on the application and application should reset the timeout to the original value.
   */

  resetSession() {
    this.store.dispatch({
      type: RESET,
      payload: { timeout: environment.sessionTimeout }
    });
  }

  manageSession() {
    //Select the session state value from store
    this.sessionValue = this.store.select('sessionStateReducer');
    //Dispatch RESET command to store
    this.store.dispatch({
      type: RESET,
      payload: { timeout: environment.sessionTimeout }
    });

    //Check config for timer setting
    if (environment.timeUnit == 'MIN') this.interval = this.interval * 60; //convert seconds to minute as per config setting

    // Init timer
    this.timer = Observable.timer(this.interval, this.interval);

    let _comp = this;

    //Subscribe to timer events
    this.timer.subscribe(t => {
      this.store.dispatch({ type: UPDATE, payload: { factor: 1 } });
    });

    //Subscribe to session update events
    this.sessionValue.subscribe(value => {
      if (value == 10 && !this.notified) {
        _comp.notificationService.notify(
          new Notification(
            'Session Expiring!',
            'Your session will expire in 10 minutes. Do you wish to extend?',
            NOTIFICATION_LEVEL.INFO,
            NOTIFICATION_TYPE.MODEL_WITH_CONFIRM
          )
        );
      }
      if (!(value > 0) && !this.notified) {
        _comp.notificationService.notify(
          new Notification(
            'Session Expired!',
            'Your Session has expired.',
            NOTIFICATION_LEVEL.INFO,
            NOTIFICATION_TYPE.MODEL
          )
        );
        this.notified = true;
      }
    });

    //Subscribe to route change events and RESET session value
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        _comp.store.dispatch({
          type: RESET,
          payload: { timeout: environment.sessionTimeout }
        });
      }
    });
  }
}
