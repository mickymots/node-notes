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
import { ReferenceDataService } from './reference-data.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ReferenceDataType } from './reference-data.enum';
import { LoggingService } from '../logging/logging.service';
import { REFDATACACHE } from './reference-data.cache';
import { MessageService } from '../message-handler/message.service';
import { ReferenceData } from './reference-data';
import { ReferenceDataGroup } from './reference-data.group';
import { AuthService } from '../auth/auth.service';
import { ModuleService } from '../module/module.service';
import { SessionStateReducer } from '../state-manager/session-state.reducer';
import { AuthReducer } from '../state-manager/auth.reducer';
import { COUNTRY_LIST } from './reference.test-data';
import { NotificationService } from '../notification/notification.service';
import { Injectable } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

@Injectable()
class MockMessageService {
  getForObject<T>(url: string, clazz: { new (): T }): Observable<any> {
    let referenceDataGroup = new ReferenceDataGroup();
    let data = [];
    let referenceData = new ReferenceData();

    referenceData.type = ReferenceDataType.COUNTRY_TYPE;
    referenceData.id = '00000000';
    referenceData.start_Date = '01/01/1900';
    referenceData.end_Date = '01/01/2078';
    referenceData.values = 'NOT SPECIFIED OR NOT USED|0|0|';

    data.push(referenceData);
    referenceDataGroup.data = data;

    return Observable.of(referenceDataGroup);
  }
}

@Injectable()
class MockLoggingService {
  log(args: any) {}
}
@Injectable()
class MockAuthService {
  getForObject<T>(url: string, clazz: { new (): T }): Observable<any> {
    let response = new ResponseOptions({
      body: JSON.stringify(COUNTRY_LIST)
    });
    return Observable.of(new Response(response));
  }
}

@Injectable()
class MockNotificationService {
  notify(message: any) {}
}
@Injectable()
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

describe('ReferenceDataService ', () => {
  let expectedResult: any[];
  let _service: ReferenceDataService;
  let _backend: MockBackend;
  let notificationService: NotificationService;
  let _refDataUrl = '/ITMP/services/referenceData';

  beforeEach(() => {
    //Configure the test bed
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.provideStore({
          authReducer: AuthReducer,
          sessionStateReducer: SessionStateReducer
        })
      ],
      providers: [
        ReferenceDataService,
        { provide: Router, useClass: MockRouter },

        { provide: NotificationService, useclass: MockNotificationService },
        NotificationService,

        { provide: LoggingService, useclass: MockLoggingService },
        LoggingService,
        { provide: AuthService, useclass: MockAuthService },
        AuthService,
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
        },

        {
          provide: MessageService,
          useFactory: () => {
            //return new MessageService(http, notificationService);
            return new MockMessageService();
          }
        }
      ]
    });
    //Compile the test bed components
    TestBed.compileComponents();
  });

  beforeEach(
    inject(
      [ReferenceDataService, MockBackend],
      (service: ReferenceDataService, mockBackend: MockBackend) => {
        //set the service in global context
        // jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
        _service = service;
        expectedResult = COUNTRY_LIST;
        _backend = mockBackend;
      }
    )
  );

  /**TEST 1: - test that ReferenceData service is able to load the country data */
  it('TEST 1: should load the selected reference data...', done => {
    _service.getRefData('COUNTRYS_').subscribe(response => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResult));
      done();
    });
  });

  /**TEST 2: - To test that ReferenceData cache is being used in subsequent calls */
  it('TEST 2: should load the selected reference data from cache in the subsequent call...', () => {
    _service.getRefData('COUNTRY_').subscribe(response => {});
    spyOn(_service, 'loadPartialRefData');
    expect(_service.loadPartialRefData).not.toHaveBeenCalled();
  });

  /**TEST 3: tests that loadPartialRefData is called*/
  it('TEST 3: should return reference data from message service', done => {
    _service.loadPartialRefData('test').subscribe(response => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResult));
      done();
    });
  });

  /**TEST 4: tests getMultiRefData is called */
  it(
    'TEST 4: should return an array of values',
    inject([MessageService], (messageService: MessageService) => {
      let messageServiceSpy = spyOn(
        messageService,
        'getForObject'
      ).and.callThrough();
      let typeValue = ['type', 'id'];
      let messageTestParams =
        'services/referenceData?&name=' +
        typeValue[0] +
        '&name=' +
        typeValue[1]; // value passed to getForObject in getMultiRefData
      _service.getMultiRefData(typeValue).subscribe(response => {
        expect(JSON.stringify(response)).toEqual(
          JSON.stringify(expectedResult)
        );
        expect(messageServiceSpy).toHaveBeenCalled();
        expect(messageServiceSpy.calls.allArgs()[0][0]).toEqual(
          messageTestParams
        );
      });
    })
  );
});
