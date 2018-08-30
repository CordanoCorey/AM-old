import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MessagePreviewComponent } from './message-preview/message-preview.component';
import { AnnouncementsWidgetModule } from '../announcements-widget/announcements-widget.module';
import { NotificationsWidgetModule } from '../notifications-widget/notifications-widget.module';
import { MeetingsWidgetModule } from '../../agenda-manager/meetings-widget/meetings-widget.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    AnnouncementsWidgetModule,
    MeetingsWidgetModule,
    NotificationsWidgetModule,
  ],
  declarations: [
    DashboardComponent,
    MessagePreviewComponent,
  ]
})
export class DashboardModule { }
