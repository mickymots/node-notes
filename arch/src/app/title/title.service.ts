import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

/**
 * This service class is used to set the application title in the brower window
 */
@Injectable()
export class TitleService {

  constructor(
    private router: Router,
    private angularTitleService: Title
  ) {
    this.setTitle();
  }

    /**
   * Returns the title based on the router state and parent
   * @param state
   * @param parent
   */
  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title)
      data.push(parent.snapshot.data.title);
    if (state && parent)
      data.push(... this.getTitle(state, state.firstChild(parent)));
    return data;
  }

  /**
   * Set title of the current application view
   */
  setTitle() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' - ');
        this.angularTitleService.setTitle('HMRC Internal Browser | ' + title);
      }
    });
  }
}
