export const environment = {

    // Env
    production: false,
    envName: 'test',
    production_URL: 'apps.inrev.gov.uk',

    // App
    landingPage: 'dashboard',

    // Auth
    userPermissions: 'services/permissions',
	enableAuth: true, //To enable Authentication, turn this flag to true

    // Help
    helpServiceURL: 'http://www.itmptest.test/',

    // Logger
    loggerURL: 'services/logger',
    consoleLoggerLevel: 1,
    serverLoggerLevel: 1,

    // Messaging
    timeout: 100000,
    retrycount: 2,

    // Reference Data
    referenceDataService: 'referenceData',

    // Session
    sessionTimeout: 20, //Initial session value ,
    timeUnit: 'SEC', // EXPECTED_VALUE = MIN, SEC

    // Audit IPS Service
    auditWebserviceURL: 'services/audit',

    // Version
    version: '2.0'

};
