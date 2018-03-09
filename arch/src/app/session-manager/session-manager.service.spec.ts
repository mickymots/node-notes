import { TestBed, inject } from '@angular/core/testing';
import { RESET, UPDATE } from '../state-manager/session-state.reducer';
import { SessionManagerService } from './session-manager.service';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/from';

import { NotificationService } from '../notification/notification.service';
import { Router, NavigationEnd } from '@angular/router';
import { SessionStateReducer } from '../state-manager/session-state.reducer';
import { AuthReducer } from '../state-manager/auth.reducer';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

class MockRouter {
  public url;
  public ne = new NavigationEnd(
    0,
    'http://localhost:4200/login',
    'http://localhost:4200/login'
  );
  private subject = new Subject();
  public events = this.subject.asObservable();
  navigate(url: string) {
    this.url = url;
    this.triggerNavEvents(url);
  }

  triggerNavEvents(url) {
    let ne = new NavigationEnd(0, 'url', null);
    this.subject.next(ne);
  }
}

/**
 * This class holds the updated value of the session as being published by sessionManagerService.
 * Also, it provides a method to simulate navigation occured event on the router of sessionManagerService
 */
class MockSession {
  result = 0;
  constructor(
    public expectedValue: number,
    public sessionManagerService: SessionManagerService
  ) {
    sessionManagerService.sessionValue.subscribe(value => {
      this.result = value;
    });
  }

  doNavigate() {
    this.sessionManagerService.router.navigate(['/child-benefit']);
  }

  assert() {
    expect(this.result).toEqual(this.expectedValue);
  }
}

describe('SessionManagerService', () => {
  let initialEnvTimeUnit = environment.timeUnit;
  beforeEach(() => {
    environment.timeUnit = 'SEC';
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({
          authReducer: AuthReducer,
          sessionStateReducer: SessionStateReducer
        }),
        StoreDevtoolsModule.instrumentOnlyWithExtension({
          maxAge: 5
        })
      ],
      providers: [
        NotificationService,
        SessionManagerService,
        { provide: Router, useClass: MockRouter }
      ]
    });
  });

  let sessionManagerService;
  beforeEach(
    inject([SessionManagerService], _sessionService => {
      sessionManagerService = _sessionService;
    })
  );

  afterEach(() => {
    environment.timeUnit = initialEnvTimeUnit;
  });

  //TEST 1 :: to test the inititalization of the session manager service
  it(
    'should be created',
    inject(
      [SessionManagerService],
      (sessionManagerService: SessionManagerService) => {
        expect(sessionManagerService).toBeTruthy();
      }
    )
  );

  //TEST 2 :: to test the initital state of the session state component
  it(' TEST 2 : correct state information...', (done: any) => {
    let test = new MockSession(20, sessionManagerService);
    setTimeout(function() {
      test.assert();
      done();
    }, 100);
  });

  //TEST 3 :: to test the updated state of the session state component
  it(' TEST 3 : correct state information after REDUX UPDATE Action...', (done: any) => {
    let test = new MockSession(19, sessionManagerService);
    //wait for just over 1 seconds before running assert on current session value.
    setTimeout(function() {
      test.assert();
      done();
    }, 1150);
  });

  //TEST 4 :: to test the updated state of the session state component
  it(' TEST 4 : correct state information after REDUX UPDATE Action multiple times...', (done: any) => {
    let test = new MockSession(17, sessionManagerService);

    //wait for just over 3 seconds before running assert on current session value.
    setTimeout(function() {
      test.assert();
      done();
    }, 3150);
  });

  //TEST 5 :: to test the updated state of the session state component
  it(' TEST 5 : correct state information after REDUX RESET Action multiple times...', (done: any) => {
    let test = new MockSession(20, sessionManagerService);

    //wait for just over 3 seconds before running assert on current session value. But assert
    //after a navigation event to validate session has been reset.
    setTimeout(function() {
      test.doNavigate();
      test.assert();
      done();
    }, 3150);
  });
});
