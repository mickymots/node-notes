/* tslint:disable:no-unused-variable */
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { TestBed, async, inject } from '@angular/core/testing';
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
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ReferenceDataService } from '../reference-data/reference-data.service';
import { ReferenceData } from '../reference-data/reference-data';
import { Observable } from 'rxjs/Rx';
import { ReferenceDataType } from '../reference-data/reference-data.enum';
import { LoggingService } from '../logging/logging.service';
import { REFDATACACHE } from '../reference-data/reference-data.cache';
import { MessageService } from '../message-handler/message.service';
import { Exception } from '../exception-handler/exception';
import { AuthService } from '../auth/auth.service';
import { ExceptionService } from './exception.service';
import { SessionStateReducer } from '../state-manager/session-state.reducer';
import { AuthReducer } from '../state-manager/auth.reducer';
import { ERROR_CODES } from './exception.test-data';
import { NotificationService } from '../notification/notification.service';
import { ModuleService } from '../module/module.service';

class MockReferenceDataService {
  getRefData(typeValue): Observable<any> {
    return this.loadPartialRefData(typeValue);
  }
  loadPartialRefData(typeValue: string): Observable<any> {
    let response = new ResponseOptions({
      body: JSON.stringify(ERROR_CODES)
    });
    return Observable.of(new Response(response));
  }
}
describe('Exception Service Test ', () => {
  let expectedResult: any[];
  let _service: MockReferenceDataService;
  let mockBackend: MockBackend;
  let notificationService: NotificationService;
  let expService: ExceptionService;
  let exception: any;
  let notifService: NotificationService;
  let _refDataUrl = '/ITMP/services/referenceData?name=ERROR_CODE';

  beforeEach(() => {
    //Configure the test bed
    TestBed.configureTestingModule({
      imports: [
        // HttpModule,
        StoreModule.provideStore({
          authReducer: AuthReducer,
          sessionStateReducer: SessionStateReducer
        })
      ],
      providers: [
        MessageService,
        ReferenceDataService,
        MessageService,
        ExceptionService,
        LoggingService,
        AuthService,
        NotificationService,
        MockBackend,
        ModuleService,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (
            backend: MockBackend,
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

  beforeEach(
    inject(
      [
        ReferenceDataService,
        ExceptionService,
        NotificationService,
        MockBackend
      ],
      (
        service: ReferenceDataService,
        _expService: ExceptionService,
        _notifService: NotificationService,
        _mockBackend: MockBackend
      ) => {
        _service = service;
        expService = _expService;
        notifService = _notifService;
        mockBackend = _mockBackend;
      }
    )
  );

  //TEST #1: Exception was found in the Reference Data lookup
  it('Test: 1 should add the exception message to the notification queue when reference data was found', (done: any) => {
    let _excepDef = new Exception('Error in loading reference data', 1001);

    mockBackend.connections.subscribe((connection: MockConnection) => {
      if (connection.request.url === _refDataUrl) {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: {
                data: [
                  {
                    type: 'ERROR_CODE',
                    id: '1000',
                    start_Date: '01/01/1900',
                    end_Date: '01/01/2078',
                    values: 'Person.age not defined in BFM1234'
                  },
                  {
                    type: 'ERROR_CODE',
                    id: '1001',
                    start_Date: '01/01/1900',
                    end_Date: '01/01/2078',
                    values: 'Error in loading reference data'
                  },
                  {
                    type: 'ERROR_CODE',
                    id: '2000',
                    start_Date: '01/01/1900',
                    end_Date: '01/01/2080',
                    values: 'Reference Data not found for Exception'
                  }
                ]
              }
            })
          )
        );
      }
    });
    setTimeout(function() {
      done();
    }, 1500);

    notifService.notificationQueue$.subscribe(result => {
      expect(result.message).toEqual('anything');
      done();
    });
    expService.throw(_excepDef);
  });

  //TEST #2: Exception was not found in the Reference Data lookup
  it('Test 2: should add the default exception message to the notification queue when reference data was not found', (done: any) => {
    let _excepNotDef = new Exception('Random Exception', 2002);

    mockBackend.connections.subscribe((connection: MockConnection) => {
      if (connection.request.url === _refDataUrl) {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: {
                data: [
                  {
                    type: 'ERROR_CODE',
                    id: '1000',
                    start_Date: '01/01/1900',
                    end_Date: '01/01/2078',
                    values: 'Person.age not defined in BFM1234'
                  },
                  {
                    type: 'ERROR_CODE',
                    id: '1001',
                    start_Date: '01/01/1900',
                    end_Date: '01/01/2078',
                    values: 'Error in loading reference data'
                  },
                  {
                    type: 'ERROR_CODE',
                    id: '2000',
                    start_Date: '01/01/1900',
                    end_Date: '01/01/2080',
                    values: 'Reference Data not found for Exception'
                  }
                ]
              }
            })
          )
        );
      }
    });
    setTimeout(function() {
      done();
    }, 1500);
    notifService.notificationQueue$.subscribe(result => {
      expect(result.message).toEqual('Random Exception');
      done();
    });

    expService.throw(_excepNotDef);
  });
});
