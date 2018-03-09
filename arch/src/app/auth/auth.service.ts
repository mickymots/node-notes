// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

// Vendor
import { Store } from '@ngrx/store';

// RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

// Custom
import { environment } from '../../environments/environment';
import { AppStore } from '../state-manager/app.store';
import { ADD_AUTH, UPDATE_ROUTE } from '../state-manager/auth.reducer';
import { MessageService } from '../message-handler/message.service';
import { LoggingService } from '../logging/logging.service';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/notification';

@Injectable()
export class AuthService {
  private authStatus: boolean = false;
  private redirectUrl: string;
  private orgUnitID: any;
  private url;
  storeData: any;
  private _orgID: string;
  private _roles = [];
  private modules = [];
  public permission = [];
  public searchArr = [];

  constructor(
    private store: Store<AppStore>,
    private loggingService: LoggingService,
    private messageService: MessageService,
    private router: Router,
    private http: Http,
    private notificationService: NotificationService
  ) {}

  setAuthStatus(status) {
    this.authStatus = status;
  }

  getAuthStatus() {
    return this.authStatus;
  }

  setRedirectUrl(redirectUrl) {
    this.redirectUrl = redirectUrl;
  }

  getRedirectUrl() {
    return this.redirectUrl;
  }

  getRoles() {
    return this._roles;
  }

  setRoles(roles: any[]) {
    this._roles = roles;
  }

  getOrgUnitID() {
    return this._orgID;
  }

  setOrgUnitID(orgID: string) {
    this._orgID = orgID;
  }

  logOut() {
    this.setAuthStatus(false);
  }

  /**
   * Retrieve the permission data
   */
  loadUserPermissions(userID?: any) {
    this.url = userID
      ? environment.userPermissions + '?userID=' + userID
      : environment.userPermissions;

    this.messageService.getForJson(this.url).subscribe(res => {
      this.setAuthStatus(true);
      this.preparePermissions(res);
      this.router.navigate([this.redirectUrl]);
      if (!environment.production) {
        this.notifyUser();
      }
    });
  }

  /**
   * Prepare permission data before persistance.
   * Also dispatch permission data to Store
   */
  preparePermissions(result: any) {
    let userArr: any;
    userArr = result.json();

    for (let module in userArr.userModules) {
      let resourceArray = [];
      let _modName = userArr.userModules[module];

      for (let resource in userArr.userResources) {
        if (userArr.userResources[resource].moduleName == _modName) {
          resourceArray.push(userArr.userResources[resource]);
        }
      }

      this.http.get('./assets/data/module.json').subscribe(response => {
        this.prepareModule(response, resourceArray, _modName);
      });
    }

    this.permission.push({
      userID: userArr.userID,
      userRoles: userArr.userRoles,
      modules: this.modules,
      userDisplayName: userArr.userDisplayName,
      hostname: userArr.hostname,
      departmentName: userArr.departmentName,
      locationAddress: userArr.locationAddress,
      organisationUnitID: userArr.organisationUnitID
    });

    this.setRoles(userArr.userRoles);
    this.setOrgUnitID(userArr.organisationUnitID);
    this.loggingService.log('Permission data:');
    this.loggingService.log(this.permission);
    this.dispatchState(this.permission[0]);
  }

  /**
   * Prepare the 'modules' array for constructing 'route'
   */
  prepareModule(response: any, resourceArray: Array<any>, _modName: String) {
    let tempArray = [];
    let childrenArr = [];
    tempArray = response.json().modules;

    for (let index in tempArray) {
      if (tempArray[index].name == _modName) {
        childrenArr.push(tempArray[index].children);
        for (let ind in resourceArray) {
          const newData = this.updateData(
            resourceArray[ind].data,
            resourceArray[ind].component
          );
          childrenArr.push({
            path: resourceArray[ind].path,
            component: resourceArray[ind].component,
            data: newData
          });
        }
        this.modules.push({
          name: tempArray[index].name,
          code: tempArray[index].code,
          icon: tempArray[index].icon,
          path: tempArray[index].path,
          component: tempArray[index].component,
          data: tempArray[index].data,
          children: childrenArr
        });
      }
    }
  }

  updateData(_dataSection: any, pageID: any) {
    let newData = Object.assign({}, _dataSection, { pageID: pageID });
    return Object.assign({}, _dataSection, newData);
  }

