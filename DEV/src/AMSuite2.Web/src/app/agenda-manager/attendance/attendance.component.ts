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

  attendance$: Observable<Attendance>;
  heading$: Observable<string>;
  showAttendanceChange$: Observable<boolean>;
  showAttendanceLog$: Observable<boolean>;
  showRollCall$: Observable<boolean>;

  constructor(public store: Store<any>) {
    super(store);
    this.attendance$ = attendanceSelector(this.store);
    this.heading$ = this.attendance$.map(attendance => 'Roll Call');
    this.showAttendanceChange$ = Observable.of(true);
    this.showAttendanceLog$ = Observable.of(true);
    this.showRollCall$ = Observable.of(true);
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
