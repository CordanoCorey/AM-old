import { NgModule } from '@angular/core';

import { NotificationsWidgetRoutingModule } from './notifications-widget-routing.module';
import { NotificationsWidgetComponent } from './notifications-widget.component';
import { NotificationPreviewComponent } from './notification-preview.component';
import { NotificationsModule } from '../notifications/notifications.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    NotificationsWidgetRoutingModule,
    NotificationsModule,
  ],
  declarations: [NotificationsWidgetComponent, NotificationPreviewComponent],
  exports: [NotificationsWidgetComponent]
})
export class NotificationsWidgetModule { }
