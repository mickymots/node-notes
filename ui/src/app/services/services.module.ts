import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationMessagingService } from './application-messaging.service';
import { ApiService } from './api.service';
import { OptLockService } from './opt-lock.service';
import { UserInfoService } from './user-info.service';
import { ContactHistoryCacheService } from './contact-history-cache.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    ApplicationMessagingService,
    ApiService,
    OptLockService,
    UserInfoService,
    ContactHistoryCacheService
  ],
  declarations: []
})
export class ServicesModule {}
