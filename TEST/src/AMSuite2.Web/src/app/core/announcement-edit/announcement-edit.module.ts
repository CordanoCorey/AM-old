import { NgModule } from '@angular/core';

import { AnnouncementEditRoutingModule } from './announcement-edit-routing.module';
import { AnnouncementEditComponent } from './announcement-edit.component';
import { AnnouncementFormComponent } from './announcement-form/announcement-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AnnouncementEditRoutingModule,
  ],
  declarations: [
    AnnouncementEditComponent,
    AnnouncementFormComponent,
  ]
})
export class AnnouncementEditModule { }
