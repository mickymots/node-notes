/**
 * Angular
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Custom
 */
import { ITMPRoutingModule } from './itmp-routing.module';
import { UIModule } from '@itmp/ui';
import { ArchitectureModule } from '@itmp/arch';

/**
 * Module Specific
 */
import { ITMPComponent } from './itmp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { LoginComponent } from './login/login.component';
import { SplashComponent } from './splash/splash.component';
import { SitemapComponent } from './sitemap/sitemap.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    ArchitectureModule,
    ITMPRoutingModule,
  ],
  declarations: [
    ITMPComponent,
    DashboardComponent,
    PageNotFoundComponent,
    PreferencesComponent,
    UnderConstructionComponent,
    LoginComponent,
    SplashComponent,
    SitemapComponent
  ]
})
export class ITMPModule { }
