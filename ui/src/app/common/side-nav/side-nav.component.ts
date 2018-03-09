import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { NavigationService, MODULE_TYPE } from '@itmp/arch';
import { VALIDATOR_FUNCTIONS } from '../../base/validator-functions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  host: {
    '(window:keydown)': 'focusNavigation($event)',
    '(window:keyup)': 'openNavigation($event)'
  }
})
export class SideNavComponent implements OnInit {
  public routes: Array<object>;

  private external = MODULE_TYPE.EXTERNAL;
  private width = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  constructor(
    private _eref: ElementRef,
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.subscribeToRoutes();
  }

  subscribeToRoutes() {
    this.navigationService.routes$.subscribe(routes => {
      if (!VALIDATOR_FUNCTIONS.isEmpty(routes)) {
        this.routes = routes;
      }
    });
  }

  toggleSideMenu() {
    let sideMenu = document.getElementById('side-menu');
    let main = document.getElementsByTagName('main')[0];
    let visibility =
      sideMenu.getAttribute('data-visible') == 'false' ? 'true' : 'false';
    sideMenu.setAttribute('data-visible', visibility);
    localStorage.setItem('sidemenu', visibility);
    main.classList.toggle('no-menu');
  }

  hideMenu() {
    let sideMenu = document.getElementById('side-menu');
    sideMenu.setAttribute('data-visible', 'false');
  }

  showMenu() {
    let sideMenu = document.getElementById('side-menu');
    sideMenu.setAttribute('data-visible', 'true');
  }

  mainMenu() {
    let main = document.getElementsByTagName('main')[0];
    main.classList.remove('no-menu');
  }

  mainNoMenu() {
    let main = document.getElementsByTagName('main')[0];
    main.classList.add('no-menu');
  }

  focusNavigation(e) {
    if (!e) e = event;
    if (e.altKey && e.keyCode === 90) {
      let nav = document.getElementById('side-menu__list');
      nav.focus();
    }
  }

  openNavigation(e) {
    let active = document.activeElement;
    if (e.keyCode === 9) {
      let routerLinkActive = document.activeElement.getAttribute(
        'routerLinkActive'
      );
      let isNavLink = routerLinkActive === 'dropdown-active' ? true : false;
      if (isNavLink) {
        let parent = active.parentElement.parentElement.parentElement;
        let span = parent.getElementsByClassName('menu__heading')[0];
        span.setAttribute('aria-expanded', 'true');
      }
    }
  }
}
