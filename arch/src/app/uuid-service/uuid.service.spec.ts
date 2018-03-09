import { TestBed, inject } from '@angular/core/testing';
import { Router, NavigationStart } from '@angular/router';
import { UUIDService } from './uuid.service';
import { Observable } from 'rxjs';

class MockRouter {
  public ne = new NavigationStart(
    0,
    'http://localhost:4200/dashboard',
    'http://localhost:4200/dashboard'
  )
  public events = new Observable(observer => {
    observer.next(this.ne)
    observer.complete()
  })
  public routerState = {
    root: null
  }
}

describe('UUIDService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UUIDService, { provide: Router, useClass: MockRouter }]
    })
  });

  it('should ...', inject([UUIDService], (service: UUIDService) => {
      expect(service).toBeTruthy()
    }))

  it('should ...', inject([UUIDService], (service: UUIDService) => {
      const generatedValue = service.generateUUID()
      const uuid = service.getUUID()
        expect(generatedValue).toEqual(uuid)
    }))
});
