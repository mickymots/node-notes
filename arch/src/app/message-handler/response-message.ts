/**
 * This class is used to hold the reponse message body  from the HTTP call
 * It is used in MessageService in setResponseEntity when the caller has not
 * provided the clazz parameter. The effect is to hold the body of the Response
 * as an object of type ResponseMessage, and the body is held as the message
 * attribute, i.e. as a string.
 * @class ResponseMessage
 */
export class ResponseMessage {
    public message: string;

    constructor() {
        this.message = undefined;
    }
}
