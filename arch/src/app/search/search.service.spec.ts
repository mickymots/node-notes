import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { LoggingService } from '../logging/logging.service';
import { MessageService } from '../message-handler/message.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
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
import { NotificationService } from '../notification/notification.service';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ADD_SEARCH_QUERY } from '../state-manager/query.reducer';
import { RESET_SEARCH_QUERY } from '../state-manager/query.reducer';
import { ADD_SEARCH_RESULT } from '../state-manager/search.reducer';

class MockStore {
  private testVal: string;
  public dispatch(testVal: string) {
    this.testVal = testVal;
  }
  public select(testVal: string) {
    return this.testVal;
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

  public routerState = { snapshot: { url: 'test-url' } };
}

class MockAuthService {
  public updateAuthStore(query: any) {}
}

describe('SearchService', () => {
  let searchService: SearchService;
  let queryResult: any;
  let typesResult: any;
  let activeTypeResult: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        // AuthService,
        {
          provide: AuthService,
          useFactory: () => {
            return new MockAuthService();
          }
        },
        LoggingService,
        MessageService,
        MockBackend,
        BaseRequestOptions,
        NotificationService,
        { provide: Router, useClass: MockRouter },
        {
          provide: Store,
          useFactory: () => {
            return new MockStore();
          }
        },
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
  });

  beforeEach(
    inject([SearchService], (service: SearchService) => {
      this.searchService = service;
      this.searchService.query$.subscribe(result => (queryResult = result));
      this.searchService.types$.subscribe(result => (typesResult = result));
      this.searchService.activeType$.subscribe(
        result => (activeTypeResult = result)
      );
    })
  );

  it('TEST 1: should be truthy', () => {
    expect(this.searchService).toBeTruthy();
  });

  it('TEST 2: should set new query observable', () => {
    let testString = 'test';
    this.searchService.setQuery('test');
    expect(testString).toEqual(queryResult);
  });

  it('TEST 3: should set new type observable', () => {
    let testStringArray = ['test1', 'test2'];
    this.searchService.setTypes(['test1', 'test2']);
    expect(testStringArray).toEqual(typesResult);
  });

  it('TEST 4: should set new activeType observable', () => {
    let testString = 'test';
    this.searchService.setActiveType('test');
    expect(testString).toEqual(activeTypeResult);
  });

  it('TEST 5: should store and retrieve the query', () => {
    let testString = 'test';
    let testObject = {
      type: ADD_SEARCH_QUERY,
      payload: testString
    };
    this.searchService.storeQuery('test');
    expect(JSON.stringify(testObject)).toEqual(
      JSON.stringify(this.searchService.fetchQuery())
    );
  });

  it('TEST 6: should store and retrieve the result', () => {
    let testString = 'test';
    let testObject = {
      type: ADD_SEARCH_RESULT,
      payload: testString
    };
    this.searchService.storeResult('test');
    expect(JSON.stringify(testObject)).toEqual(
      JSON.stringify(this.searchService.fetchResult())
    );
  });

  it('TEST 7: should reset the stored query', () => {
    let testObject = {
      type: RESET_SEARCH_QUERY
    };
    this.searchService.resetQuery();
    expect(JSON.stringify(testObject)).toEqual(
      JSON.stringify(this.searchService.fetchResult())
    );
  });
});
