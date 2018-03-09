import {
  Http,
  BaseRequestOptions,
  HttpModule,
  Response,
  XHRBackend,
  ResponseOptions,
  RequestMethod
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MessageService } from './message.service';
import { TestBed, async, inject } from '@angular/core/testing';
import { ResponseMessage } from './response-message';
import { LoggingService } from '../logging/logging.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { SessionStateReducer } from '../state-manager/session-state.reducer';
import { AuthReducer } from '../state-manager/auth.reducer';
import { NotificationService } from '../notification/notification.service';
import { Headers } from '@angular/http';
import { ModuleService } from '../module/module.service';
import { ERROR_STATUS } from 'app/message-handler/error-status.enum';

/**
 * Mock LoggingService class for DI injection
 */
class MockLoggerService {
  // Error type
  log(...args: any[]): void {}
  debug(...args: any[]): void {}
  info(...args: any[]): void {}
  warn(...args: any[]): void {}
  error(...args: any[]): void {}
  assert(assertion: boolean, ...args: any[]): void {}
  fatal(...args: any[]): void {}
}

/**
 * Mock ConfigService class for DI injection
 */
class MockConfigService {
  getConfig(Key: any) {
    return 'mock value returned';
  }
}

describe('MessageServiceTest', () => {
  /*let subject: MessageService = null;
  let backend: MockBackend = null;*/
  let notificationService: NotificationService;
  let moduleService: ModuleService;
  let messageService: MessageService;
  let backend: MockBackend;

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
        NotificationService,
        { provide: LoggingService, useClass: MockLoggerService },
        MessageService,
        MockBackend,
        ModuleService,
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
        },
        AuthService
      ]
    });

    TestBed.compileComponents();
  });

  beforeEach(
    inject(
      [MessageService, MockBackend],
      (service: MessageService, _backend: MockBackend) => {
        messageService = service;
        backend = _backend;
      }
    )
  );

  /**
   * Test 1 : Run through the service and its depencendies to check for errors
   */
  it('Test 1 : should ...', () => {
    expect(messageService).toBeTruthy();
  });

  it('Test 2 : should trigger a GET Call and check the response', () => {
    let message = 'test';

    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ message: message })
      });
      connection.mockRespond(new Response(options));
    });

    messageService.getForObject('xxxx', ResponseMessage).subscribe(response => {
      expect(response.message).toEqual(message);
    });
  });

  it('Test 3 : should trigger a GET Call along with headers argument and check the response', () => {
    let message = 'test';
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ message: message })
      });
      connection.mockRespond(new Response(options));
    });

    messageService
      .getForObject('xxxx', ResponseMessage, headers)
      .subscribe(response => {
        expect(response.message).toEqual(message);
      });
  });

  it('Test 4 : should trigger a GET Call using url only', () => {
    let message = 'test';
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ message: message })
      });
      connection.mockRespond(new Response(options));
    });
    messageService.getForJson('xxxx').subscribe(response => {
      expect(response.message).toEqual(message);
    });
  });

  it('Test 5 : should trigger a POST call and check the response', () => {
    let message = 'test';

    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ message: message })
      });
      connection.mockRespond(new Response(options));
    });

    messageService
      .postForEntity('xxxx', ResponseMessage)
      .subscribe(response => {
        expect(response.getBody).toEqual(message);
      });
  });

  it('Test 6 : should trigger a PUT call and check the response', () => {
    let message = 'test';

    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ message: message })
      });
      connection.mockRespond(new Response(options));
    });

    messageService.putForEntity('xxxx', ResponseMessage).subscribe(response => {
      expect(response.getBody).toEqual(message);
    });
  });

  it('Test 7 : should trigger a DELETE call and check the response', () => {
    let message = 'test';

    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({ message: message })
      });
      connection.mockRespond(new Response(options));
    });

    messageService
      .deleteForEntity('xxxx', 'testKey', ResponseMessage.prototype.message)
      .subscribe(response => {
        expect(response.getBody).toEqual(message);
      });
  });
});
