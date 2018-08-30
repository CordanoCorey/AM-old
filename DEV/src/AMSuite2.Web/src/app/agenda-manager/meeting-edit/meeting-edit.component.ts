import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException, compareStrings } from '@caiu/core';
import { FormModel } from '@caiu/forms';
import { HttpActions, Lookup, lookupValuesSelector, LookupValue } from '@caiu/http';
import { RouterActions } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Meeting } from '../meeting/meeting.model';
import { meetingSelector } from '../meeting/meeting.reducer';
import { MeetingsActions, MeetingActions, meetingIdSelector } from '../meetings/meetings.reducer';
import { Agenda } from '../agendas/agendas.model';
import { agendaIdSelector } from '../agendas/agendas.reducer';
import { TemplatesActions } from '../templates/templates.reducer';
import { activeAccountUrlSelector, currentAccountIdSelector } from '../../account/account.reducer';
import { Group, GroupMember } from '../../core/groups/groups.model';
import { accountGroupsSelector, GroupsActions } from '../../core/groups/groups.reducer';
import { GroupMembersActions, groupIdMembersSelector } from '../../core/members/members.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector } from '../../shared/selectors';

@Component({
  selector: 'am-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.scss']
})
export class MeetingEditComponent extends SmartComponent implements OnInit {

  accountId = 0;
  accountId$: Observable<number>;
  accountUrl$: Observable<string>;
  agenda$: Observable<Agenda>;
  agendaId = 0;
  agendaId$: Observable<number>;
  agendas$: Observable<Agenda[]>;
  groupId = 0;
  groups$: Observable<Group[]>;
  groupMembers$: Observable<GroupMember[]>;
  heading$: Observable<string>;
  lookupHours$: Observable<LookupValue[]>;
  lookupMinutesBy5$: Observable<LookupValue[]>;
  lookupMinutesBy15$: Observable<LookupValue[]>;
  meeting$: Observable<Meeting>;
  meetingId = 0;
  meetingId$: Observable<number>;
  route$: Observable<string>;
  routeName = 'meeting-edit';
  showMeeting$: Observable<boolean>;

  constructor(public store: Store<any>) {
    super(store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.agendaId$ = agendaIdSelector(this.store);
    this.lookupHours$ = lookupValuesSelector(this.store, 'Hours');
    this.lookupMinutesBy15$ = lookupValuesSelector(this.store, 'MinutesBy5');
    this.lookupMinutesBy5$ = lookupValuesSelector(this.store, 'MinutesBy15');
    this.meeting$ = meetingSelector(this.store);
    this.meetingId$ = meetingIdSelector(this.store);
    this.route$ = activatedRouteSelector(this.store);
    this.agendas$ = this.meeting$.map(meeting => meeting.agendas);
    this.agenda$ = this.agendas$.map(agendas => {
      if (agendas.length > 0) {
        const active = agendas.find(agenda => agenda.id === this.agendaId);
        return active || agendas[0];
      }
      return new Agenda();
    });
    this.groups$ = this.accountId$.mergeMap(id => accountGroupsSelector(this.store, id));
    this.groupMembers$ = groupIdMembersSelector(this.store, this.groupId, this.accountId)
      .map(members => members.sort((a, b) => compareStrings(a.lastName, b.lastName)));
    this.heading$ = this.route$.mergeMap(route => {
      return route === 'agenda-edit' ? this.agendaId$.map(id => id === 0 ? 'Create Agenda' : 'Update Agenda')
        : this.meetingId$.map(id => id === 0 ? 'Create Meeting' : 'Update Meeting');
    });
    this.showMeeting$ = this.route$.map(route => route === 'meeting-edit');
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      this.getAccountGroups(this.accountId);
    });
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get meetingIdChanges(): Subscription {
    return this.meetingId$.subscribe(id => {
      this.meetingId = id;
      if (this.meetingId) {
        this.getMeeting(this.meetingId);
      }
    });
  }

  get message(): string {
    return this.inErrorState ? `An error has occurred. Please try again later.`
      : this.inSuccessState ? `Meeting updated successfully!` : '';
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.agendaIdChanges, this.meetingIdChanges]);
  }

  changeGroup(groupId: number) {
    this.groupId = groupId;
    if (groupId !== 0) {
      this.getGroupMembers(this.groupId);
    }
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
    this.dispatch(RouterActions.activate(this.routeName));
  }

  getAccountGroups(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/groups`, GroupsActions.GET));
  }

  getGroupMembers(groupId: number) {
    this.dispatch(HttpActions.get(`groups/${groupId}/members`, GroupMembersActions.GET));
  }

  getMeeting(meetingId: number) {
    this.dispatch(HttpActions.get(`meetings/${meetingId}`, MeetingActions.GET));
  }

  addMeeting(meeting: Meeting) {
    this.dispatch(HttpActions.post(`meetings`, meeting, MeetingsActions.POST));
  }

  deleteMeeting(meetingId: number) {
    this.dispatch(HttpActions.delete(`meetings/${meetingId}`, meetingId, MeetingActions.DELETE));
  }

  updateMeeting(meeting: Meeting) {
    this.dispatch(HttpActions.put(`meetings/${meeting.id}`, meeting, MeetingActions.PUT));
  }

}
