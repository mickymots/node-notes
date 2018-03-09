import { TestBed, inject } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { PreferencesService } from './preferences.service';
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
}

describe('PreferencesService', () => {
  let prefService: PreferencesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesService, { provide: Router, useClass: MockRouter }]
    });
  });

  beforeEach(
    inject([PreferencesService], (service: PreferencesService) => {
      this.preferences = service;
    })
  );

  it('should ...', () => {
    expect(this.preferences).toBeTruthy();
  });

  it('should set a theme in local storage', () => {
    let theme = 'test';
    this.preferences.setTheme(theme);
    expect(localStorage.getItem('theme')).toEqual(theme);
  });

  it('should get a theme from local storage', () => {
    let theme = 'test';
    this.preferences.setTheme(theme);
    expect(this.preferences.getTheme()).toEqual(localStorage.getItem('theme'));
  });
});
