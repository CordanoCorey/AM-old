import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdSelectChange } from '@angular/material';
import { throwNotImplementedException, str2int, build, compareStrings, QueryModel } from '@caiu/core';
import { ModelControl } from '@caiu/forms';
import { HttpActions } from '@caiu/http';
import { RouterActions } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Member, MembersQuery } from './members.model';
import { AccountMembersActions, GroupMembersActions, membersSelector } from './members.reducer';
import { accountsSelector } from '../accounts/accounts.reducer';
import { Group } from '../groups/groups.model';
import { GroupsActions, accountGroupsSelector } from '../groups/groups.reducer';
import { Account } from '../../account/account.model';
import { currentAccountSelector, activeAccountUrlSelector } from '../../account/account.reducer';
import { UsersActions, UserActions } from '../../shared/actions';
import { CurrentUser, User } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector } from '../../shared/selectors';

@Component({
  selector: 'am-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent extends SmartComponent implements OnInit {

  @ModelControl<MembersQuery>(new MembersQuery()) form: FormGroup;
  _accountUrl = '';
  _query: MembersQuery;
  accountId = 0;
  accounts: Account[] = [];
  defaultGroupId = 0;
  groupId = 0;
  routeName = 'members';
  query$: BehaviorSubject<MembersQuery>;
  showInactive = true;

  constructor(public store: Store<any>) {
    super(store);
  }

  get accounts$(): Observable<Account[]> {
    return accountsSelector(this.store)
      .map(accounts => accounts.toArray().sort((a, b) => compareStrings(a.name, b.name)));
  }

  get account$(): Observable<Account> {
    return accountsSelector(this.store).map(accounts => accounts.active || new Account());
  }

  get accountId$(): Observable<number> {
    return currentAccountSelector(this.store).map(account => account.id).distinctUntilChanged();
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get accountUrlChanges$(): Observable<string> {
    return this.form.controls['accountUrl'].valueChanges.distinctUntilChanged();
  }

  get accountUrlChanges(): Subscription {
    return this.accountUrlChanges$.subscribe(url => {
      this.changeAccountUrl(url);
    });
  }

  get editing$(): Observable<boolean> {
    return activatedRouteSelector(this.store).map(route => route === 'member-edit');
  }

  get groups$(): Observable<Group[]> {
    return this.accountId$.mergeMap(id => accountGroupsSelector(this.store, id))
      .map(groups => groups.sort((a, b) => compareStrings(a.name, b.name)));
  }

  get group$(): Observable<Group> {
    return this.groups$.map(groups => groups.find(g => g.id === this.groupId) || new Group());
  }

  get members$(): Observable<Member[]> {
    return this.accountId$.mergeMap(id => membersSelector(this.store, id))
      .map(members => members.query(this.path));
  }

  get filteredMembers$(): Observable<Member[]> {
    return this.query$.combineLatest(this.members$,
      (query, members) => {
        return members.filter(x => query.showInactive ? true : x.isActive)
          .filter(y => query.groupId ? y.inGroup(query.groupId) : true) || [];
      });
  }

  get newMemberLink$(): Observable<string> {
    return this.accountUrl$.map(url => `/${url}/members/0/edit`);
  }

  get users$(): Observable<User[]> {
    return this.members$.map(members => members.map(member => member.user));
  }

  get groupIdChanges$(): Observable<number> {
    return this.form.controls['groupId'].valueChanges;
  }

  get groupIdChanges(): Subscription {
    return this.groupIdChanges$.subscribe(id => {
      this.changeGroup(id);
    });
  }

  get showInactiveChanges$(): Observable<boolean> {
    return this.form.controls['showInactive'].valueChanges;
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      this.accountUrl = this.findAccountUrl(id);
      this.loadAccount(this.accountId);
      this.filter();
    });
  }

  get accountsChanges(): Subscription {
    return this.accounts$.subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  get queryChanges(): Subscription {
    return this.query$.subscribe(query => {
      this.search(query);
    });
  }

  get showInactiveChanges(): Subscription {
    return this.showInactiveChanges$.subscribe(show => {
      this.showInactive = show;
      this.filter();
    });
  }

  get accountUrl(): string {
    return this._accountUrl;
  }

  set accountUrl(url: string) {
    this._accountUrl = url;
    this.form.setValue(this.query);
  }

  get path(): string {
    return this.query.groupId ? this.groupPath
      : this.query.accountId ? this.accountPath
        : this.usersPath;
  }

  get usersPath(): string {
    return `users${this.queryString}`;
  }

  get accountPath(): string {
    return `accounts/${this.query.accountId}/members${this.queryString}`;
  }

  get groupPath(): string {
    return `groups/${this.query.groupId}/members${this.queryString}`;
  }

  get query(): MembersQuery {
    return build(MembersQuery, {
      accountId: this.accountId,
      accountUrl: this.accountUrl,
      groupId: this.groupId,
      showInactive: this.showInactive,
      skip: 0,
      take: 5000
    });
  }

  get skip(): number {
    return this.query.skip;
  }

  get take(): number {
    return this.query.take;
  }

  get queryString(): string {
    return QueryModel.BuildQueryString(this.query);
  }

  ngOnInit() {
    this.query$ = new BehaviorSubject(this.query);
    this.subscribe([this.accountsChanges, this.accountUrlChanges, this.accountIdChanges, this.groupIdChanges, this.showInactiveChanges]);
  }

  loadAccount(accountId?: number) {
    if (accountId) {
      this.getAccountMembers(accountId);
    } else {
      this.getUsers();
    }
    this.getAccountGroups(accountId);
  }

  changeAccountUrl(url: string) {
    this.accountUrl = url;
    const account = this.accounts.find(a => a.url === url);
    if (account && account.id) {
      this.dispatch(RouterActions.navigate(`/${account.url}/members`));
    }
  }

  changeGroup(id: any) {
    this.groupId = str2int(id.toString());
    this.getGroupMembers(this.groupId);
    this.filter();
  }

  filter() {
    this.query$.next(this.query);
  }

  findAccountUrl(accountId: number): string {
    const account = this.accounts.find(x => x.id === accountId);
    return account ? account.url : '';
  }

  search(query: MembersQuery) {
    if (query.groupId) {
      this.getGroupMembers(query.groupId);
    } else if (query.accountId) {
      this.getAccountMembers(query.accountId);
    } else {
      this.getUsers();
    }
  }

  getAccountGroups(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${this.accountId}/groups`, GroupsActions.GET_ACCOUNT_GROUPS));
  }

  getAccountMembers(accountId: number) {
    this.dispatch(HttpActions.search(`accounts/${accountId}/members${this.queryString}`, AccountMembersActions.GET));
  }

  getGroupMembers(groupId: number) {
    this.dispatch(HttpActions.search(`groups/${groupId}/members${this.queryString}`, GroupMembersActions.GET));
  }

  getUsers() {
    this.dispatch(HttpActions.get(`users${this.queryString}`, UsersActions.GET));
  }

  impersonate(user: User) {
    this.dispatch(HttpActions.post(`login`, { emailAddress: user.emailAddress }, UserActions.IMPERSONATE));
  }

  sendInviteEmail() {
    throwNotImplementedException();
  }

}
