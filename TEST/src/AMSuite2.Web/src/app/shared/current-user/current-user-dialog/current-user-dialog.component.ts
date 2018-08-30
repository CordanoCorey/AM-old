import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@caiu/store';

import { UserActions, AccountActions } from '../../actions';
import { CurrentUser } from '../../models';
import { AccountMember, Account } from '../../../account/account.model';
import { AccountsActions } from '../../../core/accounts/accounts.reducer';
import { build } from '@caiu/core';

@Component({
  selector: 'am-current-user-dialog',
  templateUrl: './current-user-dialog.component.html',
  styleUrls: ['./current-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentUserDialogComponent {

  @Input() user: CurrentUser = new CurrentUser();
  @Input() account: Account = new Account();
  @Input() userAccounts: AccountMember[] = [];
  @Input() show = false;
  @Output() revertToAdmin = new EventEmitter();
  mouseIn = false;

  constructor(public store: Store<any>) { }

  get accountInfoDisplay(): string {
    return this.show || this.mouseIn ? 'block' : 'none';
  }

  get accounts(): Account[] {
    return this.userAccounts.map(x => build(Account, x.account));
  }

  get accountUrl(): string {
    return this.account.url;
  }

  get activeUser(): CurrentUser {
    return this.isImpersonating ? this.user.impersonating : this.user;
  }

  get email(): string {
    return this.activeUser.emailAddress;
  }

  get fullName(): string {
    return this.activeUser.fullName;
  }

  get isImpersonating(): boolean {
    return this.user.impersonating ? true : false;
  }

  get profileLink(): string {
    return `/${this.accountUrl}/profile`;
  }

  onMouseEnter() {
    this.mouseIn = true;
  }

  onMouseLeave() {
    this.mouseIn = false;
  }

  onLogout() {
    this.logout();
  }

  onRevertToAdmin() {
    this.revertToAdmin.emit();
  }

  changeAccount(account: Account) {
    this.store.dispatch(AccountsActions.activateRedirect(account));
  }

  logout() {
    this.store.dispatch(UserActions.logout());
  }

}
