/**
 * This class is used to hold the reponse message body and response header from the HTTP call.
 * This is plain old data and consists of the header and body of an HTTP message. 
 * The body will usually be held as a javascript object, not as an ASCII string.
 * See MessageService.setResponseEntity
 * @class ResponseEntity
 */
export class ResponseEntity {
  body: any
  header: any;

  /**
   * Return response body property
   */
  public getBody(): any {
    return this.body;
  }

  /**
   * Set response body
   * @param bodyObj
   */
  public setBody(bodyObj: any) {
    this.body = bodyObj;
  }

  /**
   * Return Response Header
   */
  public getHeader() {
    return this.header;
  }

  /**
   * Set response header
   * @param headerObj
   */
  public setHeader(headerObj) {
    this.header = headerObj;
  }
}
