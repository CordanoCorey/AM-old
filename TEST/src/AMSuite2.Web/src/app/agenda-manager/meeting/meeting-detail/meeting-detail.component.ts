import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Meeting } from '../meeting.model';

@Component({
  selector: 'am-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingDetailComponent implements OnInit {

  @Input() meeting: Meeting = new Meeting();
  @Input() showEdit = false;
  @Input() showEmailGroup = false;
  @Input() showSendEmail = false;
  @Output() sendEmail = new EventEmitter<any>();

  constructor() { }

  get meetingDate(): Date {
    return this.meeting.date;
  }

  get meetingLocation(): string {
    return this.meeting.location;
  }

  get meetingStartTime(): Date {
    return this.meeting.startTime;
  }

  get meetingEndTime(): Date {
    return this.meeting.endTime;
  }

  get meetingTime(): string {
    return `${this.meetingDate}   [${this.meetingStartTime}-${this.meetingEndTime}]    ${this.meetingLocation}`;
  }

  ngOnInit() {
  }

  onSendEmail(e: any) {
    this.sendEmail.emit();
  }

}
