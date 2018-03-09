import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../environments/environment';

@Injectable()
export class HelpService {
  private query = new ReplaySubject<any>();
  public helpLink: string;

  /**
   * Declare query as an Observable
   */
  queryAnnounced$ = this.query.asObservable();

  /**
   * Call updateQuery method on instantiation to set
   * class properties, plus set help url property
   */
  constructor(private router: Router, private route: ActivatedRoute) {
    this.updateQuery();
  }

  /**
   * Get help link from route data
   */
  getQuery() {
    let currentRoute = this.route.root;
    while (currentRoute.children[0]) {
      currentRoute = currentRoute.children[0];
      this.helpLink = currentRoute.snapshot.data['help'];
    }
  }

  /**
   *
   */
  setQuery(query: string) {
    this.query.next(query);
  }

  /**
   * Detect route change and update help URL
   */
  updateQuery() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getQuery();
        this.setQuery(this.helpLink);
      }
    });
  }
}
