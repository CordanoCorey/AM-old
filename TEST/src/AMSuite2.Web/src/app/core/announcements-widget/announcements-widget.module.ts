import { NgModule } from '@angular/core';

import { AnnouncementsWidgetRoutingModule } from './announcements-widget-routing.module';
import { AnnouncementsWidgetComponent } from './announcements-widget.component';
import { AnnouncementPreviewComponent } from './announcement-preview.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AnnouncementsWidgetRoutingModule,
  ],
  declarations: [AnnouncementsWidgetComponent, AnnouncementPreviewComponent],
  exports: [AnnouncementsWidgetComponent]
})
export class AnnouncementsWidgetModule { }
