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

  account$: Observable<Account>;
  accountId = 0;
  accountId$: Observable<number>;
  accountUrl$: Observable<string>;
  administratorGroups$: Observable<Group[]>;
  editing$: Observable<boolean>;
  groups$: Observable<Group[]>;
  groupsLink$: Observable<string>;
  managerGroups$: Observable<Group[]>;
  newGroupLink$: Observable<string>;
  route$: Observable<string>;
  routeName = 'groups';
  user$: Observable<CurrentUser>;
  userGroups$: Observable<GroupMember[]>;
  userId = 0;
  userId$: Observable<number>;
  userRoleId$: Observable<number>;

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = currentAccountSelector(this.store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.route$ = activatedRouteSelector(this.store);
    this.user$ = currentUserSelector(this.store);
    this.userId$ = currentUserIdSelector(this.store);
    this.editing$ = this.route$.map(route => route === 'group-edit');
    this.groups$ = this.accountId$.mergeMap(id => accountGroupsSelector(this.store, id));
    this.groupsLink$ = this.accountUrl$.map(url => `/${url}/groups`);
    this.newGroupLink$ = this.accountUrl$.map(url => `/${url}/groups/0/edit`);
    this.userGroups$ = this.user$.map(user => user.userGroups || []);
    this.userRoleId$ = Observable.combineLatest(this.user$, this.account$,
      (user, account) => {
        const member = user.userAccounts.find(x => x.id === account.id);
        return member ? member.roleId : 0;
      });
    this.administratorGroups$ = Observable.combineLatest(this.groups$, this.userRoleId$,
      (groups, roleId) => {
        return roleId === 2 ? groups
          : (roleId === 3 ? groups.filter(group => group.createdBy === this.userId) : []);
      });
    this.managerGroups$ = this.userGroups$
      .map(members => members.filter(member => member.groupRole === 'Manager'))
      .map(members => members.map(member => member.group))
      .map(groups => groups.sort((a, b) => compareStrings(a.name, b.name)));
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      this.changeAccount();
    });
  }

  get showAuditInfo(): boolean {
    return false;
  }

  get userIdChanges(): Subscription {
    return this.userId$.subscribe(id => {
      this.userId = id;
      this.changeUser();
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
