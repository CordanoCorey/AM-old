import { NgModule } from '@angular/core';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { AttendanceChangeComponent } from './attendance-change/attendance-change.component';
import { AttendanceLogComponent } from './attendance-log/attendance-log.component';
import { RollCallComponent } from './roll-call/roll-call.component';
import { SharedModule } from '../../shared/shared.module';
import { AttendancePreviewComponent } from './attendance-preview/attendance-preview.component';

@NgModule({
  imports: [
    SharedModule,
    AttendanceRoutingModule,
  ],
  declarations: [
    AttendanceComponent,
    RollCallComponent,
    AttendanceChangeComponent,
    AttendanceLogComponent,
    AttendancePreviewComponent,
  ],
  exports: [
    AttendanceComponent,
  ]
})
export class AttendanceModule { }
