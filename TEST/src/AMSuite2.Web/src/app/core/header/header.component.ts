import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Dictionary, build } from '@caiu/core';
import { Store, SmartComponent } from '@caiu/store';

import { Header } from './header.model';
import { userAccountsSelector } from '../accounts/accounts.reducer';
import { AccountMember, Account } from '../../account/account.model';
import { currentAccountSelector } from '../../account/account.reducer';
import { fileToBinary } from '../../document-manager/files/files.model';
import { UserActions } from '../../shared/actions';
import { CurrentUserModel } from '../../shared/current-user/current-user.model';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';
import { Tabs, Tab } from '../../shared/tabs/tabs.model';
import { tabsSelector } from '../../shared/tabs/tabs.reducer';
import { revertToAdmin } from '../../shared/utils';

@Component({
  selector: 'am-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends SmartComponent {

  constructor(public store: Store<any>) {
    super(store);
  }

  get account$(): Observable<Account> {
    return currentAccountSelector(this.store);
  }

  get hasAccount$(): Observable<boolean> {
    return this.account$.map(account => account.id ? true : false);
  }

  get logoSrc$(): Observable<string> {
    return this.account$.map(account => account.logo ? fileToBinary(account.logo) : '');
  }

  get tabs$(): Observable<Tabs> {
    return tabsSelector(this.store);
  }

  get user$(): Observable<CurrentUser> {
    return currentUserSelector(this.store);
  }

  get userAccounts$(): Observable<AccountMember[]> {
    return userAccountsSelector(this.store);
  }

  revertToAdmin() {
    this.dispatch({ type: UserActions.REVERT_TO_ADMIN });
  }

}
