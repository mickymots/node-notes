import { Http, Response, RequestOptions, ResponseOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Inject, Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';

// Import the MessageHandler interface
import { SerializationHelper } from '../serialization/SerializationHelper';
import { ResponseEntity } from './response-entity';
import { ResponseMessage } from './response-message';
import { ERROR_STATUS } from './error-status.enum';
import { Subject } from 'rxjs/Subject';
import { Exception } from '../exception-handler/exception';

import { NotificationService } from '../notification/notification.service';
import { Notification } from '../notification/notification';
import { NOTIFICATION_LEVEL } from '../notification/notification-level.enum';
import { NOTIFICATION_TYPE } from '../notification/notification-type.enum';
import { Module } from '../module/module';
import { MODULE_TYPE } from '../module/module-type.enum';

/**
 * This class provides a service to the other components of the ITMP Browser.
 * The primary function is to do HTTP GET, PUT, POST or DELETE and to return the
 * header and the body of the server response in a ResponseEntity object.
 * Note that the body element in the ResponseEntity is the object deserialised from
 * the ASCII HTTP body, which should be in JSON format per the headers of the request.
 * @class MessageService
 */
@Injectable()
export class MessageService {
  timeout: number; // in milliseconds, read from the config
  retryCount: number; // read from the config

  /**
   * Resolve HTTP using the constructor
   * @param http
   */
  constructor(
    public http: Http,
    private notificationService: NotificationService
  ) {
    this.timeout = environment.timeout;
    this.retryCount = environment.retrycount;
  }

  /**
   * Set HTTP request headers
   */
  public get standardHeaders() {
    return new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Timestamp: moment().format('LLLL'),
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      withCredentials: true
    });
  }

  /**
   * Make a HTTP GET and extracts the Response from
   * a JSON file.Makes use of get method only
   * @param url is a string holding the URL to GET
   * @return {Observable<T>}
   */
  public getForJson(url): Observable<any> {
    let observableResponse = new Subject<any>();
    this.get(url).subscribe(response => observableResponse.next(response));
    return observableResponse;
  }

  /**
   * Make a HTTP GET and extract the body of the Response
   * into an object of class clazz, via getForEntity.
   * @param url is a string holding the URL to GET
   * @param clazz is any constructible class
   * @return {Observable<ResponseEntity>}
   */
  public getForObject<T>(
    url,
    clazz: { new (): T },
    headers?: Headers
  ): Observable<T> {
    let obj;
    let observableResponse = new Subject<T>();
    this.getForEntity(url, clazz, headers).subscribe(
      responseEntity => observableResponse.next(responseEntity.getBody()),
      error => observableResponse.error(error)
    );
    return observableResponse;
  }

  /**
   * Make an HTTP GET and convert the Response into an Observable<ResponseEntity>
   * via setResponseEntity.
   * ResponseEntity has an HTTP header and body.
   * @param url is a string holding the URL to GET
   * @param clazz is any constructible class
   * @return {Observable<ResponseEntity>}
   */
  public getForEntity<T>(
    url,
    clazz: { new (): T },
    header?: Headers
  ): Observable<ResponseEntity> {
    let observableResponseEntity = new Subject<ResponseEntity>();
    this.get(url, header).subscribe(
      response =>
        this.handleResponse(response, clazz, observableResponseEntity),
      error => observableResponseEntity.error(error)
    );
    return observableResponseEntity;
  }

  /**
   * This is POST call which returns the Observable ResponseEntity object
   * @param url
   * @param param
   * @param clazz
   */
  public postForEntity<T>(
    url,
    param: any,
    clazz?: { new (): T },
    header?: Headers
  ): Observable<ResponseEntity> {
    let observableResponseEntity = new Subject<ResponseEntity>();
    this.post(url, param, header).subscribe(
      response =>
        this.handleResponse(response, clazz, observableResponseEntity),
      error => observableResponseEntity.error(error)
    );
    return observableResponseEntity;
  }

  /**
   * Make an HTTP PUT and convert the Response into an Observable<ResponseEntity>,
   * via setResponseEntity.
   * @param url is a string holding the URL to GET
   * @param clazz is any constructible class
   * @return {Observable<ResponseEntity>}
   */
  public putForEntity<T>(
    url,
    param: any,
    clazz?: { new (): T },
    header?: Headers
  ): Observable<ResponseEntity> {
    let observableResponseEntity = new Subject<ResponseEntity>();
    this.put(url, param, header).subscribe(
      response =>
        this.handleResponse(response, clazz, observableResponseEntity),
      error => observableResponseEntity.error(error)
    );

    return observableResponseEntity;
  }

  /**
   * This is Delete call which returns the Observable ResponseEntity object
   * @param url
   * @param key
   * @param val
   * @param clazz
   */
  public deleteForEntity<T>(
    url,
    key: string,
    val: string,
    clazz?: { new (): T },
    header?: Headers
  ): Observable<ResponseEntity> {
    let observableResponseEntity = new Subject<ResponseEntity>();
    this.delete(url, key, val, header).subscribe(
      response =>
        this.handleResponse(response, clazz, observableResponseEntity),
      error => observableResponseEntity.error(error)
    );
    return observableResponseEntity;
  }

  /**
   * Calls http.get
   * @param url the url to GET
   * @return Observable<Response>
   */
  private get(url: string, headers?: Headers): Observable<Response> {
    let updatedHeader = this.updateTargetHeaders(headers);

    return this.http
      .get(url, this.requestOptionsHeaders(url, updatedHeader))
      .retry(this.retryCount)
      .timeout(this.timeout)
      .catch((error: any) => {
        return this.handleError(error);
      });
  }

  /**
   * Calls http.post
   * @param url the url to POST
   * @param param the content for the body of the POST
   * @return Observable<Response>
   */
  private post(url, param: any, header: Headers): Observable<Response> {
    let updatedHeader = this.updateTargetHeaders(header);
    let body = SerializationHelper.Serialize(param);
    if (!environment.production) {
      console.log('POST: ' + url);
      console.log(
        'this.headers = ' + this.requestOptionsHeaders(url, updatedHeader)
      );
    }

    return this.http
      .post(url, body, this.requestOptionsHeaders(url, updatedHeader))
      .retry(this.retryCount)
      .timeout(this.timeout)
      .catch((error: any) => {
        return this.handleError(error);
      });
  }

  /**
   * Calls http.delete
   * @param url the url to DELETE
   * @param {String} key to identify the item to delete
   * @param {String} val ???
   * @return Observable<Response>
   */
  private delete(
    url,
    key: string,
    val: string,
    header: Headers
  ): Observable<Response> {
    let updatedHeader = this.updateTargetHeaders();
    return this.http
      .delete(
        url + '/?' + key + '=' + val,
        this.requestOptionsHeaders(url, updatedHeader)
      )
      .retry(this.retryCount)
      .timeout(this.timeout)
      .catch((error: any) => {
        return this.handleError(error);
      });
  }

  /**
   * Calls http.put
   * @param url the url to PUT
   * @param param the content for the body of the PUT
   * @return Observable<Response>
   */
  private put(url, param: any, header?: Headers): Observable<Response> {
    let updatedHeader = this.updateTargetHeaders(header);
    let body = SerializationHelper.Serialize(param);
    return this.http
      .put(url, body, this.requestOptionsHeaders(url, updatedHeader))
      .retry(this.retryCount)
      .timeout(this.timeout)
      .catch((error: any) => {
        return this.handleError(error);
      });
  }

  //private method to handle API status and JSON data
  private handleResponse(
    response: Response,
    clazz: any,
    observable: Subject<ResponseEntity>
  ) {
    let responseEntity: ResponseEntity;
    //convert reponse to ResponseEntity
    responseEntity = this.setResponseEntity(response, clazz);
    observable.next(responseEntity);
  }

  //Throw Error if Any
  private handleError(response: Response): Observable<Response> {
    switch (response.status) {
      case ERROR_STATUS.FORBIDDEN:
        this.notificationService.notify(
          new Notification(
            'Application Expired!',
            'Your application version  has expired.',
            NOTIFICATION_LEVEL.INFO,
            NOTIFICATION_TYPE.MODEL
          )
        );

      case ERROR_STATUS.NOT_FOUND:
        this.notificationService.notify(
          new Notification(
            'NOT FOUND',
            response.json(),
            NOTIFICATION_LEVEL.ERROR
          )
        );

      case ERROR_STATUS.INTERNAL_SERVER_ERROR:
        this.notificationService.notify(
          new Notification(
            'ERROR',
            'Please contact administrator',
            NOTIFICATION_LEVEL.ERROR
          )
        );
    }
    //let response = new Response(options);
    return Observable.throw(response);
  }

  /**
   * ResponseEntity has an HTTP header and body, both derived from the
   * Response object received from the http call.
   * The body is deserialised to an object of class clazz when the
   * ResponseEntity is populated.
   * If clazz is undefined or null, ResponseMessage is used instead.
   * @param {Response} response is the response from an http call.
   * @param clazz is any constructible class
   * @return {ResponseEntity}
   */
  private setResponseEntity<T>(response, clazz: { new (): T }): ResponseEntity {
    let responseEntity: ResponseEntity = new ResponseEntity();
    // convert JSON  reponse into object
    if (clazz == undefined || clazz == null) {
      // assert to ensure that we don't get into an infinite loop
      console.assert(
        !(ResponseMessage == undefined || ResponseMessage == null),
        'ResponseMessage is undefined or null!'
      );
      //use ResponseMessage. The body will be held as a string
      responseEntity = this.setResponseEntity(response, ResponseMessage);
    } else {
      let obj = SerializationHelper.deserialize(clazz, response.json());
      responseEntity.setBody(obj);
      responseEntity.setHeader(response.headers);
    }
    return responseEntity;
  }

  /** to buidl request option at run time */
  private requestOptionsHeaders(
    url: string,
    updatedHeader: Headers,
    optLock?: string
  ): RequestOptions {
    return new RequestOptions({
      headers: this.identifyHeaders(url, updatedHeader, optLock)
    });
  }

  /** to dynamicaly prep the headers  */
  private identifyHeaders(
    url: string,
    updatedHeader?: Headers,
    optLock?: string
  ): Headers {
    let header: Headers = updatedHeader;
    if (optLock) header.append('eTag', optLock);
    return header;
  }

  /** to dynamicaly add request headers to standard headers and returns combined updated headers  */
  private updateTargetHeaders(headers?: Headers): Headers {
    if (headers != null) {
      let updatedHeader: Headers = this.standardHeaders;
      let returnArray = [];
      headers.forEach((entryVal, entryKey) => {
        returnArray.push({
          key: entryKey,
          val: entryVal
        });
      });

      for (let header in returnArray) {
        updatedHeader.append(returnArray[header].key, returnArray[header].val);
      }
      return updatedHeader;
    }
    return this.standardHeaders;
  }
}
