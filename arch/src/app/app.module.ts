/**
 * Angular
 */
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Vendor
 */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/**
 * Environment
 */
import { environment } from '../environments/environment';

/**
 * Services
 */
import { AuditService } from './audit/audit.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { DormancyGuard } from './auth/dormancy-guard.service';
import { CustomErrorHandler } from './error-handler/custom-error-handler';
import { ExceptionService } from './exception-handler/exception.service';
import { FormService } from './form/form.service';
import { HelpService } from './help/help.service';
import { LoggingService } from './logging/logging.service';
import { MessageService } from './message-handler/message.service';
import { ModuleService } from './module/module.service';
import { NavigationService } from './navigation/navigation.service';
import { NotificationService } from './notification/notification.service';
import { PreferencesService } from './preferences/preferences.service';
import { ReferenceDataService } from './reference-data/reference-data.service';
import { SessionManagerService } from './session-manager/session-manager.service';
import { TitleService } from './title/title.service';
import { SearchService } from './search/search.service';
import { UUIDService } from './uuid-service/uuid.service'
/**
 * State
 */
import { SessionStateReducer } from './state-manager/session-state.reducer';
import { AuthReducer } from './state-manager/auth.reducer';
import { SearchReducer } from './state-manager/search.reducer';
import { QueryReducer } from './state-manager/query.reducer';
import { OptLockReducer } from './state-manager/opt-lock.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.provideStore({
      auth: AuthReducer,
      search: SearchReducer,
      query: QueryReducer,
      sessionStateReducer: SessionStateReducer,
      optLock: OptLockReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuditService,
    FormService,
    NotificationService,
    ReferenceDataService,
    MessageService,
    LoggingService,
    NavigationService,
    HelpService,
    TitleService,
    SearchService,
    ExceptionService,
    // CustomErrorHandler,
    // { provide: ErrorHandler, useClass: CustomErrorHandler },
    PreferencesService,
    SessionManagerService,
    UUIDService,
    ModuleService,
    DormancyGuard
  ]
})
export class AppModule {
  /**
   * For classes which aren't instantiated
   */
  constructor(
    private session: SessionManagerService,
    private preferences: PreferencesService
  ) {}
}
