/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Routes } from '@angular/router';
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
import { NavigationService } from './navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ModuleService } from '../module/module.service';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from '../state-manager/auth.reducer';
import { SessionStateReducer } from '../state-manager/session-state.reducer';
import { LoggingService } from '../logging/logging.service';
import { MessageService } from '../message-handler/message.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { NotificationService } from '../notification/notification.service';
import { Module } from '../module/module';
import { ReferenceDataService } from '../reference-data/reference-data.service';
import { Injectable } from '@angular/core';

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

@Injectable()
class MockAuthService {
  checkModulePermissions(module: any): Array<any> {
    return xroutes;
  }
}

export const xroutes: Routes = [
  {
    path: 'work-item',
    component: undefined,
    data: { title: 'Title' },
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'current-child-claim-details',
        component: undefined,
        data: {
          title: 'Current Child Application Details',
          hidden: 'true',
          pageID: 'current-child-claim-det-001'
        }
      }
    ]
  }
];

describe('NavigationService', () => {
  let moduleService: ModuleService;
  let mockBackend: MockBackend;
  let notificationService: NotificationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({
          authReducer: AuthReducer,
          sessionStateReducer: SessionStateReducer
        })
      ],
      providers: [
        LoggingService,
        ModuleService,
        MessageService,
        NotificationService,
        { provide: Router, useClass: MockRouter },
        Http,
        NgProgressModule,
        {
          provide: AuthService,
          useFactory: () => {
            return new MockAuthService();
          }
        },
        NavigationService,
        MockBackend,
        ReferenceDataService,
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
  });

  /**
   * Run through the service and its depencendies to check for errors
   */
  it(
    'TEST: 1 - should ...',
    inject([NavigationService], (service: NavigationService) => {
      expect(service).toBeTruthy();
    })
  );

  /**
   * Test to check the application routes from environment
   * config are loaded using the getRouteData method
   */
  it(
    'TEST: 2 - should set routes from configuration data...',
    inject(
      [NavigationService, ModuleService],
      (service: NavigationService, moduleService: ModuleService) => {
        let mockRoutes = [
          Object({
            path: 'work-item',
            data: Object({ title: 'Title' }),
            children: [
              Object({ path: '', redirectTo: '', pathMatch: 'full' }),
              Object({
                path: 'current-child-claim-details',
                component: undefined,
                data: Object({
                  title: 'Current Child Application Details',
                  hidden: 'true',
                  pageID: 'current-child-claim-det-001'
                })
              })
            ],
            moduleType: undefined
          })
        ];

        let mod: Module = {
          name: 'test name',
          code: 'wi',
          path: 'work-item',
          routes: xroutes
        };
        moduleService.setModule(mod);
        let routes = service.getRouteData('');
        expect(JSON.stringify(routes)).toEqual(JSON.stringify(mockRoutes));
      }
    )
  );

  /**
   * Negative Test to check the application routes from environment
   * config are loaded using the getRouteData method
   */
  it(
    'TEST: 3 - should set routes from configuration data...',
    inject(
      [NavigationService, ModuleService],
      (service: NavigationService, moduleService: ModuleService) => {
        let mockRoutes = [
          Object({ path: 'Negative-Test', data: Object({ title: 'Title' }) })
        ];
        let mod: Module = {
          name: 'test name',
          code: 'wi',
          path: 'work-item',
          routes: xroutes,
          version: '2.0',
          icon: './assets/images/icons/dashboard-icon.png'
        };
        moduleService.setModule(mod);
        let routes = service.getRouteData('');
        expect(JSON.stringify(routes)).not.toEqual(JSON.stringify(mockRoutes));
      }
    )
  );
});
