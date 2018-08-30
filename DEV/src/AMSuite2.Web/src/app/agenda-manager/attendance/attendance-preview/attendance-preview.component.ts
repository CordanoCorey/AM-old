import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Attendance } from '../attendance.model';

@Component({
  selector: 'am-attendance-preview',
  templateUrl: './attendance-preview.component.html',
  styleUrls: ['./attendance-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendancePreviewComponent {

  @Input() attendance = new Attendance();

  constructor() { }

  get absent(): string {
    return this.attendance.absent.reduce((acc, attendee) => `${acc}, ${attendee.userName}`, '');
  }

  get hasUpdates(): boolean {
    return this.logUpdates.length > 0;
  }

  get logUpdates(): string[] {
    return this.attendance.logUpdates.map(attendee => attendee.logUpdate);
  }

  get present(): string {
    return this.attendance.present.reduce((acc, attendee) => `${acc}, ${attendee.userName}`, '');
  }

}
