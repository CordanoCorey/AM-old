import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { DateHelper, build, DateRange } from '@caiu/core';
import { ModelControl } from '@caiu/forms';
import { Lookup } from '@caiu/http';
import { DumbComponent } from '@caiu/store';

import { MeetingsSearch } from '../meetings.model';
import { Group } from '../../../core/groups/groups.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'am-meeting-filters',
  templateUrl: './meeting-filters.component.html',
  styleUrls: ['./meeting-filters.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MeetingFiltersComponent extends DumbComponent implements OnInit {

  @Input() dateRanges: Lookup = new Lookup();
  @Input() groups: Group[] = [];
  @Input() widget = false;
  @Input() search: MeetingsSearch = new MeetingsSearch();
  @Output() changes: EventEmitter<MeetingsSearch> = new EventEmitter<MeetingsSearch>();
  @ModelControl<MeetingsSearch>(new MeetingsSearch()) form: FormGroup;

  constructor() {
    super();
  }

  get showDaterangeMessage(): boolean {
    return false;
  }

  get dateRangeControl(): AbstractControl {
    return this.form.controls['dateRange'];
  }

  get dateRangeChanges(): Subscription {
    return this.dateRangeControl.valueChanges.subscribe((dateRange: DateRange) => {
      // setTimeout(() => {
      const dr = DateHelper.BuildDateRange(this.dateRangeIdControl.value);
      if (DateHelper.DateChanged(dateRange.startDate, dr.startDate) || DateHelper.DateChanged(dateRange.endDate, dr.endDate)) {
        this.dateRangeIdControl.setValue(1);
      }
      // }, 0);
    });
  }

  get dateRangeId(): number {
    return this.dateRangeIdControl.value;
  }

  get dateRangeIdControl(): AbstractControl {
    return this.form.controls['dateRangeId'];
  }

  get dateRangeIdChanges(): Subscription {
    return this.dateRangeIdControl.valueChanges.subscribe(id => {
      // setTimeout(() => {
      if (id !== 1) {
        this.dateRangeControl.setValue(build(DateRange, DateHelper.BuildDateRange(id)));
        this.filter();
        this.form.updateValueAndValidity();
      }
      // }, 0);
    });
  }

  get groupIdControl(): AbstractControl {
    return this.form.controls['groupId'];
  }

  get groupIdChanges(): Subscription {
    return this.groupIdControl.valueChanges.subscribe(id => {
      setTimeout(() => {
        this.filter();
      }, 0);
    });
  }

  ngOnInit() {
    this.form.setValue(this.search.query);
    this.subscribe([this.dateRangeIdChanges, this.dateRangeChanges, this.groupIdChanges]);
  }

  filter() {
    const query = build(MeetingsSearch, this.form.value);
    query.dateRangeId = this.dateRangeId;
    query.take = this.dateRangeId === 10 ? 10 : 0;
    this.changes.emit(query);
  }

}
