export class ContactHistory {
  editFieldsFlag = 0;
  contactHistoryRecords: ContactHistoryRecords = new ContactHistoryRecords();
}

export class ContactHistoryRecords {
  contactHistory: ContactHistoryRecord[] = [];
}

export class ContactHistoryRecord {
  nino = '';
  contHistSequenceNo = 0;
  contHistContactType: any;
  contHistContactDirection: any;
  contHistContactDate = '';
  contHistContactTime = 0;
  contHistContactorType: any;
  contHistContactChannel: any;
  contHistContactorReference = '';
  contHistDocumentType: any;
  contHistDocumentTypeDate = '';
  contHistContactorStoreRef = '';
  contHistOperatorID = '';
  contHistOperatorOrgUnit = '';
  contHistActions = '';
  contHistOther = '';
  contHistRecordedInError = 0;
  contHistDateOfCapture = '';
}
