import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import {
  MessageService,
  ModuleService,
  Module,
  MODULE_TYPE,
  AppStore
} from '@itmp/arch';

// Vendor
import { Store } from '@ngrx/store';

/**
 * This class methods will be called to invoke message service http methods
 */
@Injectable()
export class ApplicationMessagingService {
  module: Module
  public userid: string
  public userName: string
  public jobRole: string
  public orgID: string

  constructor(
    private http: Http,
    private store: Store<AppStore>,
    private messageService: MessageService,
    private moduleService: ModuleService
  ) {
    this.registerApplicationconfig()
  }

  private registerApplicationconfig() {
    this.moduleService.modulesAnnounced$.subscribe((module: Module) => {
      if (module.moduleType === MODULE_TYPE.APPLICATION) {
        this.module = module
      }
    })
  }

  /**
   * Set HTTP request headers
   */
  public get Headers(): Headers {
    const headers = new Headers()

    this.store.subscribe(res => {
      this.userid = res.auth[0].pid
      this.userName = res.auth[0].displayName
      this.jobRole = res.auth[0].roles.reduce((str, role) => str ? str + ',' + role : role, '')
      this.orgID = res.auth[0].orgID
    })

    if (this.module.version) {
      headers.append(environment.version, this.module.version)
    }

    if (this.module.originatorID) {
      headers.append(environment.originatorID, this.module.originatorID)
    }

    if (this.module.systemDate) {
      headers.append(environment.systemDate, this.module.systemDate)
    }

    headers.append(environment.userID, this.userid)
    headers.append(environment.userName, this.userName)
    headers.append(environment.jobRole, this.jobRole)
    headers.append(environment.orgID, this.orgID)

    return headers
  }

  /**
   * This method creates complete url to be send to message service
   * this creates digital adapter url with target da2
   * this method is adding headers which will be passed to digital adapter service via IPS
   * @param serviceURL
   * @param clazz
   */
  public getForObjectDA2<T>(serviceURL: string, clazz: { new(): T }) {
    let additionalHeaders = this.Headers
    let url = environment.DIGITAL_ADAPTER_URL + serviceURL
    return this.messageService.getForObject(url, clazz, additionalHeaders)
  }

  /**
   * This method creates complete url to be send to message service
   * this creates digital adapter url with target da2
   * this method is adding headers which will be passed to digital adapter service via IPS
   * @param serviceURL
   * @param clazz
   */
  public postForObjectDA2<T>(
    serviceURL: string,
    param: any,
    clazz: { new(): T },
    optLock?: string
  ) {
    let additionalHeaders = this.Headers
    let url = environment.DIGITAL_ADAPTER_URL + serviceURL

    additionalHeaders.append('eTag', optLock)
    return this.messageService.postForEntity(
      url,
      param,
      clazz,
      additionalHeaders
    )
  }

  public putForObjectDA2<T>(
    serviceURL: string,
    param: any,
    clazz: { new(): T },
    optLock?: string
  ) {
    let additionalHeaders = this.Headers
    let url = environment.DIGITAL_ADAPTER_URL + serviceURL

    additionalHeaders.append('eTag', optLock)
    return this.messageService.putForEntity(
      url,
      param,
      clazz,
      additionalHeaders
    )
  }
  public deleteForObjectDA2<T>(
    serviceURL: string,
    key: string,
    val: string,
    clazz?: { new(): T },
    optLock?: string
  ) {
    let additionalHeaders = new Headers()
    let url = environment.DIGITAL_ADAPTER_URL + serviceURL

    additionalHeaders.append('eTag', optLock)
    return this.messageService.deleteForEntity(
      url,
      key,
      val,
      clazz,
      additionalHeaders
    )
  }
  /**
   * This method creates complete url to be send to message service
   * creates url with target SLS[Student Loans Service]
   * @param serviceURL
   * @param param
   * @param clazz
   */
  public postForObjectSLS<T>(
    serviceURL: string,
    param: any,
    clazz: { new(): T },
    functionId?: string,
    optLock?: string
  ) {
    let additionalHeaders = this.Headers 
    let functionID = "";
    if(functionId){
      functionID = functionId
    }
    let additionalParam = {
      UserId: this.userid,
      CurrentOuId: this.orgID,
      FunctionId: functionID,
      OfficeRoleIndicator: "",
      UserRole: this.jobRole,
      TerminalId: ""
    }; 
    param.InIrdRaInfrastructure = additionalParam
    let url = environment.SLS_URL + serviceURL
    return this.messageService.postForEntity(url, param, clazz, additionalHeaders)
  }
}
