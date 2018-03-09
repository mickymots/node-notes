import { Observable } from 'rxjs/Observable';

/**
 * MessageHandler is an interface that defines the APIs
 * to efficiently interact with the webservices provided by
 * the server.
 * @class MessageHandler
 */
export interface MessageHandler {
  get(): Observable<any>;
  post(...param: any[]): Observable<any>;
  put(param: any): Observable<any>;
  delete(key: string, value: string): Observable<any>;
  options(): Observable<any>;
}
