/**
 * AppStore interface defines the Data Types
 * that are being managed by the ngrx/store.
 */
export interface AppStore {
  auth: any;
  sessionTimeout: number;
  search: string;
  searchResult: Object;
  optLock: any;
}
