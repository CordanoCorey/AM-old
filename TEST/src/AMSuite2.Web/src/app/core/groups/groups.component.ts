import { Component, OnInit } from '@angular/core';
import { RouterActions } from '@caiu/router';
import { throwNotImplementedException, compareStrings } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Groups, Group, GroupMember } from './groups.model';
import { GroupsActions, accountGroupsSelector } from './groups.reducer';
import { Account } from '../../account/account.model';
import { currentAccountSelector, currentAccountIdSelector, activeAccountUrlSelector } from '../../account/account.reducer';
import { Member } from '../members/members.model';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector, currentUserSelector, currentUserIdSelector } from '../../shared/selectors';

@Component({
  selector: 'am-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent extends SmartComponent implements OnInit {

  accountId = 0;
  routeName = 'groups';
  userId = 0;

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
      this.changeAccount();
    });
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get administratorGroups$(): Observable<Group[]> {
    return Observable.combineLatest(this.groups$, this.userRoleId$,
      (groups, roleId) => {
        return roleId === 2 ? groups
          : (roleId === 3 ? groups.filter(group => group.createdBy === this.userId) : []);
      });
  }

  get editing$(): Observable<boolean> {
    return this.route$.map(route => route === 'group-edit');
  }

  get groups$(): Observable<Group[]> {
    return this.accountId$.mergeMap(id => accountGroupsSelector(this.store, id));
  }

  get groupsLink$(): Observable<string> {
    return this.accountUrl$.map(url => `/${url}/groups`);
  }

  get managerGroups$(): Observable<Group[]> {
    return this.userGroups$
      .map(members => members.filter(member => member.groupRole === 'Manager'))
      .map(members => members.map(member => member.group))
      .map(groups => groups.sort((a, b) => compareStrings(a.name, b.name)));
  }

  get newGroupLink$(): Observable<string> {
    return this.accountUrl$.map(url => `/${url}/groups/0/edit`);
  }

  get route$(): Observable<string> {
    return activatedRouteSelector(this.store);
  }

  get showAuditInfo(): boolean {
    return false;
  }

  get user$(): Observable<CurrentUser> {
    return currentUserSelector(this.store);
  }

  get userGroups$(): Observable<GroupMember[]> {
    return this.user$.map(user => user.userGroups || []);
  }

  get userId$(): Observable<number> {
    return currentUserIdSelector(this.store);
  }

  get userIdChanges(): Subscription {
    return this.userId$.subscribe(id => {
      this.userId = id;
      this.changeUser();
    });
  }

  get userRoleId$(): Observable<number> {
    return Observable.combineLatest(this.user$, this.account$,
      (user, account) => {
        const member = user.userAccounts.find(x => x.id === account.id);
        return member ? member.roleId : 0;
      });
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.userIdChanges]);
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
    this.dispatch(RouterActions.activate(this.routeName));
  }

  changeAccount() {
    if (this.accountId) {
      this.getAccountGroups(this.accountId);
    }
  }

  changeUser() {
    if (this.userId) {
      this.getUserGroups(this.userId);
    }
  }

  getAccountGroups(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/groups`, GroupsActions.GET_ACCOUNT_GROUPS));
  }

  getUserGroups(userId: number) {
    this.dispatch(HttpActions.get(`users/${userId}/groups`, GroupsActions.GET_USER_GROUPS));
  }

}
