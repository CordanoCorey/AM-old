import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Attendance, Attendee } from '../attendance.model';

@Component({
  selector: 'am-attendance-log',
  templateUrl: './attendance-log.component.html',
  styleUrls: ['./attendance-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendanceLogComponent {

  @Input() attendance: Attendance = new Attendance();

  constructor() { }

  get attendees(): Attendee[] {
    return this.attendance.toArray();
  }

}
