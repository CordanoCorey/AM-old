import { Component, OnInit, ViewChild } from '@angular/core';
import { build, throwNotImplementedException, toInt } from '@caiu/core';
import { EventsService } from '@caiu/events';
import { HttpActions, Lookup, lookupKeySelector, LookupValue, lookupValuesSelector } from '@caiu/http';
import { routeParamSelector } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { Group, GroupMember } from '../groups/groups.model';
import { GroupsActions, groupsSelector, activeGroupIdSelector, groupsSearchSelector, accountGroupsSelector } from '../groups/groups.reducer';
import { Member } from '../members/members.model';
import { memberSelector, activeMemberIdSelector, AccountMembersActions, AccountMemberActions, MembersActions, GroupMembersActions } from '../members/members.reducer';
import { Account, AccountMember } from '../../account/account.model';
import {
  accountNameSelector,
  activeAccountUrlSelector,
  currentAccountIdSelector,
  currentAccountSelector,
} from '../../account/account.reducer';
import { UserActions, UsersActions } from '../../shared/actions';
import { CurrentUser, UserGroup, User } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent extends SmartComponent implements OnInit {

  @ViewChild(UserGroupsComponent) userGroups: UserGroupsComponent;
  @ViewChild(UserRolesComponent) userRoles: UserRolesComponent;
  accountId = 0;
  groupId = 0;
  groupIds: number[] = [];
  groupIdsChanged = false;
  groupMemberRoleId = 3;
  member: Member = new Member();
  memberId = 0;
  roleId = 0;
  routeName = 'member-edit';

  constructor(public store: Store<any>, public events: EventsService) {
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
      this.getAccountGroups(this.accountId);
    });
  }

  get accountMember$(): Observable<AccountMember> {
    return this.member$.map(member => member.accountMember);
  }

  get accountMember(): AccountMember {
    return build(AccountMember, this.member.accountMember);
  }

  get accountName$(): Observable<string> {
    return accountNameSelector(this.store);
  }

  get accountRoleId$(): Observable<number> {
    return this.accountMember$.map(member => member.accountRoleId);
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get groupId$(): Observable<number> {
    return activeGroupIdSelector(this.store);
  }

  get groupIdChanges(): Subscription {
    return this.groupId$.subscribe(id => {
      this.groupId = id;
    });
  }

  get groupMemberRoleId$(): Observable<number> {
    return this.lookupGroupRoles$.map(roles => {
      const memberRole = roles.find(role => role.name === 'Member');
      return memberRole && memberRole.value ? memberRole.value : 3;
    });
  }

  get groupMemberRoleIdChanges(): Subscription {
    return this.groupMemberRoleId$.subscribe(id => {
      this.groupMemberRoleId = id;
    });
  }

  get groups$(): Observable<Group[]> {
    return accountGroupsSelector(this.store, this.accountId);
  }

  get groups(): any[] {
    return this.groupIds.map(groupId => ({
      groupId,
      userId: this.memberId,
      groupRoleId: this.groupMemberRoleId
    }));
  }

  get heading$(): Observable<string> {
    return this.memberId$.map(id => id === 0 ? 'Add Member' : 'Edit Member');
  }

  get lookupGroupRoles$(): Observable<LookupValue[]> {
    return lookupValuesSelector(this.store, 'GroupRoles');
  }

  get member$(): Observable<Member> {
    return memberSelector(this.store);
  }

  get memberId$(): Observable<number> {
    return routeParamSelector(this.store, 'memberId');
  }

  get memberIdChanges(): Subscription {
    return this.memberId$.subscribe(id => {
      this.memberId = toInt(id);
      this.dispatch(MembersActions.activateUser(this.memberId));
      if (this.accountId && this.memberId) {
        this.getAccountMember(this.accountId, this.memberId);
      }
    });
  }

  get message(): string {
    return this.inErrorState ? `An error has occurred. Please try again later.`
      : this.inSuccessState ? `Member updated successfully!` : '';
  }

  get user(): User {
    return build(User, this.member.user);
  }

  get userGroupIds$(): Observable<number[]> {
    return this.accountMember$.map(member => member.groupIds);
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.groupIdChanges, this.groupMemberRoleIdChanges, this.memberIdChanges]);
  }

  onAdd(member: Member) {
    this.member = build(Member, member, { groups: this.groups });
    this.addAccountMember(this.accountMember);
  }

  onChangeRole(roleId: number) {
    if (roleId !== this.roleId) {
      this.roleId = roleId;
      this.changeRole();
    }
  }

  onChanges(value: Member) {
    this.member = value;
  }

  onUpdate(member: Member) {
    this.member = build(Member, member, { groups: this.groups });
    this.updateUser(this.user);
    if (this.groupIdsChanged) {
      this.updateUserGroups(this.memberId, this.groups);
    }
  }

  onUpdateGroups(groupIds: number[]) {
    this.groupIds = groupIds;
    this.groupIdsChanged = true;
  }

  changeRole() {
    const accountMember = build(AccountMember, this.accountMember, { accountRoleId: this.roleId });
    this.member = build(Member, this.member, { accountMember });
    this.updateAccountMember(accountMember);
  }

  addAccountMember(member: AccountMember) {
    const action = HttpActions.post(`accounts/${member.accountId}/members`, member);
    this.addSubscription(this.events.dispatch(action).subscribe(e => {
      this.flashSuccessMessage();
    }));
  }

  getAccountGroups(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/groups`, GroupsActions.GET));
  }

  getAccountMember(accountId: number, memberId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/members/${memberId}`, AccountMemberActions.GET));
  }

  updateAccountMember(member: AccountMember) {
    this.dispatch(HttpActions.put(`accounts/${member.accountId}/members/${member.userId}`, member, AccountMemberActions.PUT));
  }

  updateUser(user: User) {
    const action = HttpActions.put(`users/${user.id}`, user, UserActions.PUT);
    this.addSubscription(this.events.dispatch(action).subscribe(e => {
      this.flashSuccessMessage();
    }));
  }

  updateUserGroups(userId: number, groups: GroupMember[]) {
    this.dispatch(HttpActions.put(`users/${userId}/groups`, groups, GroupMembersActions.UPDATE_USER_GROUPS));
  }

}
