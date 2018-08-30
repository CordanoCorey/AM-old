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

  accounts$: Observable<AccountMember[]>;
  routeName = 'accounts-portal';
  userId = 0;
  userId$: Observable<number>;

  constructor(public store: Store<any>) {
    super(store);
    this.accounts$ = userAccountsSelector(this.store);
    this.userId$ = currentUserIdSelector(this.store);
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
