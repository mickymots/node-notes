/**
* This is the Assembly Test file for testing integration between the assembly -
* Navigation Service -> Auth service
* Note - This AT files uses HTTP MockBackend as the backend stub server
*/

//Angular 'testing' imports
import { ComponentFixture, TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection, } from '@angular/http/testing';

//Angular 'core' imports
import { Injectable, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

//Angular 'HTTP' & 'RxJS' imports
import { HttpModule, Http, ConnectionBackend, BaseRequestOptions, Response, RequestOptions, ResponseOptions, Headers } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

//Custom imports
import { environment } from '../../environments/environment';
import { ModuleService } from '../module/module.service';
import { LoggingService } from '../logging/logging.service';
import { MessageService } from '../message-handler/message.service';
import { NotificationService } from '../notification/notification.service';
import { AuthService } from '../auth/auth.service';
import { Module } from '../module/module';
import { AppStore } from '../state-manager/app.store';
import { ADD_AUTH } from '../state-manager/auth.reducer';
import { AuthReducer } from '../state-manager/auth.reducer';
import { NavigationService } from '../navigation/navigation.service';
import { MockModules } from './mock-modules';
import { MockPermissions } from './mock-permissions';

// Vendor Imports
import { Store, StoreModule } from '@ngrx/store';

class MockRouter {
  public ne = new NavigationEnd(0, 'http://localhost:4200/dashboard', 'http://localhost:4200/dashboard');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}

const desc = 'Testing assembly for Navigation service -> Authorisation service::';

describe(desc, () => {

  let navService: NavigationService;
  let mockBackend: MockBackend;
  let _url = environment.loggerURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.provideStore({
          auth: AuthReducer
        })
      ],
      providers: [
        NavigationService,
        { provide: Router, useClass: MockRouter },
        ModuleService,
        LoggingService,
        MessageService,
        NotificationService,
        AuthService
      ]
    });

    //Compile the test bed components
    TestBed.compileComponents();
  });

  beforeEach(inject(
    [AuthService, Store],
    (authService: AuthService,
      store: Store<AppStore>) => {
      let data: any;
      data = MockPermissions;

      store.dispatch({
        type: ADD_AUTH,
        payload: {
          pid: data[0].userID,
          roles: data[0].userRoles,
          displayName: data[0].userDisplayName,
          orgID: data[0].organisationUnitID,
          modules: data[0].modules,
          host: data[0].hostname,
          department: data[0].departmentName,
          locationAddress: data[0].locationAddress
        }
      });

    }
  ));

  //Test 1: Test that MockPermissions data is persisting in Store
  it('payload has been created in Store', inject([Store], (store: Store<AppStore>) => {

    store.subscribe((data) => {

      expect(data.auth[0].pid).toEqual("2201500")
      expect(data.auth[0].modules[0].name).toEqual("Individual Summary")
      expect(data.auth[0].modules[0].children.length).toEqual(5)
    });

  }));

  //Test 2: Test that proper <route> array is created from MockPermissions
  it('<route> array has been created from MockPermission', inject([AuthService], (authService: AuthService) => {

    let modules = MockModules;
    let routes = [];

    //Mock NavigationService code to set 'modules' and 
    //call 'checkModulePermissions' of Authorisation service
    if (modules) {
      modules.forEach(module => {
        let _modData = [];
        //Call Authorisation service to check Module permissions
        _modData = authService.checkModulePermissions(module);
        if (_modData.length != 0) {
          routes.push({
            path: _modData[0].path,
            data: { title: _modData[0].data.title },
            children: _modData[0].children
          });
        }

      })
    }
    //Positive test
    expect(routes.length).toEqual(1)
    expect(routes[0].data.title).toEqual("Individual Summary");
    expect(routes[0].children.length).toEqual(5);

    //Negative test
    routes[0].data.title = "Childcare Services";
    expect(routes[0].data.title).toBeUndefined

  }));

});