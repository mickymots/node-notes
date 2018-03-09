import {NOTIFICATION_LEVEL} from './notification-level.enum'
import {NOTIFICATION_TYPE} from './notification-type.enum'

export class Notification {
         header: string
         message: any
         severity: NOTIFICATION_LEVEL // excepted type: 1. info (default) 2. success 3.info 4. warn 5.error
         type: NOTIFICATION_TYPE // expected type : 1. notification (default) 2. modal

         constructor(header: string, message: any, severity?: NOTIFICATION_LEVEL, type?: NOTIFICATION_TYPE) {
           this.type = type ? type : NOTIFICATION_TYPE.NOTIFICATION
           this.severity = severity ? severity : NOTIFICATION_LEVEL.INFO
           this.header = header
           this.message = message
         }
}
