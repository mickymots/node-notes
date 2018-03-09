export const environment = {
  // Env
  production: false,
  envName: 'development',
  production_URL: 'apps.inrev.gov.uk',

  // App
  landingPage: 'dashboard',

  //Login
  loginService: 'services/login',

  // Auth
  userPermissions: 'services/permissions',
  enableAuth: true, //To enable Authentication, turn this flag to true

  // Help
  helpServiceURL: 'http://www.itmptest.test/',

  // Logger
  loggerURL: 'services/logger',
  consoleLoggerLevel: 5,
  serverLoggerLevel: 5,

  // Messaging
  timeout: 100000,
  retrycount: 2,

  // Reference Data
  referenceDataService: 'services/referenceData',

  // Session
  sessionTimeout: 20, //Initial session value ,
  timeUnit: 'MIN', // EXPECTED_VALUE = MIN, SEC

  // Audit IPS Service
  auditWebserviceURL: 'services/audit',

  // NPS Proxy
  npsProxy: 'services/npsProxy/'
};
