import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '@itmp/arch';
import { NotificationService } from '@itmp/arch';
import { Notification } from '@itmp/arch';
import { NOTIFICATION_LEVEL } from '@itmp/arch';
import { NOTIFICATION_TYPE } from '@itmp/arch';
import { Message } from 'primeng/primeng';
import { environment } from '../../../environments/environment';
import { RESET, UPDATE } from '@itmp/arch';
import { SessionManagerService } from '@itmp/arch';

/**
 * Notification component displays exception or information messages on screen as being generated by the
 * application components at the runtime.
 *
 * This component is added in the app.component template file and is available all function modules.
 */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Output() public okClicked = new EventEmitter();
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;

  private subscription: Subscription;
  public timeout: number = environment.notificationTimeout;
  public isModalShown: boolean = false;
  public isAlertShown: boolean = false;
  public model: Notification;
  public alerts: Message[] = [];
  isConfirmed = false;
  restartApp = false;

  constructor(
    private notificationService: NotificationService,
    private sessionManagerService: SessionManagerService
  ) {
    this.subscribeToNotifications();
  }

  ngOnInit() {}

  /**
   * Notification component listens to the notification service queue.
   * this subscribeToNotifications() method enables this listening
  */
  subscribeToNotifications() {
    this.subscription = this.notificationService.notificationQueue$.subscribe(
      result => this.processNotification(result)
    );
  }

  /**
   * processNotification handles the type of notification to be shown on the screen
   * notification.type = Model - show a model dialog box
   * notification.type = notification = show a growl message that disappers after set timeout
   */
  private processNotification(notifications: any) {
    if (notifications instanceof Array) {
      let _temp: Message[] = [];
      this.isAlertShown = true;
      this.alerts = notifications.map(notification =>
        this.getMessage(notification)
      );
    } else {
      switch (notifications.type) {
        case NOTIFICATION_TYPE.MODEL:
          this.isModalShown = true;
          this.isConfirmed = false;
          this.restartApp = true;
          this.model = notifications;
          break;
        case NOTIFICATION_TYPE.NOTIFICATION:
          this.isAlertShown = true;
          this.alerts = [];
          this.alerts.push(this.getMessage(notifications));
          break;
        case NOTIFICATION_TYPE.MODEL_WITH_CONFIRM:
          this.isModalShown = true;
          this.isConfirmed = true;
          this.model = notifications;
          break;
      }
    }
  }

  private getMessage(notification): Message {
    return {
      severity: this.getSeverity(notification),
      summary: notification.header,
      detail: notification.message
    };
  }

  private getSeverity(notification: Notification): string {
    switch (notification.severity) {
      case NOTIFICATION_LEVEL.INFO:
        return 'info';
      case NOTIFICATION_LEVEL.SUCCESS:
        return 'success';
      case NOTIFICATION_LEVEL.WARN:
        return 'warn';
      case NOTIFICATION_LEVEL.ERROR:
        return 'error';
      default:
        return 'info';
    }
  }

  // remove the subscription on message queue when this component gets destroyed
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //This event is fired immediately when the hide instance method has been called.
  public hideModal(): void {
    this.autoShownModal.hide();
  }

  //This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete)
  public onHidden(): void {
    this.isModalShown = false;
  }

  //When Yes button is pressed on extending modal, this will reset the timer.
  public restartTimer() {
    this.isModalShown = false;
    this.sessionManagerService.resetSession();
  }

  //Closes modal to allow session expired.
  public continueExpire() {
    this.isModalShown = false;
  }
}
