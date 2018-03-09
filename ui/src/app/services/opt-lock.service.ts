import { Injectable } from '@angular/core';

@Injectable()
export class OptLockService {
  private optLock: number;

  constructor() {}

  /**
   * Return optlock value from the search result store
   */
  getOptLock() {
    return this.optLock;
  }

  /**
   * update optlock value in the search result store
   * @param optLock
   */
  setOptLock(optLock: number) {
    this.optLock = optLock;
  }
}
