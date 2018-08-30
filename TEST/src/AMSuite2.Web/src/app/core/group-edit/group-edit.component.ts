import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException, distinct } from '@caiu/core';
import { HttpActions, Lookup, lookupKeySelector } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Group, GroupMember } from '../groups/groups.model';
import { GroupsActions, GroupActions, groupSelector, activeGroupIdSelector } from '../groups/groups.reducer';
import { Member, Members } from '../members/members.model';
import { AccountMembersActions, groupIdMembersSelector, membersSelector, groupMembersByAccountSelector, accountIdMembersSelector, accountMemberRolesSelector } from '../members/members.reducer';
import { AccountMember } from '../../account/account.model';
import { activeAccountUrlSelector, currentAccountIdSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent extends SmartComponent implements OnInit {

  accountId = 0;
  accountUrl = '';
  groupId = 0;
  routeName = 'group-edit';

  constructor(public store: Store<any>) {
    super(store);
  }

  get accountId$(): Observable<number> {
    return currentAccountIdSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      if (this.accountId) {
        this.getAccountMembers(this.accountId);
      }
    });
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get admins$(): Observable<AccountMember[]> {
    return this.accountId === 0 ? Observable.of([])
      : accountMemberRolesSelector(this.store, this.accountId, [2, 3]);
  }

  get group$(): Observable<Group> {
    return groupSelector(this.store);
  }

  get groupId$(): Observable<number> {
    return activeGroupIdSelector(this.store);
  }

  get groupIdChanges(): Subscription {
    return this.groupId$.subscribe(id => {
      this.groupId = id;
      if (this.groupId) {
        this.getGroup(this.groupId);
      }
    });
  }

  get groupMembers$(): Observable<GroupMember[]> {
    return this.accountId ? groupMembersByAccountSelector(this.store, this.accountId, this.groupId) : Observable.of([]);
  }

  get lkpOutlines$(): Observable<Lookup> {
    return lookupKeySelector(this.store, 'Outlines');
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.groupIdChanges]);
  }

  activate() {
    this.dispatch(GroupsActions.activate(this.groupId));
  }

  addGroup(group: Group) {
    this.dispatch(HttpActions.post(`groups/${group.id}`, group, GroupsActions.POST));
  }

  deleteGroup(groupId) {
    this.dispatch(HttpActions.delete(`groups/${groupId}`, groupId, GroupActions.DELETE)
    );
  }

  getAccountMembers(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/members`, AccountMembersActions.GET));
  }

  getGroup(groupId: number) {
    this.dispatch(HttpActions.get(`groups/${groupId}`, GroupActions.GET));
  }

  updateGroup(group: Group) {
    this.dispatch(HttpActions.put(`groups/${group.id}`, group, GroupActions.PUT));
  }

}
