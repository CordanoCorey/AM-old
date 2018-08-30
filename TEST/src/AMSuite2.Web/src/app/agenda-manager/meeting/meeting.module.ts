import { NgModule } from '@angular/core';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import { MeetingDetailComponent } from './meeting-detail/meeting-detail.component';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { SlideshowControlsComponent } from './slideshow-controls/slideshow-controls.component';
import { AgendaTreeviewModule } from '../agenda-treeview/agenda-treeview.module';
import { AgendasModule } from '../agendas/agendas.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { NotesModule } from '../notes/notes.module';
import { EmailModule } from '../../core/email/email.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MeetingRoutingModule,
    AgendasModule,
    AgendaTreeviewModule,
    AttendanceModule,
    EmailModule,
    NotesModule
  ],
  declarations: [
    MeetingComponent,
    MeetingDetailComponent,
    ViewModeComponent,
    SlideshowControlsComponent,
  ]
})
export class MeetingModule { }
