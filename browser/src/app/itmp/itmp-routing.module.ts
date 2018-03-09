/**
 * Angular
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

/**
 * Custom
 */
import { AuthGuard } from '@itmp/arch';
import { environment } from '../../environments/environment';

/**
 * Components
 */
import { ITMPComponent } from './itmp.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { SplashComponent } from './splash/splash.component';
import { SitemapComponent } from './sitemap/sitemap.component';

export const routes: Routes = [
  {
    path: environment.appRoot,
    component: ITMPComponent,
    children: [
      {
        path: environment.appRoot,
        redirectTo: environment.appLanding,
        canActivate: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: SplashComponent,
        canActivate: [AuthGuard],
        data: { title: 'Dashboard', pageID: 'PG0001' }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', hidden: true }
      },
      {
        path: 'preferences',
        component: PreferencesComponent,
        data: { title: 'Preferences', pageID: 'PG0002' }
      },
      {
        path: 'sitemap',
        component: SitemapComponent,
        data: { title: 'Sitemap', hidden: true, pageID: 'PG0003' }
      },
      {
        path: '404',
        component: PageNotFoundComponent,
        data: { title: 'Page Not Found', hidden: true }
      },
      {
        path: '**',
        component: PageNotFoundComponent,
        data: { title: 'Page Not Found', hidden: true }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ITMPRoutingModule {}
