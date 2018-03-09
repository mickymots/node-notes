import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Check if route can be activated
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let redirectURL = state.url;
    this.authService.setRedirectUrl(redirectURL);
    if (environment.enableAuth && !this.authService.getAuthStatus()) {
      return this.document.location.href.indexOf(environment.production_URL) >=
        0
        ? this.loadRoles()
        : this.checkLoginStatus(redirectURL);
    } else {
      //--Authentication is disabled - always return true
      return true;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  /**
   * Method for loading Roles in PROD environment
   */
  loadRoles() {
    //Invoke 'logIn()' method in AuthService
    this.authService.loadUserPermissions();
    return this.authService.getAuthStatus();
  }

  /**
   * Check if user is logged in
   * @param url
   */
  checkLoginStatus(url?: string): boolean {
    if (!this.authService.getAuthStatus()) {
      this.authService.setRedirectUrl(url);
      this.router.navigate(['/login']);
    }
    return this.authService.getAuthStatus();
  }
}
