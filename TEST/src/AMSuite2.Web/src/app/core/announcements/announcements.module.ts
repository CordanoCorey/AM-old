import { NgModule } from '@angular/core';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements.component';
import { AboutAnnouncementsComponent } from './about-announcements/about-announcements.component';
import { AnnouncementsGridComponent } from './announcements-grid/announcements-grid.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AnnouncementsRoutingModule,
  ],
  declarations: [
    AnnouncementsComponent,
    AboutAnnouncementsComponent,
    AnnouncementsGridComponent,
  ],
  exports: [
    AboutAnnouncementsComponent,
  ]
})
export class AnnouncementsModule { }
