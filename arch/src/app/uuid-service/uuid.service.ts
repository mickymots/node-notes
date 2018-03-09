import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router'
import { Subject } from 'rxjs/Subject'

/**
 * This service class is used to set the application title in the brower window
 */
@Injectable()
export class UUIDService {
  /**
   * uuid property to hold the current uuid
   * as being updated by the this component as a result of navigation
   */
  private uuid: string

  constructor(private router: Router) {
    this.initiateSubcription()
  }

  /**
   * Returns the current UUID
   */
  getUUID(): string {
    return this.uuid
  }

  /**
   * Returns the current UUID
   */
  setUUID(uuid: string) {
    this.uuid = uuid
  }

  /**
   * Set title of the current application view
   */
  initiateSubcription() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.setUUID(this.generateUUID())
      }
    })
  }

  /**
   * UUID number generator method that randomizes the string based on current time and Math.Random function
   */
  generateUUID() {
      let d = new Date().getTime()
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = (d + Math.random()*16)%16 | 0
          d = Math.floor(d/16)
          return (c=='x' ? r : (r&0x3|0x8)).toString(16)
      })
      return uuid
  }
}
