import {
  Notification,
  NOTIFICATION_LEVEL,
  NOTIFICATION_TYPE
} from '@itmp/arch';

export const handleErrorFn = (refDataService, notificationService) => {
  return response => {
    let statusMessageList;

    if (Object.keys(response).indexOf('_body') >= 0) {
      statusMessageList = response.json().jsonServiceError.appStatusMessageList;
    } else if (response.jsonServiceMessage) {
      statusMessageList = response.jsonServiceMessage.appStatusMessageList;
    }

    if (statusMessageList) {
      let notificationMessageArray = [];

      refDataService.getRefData('BUSERRS2').subscribe(refDataArray => {
        //check if the json has error messages
        if (statusMessageList && statusMessageList.appStatusMessage) {
          //Loop on each error message in the json response
          statusMessageList.appStatusMessage.forEach(message => {
            if (!parseInt(message)) {
              //if message is not a code but a string value
              const notification = new Notification(
                `You have received the following message(s):<br>`,
                message,
                NOTIFICATION_LEVEL.ERROR,
                NOTIFICATION_TYPE.NOTIFICATION
              );
              notificationMessageArray.push(notification);
            } else {
              //if message is a CODE
              const selectedError = refDataArray.filter(
                refData => parseInt(message) == parseInt(refData.id)
              );
              if (selectedError) {
                const notification = new Notification(
                  `You have received the following message(s):<br>`,
                  selectedError[0].values,
                  NOTIFICATION_LEVEL.ERROR,
                  NOTIFICATION_TYPE.NOTIFICATION
                );
                notificationMessageArray.push(notification);
              } else
                notificationMessageArray.push(
                  message + ' :: MESSAGE NOT FOUND'
                );
            }
          });
          notificationService.notify(notificationMessageArray);
        } else {
          //if no error message in the json
          const notification = new Notification(
            'Error',
            'Unknown Error Occured',
            NOTIFICATION_LEVEL.ERROR,
            NOTIFICATION_TYPE.NOTIFICATION
          );
          notificationService.notify(notification);
        }
      }); //REF-Data Subscribe Ends
    }
  };
};

//This common function handles the Ok button click on Session expiration
export const handleOKClick = (data: any) => {
  data === 'Session Expired!'
    ? window.location.replace('./')
    : this.notificationComponent.hideModal();
};
