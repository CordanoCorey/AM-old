import { NgModule } from '@angular/core';

import { NotificationComponent } from './notification.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    NotificationComponent,
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationsModule { }
