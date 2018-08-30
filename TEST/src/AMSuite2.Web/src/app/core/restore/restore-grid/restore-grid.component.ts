import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Collection, Metadata } from '@caiu/core';
import { StyleModel, Grid, GridColumn, SortDescriptor } from '@caiu/common';

import { RestoreRow } from '../restore.model';
import { Agenda } from '../../../agenda-manager/agendas/agendas.model';
import { Meeting } from '../../../agenda-manager/meeting/meeting.model';

@Component({
  selector: 'am-restore-grid',
  templateUrl: './restore-grid.component.html',
  styleUrls: ['./restore-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestoreGridComponent implements OnChanges {

  @Input() accountName = '';
  @Input() agendas: Agenda[] = [];
  @Input() meetings: Meeting[] = [];
  @Output() restoreAgenda: EventEmitter<Agenda> = new EventEmitter<Agenda>();
  @Output() restoreMeeting: EventEmitter<Meeting> = new EventEmitter<Meeting>();
  private _sort: SortDescriptor[] = [
    Grid.BuildSort('deletedOn', 'desc')
  ];

  constructor() { }

  get allAgendas(): Agenda[] {
    return [
      ...this.meetingAgendas,
      ...this.agendas
    ].reduce((acc, agenda) => acc.findIndex(x => x.id === agenda.id) === -1 ? [...acc, ...[agenda]] : acc, []);
  }

  get meetingAgendas(): Agenda[] {
    return this.meetings.reduce((acc, meeting) => [...acc, ...meeting.agendas], []);
  }

  get grid(): Grid<RestoreRow> {
    return Grid.Build<RestoreRow>(this.rows);
  }

  get rows(): RestoreRow[] {
    return this.allAgendas.map(agenda => new RestoreRow(agenda, this.accountName));
  }

  get sort(): SortDescriptor[] {
    return this._sort;
  }

  set sort(value: SortDescriptor[]) {
    this._sort = value;
  }

  get actionsColumn(): GridColumn<any> {
    return new GridColumn('restore', 'Restore');
  }

  get accountColumn(): GridColumn<string> {
    return new GridColumn<string>('accountName', 'Account');
  }

  get meetingColumn(): GridColumn<string> {
    return new GridColumn<string>('meetingName', 'Meeting');
  }

  get agendaColumn(): GridColumn<string> {
    return new GridColumn<string>('agendaName', 'Agenda');
  }

  get groupColumn(): GridColumn<string> {
    return new GridColumn<string>('groupName', 'Group');
  }

  get deletedOnColumn(): GridColumn<string> {
    return new GridColumn<string>('deletedOn', 'Deleted On');
  }

  ngOnChanges() {
  }

  onRestore(agenda: Agenda, meetingDeleted: boolean) {
    meetingDeleted ? this.restoreMeeting.emit(agenda.meeting) : this.restoreAgenda.emit(agenda);
  }
}
