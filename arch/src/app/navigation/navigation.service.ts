import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/filter';
import { environment } from '../../environments/environment';
import { ModuleService } from '../module/module.service';
import { AuthService } from '../auth/auth.service';
import { Module } from '../module/module';
import { ActivatedRoute } from '@angular/router';
import { ReferenceDataService } from '../reference-data/reference-data.service';
import { Observable } from 'rxjs/Observable';
import { ReferenceDataType } from '../reference-data/reference-data.enum';

@Injectable()
export class NavigationService {
  private modules: Module[] = [];

  private context: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private context$ = this.context.asObservable();
  private routes = new BehaviorSubject<any>({});
  routes$ = this.routes.asObservable();

  private alternativeRouteFlag = false;

  /**
   * TODO: Declare for Page ID
   */
  private revenueActivity;

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private refDataService: ReferenceDataService,
    private authService: AuthService // private activatedRoute: ActivatedRoute
  ) {
    this.resetScroll();
    this.setModules();
    this.subscribeToContextChange();
    this.subscribeToPageNavigation();
    this.clearNotifications();
  }

  getPageID(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.pageID)
      data.push(parent.snapshot.data.pageID);
    if (state && parent)
      data.push(...this.getPageID(state, state.firstChild(parent)));
    return data;
  }

  subscribeToPageNavigation() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var revenueActivity = this.getPageID(
          this.router.routerState,
          this.router.routerState.root
        ).join(' - ');
        this.setRevenueActivity(revenueActivity);
      }
    });
  }

  private subscribeToContextChange() {
    this.context$.subscribe(context => {
      if(true === this.alternativeRouteFlag){
        this.getActiveRoutes(context).subscribe(routes => {
          let childRoutes = routes;
            Object.keys(childRoutes).forEach(key => {
              for(var i = childRoutes[key].children.length -1; i >= 0; i -= 1) {
                if(childRoutes[key].path !== 'contact-history'){
                  if(childRoutes[key].children[i].hasOwnProperty('data')){
                      if(!childRoutes[key].children[i].data.child){
                        childRoutes[key].children.splice(i, 1);
                      }
                    }
                  }
                }
              });
            this.removeUnusedRoutes(childRoutes);
            this.routes.next(childRoutes);
          }
        );
      } else {
        this.getActiveRoutes(context).subscribe(routes => {
          Object.keys(routes).forEach(key => {
            for(var i = routes[key].children.length -1; i >= 0; i -=1 ) {
                if(routes[key].children[i].hasOwnProperty('data')){
                    if(routes[key].children[i].data.child){
                    routes[key].children.splice(i, 1);
                  }
                }
              }
            });
          this.removeUnusedRoutes(routes);
          this.routes.next(routes)
        });
      }
    });
  }

  removeUnusedRoutes(routes: any){
    for(var j = routes.length -1; j >=0; j-=1){
      if(routes[j].children.length < 2){
        routes.splice(j, 1);
      }
    }
  }
            
  /** This method removes the routes of dormant pages from the list of routes displayed in the side navigation
   * as configured in the reference data and returns active routes
   */
  private getActiveRoutes(context): any {
    // Get List of Dormant Page ID and return it as Observable of String Set
    const dormantPageIDList = this.refDataService
      .getRefData(ReferenceDataType.DORMANT_TYPE)
      .mergeMap(dormantList => {
        let pageIDList = new Set<string>();

        dormantList.forEach(item => {
          let value = '';
          if (item.values && item.values.indexOf('|') > 0) {
            value = item.values.split('|')[0];
          } else value = item.values;
          pageIDList.add(value);
        });

        return Observable.of(pageIDList);
      });

    // Use the dormant pageIDlist and route data of module to filter out pages
    const updatedRoute = dormantPageIDList.mergeMap(pageIDList => {
      let dormantPageArr = Array.from(pageIDList);

      //route data of module
      let routes = this.getRouteData(context);

      //Array to hold the filtered records
      let filterdRoutes = [];

      const filterOnDormantPages = filterOnArray(dormantPageArr);

      routes.forEach(route => {
        let activePageList = route.children.reduce(filterOnDormantPages, []);
        route.children = activePageList; //dormant routes are removed
        filterdRoutes.push(route);
      });
      return Observable.of(filterdRoutes);
    });

    return updatedRoute;
  }

  /**
   * Set the routes for the current application view
   * @param routes: object containing route data
   */
  setRoutes(routes: Object) {
    this.routes.next(routes);
  }

  setContext(context: string, alternativeRouteFlag?: boolean) {
    this.alternativeRouteFlag = alternativeRouteFlag;
    this.context.next(context);
  }

  /**
   * Subscribe to modules from modules service
   */
  setModules() {
    this.moduleService.modulesAnnounced$.subscribe(res =>{
      this.modules.push(res)
    });
  }

  /**
   * Build and return route data
   * based on user context
   */
  public getRouteData(context: string) {
    let routes = [];

    if (this.modules) {
      this.modules.forEach(module => {
        if (environment.enableAuth) {
          let _modData = [];
          _modData = this.authService.checkModulePermissions(module);

          if (_modData.length != 0) {
            routes.push({
              path: _modData[0].path,
              data: { title: _modData[0].data.title },
              children: _modData[0].children
            });
          }
        } else {
          // Form Routes from application data when Authentication is switched off
          routes.push({
            path: module.path,
            data: { title: module.routes[0].data.title },
            children: module.routes[0].children.reduce((arr, obj) => {
              let path = obj.path.split(':NINO')[1]
                ? context + '/' + obj.path.split(':NINO')[1]
                : obj.path;
              let updatedObj = Object.assign({}, obj, { path: path });
              arr.push(updatedObj);
              return arr;
            }, []),
            //context: this.context,
            moduleType: module.moduleType
          });
        }
      });
    }
    return routes;
  }

  /**
   * Scroll to top when route change is detected
   */
  resetScroll() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  /**
   * TBC
   * Set revenueActivity
   * @param revenueActivity
   */
  setRevenueActivity(revenueActivity) {
    this.revenueActivity = revenueActivity;
  }

  getRevenueActivity() {
    return this.revenueActivity;
  }

  /**
   * Remove notifications from template
   * when route change detected
   */
  clearNotifications() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const notifications = document.querySelectorAll('.ui-messages');
        for (let i = 0; i < notifications.length; i++) {
          notifications[i].parentNode.removeChild(notifications[i]);
        }
      }
    });
  }
}

/**
 * This filter function takes array of dormant page id as input and returns another function
 * returned function takes an object of route and if the route is not dormant then it is added to array
 *  and returned else the route is ignored
 */
const filterOnArray = array => {
  const fn = (arr: Array<any>, obj) => {
    if (obj.data == undefined || array.indexOf(obj.data.pageID) == -1) {
      arr.push(obj);
      return arr;
    } else return arr;
  };

  return fn;
};
