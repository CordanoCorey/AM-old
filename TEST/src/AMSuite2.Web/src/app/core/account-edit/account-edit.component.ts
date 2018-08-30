import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { throwNotImplementedException, build } from '@caiu/core';
import { ModelControl, FormModel } from '@caiu/forms';
import { HttpActions, HttpGetPayload } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { EditAccountPayload, AccountEdit, AccountAdmin } from './account-edit.model';
import { AccountAdminFormComponent } from './account-admin-form/account-admin-form.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { Account, AccountMember } from '../../account/account.model';
import { currentAccountSelector, currentAccountIdSelector, activeAccountUrlSelector } from '../../account/account.reducer';
import { AccountMembersActions } from '../members/members.reducer';
import { AccountActions } from '../../shared/actions';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';
import { Tabs } from '../../shared/tabs/tabs.model';
import { TabsActions } from '../../shared/tabs/tabs.reducer';

@Component({
  selector: 'am-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']

})
export class AccountEditComponent extends SmartComponent implements OnInit, AfterViewInit {

  @ViewChild(AccountAdminFormComponent) accountAdminForm: AccountAdminFormComponent;
  @ViewChild(AccountFormComponent) accountForm: AccountFormComponent;
  accountId = 0;
  routeName = 'account-edit';

  constructor(public store: Store<any>) {
    super(store);
  }

  get account$(): Observable<Account> {
    return this.accountId === 6 ? Observable.of(new Account()) : currentAccountSelector(this.store);
  }

  get accountId$(): Observable<number> {
    return currentAccountIdSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
    });
  }

  get accountUrl$(): Observable<string> {
    return this.accountId === 6 ? Observable.of('admin') : activeAccountUrlSelector(this.store);
  }

  get onCancelDest$(): Observable<string> {
    return this.user$.map(user => user.accountLevel === 1 ? 'accounts' : 'dashboard');
  }

  get user$(): Observable<CurrentUser> {
    return currentUserSelector(this.store);
  }

  get onCancelUrl$(): Observable<string> {
    return Observable.combineLatest(this.accountUrl$, this.onCancelDest$,
      (url, dest) => `/${url}/${dest}`);
  }

  get btnText(): string {
    return this.editMode ? 'Update Account' : 'Add Account';
  }

  get currentAdminId(): number {
    return this.accountAdminForm.modelValue.ownerId;
  }

  get currentValue(): Account {
    return build(Account, this.accountForm.modelValue, { ownerId: this.currentAdminId });
  }

  get editMode(): boolean {
    return this.formMode === 'edit' ? true : false;
  }

  get formMode(): string {
    return this.accountId === 6 ? 'add' : 'edit';
  }

  get heading(): string {
    return this.editMode ? 'Edit Account' : 'Add A New Account';
  }

  get isAdmin(): boolean {
    return this.accountId === 6;
  }

  get isValid(): boolean {
    return this.accountForm.isValid && this.accountAdminForm.isValid;
  }

  get showAdministrators(): boolean {
    return false;
  }

  get showMessage(): boolean {
    return false;
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges]);
    this.dispatch(TabsActions.activate('accounts'));
  }

  ngAfterViewInit() {
  }

  onSave(account: Account) {
    if (account.id === 0) {
      this.addAccount(account);
    } else {
      this.updateAccount(account);
    }
  }

  submit(e: any) {
    this.markAsSubmitted();
    if (this.isValid) {
      this.accountId ? this.updateAccount(this.currentValue) : this.addAccount(this.currentValue);
    }
  }

  markAsSubmitted() {
    this.accountForm.markAsSubmitted();
    this.accountAdminForm.markAsSubmitted();
  }

  getAccount(accountId: number): void {
    this.dispatch(HttpActions.get(`accounts/${accountId}`, AccountActions.GET));
  }

  addAccount(account: Account): void {
    this.dispatch(HttpActions.post(`accounts`, account, AccountActions.POST));
  }

  updateAccount(account: Account): void {
    this.dispatch(HttpActions.put(`accounts/${account.id}`, account, AccountActions.PUT));
  }

}
