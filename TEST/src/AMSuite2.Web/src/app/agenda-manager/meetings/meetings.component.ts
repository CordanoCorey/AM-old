import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException, QueryModel, DateHelper, build, DateRange, compareStrings } from '@caiu/core';
import { HttpActions, Lookup, lookupKeySelector } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Meetings, MeetingsSearch } from './meetings.model';
import { MeetingsActions, meetingsSelector } from './meetings.reducer';
import { Meeting } from '../meeting/meeting.model';
import { Account } from '../../account/account.model';
import { currentAccountSelector, currentAccountIdSelector, activeAccountUrlSelector } from '../../account/account.reducer';
import { Group } from '../../core/groups/groups.model';
import { GroupsActions, accountGroupsSelector } from '../../core/groups/groups.reducer';
import { GroupMembersActions } from '../../core/members/members.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent extends SmartComponent implements OnInit {

  accountId = 0;
  routeName = 'meetings';
  search: MeetingsSearch = new MeetingsSearch();

  constructor(public store: Store<any>) {
    super(store);
  }

  get account$(): Observable<Account> {
    return currentAccountSelector(this.store);
  }

  get accountId$(): Observable<number> {
    return currentAccountIdSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      if (this.accountId) {
        this.getMeetings();
        this.getAccountGroups(this.accountId);
      }
    });
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get dateRanges$(): Observable<Lookup> {
    return lookupKeySelector(this.store, 'DateRanges');
  }

  get endDate(): Date {
    return this.search.dateRange.endDate;
  }

  get groupId(): number {
    return this.search.groupId;
  }

  get groups$(): Observable<Group[]> {
    return this.accountId$.mergeMap(id => accountGroupsSelector(this.store, id));
  }

  get meetings$(): Observable<Meeting[]> {
    return meetingsSelector(this.store).map(meetings => meetings.query(this.path));
  }

  get newMeetingUrl$(): Observable<string> {
    return this.accountUrl$.map(url => `/${url}/meetings/0/edit`);
  }

  get path(): string {
    let path = `meetings?accountId=${this.accountId}&startDate=${QueryModel.FormatDate(this.startDate)}&endDate=${QueryModel.FormatDate(this.endDate)}`;
    path = this.take ? `${path}&take=${this.take}` : path;
    return this.groupId ? `${path}&groupId=${this.groupId}` : path;
  }

  get showAdd$(): Observable<boolean> {
    return Observable.of(true);
  }

  get startDate(): Date {
    return this.search.dateRange.startDate;
  }

  get take(): number {
    return this.search.take;
  }

  ngOnInit() {
    this.search = build(MeetingsSearch, {
      dateRangeId: 11
    });
    this.subscribe([this.accountIdChanges]);
  }

  filter(search: MeetingsSearch) {
    this.search = search;
    this.getMeetings();
  }

  getAccountGroups(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/groups`, GroupsActions.GET));
  }

  getMeetings() {
    this.dispatch(HttpActions.search(this.path, MeetingsActions.GET));
  }

}