  /**
   * Check user permission types for a module
   */
  checkModulePermissions(module: any): Array<any> {
    let _modArray = [];

    this.store.subscribe(data => {
      _modArray = this.readState(data, module.name);
    });
    return _modArray;
  }

  readState(data: any, moduleName: string): Array<any> {
    let _modArray = [];
    let _modData = [];

    if (data.auth.length > 0) {
      _modArray = data.auth[0].modules;
    }

    for (let _mod in _modArray) {
      if (moduleName == _modArray[_mod].name) {
        //form an array for the modules
        _modData.push(_modArray[_mod]);
      }
    }
    return _modData;
  }

  /**
   * Check user actions[] permissions
   * for a particular component class
   */
  checkActionPermissions(pageID: String, _modName: String): Array<any> {
    let _userActions = [];
    let _modArray = [];
    let _children = [];

    //subscribe to <Store> for retrieving the permissions data
    this.store.subscribe(data => {
      _modArray = data.auth[0].modules;
    });

    for (let _mod in _modArray) {
      if (_modName == _modArray[_mod].name) {
        _children = _modArray[_mod].children;

        for (let child in _children) {
          if (_children[child].component) {
            if (pageID == _children[child].component) {
              _userActions = _children[child].data.actions;
            }
          }
        }
      }
    }

    return _userActions;
  }

  /**
   * Dispatch authentication info to store
   */
  dispatchState(data: any) {
    this.store.dispatch({
      type: ADD_AUTH,
      payload: {
        pid: data.userID,
        roles: data.userRoles,
        displayName: data.userDisplayName,
        orgID: data.organisationUnitID,
        modules: data.modules,
        host: data.hostname,
        department: data.departmentName,
        locationAddress: data.locationAddress
      }
    });
  }

  /**
   * Updates <Store> to replace ':NINO' with
   * actual value for route creation
   */
  updateAuthStore(searchInput: String) {
    let childrenArr = [];
    let modArray = [];
    let userArr: any;
    let secondLast: String = '';

    this.searchArr.push(searchInput);

    //Extract the length of array
    let searchLen = this.searchArr.length;
    //Extract the second last element from the array
    if (searchLen - 2 >= 0) {
      secondLast = this.searchArr[searchLen - 2];
    }

    //Subscribe to Store to fetch 'auth' data
    this.store.subscribe(data => {
      userArr = data.auth[0];
    });

    modArray = userArr.modules;

    //Replace ':NINO' in the URL with search string
    //OR
    //Replace old NINO with the new search string
    if (secondLast != searchInput) {
      for (let mod in modArray) {
        //Extract 'children' of the 'modules'
        childrenArr = modArray[mod].children;

        for (let child in childrenArr) {
          if (
            childrenArr[child].redirectTo &&
            childrenArr[child].redirectTo.indexOf(
              childrenArr[child].redirectTo.split(':NINO')[1]
            ) != -1
          ) {
            let _splitString = childrenArr[child].redirectTo.split('/', 2);
            childrenArr[child].redirectTo = searchInput + '/' + _splitString[1];
          } else if (
            childrenArr[child].path.indexOf(
              childrenArr[child].path.split(':NINO')[1]
            ) != -1
          ) {
            let _splitString = childrenArr[child].path.split('/', 2);
            childrenArr[child].path = searchInput + '/' + _splitString[1];
          } else if (
            childrenArr[child].path.indexOf(
              childrenArr[child].path.split('/')[1]
            ) != -1
          ) {
            let _splitString = childrenArr[child].path.split('/', 2);
            childrenArr[child].path = searchInput + '/' + _splitString[1];
          } else if (
            childrenArr[child].redirectTo &&
            childrenArr[child].redirectTo.indexOf(
              childrenArr[child].redirectTo.split('/')[1]
            ) != -1
          ) {
            let _splitString = childrenArr[child].redirectTo.split('/', 2);
            childrenArr[child].redirectTo = searchInput + '/' + _splitString[1];
          }
        }
        modArray[mod].children = childrenArr;
      }
    }

    this.store.dispatch({
      type: UPDATE_ROUTE,
      payload: {
        pid: userArr.pid,
        roles: userArr.roles,
        displayName: userArr.displayName,
        orgID: userArr.orgID,
        modules: modArray,
        host: userArr.hostname,
        department: userArr.departmentName,
        locationAddress: userArr.locationAddress
      }
    });
  }

  notifyUser() {
    let notification = new Notification(
      'Success',
      'You have successfully logged in'
    );
    this.notificationService.notify(notification);
  }
}
