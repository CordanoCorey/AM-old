import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { build, throwNotImplementedException } from '@caiu/core';
import { ModelControl } from '@caiu/forms';
import { HttpActions, Lookup, lookupKeySelector, LookupValue } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Profile, AccountRequest } from './profile.model';
import { profileSelector } from './profile.reducer';
import { accountsSelector } from '../accounts/accounts.reducer';
import { GroupMember } from '../groups/groups.model';
import { GroupsActions } from '../groups/groups.reducer';
import { userGroupsSelector } from '../members/members.reducer';
import { NotificationsActions } from '../notifications/notifications.reducer';
import { Account } from '../../account/account.model';
import { accountNameSelector, activeAccountUrlSelector, currentAccountIdSelector, currentAccountSelector, } from '../../account/account.reducer';
import { UserActions } from '../../shared/actions';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { currentUserIdSelector, userIdSelector, currentUserSelector } from '../../shared/selectors';
import { Tabs } from '../../shared/tabs/tabs.model';

@Component({
  selector: 'am-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends SmartComponent implements OnInit {

  routeName = 'profile';
  userId = 0;

  constructor(public store: Store<any>) {
    super(store);
  }

  get accounts$(): Observable<Account[]> {
    return accountsSelector(this.store).map(accounts => accounts.toArray());
  }

  get account$(): Observable<Account> {
    return currentAccountSelector(this.store);
  }

  get accountId$(): Observable<number> {
    return currentAccountIdSelector(this.store);
  }

  get accountName$(): Observable<string> {
    return accountNameSelector(this.store);
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get dateRanges$(): Observable<Lookup> {
    return lookupKeySelector(this.store, 'DateRanges');
  }

  get groups$(): Observable<GroupMember[]> {
    return Observable.combineLatest(this.accountId$, this.userGroups$,
      (accountId, groups) => groups.filter(g => g.group.accountId === accountId));
  }

  get notificationLookup$(): Observable<LookupValue> {
    return this.notificationTypes$.map(types => types.values
      .find(x => x.name === 'Account Request') || new LookupValue());
  }

  get notificationTypeId$(): Observable<number> {
    return this.notificationLookup$.map(x => x.id);
  }

  get notificationTypes$(): Observable<Lookup> {
    return lookupKeySelector(this.store, 'NotificationTypes');
  }

  get profile$(): Observable<Profile> {
    return profileSelector(this.store);
  }

  get user$(): Observable<CurrentUser> {
    return currentUserSelector(this.store);
  }

  get userGroups$(): Observable<GroupMember[]> {
    return userGroupsSelector(this.store).map(members => {
      return members.reduce((acc, member) => [...acc, ...member.groups], []);
    });
  }

  get userId$(): Observable<number> {
    return currentUserIdSelector(this.store);
  }

  get userIdChanges(): Subscription {
    return this.userId$.subscribe(id => {
      this.userId = id;
      this.getUserGroups(this.userId);
      this.getProfile();
    });
  }

  ngOnInit() {
    this.subscribe([this.userIdChanges]);
  }

  addAccountRequest(request: AccountRequest) {
    this.dispatch(HttpActions.post(`accountrequests`, request, NotificationsActions.ADD_ACCOUNT_REQUEST));
  }

  getProfile() {
    this.dispatch(HttpActions.get(`profile`, UserActions.GET_PROFILE));
  }

  getUserGroups(userId: number) {
    this.dispatch(HttpActions.get(`users/${userId}/groups`, GroupsActions.GET_USER_GROUPS));
  }

  updateProfile(profile: Profile) {
    this.dispatch(HttpActions.put(`profile`, profile, UserActions.UPDATE_PROFILE));
  }

}
