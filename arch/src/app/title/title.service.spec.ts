import { TestBed, inject } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { TitleService } from './title.service';
import { Observable } from 'rxjs';

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
}

describe('TitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleService, { provide: Router, useClass: MockRouter }]
    });
  });

  it(
    'should ...',
    inject([TitleService], (service: TitleService) => {
      expect(service).toBeTruthy();
    })
  );
});
