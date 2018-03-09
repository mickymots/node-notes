export const environment = {
	production: false,
	envName: 'development',
	notificationTimeout: 3000,

	version: 'version',
	originatorID: 'gov-uk-originator-id',
	systemDate: 'X-DATEOVERRIDE',
    userID: 'gov-uk-user-id',

  userName: 'gov-uk-user-name',
  jobRole: 'gov-uk-job-role',
  orgID: 'gov-uk-organisation-id',


	// Messaging
	timeout: 100000,
	retrycount: 3,

	// Auth
	auth: {
		enabled: false,
		url: 'services/userDetails',
		pid: '12345'
	},

	// NPS Proxy
	DIGITAL_ADAPTER_URL: 'services/npsProxy/da2?endPoint=',

	//Student Loans Service
	SLS_URL: 'services/npsProxy/SLS?endPoint=',
	functionId : 'FZ61',
	ClntTranCode: 'CSLM0611',
	ClntProcStep: 'CSLM0611_LIST_TAXPAYER'

};
