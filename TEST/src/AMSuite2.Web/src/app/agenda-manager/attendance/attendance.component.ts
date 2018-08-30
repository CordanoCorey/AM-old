import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, SmartComponent } from '@caiu/store';

import { Attendance } from './attendance.model';
import { attendanceSelector } from './attendance.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AttendanceComponent extends SmartComponent implements OnInit {

  constructor(public store: Store<any>) {
    super(store);
  }

  get attendance$(): Observable<Attendance> {
    return attendanceSelector(this.store);
  }

  get heading$(): Observable<string> {
    return this.attendance$.map(attendance => 'Roll Call');
  }

  get showAttendanceChange$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showAttendanceLog$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showRollCall$(): Observable<boolean> {
    return Observable.of(true);
  }

  ngOnInit() {
  }

  onDepart(userId: number) {

  }

  onJoin(userId: number) {

  }

  onWriteIn(value: string) {

  }

}
