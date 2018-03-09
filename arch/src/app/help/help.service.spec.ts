/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HelpService } from './help.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { TitleService } from '../title/title.service';
import { environment } from '../../environments/environment';

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
  public routerState = {
    root: null
  };
  public root = {
    children: {
      0: undefined
    }
  };
}

let titleService: TitleService;
let serviceResult: any;

describe('HelpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HelpService,
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockRouter },
        TitleService
      ]
    });
  });

  beforeEach(
    inject([HelpService], (service: HelpService) => {
      this.helpService = service;
      this.helpService.queryAnnounced$.subscribe(
        result => (serviceResult = result)
      );
    })
  );

  it(
    'should ...',
    inject([HelpService, Router], (service: HelpService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should return a help url...',
    inject([HelpService, Router], (service: HelpService) => {
      const mockQuery = 'http://www.test.test/test';
      service.setQuery(mockQuery);
      expect(serviceResult).toEqual(mockQuery);
    })
  );
});
