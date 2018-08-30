import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Grid, GridColumn, SortDescriptor } from '@caiu/common';

import { Announcement, AnnouncementRow } from '../announcements.model';

@Component({
  selector: 'am-announcements-grid',
  templateUrl: './announcements-grid.component.html',
  styleUrls: ['./announcements-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementsGridComponent {

  @Input() accountUrl = '';
  @Input() announcements: Announcement[] = [];
  private _sort: SortDescriptor[] = [
    Grid.BuildSort('endDate', 'desc')
  ];

  constructor() { }

  get grid(): Grid<AnnouncementRow> {
    return Grid.Build<AnnouncementRow>(this.rows);
  }

  get rows(): AnnouncementRow[] {
    return this.announcements.map(announcement => new AnnouncementRow(announcement));
  }

  get endDateColumn(): GridColumn<Date> {
    return new GridColumn<Date>('endDate', 'End Date');
  }

  get startDateColumn(): GridColumn<Date> {
    return new GridColumn<Date>('startDate', 'Start Date');
  }

  get subjectColumn(): GridColumn<string> {
    return new GridColumn<string>('subject', 'Subject');
  }

  get typeColumn(): GridColumn<number> {
    return new GridColumn<number>('type', 'Type');
  }

  get sort(): SortDescriptor[] {
    return this._sort;
  }

  set sort(value: SortDescriptor[]) {
    this._sort = value;
  }

}
