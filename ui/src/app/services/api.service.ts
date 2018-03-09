import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { MessageService } from '@itmp/arch';
import { PersonDetails } from '../beans/person-details';
import { environment } from '../../environments/environment';
import { ApplicationMessagingService } from './application-messaging.service';
import { ResponseModel } from './responsemodel';
import { SearchResult } from './search.result';

@Injectable()
export class ApiService {
  headers = new Headers();

  constructor(
    private http: Http,
    private messageService: MessageService,
    private applicationMessagingService: ApplicationMessagingService
  ) { }

  /** Post call that fetches the response based on the serach value
     * @method getRecords
    * @param {String} value the searched term
    * @param {string} serviceURL URL
    * @return {Observable} Observable that should be subscribed to
    */
  getRecords(value: String, serviceURL: string) {
    const FunctionId = environment.functionId
    var body = { InIslm1Taxpayer: { Nino: value } , 
                 InIrdErrorManager: {
                               ClntTranCode: environment.ClntTranCode,
                               ClntProcStep: environment.ClntProcStep
                          }};
    return this.applicationMessagingService.postForObjectSLS(
      serviceURL,
      body,
      ResponseModel,
      FunctionId
    );
  }

  getPersonDetails(nino: string): Observable<any> {
    let serviceURL = `person-details/api/v1/person-designatory-details/${nino}/N`;
    return this.applicationMessagingService.getForObjectDA2(
      serviceURL,
      PersonDetails
    );
  }
}
