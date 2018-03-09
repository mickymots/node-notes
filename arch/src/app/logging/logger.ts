import { environment } from '../../environments/environment';
import { Level } from './level.enum';

export abstract class Logger {
  public production: boolean;
  public consoleLevel: Level;
  public serverLevel: Level;

  constructor() {
    this.production = environment.production;
    this.consoleLevel = environment.consoleLoggerLevel;
    this.serverLevel = environment.serverLoggerLevel;
  }

  /**
   * Set production property
   * @param production
   */
  setProduction(production: boolean) {
    this.production = production;
  }

  /**
   * Set console level property
   * @param level
   */
  setConsoleLevel(level: number) {
    this.consoleLevel = level;
  };

  /**
   * Set server level property
   * @param level
   */
  setServerLevel(level: number) {
    this.serverLevel = level;
  };

  /**
   * Define abstract methods for each log type
   * @param args
   */
  abstract trace(...args: any[]): void;
  abstract log(...args: any[]): void;
  abstract debug(...args: any[]): void;
  abstract info(...args: any[]): void;
  abstract warn(...args: any[]): void;
  abstract error(...args: any[]): void;
  abstract assert(assertion: boolean, ...args: any[]): void;
  abstract fatal(...args: any[]): void;

  /**
   * Define methods to check the level property against each type
   */
  isTraceEnabledForConsole = (): boolean => this.consoleLevel >= Level.TRACE;
  isLogEnabledForConsole = (): boolean => this.consoleLevel >= Level.LOG;
  isDebugEnabledForConsole = (): boolean => this.consoleLevel >= Level.DEBUG;
  isInfoEnabledForConsole = (): boolean => this.consoleLevel >= Level.INFO;
  isWarnEnabledForConsole = (): boolean => this.consoleLevel >= Level.WARN;
  isErrorEnabledForConsole = (): boolean => this.consoleLevel >= Level.ERROR;
  isLogEnabledForServer = (): boolean => this.serverLevel >= Level.LOG;
  isDebugEnabledForServer = (): boolean => this.serverLevel >= Level.DEBUG;
  isInfoEnabledForServer = (): boolean => this.serverLevel >= Level.INFO;
  isWarnEnabledForServer = (): boolean => this.serverLevel >= Level.WARN;
  isErrorEnabledForServer = (): boolean => this.serverLevel >= Level.ERROR;
  isFatalEnabled = (): boolean => this.consoleLevel >= Level.FATAL || this.serverLevel >= Level.FATAL;
}