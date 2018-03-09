import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  Headers,
  RequestOptions,
  BaseRequestOptions,
  XHRBackend,
  ResponseOptions
} from '@angular/http';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { AuditService } from './audit.service';
import { MessageService } from '../message-handler/message.service';
import { ModuleService } from '../module/module.service';
import { NotificationService } from '../notification/notification.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuditModel } from './audit.model';
import { Audit } from './audit';
import { Observable } from 'rxjs';
import { SessionStateReducer } from '../state-manager/session-state.reducer';
import { AuthReducer } from '../state-manager/auth.reducer';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../logging/logging.service';
import { NavigationService } from './../navigation/navigation.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';
import { ReferenceDataService } from '../reference-data/reference-data.service';

class MockRouter {
  public ne = new NavigationEnd(
    0,
    'http://localhost:4200/dashboard',
    'http://localhost:4200/dashboard'
  );
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
  public routerState = { snapshot: { url: 'test-url' } };
}

describe('AuditService ', () => {
  let auditService: AuditService;
  let messageService: MessageService;
  let backend: MockBackend;
  let auditModel: AuditModel;
  let notificationService: NotificationService;
  let moduleService: ModuleService;
  let message = 'test';
  //Runs before each of the test cases are executed
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.provideStore({
          authReducer: AuthReducer,
          sessionStateReducer: SessionStateReducer
        })
      ],
      providers: [
        AuditService,
        AuthService,
        LoggingService,
        NavigationService,
        NotificationService,
        ModuleService,
        { provide: Router, useClass: MockRouter },
        MessageService,
        NgProgressModule,
        MockBackend,
        ReferenceDataService,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (
            backend: XHRBackend,
            defaultOptions: BaseRequestOptions
          ) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });

    //Compile the test bed components
    TestBed.compileComponents();
  });

  //Runs before each of the test cases are executed
  beforeEach(
    inject(
      [AuditService, MessageService],
      (
        service: AuditService,
        _messageService: MessageService,
        _backend: MockBackend
      ) => {
        auditService = service;
        messageService = _messageService;
        backend = _backend;
      }
    )
  );

  //Audit Service instance should get created successfully..
  it('TEST-1 : should be created', () => {
    expect(auditService).toBeTruthy();
  });

  //  Audit service audit should get called..
  it('TEST-2 : should call the audit method with given AuditModel instance', () => {
    spyOn(auditService, 'audit');
    let auditModelMessage = new AuditModel('taxPayerRefTest', 'V', [
      'TesttaxpayerReference1',
      'TesttaxpayerReference2'
    ]);
    auditService.audit(auditModelMessage);
    expect(auditService.audit).toHaveBeenCalledWith(auditModelMessage);
  });

  //  Audit service sendToServer should get called..
  it('TEST-3 : sendToServer method should be called through the audit method', () => {
    let spy = spyOn(auditService, 'sendToServer');
    let auditModelMessage = new AuditModel('taxPayerRefTest', 'V', [
      'param1',
      'param2'
    ]);

    auditService.audit(auditModelMessage);
    expect((spy.calls.allArgs()[0][0] as Audit).taxpayerReference).toEqual(
      auditModelMessage.taxpayerReference
    );
    expect((spy.calls.allArgs()[0][0] as Audit).sequence).toEqual(
      auditModelMessage.sequence
    );
    expect((spy.calls.allArgs()[0][0] as Audit).functionalParameters).toEqual(
      auditModelMessage.functionalParameters
    );
  });

  //  Audit message instance should get created successfully..
  it(
    'TEST-4 : should be able to send message using messaging service',
    inject([MockBackend], (mockBackend: MockBackend, done: any) => {
      let messageSpy = spyOn(messageService, 'postForEntity').and.callThrough();
      let auditMessage = new AuditModel('taxPayerRefTest', 'V', [
        'param1',
        'param2'
      ]);
      let auditMessageDummy = new AuditModel('testtttaxpayerReference', 'E', [
        'testttfunctionalParameters1',
        'testttfunctionalParameters2'
      ]);
      let connections = mockBackend.connections;

      connections.subscribe((connection: MockConnection) => {
        expect(messageSpy.calls.allArgs()[0][1].taxpayerReference).toEqual(
          auditMessage.taxpayerReference
        );
        expect(messageSpy.calls.allArgs()[0][1].taxpayerReference).toEqual(
          auditMessage.taxpayerReference
        );
        expect(messageSpy.calls.allArgs()[0][1].sequence).toEqual(
          auditMessage.sequence
        );
        expect(messageSpy.calls.allArgs()[0][1].functionalParameters).toEqual(
          auditMessage.functionalParameters
        );
        expect(messageSpy.calls.allArgs()[0][1].taxpayerReference).not.toEqual(
          auditMessageDummy.taxpayerReference
        );
        expect(messageSpy.calls.allArgs()[0][1].sequence).not.toEqual(
          auditMessageDummy.sequence
        );
        expect(
          messageSpy.calls.allArgs()[0][1].functionalParameters
        ).not.toEqual(auditMessageDummy.functionalParameters);
      });

      auditService.audit(auditMessage);
    })
  );
});
