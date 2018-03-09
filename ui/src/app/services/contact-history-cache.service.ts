import { Injectable } from '@angular/core';
import { LoggingService } from '@itmp/arch';
import { ContactHistoryRecord } from './contact-history';

// INACTIVE means Contact History is not-applicable/has not been triggered.
// CANCELLED means user has pressed CANCEL on Contact History Details.
// SAVED means user has pressed SAVE on Contact History Details.
export enum ContactHistoryState {
  INACTIVE,
  CANCELLED,
  SAVED
}

@Injectable()
export class ContactHistoryCacheService {
  // All contact history records. 'any' gives flexibility for converting numeric IDs to string values
  private contactHistory: any[] = null;
  // Data entered onto Contact History Details screen
  private contactHistoryRecord: ContactHistoryRecord = null;
  // Indicates if contact history is available
  private state = ContactHistoryState.INACTIVE;
  // Data associated with Contact History record
  private payload: any;
  // first row to be displayed on CH summary page
  private displayRow = 0;

  constructor(private logger: LoggingService) {}

  public setContactHistoryRecord(
    contactHistoryRec: ContactHistoryRecord
  ): void {
    this.state = ContactHistoryState.SAVED;
    this.contactHistoryRecord = contactHistoryRec;
  }

  public getContactHistoryRecord(): ContactHistoryRecord {
    this.state = ContactHistoryState.INACTIVE;
    return this.contactHistoryRecord;
  }

  public getContactHistory(): any[] {
    return this.contactHistory;
  }

  public setContactHistory(contactHistory: any[]) {
    this.contactHistory = contactHistory;
  }

  public getState() {
    const state = this.state;
    this.state = ContactHistoryState.INACTIVE;
    return state;
  }

  public setCancelled() {
    this.state = ContactHistoryState.CANCELLED;
  }

  public setPayload(payload) {
    this.payload = payload;
  }

  public getPayload() {
    return this.payload;
  }

  public setDisplayRow(displayRow: number) {
    this.displayRow = displayRow;
  }

  public getDisplayRow(): number {
    const tmpDisplayRow = this.displayRow;
    this.displayRow = 0;
    return tmpDisplayRow;
  }
}
