import { NgModule } from '@angular/core';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsComponent } from './meetings.component';
import { MeetingFiltersComponent } from './meeting-filters/meeting-filters.component';
import { MeetingsGridComponent } from './meetings-grid/meetings-grid.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MeetingsRoutingModule,
  ],
  declarations: [
    MeetingsComponent,
    MeetingFiltersComponent,
    MeetingsGridComponent,
  ],
  exports: [
    MeetingFiltersComponent,
    MeetingsGridComponent,
  ]
})
export class MeetingsModule { }
