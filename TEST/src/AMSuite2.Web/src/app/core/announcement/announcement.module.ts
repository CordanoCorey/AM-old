import { NgModule } from '@angular/core';

import { AnnouncementComponent } from './announcement.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [AnnouncementComponent],
  exports: [AnnouncementComponent]
})
export class AnnouncementModule { }
