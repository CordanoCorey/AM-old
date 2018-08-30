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
  agendaId = 0;
  groupId = 0;
  meetingId = 0;
  routeName = 'meeting-edit';

  constructor(public store: Store<any>) {
    super(store);
  }

  get accountId$(): Observable<number> {
    return currentAccountIdSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      this.getAccountGroups(this.accountId);
    });
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get agendas$(): Observable<Agenda[]> {
    return this.meeting$.map(meeting => meeting.agendas);
  }

  get agenda$(): Observable<Agenda> {
    return this.agendas$.map(agendas => {
      if (agendas.length > 0) {
        const active = agendas.find(agenda => agenda.id === this.agendaId);
        return active || agendas[0];
      }
      return new Agenda();
    });
  }

  get agendaId$(): Observable<number> {
    return agendaIdSelector(this.store);
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get groups$(): Observable<Group[]> {
    return this.accountId$.mergeMap(id => accountGroupsSelector(this.store, id));
  }

  get groupMembers$(): Observable<GroupMember[]> {
    return groupIdMembersSelector(this.store, this.groupId, this.accountId)
      .map(members => members.sort((a, b) => compareStrings(a.lastName, b.lastName)));
  }

  get heading$(): Observable<string> {
    return this.route$.mergeMap(route => {
      return route === 'agenda-edit' ? this.agendaId$.map(id => id === 0 ? 'Create Agenda' : 'Update Agenda')
        : this.meetingId$.map(id => id === 0 ? 'Create Meeting' : 'Update Meeting');
    });
  }

  get lookupHours$(): Observable<LookupValue[]> {
    return lookupValuesSelector(this.store, 'Hours');
  }

  get lookupMinutesBy5$(): Observable<LookupValue[]> {
    return lookupValuesSelector(this.store, 'MinutesBy5');
  }

  get lookupMinutesBy15$(): Observable<LookupValue[]> {
    return lookupValuesSelector(this.store, 'MinutesBy15');
  }

  get meeting$(): Observable<Meeting> {
    return meetingSelector(this.store);
  }

  get meetingId$(): Observable<number> {
    return meetingIdSelector(this.store);
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

  get route$(): Observable<string> {
    return activatedRouteSelector(this.store);
  }

  get showMeeting$(): Observable<boolean> {
    return this.route$.map(route => route === 'meeting-edit');
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
