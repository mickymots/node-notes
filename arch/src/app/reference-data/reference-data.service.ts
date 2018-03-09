import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { ReferenceDataType } from './reference-data.enum';
import { ReferenceData } from './reference-data';
import { ReferenceDataGroup } from './reference-data.group';
import { REFDATACACHE } from './reference-data.cache';
import { LoggingService } from '../logging/logging.service';
import { MessageService } from '../message-handler/message.service';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

/**
 *
 * ReferenceDataService is the service class that calls the MessageService
 * for fetching the Reference Data
 * This service can be injected to each view component which needs
 * the Reference Data.
 * @class ReferenceDataService
 */
@Injectable()
export class ReferenceDataService {
  private url = environment.referenceDataService
  constructor(
    private logger: LoggingService,
    public messageService: MessageService
  ) {}

  /**
   * Returns an Observable over an array of values matching typeValue.
   * @param {String} typeValue is the name of the reference data type. See {ReferenceDataType}
   * @return {Observable<ReferenceData[]>}
   */
  getRefData(typeValue): Observable<ReferenceData[]> {
    this.logger.log("Entering ReferenceDataService.getRefData method")
    let _retArray: ReferenceData[] = []

    _retArray = this.getRefDataFromCache(typeValue)

    if (_retArray.length > 0) return Observable.of(_retArray)
    else return this.loadPartialRefData(typeValue)
  }

  /**
   *@method -  This mehtod is invoked when reference data is not found in the cache. Invocation will result in
   *  update of the cache and reference data will be retunred as an Obseravle to the caller.
   * @param typeValue - Reference data type e.g. Country, title etc.
   * @return - Obseravle of ReferenceData Array
   *
   */
  loadPartialRefData(typeValue: string): Observable<ReferenceData[]> {
    let urlWithParam = this.url + "?name=" + typeValue
    let response = this.messageService
      .getForObject(urlWithParam, ReferenceDataGroup)
      .map(this.refDataCacheFn)

    return response
  }

  private refDataCacheFn = (refDataGroup: ReferenceDataGroup) => {
    refDataGroup.data.forEach(data => {
      let existFlag = REFDATACACHE.referenceData.data.some(refRecord => refRecord.type == data.type && refRecord.id == data.id)
      if(!existFlag)
        REFDATACACHE.referenceData.data.push(data)
    })
    return refDataGroup.data
  }

  /**  Get call to fetch RefData from REFDATACACHE
  * @method getRefDataFromCache
  * @param {String} typeValue the name of the reference data type of interest
  * @return {ReferenceData[]} An array, one entry for each value of type typeValue
  */
  private getRefDataFromCache(typeValue): ReferenceData[] {
    this.logger.log("Retrieving reference data for type: " + typeValue)
    let _retArray: ReferenceData[] = []

    if (REFDATACACHE.referenceData) {
      //ReferenceDataCache Initialized
      if (REFDATACACHE.referenceData.data) {
        _retArray = REFDATACACHE.referenceData.data.filter(refData =>{
            return refData.type == typeValue
        })
      } else {
        this.logger.error("REFDATACACHE.referenceData.data is undefined")
      }
    } else REFDATACACHE.referenceData = new ReferenceDataGroup()
    return _retArray
  }

  /**
   * Returns an Observable over an array of values matching typeValue.
   * @param {String} typeValue is the name of the reference data type. See {ReferenceDataType}
   * @return {Observable<ReferenceData[]>}
   */
  getMultiRefData(typeValue: string[]): Observable<ReferenceData[]> {
    this.logger.log("-- ReferenceDataService.getMultiRefData START --")

    let params = typeValue
      .map(param => "name=" + param)
      .reduce((result, record) => {
        return result + "&" + record
      }, "")

    let urlWithParam = this.url + "?" + params
    let response = this.messageService
      .getForObject(urlWithParam, ReferenceDataGroup)
      .map(this.refDataCacheFn)

    return response
  }
}
