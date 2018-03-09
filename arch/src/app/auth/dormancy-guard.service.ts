import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Observable } from "rxjs/Observable"
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router"
import { ReferenceDataService } from "../reference-data/reference-data.service"
import { ReferenceDataType } from "../reference-data/reference-data.enum"
import { environment } from "../../environments/environment"

@Injectable()
export class DormancyGuard implements CanActivate {
  constructor(
    private refDataService: ReferenceDataService,
    private router: Router
  ) {}

  /**
   * Check if route can be activated after dormancy check
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let pageID = route.data.pageID

    return this.refDataService
      .getRefData(ReferenceDataType.DORMANT_TYPE)
      .map(dormantList => {
       let dormantFlag = dormantList.some(refData => {
          return refData.values.indexOf(pageID) >= 0
        })
        return !dormantFlag //return ! of dormantFlag
      })
  }
}
