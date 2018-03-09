/* tslint:disable:no-unused-variable */

//angualr imports
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';

//custom components
import { NotificationService } from '@itmp/arch';
import { NotificationComponent } from './notification.component';
import { Notification } from '@itmp/arch';
import { Subscription } from 'rxjs/Subscription';
import { Exception } from '@itmp/arch';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GrowlModule } from 'primeng/primeng';

describe('NotificationComponent has...', () => {

    let notificationComponent: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let notification: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ModalModule.forRoot(), GrowlModule],
            declarations: [NotificationComponent],
            providers: [NotificationService],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationComponent);
        notificationComponent = fixture.componentInstance;

    }));

    //TEST 1 :: to test the initital state of the notification component
    it('TEST 1 -> all notification flags set to false', () => {
        expect(!notificationComponent.isModalShown).toBeTruthy();
        expect(!notificationComponent.isAlertShown).toBeTruthy();
    });


    //TEST 2 :: to test the state of the notification component after a notification has been sent
    it('TEST 2 -> alert notification flags set to true', inject([NotificationService], (service: NotificationService) => {
        service.notify("test notification")
        expect(notificationComponent.isAlertShown).toBeTruthy();
    }));

    //TEST 3 :: to test the message content of the notification component after a notification has been sent
    it('TEST 3 -> notification message to be set in the notification component', inject([NotificationService], (service: NotificationService) => {
        service.notify(new Exception("test exceptions"))
        expect(notificationComponent.alerts[0].detail == "test exceptions").toBeTruthy();
    }));

    //TEST 4 :: to test the html content of the notification component before a notification has been sent
    it('TEST 4 -> notification html is empty set to true', inject([NotificationService], (service: NotificationService) => {
        fixture.detectChanges();
        //  get the element by selector (e.g., by class name)
        de = fixture.debugElement.query(By.all());
        el = de.nativeElement;
        const content = el.textContent.trim();
        expect(content.length == 0).toBeTruthy();
    }));

    //TEST 5 :: to test the html content of the notification component after a notification has been sent
    it('TEST 5 -> notification html to contain the notification message', inject([NotificationService], (service: NotificationService) => {
        service.notify("test notification")
        fixture.detectChanges();
        //  get the element by selector (e.g., by class name)
        de = fixture.debugElement.query(By.all());
        el = de.nativeElement;
        const content = el.textContent;
        expect(content).toContain('test notification', '"html content did not match"');
    }));

    //TEST 6 :: to test the html content of the notification component after a notification has been sent
    it('TEST 6 -> notification html to contain the notification message in p-growl', inject([NotificationService], (service: NotificationService) => {
        service.notify("test notification")
        fixture.detectChanges();
        //  get the element by selector (e.g., by class name)
        de = fixture.debugElement.query(By.all());
        el = de.nativeElement;
        const id = el.id;
        expect(id).toContain('notification-growl', '"notificaton sent to wrong notification component"');
    }));

    //TEST 7 :: to test the html content of the notification component after a notification has been sent
    it('TEST 7 -> notification html to contain the notification message in modal', inject([NotificationService], (service: NotificationService) => {
        service.notify(new Exception("test exceptions"))
        fixture.detectChanges();
        //  get the element by selector (e.g., by class name)
        de = fixture.debugElement.query(By.all());
        el = de.nativeElement;
        const id = el.id;
        expect(id).toContain('notification-growl-sticky', id + " : wrong growl");
    }));

});
