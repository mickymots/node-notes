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
import { LoggingService } from '../logging/logging.service';
import { MessageService } from '../message-handler/message.service';
import { AuthService } from './auth.service';
import { MockResponse } from './mock-permissions';
import { AppStore } from '../state-manager/app.store';
import { StoreModule, Store } from '@ngrx/store';
import { AuthReducer } from '../state-manager/auth.reducer';
import { NotificationService } from '../notification/notification.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

class MockStore {
  private testVal: string;
  public dispatch(testVal: string) {
    this.testVal = testVal;
  }
  public select(testVal: string) {
    return this.testVal;
  }
  public subscribe() {
    let response = new ResponseOptions({
      body: JSON.stringify(MockResponse)
    });
    return Observable.of(new Response(response));
  }
}

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
  public navigate() {}
}

class MockMessageService {
  getForJson(url: String): Observable<any> {
    let response = new ResponseOptions({
      body: JSON.stringify(MockResponse)
    });
    return Observable.of(new Response(response));
  }
}

describe('AuthService', () => {
  let authService: AuthService;
  let messageService: MessageService;
  let mockBackend: MockBackend;
  let notificationService: NotificationService;
  let _url = environment.userPermissions;
  let _modUrl = './assets/data/module.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.provideStore({
          authReducer: AuthReducer
        })
      ],
      providers: [
        AuthService,
        LoggingService,
        NotificationService,
        { provide: Router, useClass: MockRouter },
        { provide: MessageService, useClass: MockMessageService },
        MockBackend,
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
          provide: Store,
          useFactory: () => {
            return new MockStore();
          }
        }
      ]
    });

    //Compile the test bed components
    TestBed.compileComponents();
  });

  beforeEach(
    inject([AuthService, MockBackend], (_authService, _mockBackend) => {
      (authService = _authService), (mockBackend = _mockBackend);
    })
  );

  //Test #1: Auth service should be created
  it('TEST 1: auth service should be created', () => {
    expect(authService).toBeTruthy();
  });

  //Test #2: Permission Array should be created
  it('TEST 2: permission data should be created in <store>', () => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      if (connection.request.url === _url) {
        expect(connection.request.url).toEqual(environment.userPermissions);
      }
      if (connection.request.url === _modUrl) {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: {
                modules: [
                  {
                    name: 'Individual Summary',
                    code: 'summary',
                    icon: './assets/images/icons/dashboard-icon.png',
                    path: 'individual-summary',
                    component: 'FeatureComponent',
                    data: {
                      title: 'Individual Summary'
                    },
                    children: {
                      path: '',
                      pathMatch: 'full',
                      redirectTo: ':NINO/summary'
                    }
                  }
                ]
              }
            })
          )
        );
      }
    });

    authService.loadUserPermissions('2201500');

    expect(authService.permission[0].userID).toEqual('2201500');
    expect(authService.permission[0].departmentName).toEqual('ML00001');
    expect(authService.permission[0].hostname).toEqual('HMRCDEV');
    expect(authService.permission[0].locationAddress).toEqual('Cardiff');
    expect(authService.permission[0].organisationUnitID).toEqual('2201500');
    expect(authService.permission[0].userDisplayName).toEqual(
      'ITMP TFC Processing officer'
    );
    expect(authService.permission[0].modules[0].children.length).toEqual(6);
  });

  it('TEST 3: should alter AuthStatus when logging in and out', () => {
    expect(authService.getAuthStatus()).toBeFalsy();
    authService.loadUserPermissions();
    expect(authService.getAuthStatus()).toBeTruthy();
    authService.logOut();
    expect(authService.getAuthStatus()).toBeFalsy();
  });
});
