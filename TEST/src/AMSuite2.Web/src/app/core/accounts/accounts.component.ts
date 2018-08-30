import { Component, OnInit } from '@angular/core';
import { Collection, build, throwNotImplementedException } from '@caiu/core';
import { Grid } from '@caiu/common';
import { HttpActions, Lookup } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';

import { AccountsActions, accountsSelector } from './accounts.reducer';
import { Account } from '../../account/account.model';
import { currentAccountSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { Tabs, Tab } from '../../shared/tabs/tabs.model';
import { TabsActions } from '../../shared/tabs/tabs.reducer';

@Component({
  selector: 'am-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent extends SmartComponent implements OnInit {

  routeName = 'accounts';

  constructor(public store: Store<any>) {
    super(store);
  }

  get account$(): Observable<Account> {
    return currentAccountSelector(this.store);
  }

  get accounts$(): Observable<Collection<Account>> {
    return accountsSelector(this.store);
  }

  get statuses$(): Observable<Lookup> {
    return this.store.select('lookup').map(lookup => lookup['AccountStatuses']);
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('account'));
  }

  getAccounts() {
    this.dispatch(HttpActions.get('accounts', AccountsActions.GET));
  }

}
