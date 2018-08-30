import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Grid, GridColumn, SortDescriptor } from '@caiu/common';

import { MeetingRow } from '../meetings.model';
import { Meeting } from '../../meeting/meeting.model';

@Component({
  selector: 'am-meetings-grid',
  templateUrl: './meetings-grid.component.html',
  styleUrls: ['./meetings-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MeetingsGridComponent implements OnInit {

  @Input() accountUrl = '';
  @Input() height = 520;
  @Input() meetings: Meeting[] = [];
  @Input() widget = false;
  private _sort: SortDescriptor[] = [
    Grid.BuildSort('meetingDate', 'asc')
  ];

  constructor() { }

  get grid(): Grid<MeetingRow> {
    return Grid.Build<MeetingRow>(this.rows);
  }

  get rows(): MeetingRow[] {
    return this.meetings.map(meeting => new MeetingRow(meeting, this.accountUrl));
  }

  get agendas(): GridColumn<string> {
    return new GridColumn<string>('agendas', 'Agendas');
  }

  get date(): GridColumn<Date> {
    return new GridColumn<Date>('meetingDate', 'Date');
  }

  get dateWidth(): number {
    return this.widget ? 120 : 192;
  }

  get group(): GridColumn<string> {
    return new GridColumn<string>('group', 'Group');
  }

  get location(): GridColumn<string> {
    return new GridColumn<string>('location', 'Location');
  }

  get meetingName(): GridColumn<string> {
    return new GridColumn<string>('meetingName', 'Meeting Name');
  }

  get meetingNameWidth(): number {
    return this.widget ? 312 : 240;
  }

  get startTime(): GridColumn<Date> {
    return new GridColumn<Date>('startTime', 'Start Time');
  }

  get sort(): SortDescriptor[] {
    return this._sort;
  }

  set sort(value: SortDescriptor[]) {
    this._sort = value;
  }

  ngOnInit() {
  }

}
