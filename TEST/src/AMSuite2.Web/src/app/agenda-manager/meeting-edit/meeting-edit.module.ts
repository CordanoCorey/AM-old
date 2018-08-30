import { NgModule } from '@angular/core';

import { MeetingEditRoutingModule } from './meeting-edit-routing.module';
import { MeetingEditComponent } from './meeting-edit.component';
import { AboutMeetingsComponent } from './about-meetings/about-meetings.component';
import { MeetingPanelComponent } from './meeting-panel/meeting-panel.component';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { AgendasModule } from '../agendas/agendas.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MeetingEditRoutingModule,
    AgendasModule,
  ],
  declarations: [
    MeetingEditComponent,
    AboutMeetingsComponent,
    MeetingFormComponent,
    MeetingPanelComponent,
  ]
})
export class MeetingEditModule { }
