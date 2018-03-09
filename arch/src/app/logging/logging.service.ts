import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Logger } from './logger';
import { Log } from './log';
import { MessageService } from '../message-handler/message.service';
import { environment } from '../../environments/environment';
import { UUIDService } from '../uuid-service/uuid.service'
import { ModuleService } from '../module/module.service'
import { Module } from '../module/module'
import { MODULE_TYPE } from '../module/module-type.enum'

/**
 * Declare the console as a variable
 * For browsers that don't implement the debug method, log will be used instead.
 */
declare var console: any;
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log';

@Injectable()
export class LoggingService extends Logger {
  module: Module = {
    name: '',
    code: '',
    path: '',
    routes: null,
    correlationID: false
  };
  /**
   * Invoke parent (super) constructor
   */
  constructor(
    private webservice: MessageService,
    private uuidService: UUIDService,
    private moduleService: ModuleService
  ) {
    super()

     this.moduleService.modulesAnnounced$.subscribe((module: Module) => {
       if (module.moduleType === MODULE_TYPE.APPLICATION) {
         this.module = module
       }
     })

  }

  /**
   * This is informational detail for non-production environments but intended to be read
   * by someone who is not on the development or debug team (a tester, ops staff, ...)
   * @param args: the text to trace.
   */
  trace(args: any): void {
    var logMessage: Log = new Log(args, 'trace')
    if (this.isTraceEnabledForConsole()) {
      !this.production && (console && console.log) && console.log(args)
    }
  }

  /**
   * This is informational detail for non-production environments but intended to be read
   * by someone who is not on the development or debug team (a tester, ops staff, ...)
   * @param args: the text to log.
   */
  log(args: any): void {
    var logMessage: Log = new Log(args, 'log')
    if (this.isLogEnabledForConsole()) {
      !this.production && (console && console.log) && console.log(args)
    }
    if (this.isLogEnabledForServer()) {
      this.sendToServer(logMessage)
    }
  }

  /**
   * Debug message, i.e. detail at the level of tracing method calls.
   * @param args: the debug message to log.
   */
  debug(args: any): void {
    var logMessage: Log = new Log(args, 'debug')
    if (this.isDebugEnabledForConsole()) {
      !this.production &&
        (console && console.log) &&
        (<any>console)[CONSOLE_DEBUG_METHOD](args)
    }
    if (this.isDebugEnabledForServer()) {
      this.sendToServer(logMessage)
    }
  }

  /**
   * Informational message, i.e detailed information on what the code is doing.
   * @param args: the informational message to log
   */
  info(args: any): void {
    var logMessage: Log = new Log(args, 'info')
    if (this.isInfoEnabledForConsole()) {
      !this.production && (console && console.info) && console.info(args)
    }
    if (this.isInfoEnabledForServer()) {
      this.sendToServer(logMessage)
    }
  }

  /**
   * Warning message, i.e an error but it doesn't require the code to force reload (Fatal) or to reset the screen (Error).
   * @param args
   */
  warn(args: any): void {
    var logMessage: Log = new Log(args, 'warn')
    if (this.isWarnEnabledForConsole()) {
      !this.production && (console && console.warn) && console.warn(args)
    }
    if (this.isWarnEnabledForServer()) {
      this.sendToServer(logMessage)
    }
  }

  /**
   * Report a client-side error, i.e. the code has to roll-back any open transaction
   * or reset the screen and clear the data or both. If the error is not going to be handled
   * by the code, then it would be better to call fatal to Fail fast and force the app to be reloaded.
   * @param args: the error text to log.
   */
  error(args: any): void {
    var logMessage: Log = new Log(args, 'error')
    if (this.isErrorEnabledForConsole()) {
      !this.production && (console && console.error) && console.error(args)
    }
    if (this.isErrorEnabledForServer()) {
      this.sendToServer(logMessage)
    }
  }

  /**
   * If the assertion evaluates to true, nothing is done. Otherwise, in debug it will call console.assert and in production
   * it will send the message to the server-side for logging.  The code will then carry on (!)
   * @param assertion: whatever boolean value the calling code generated for its assert
   * @param message:   text from the caller to describe the assertion
   * @param args:      variable length list of values to fit into the message
   */
  assert(assertion: boolean, args: any): void {
    var logMessage: Log = new Log(args, 'assert')
    if (this.isErrorEnabledForConsole()) {
      !this.production && (console && console.assert) && console.assert(args)
    }
    if (this.isErrorEnabledForServer()) {
      this.sendToServer(logMessage)
    }
  }

  /**
   * Report a fatal error to the console or server.  A Fatal error is where the javascript
   * has to be reloaded.
   * If there is a console present, halt via console.assert(false,...).
   * Applies in all environments,
   * including production.
   * @param args: detail about the problem.
   */
  fatal(args: any): void {
    var logMessage: Log = new Log(args, 'fatal')
    if (this.isFatalEnabled()) {
      this.sendToServer(logMessage)
      console && console.assert && console.assert(false, 'FATAL error', args)
    }
  }

  /**
   * Creates a new inline group in the Web Console log. This indents all following output by an additional level, until console.groupEnd() is called.
   * (https://developer.mozilla.org/en-US/docs/Web/API/Console/group)
   * If the log output (at whatever level) needs to be on multiple lines, use this and groupEnd to set the group off.
   * @param name: a title to be output at the beginning of the group.
   */
  group(name: string): void {
    this.isErrorEnabledForConsole() &&
      !this.production &&
      (console && console.group) &&
      console.group(name)
  }

  /**
   * Ends the inline group instance
   * See 'group' above.
   */
  groupEnd(): void {
    this.isErrorEnabledForConsole() &&
      !this.production &&
      (console && console.groupEnd) &&
      console.groupEnd()
  }

  /**
   * This method posts the log message to the server.
   * @param args
   */
  sendToServer(args: any) {
    let url = environment.loggerURL
    let header = undefined
    const clazz = undefined

    if(this.module.correlationID){
      const uuid = this.uuidService.getUUID()
      header = new Headers({ correlationid: uuid })
    }

    this.webservice
      .postForEntity(environment.loggerURL, args, clazz, header)
      .subscribe(
        () => {},
        error => {
          console.error('log service failed - ' + error)
        }
      )
  }
}
