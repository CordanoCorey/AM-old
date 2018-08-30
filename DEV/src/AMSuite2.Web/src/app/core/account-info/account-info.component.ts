import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException, build } from '@caiu/core';
import { FormModel } from '@caiu/forms';
import { HttpActions } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { AccountInfo } from './account-info.model';
import { AccountMembersActions } from '../members/members.reducer';
import { Account } from '../../account/account.model';
import { currentAccountSelector, currentAccountIdSelector, activeAccountUrlSelector } from '../../account/account.reducer';
import { AccountActions } from '../../shared/actions';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { Tabs } from '../../shared/tabs/tabs.model';
import { TabsActions } from '../../shared/tabs/tabs.reducer';

@Component({
  selector: 'am-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent extends SmartComponent implements OnInit {

  account$: Observable<Account>;
  accountId = 0;
  accountId$: Observable<number>;
  accountUrl = '';
  accountUrl$: Observable<string>;
  routeName = 'account-info';

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = currentAccountSelector(this.store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
    });
  }

  get accountUrlChanges(): Subscription {
    return this.accountUrl$.subscribe(url => {
      this.accountUrl = url;
    });
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.accountUrlChanges]);
    this.dispatch(TabsActions.activate('account'));
  }

  getAccount(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}`, AccountActions.GET));
  }

  addAccount(account: Account) {
    this.dispatch(HttpActions.post(`accounts`, account, AccountActions.POST));
  }

  updateAccount(account: Account) {
    this.dispatch(HttpActions.put(`accounts/${account.id}`, account, AccountActions.PUT));
  }

}
