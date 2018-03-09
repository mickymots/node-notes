/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule, Http, Response, Headers, RequestOptions,
  BaseRequestOptions, XHRBackend, ResponseOptions
} from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { LoggingService } from './logging.service';
import { Logger } from './logger';
import { MessageService } from '../message-handler/message.service';
import { AuthService } from '../auth/auth.service';

import { AppStore } from '../state-manager/app.store';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from '../state-manager/auth.reducer'
import { SessionStateReducer } from '../state-manager/session-state.reducer'
import { NotificationService } from '../notification/notification.service';
import { ModuleService } from '../module/module.service';

import { Log } from './log';

export declare const LOG_INITIALIZER: any;
export const params = {};

/**
 * Mock ConfigService class for DI injection into LoggerWSHandler
 */
class MockConfigService {
  getConfig(Key: any) {
    return "mock value returned";
  }
}

describe('LoggingService', () => {
  let notificationService: NotificationService
  let service: LoggingService
  let mock: MockBackend
  let moduleService: ModuleService
  let logMessage: Log
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, StoreModule.provideStore({
        authReducer: AuthReducer,
        sessionStateReducer: SessionStateReducer
      })],

      providers: [
        MockBackend, NotificationService,
        BaseRequestOptions,
        ModuleService,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
        MessageService,
        AuthService,
        LoggingService
      ],

    });

    spyOn(console, 'assert');
    spyOn(console, 'error');
    spyOn(console, 'warn');
    spyOn(console, 'info');
    spyOn(console, 'debug');
    spyOn(console, 'log');
    spyOn(console, 'trace');
    spyOn(console, 'group');
    spyOn(console, 'groupEnd');

    TestBed.compileComponents();


  });

  beforeEach(inject([LoggingService, MockBackend], (servicex: LoggingService, mockx: MockBackend) => {
    mock = mockx
    service = servicex
  }));

  it('TEST-1 : should be created', inject([LoggingService], (service: LoggingService) => {
    expect(service).toBeTruthy();
  }));

  // Assert
  it('TEST-2 : should log an error message to the console if false', inject([LoggingService], (service: LoggingService) => {
    service.setConsoleLevel(5);
    service.setProduction(false);
    service.assert(false, 'loggingServiceTest: assert(false)');
    expect(console.assert).toHaveBeenCalled();
  }));

  /**
   * Logging Level Tests
   * 
   * Console level 0
   * Server level 0
   */
  it('TEST-3 : should not log any messages to the console or server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(0);
    service.setServerLevel(0)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).not.toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).not.toHaveBeenCalledWith('error');
    expect(console.warn).not.toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 1
   * Server level 0
   */
  it('TEST-4 : should log [fatal] to console and [none] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(1);
    service.setServerLevel(0)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).not.toHaveBeenCalledWith('error');
    expect(console.warn).not.toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 2
   * Server level 0
   */
  it('TEST-5 : should log [fatal,error] to console and [none] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(2);
    service.setServerLevel(0)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).not.toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 3
   * Server level 0
   */
  it('TEST-6 : should log [fatal,error,warn] to console and [none] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(3);
    service.setServerLevel(0)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 4
   * Server level 0
   */
  it('TEST-7 : should log [fatal,error,warn,info] to console and [none] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(4);
    service.setServerLevel(0)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 5
   * Server level 0
   */
  it('TEST-8 : should log [fatal,error,warn,info,debug] to console and [none] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(5);
    service.setServerLevel(0)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 6
   * Server level 0
   */
  it('TEST-9 : should log [fatal,error,warn,info,debug,log] to console and [none] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(6);
    service.setServerLevel(0)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 6
   * Server level 1
   */
  it('TEST-10 : should log [fatal,error,warn,info,debug,log] to console and [fatal] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(6);
    service.setServerLevel(1)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 6
   * Server level 2
   */
  it('TEST-11 : should log [fatal,error,warn,info,debug,log] to console and [fatal,error] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(6);
    service.setServerLevel(2)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 6
   * Server level 3
   */
  it('TEST-12 : should log [fatal,error,warn,info,debug,log] to console and [fatal,error,warn] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(6);
    service.setServerLevel(3)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 6
   * Server level 4
   */
  it('TEST-13 : should log [fatal,error,warn,info,debug,log] to console and [fatal,error,warn,info] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(6);
    service.setServerLevel(4)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 6
   * Server level 5
   */
  it('TEST-14 : should log [fatal,error,warn,info,debug,log] to console and [fatal,error,warn,info,debug] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(6);
    service.setServerLevel(5)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 6
   * Server level 6
   */
  it('TEST-15 : should log [fatal,error,warn,info,debug,log] to console and [fatal,error,warn,info,debug,log] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(6);
    service.setServerLevel(6)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 5
   * Server level 6
   */
  it('TEST-16 : should log [fatal,error,warn,info,debug] to console and [fatal,error,warn,info,debug,log] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(5);
    service.setServerLevel(6)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 4
   * Server level 6
   */
  it('TEST-17 : should log [fatal,error,warn,info] to console and [fatal,error,warn,info,debug,log] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(4);
    service.setServerLevel(6)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 3
   * Server level 6
   */
  it('TEST-18 : should log [fatal,error,warn] to console and [fatal,error,warn,info,debug,log] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(3);
    service.setServerLevel(6)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 2
   * Server level 6
   */
  it('TEST-19 : should log [fatal,error] to console and [fatal,error,warn,info,debug,log] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(2);
    service.setServerLevel(6)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).not.toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 1
   * Server level 6
   */
  it('TEST-20 : should log [fatal,error] to console and [fatal,error,warn,info,debug,log] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(1);
    service.setServerLevel(6)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).not.toHaveBeenCalledWith('error');
    expect(console.warn).not.toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 5
   * Server level 5
   */
  it('TEST-21 : should log [fatal,error,warn,info,debug] to console and [fatal,error,warn,info,debug] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(5);
    service.setServerLevel(5)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 4
   * Server level 4
   */
  it('TEST-22 : should log [fatal,error,warn,info] to console and [fatal,error,warn,info] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(4);
    service.setServerLevel(4)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 3
   * Server level 3
   */
  it('TEST-23 : should log [fatal,error,warn] to console and [fatal,error,warn] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(3);
    service.setServerLevel(3)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 2
   * Server level 2
   */
  it('TEST-24 : should log [fatal,error] to console and [fatal,error] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(2);
    service.setServerLevel(2)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).toHaveBeenCalledWith('error');
    expect(console.warn).not.toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Logging Level Tests
   * 
   * Console level 1
   * Server level 1
   */
  it('TEST-25 : should log [fatal] to console and [fatal] to server', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(1);
    service.setServerLevel(1)
    service.setProduction(false);
    spyOn(LoggingService.prototype, 'sendToServer');

    // Console Logging
    service.fatal('fatal');
    service.error('error');
    service.warn('warn');
    service.info('info');
    service.debug('debug');
    service.log('log');

    // Console Expects...
    expect(console.assert).toHaveBeenCalledWith(false, 'FATAL error', 'fatal');
    expect(console.error).not.toHaveBeenCalledWith('error');
    expect(console.warn).not.toHaveBeenCalledWith('warn');
    expect(console.info).not.toHaveBeenCalledWith('info');
    expect(console.debug).not.toHaveBeenCalledWith('debug');
    expect(console.log).not.toHaveBeenCalledWith('log');

    // Server Expects
    expect(service.sendToServer).toHaveBeenCalledWith(new Log('fatal', 'fatal'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('error', 'error'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('warn', 'warn'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('info', 'info'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('debug', 'debug'));
    expect(service.sendToServer).not.toHaveBeenCalledWith(new Log('log', 'log'));

  }));

  /**
   * Individual sendServer method calls
   * 
   * Server Level: 1
   */
  // Fatal message to Server 
  it(' TEST-26 : should send fatal to the server', (done: any) => {
    
    let responseOptions = new ResponseOptions({ body: JSON.stringify({ data: 'success' }) });
    mock.connections.subscribe((connection: MockConnection) => {
    connection.mockRespond(new Response(responseOptions))
    let request = connection.request.getBody()
    expect(request.indexOf('fatal') >= 0).toBeTruthy()
    done();
    });
    
    service.setServerLevel(1);
    var res = service.sendToServer(new Log('fatal', 'fatal'));
    
  }); 

  /**
   * Individual sendServer method calls
   * 
   * Server Level: 2
   */
  // Error message to Server 
  it(' TEST-27 : should send error to the server', (done: any) => {
    
    let responseOptions = new ResponseOptions({ body: JSON.stringify({ data: 'success' }) });
    mock.connections.subscribe((connection: MockConnection) => {
    connection.mockRespond(new Response(responseOptions))
    let request = connection.request.getBody()
    expect(request.indexOf('error') >= 0).toBeTruthy()
    done();
    });
    
    service.setServerLevel(2);
    var res = service.sendToServer(new Log('error', 'error'));
    
  }); 

  // Warn message to Server 
  it(' TEST-28 : should send warn to the server', (done: any) => {
    
    let responseOptions = new ResponseOptions({ body: JSON.stringify({ data: 'success' }) });
    mock.connections.subscribe((connection: MockConnection) => {
    connection.mockRespond(new Response(responseOptions))
    let request = connection.request.getBody()
    expect(request.indexOf('warn') >= 0).toBeTruthy()
    done();
    });
    
    service.setServerLevel(3);
    var res = service.sendToServer(new Log('warn', 'warn'));

  }); 

  // Info message to Server 
  it(' TEST-29 : should send info to the server', (done: any) => {
    
    let responseOptions = new ResponseOptions({ body: JSON.stringify({ data: 'success' }) });
    mock.connections.subscribe((connection: MockConnection) => {
    connection.mockRespond(new Response(responseOptions))
    let request = connection.request.getBody()
    expect(request.indexOf('info') >= 0).toBeTruthy()
    done();
    });
    
    service.setServerLevel(4);
    var res = service.sendToServer(new Log('info', 'info'));
    
  }); 

  // Debug message to Server 
  it(' TEST-30 : should send debug to the server', (done: any) => {
    
    let responseOptions = new ResponseOptions({ body: JSON.stringify({ data: 'success' }) });
    mock.connections.subscribe((connection: MockConnection) => {
    connection.mockRespond(new Response(responseOptions))
    let request = connection.request.getBody()
    expect(request.indexOf('debug') >= 0).toBeTruthy()
    done();
    });
    
    service.setServerLevel(5);
    var res = service.sendToServer(new Log('debug', 'debug'));
    
  }); 
  
  // Log message to Server 
  it(' TEST-31 : should send log to the server', (done: any) => {
    
    let responseOptions = new ResponseOptions({ body: JSON.stringify({ data: 'success' }) });
    mock.connections.subscribe((connection: MockConnection) => {
    connection.mockRespond(new Response(responseOptions))
    let request = connection.request.getBody()
    expect(request.indexOf('log') >= 0).toBeTruthy()
    done();
    });
    
    service.setServerLevel(6);
    var res = service.sendToServer(new Log('log', 'log'));
    
  }); 


   /**
   * Trace Logging Level Tests
   * 
   * Console level 6
   */
  it('TEST-32 : should trace messages to the console', inject([LoggingService], (service: LoggingService)  => {
    // Setup
    service.setConsoleLevel(6);
    service.setProduction(false);

    // Console Logging
    service.trace('trace');

    // Console Expects...
    expect(console.log).toHaveBeenCalledWith('trace');
  }));

});
