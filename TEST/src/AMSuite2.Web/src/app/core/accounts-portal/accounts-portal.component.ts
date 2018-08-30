import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { throwNotImplementedException } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { AccountsActions, userAccountsSelector } from '../accounts/accounts.reducer';
import { AccountMember, Account } from '../../account/account.model';
import { UserActions } from '../../shared/actions';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { currentUserIdSelector } from '../../shared/selectors';

@Component({
  selector: 'am-accounts-portal',
  templateUrl: './accounts-portal.component.html',
  styleUrls: ['./accounts-portal.component.scss']
})
export class AccountsPortalComponent extends SmartComponent implements OnInit {

  routeName = 'accounts-portal';
  userId = 0;

  constructor(public store: Store<any>) {
    super(store);
  }

  get accounts$(): Observable<AccountMember[]> {
    return userAccountsSelector(this.store);
  }

  get userId$(): Observable<number> {
    return currentUserIdSelector(this.store);
  }

  get userIdChanges(): Subscription {
    return this.userId$.subscribe(id => {
      this.userId = id;
    });
  }

  ngOnInit() {
    this.subscribe([this.userIdChanges]);
  }

  onAccountClick(account: Account) {
    this.goToAccount(account);
  }

  logout() {
    this.dispatch(UserActions.logout());
  }

  goToAccount(account: Account) {
    this.dispatch(AccountsActions.activateRedirect(account));
  }

  getUserAccounts(userId: number) {
    this.dispatch(HttpActions.get(`users/${userId}/accounts`, AccountsActions.GET));
  }
}
