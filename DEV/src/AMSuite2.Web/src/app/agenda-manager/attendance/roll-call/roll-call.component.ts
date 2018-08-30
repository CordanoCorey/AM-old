import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { ModelArrayControl, FormArray, FormArrayModel } from '@caiu/forms';

import { Attendance, Attendee, AttendeeEdit } from '../attendance.model';
import { build } from '@caiu/core';

@Component({
  selector: 'am-roll-call',
  templateUrl: './roll-call.component.html',
  styleUrls: ['./roll-call.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RollCallComponent implements OnChanges {

  @Input() attendance: Attendance = new Attendance();
  @Output() submit = new EventEmitter<Attendee[]>();
  @ModelArrayControl<AttendeeEdit>(new AttendeeEdit()) formArray: FormArray;

  constructor() { }

  get attendees(): Attendee[] {
    return this.attendance.attendees;
  }

  get currentValue(): Attendee[] {
    return this.formModel.value.map(value => AttendeeEdit.BuildAttendee(this.attendance.get(value.id), value));
  }

  get formModel(): FormArrayModel<AttendeeEdit> {
    return new FormArrayModel(this.model);
  }

  get model(): AttendeeEdit[] {
    return this.attendees.map(attendee => new AttendeeEdit(attendee));
  }

  ngOnChanges() {
    this.formArray.resetValue(this.formModel.value);
  }

  setAllAbsent() {
    this.formArray.controls.forEach(control => {
      control.setValue(build(AttendeeEdit, control.value, { isPresent: 0 }));
    });
  }

  setAllPresent() {
    this.formArray.setAll(AttendeeEdit, { isPresent: 1 });
  }

  onSubmit() {
    this.submit.emit(this.currentValue);
  }

}
