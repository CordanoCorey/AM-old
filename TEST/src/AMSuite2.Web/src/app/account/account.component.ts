import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { RouterActions, RouterService } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Account } from './account.model';
import { currentAccountIdSelector } from './account.reducer';
import { Accounts } from '../core/accounts/accounts.model';
import { AccountsActions, accountsSelector } from '../core/accounts/accounts.reducer';
import { File } from '../document-manager/files/files.model';
import { AccountActions } from '../shared/actions';
import { CurrentUser } from '../shared/models';
import { Observable } from '../shared/observable';
import { Tabs, Tab } from '../shared/tabs/tabs.model';
import { TabsActions } from '../shared/tabs/tabs.reducer';
import { TabsHelper } from '../shared/tabs/tabs-helper';

@Component({
  selector: 'am-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends SmartComponent implements OnInit {

  accounts: Accounts = new Accounts();
  accountId = 0;
  accountUrl = '';
  routeName = 'account';

  constructor(store: Store<any>, public route: ActivatedRoute) {
    super(store);
  }

  get accounts$(): Observable<Accounts> {
    return accountsSelector(this.store);
  }

  get accountsChanges(): Subscription {
    return this.accounts$.subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  get accountUrl$(): Observable<string> {
    return this.route.params.map(x => x['account'] || null).distinctUntilChanged();
  }

  get accountUrlChanges(): Subscription {
    return this.accountUrl$.subscribe(url => {
      this.accountUrl = url;
      this.accountId = this.accounts.findAccountId(url);
      this.dispatch(AccountsActions.activateId(this.accountId));
      this.dispatch(TabsActions.updateTabs(this.tabs));
    });
  }

  get tabs(): Tabs {
    return TabsHelper.BuildAccountTabs(this.accountUrl, this.tabsOrder);
  }

  get tabsOrder(): string[] {
    return ['dashboard', 'meetings', 'members', 'search', 'groups', 'account'];
  }

  ngOnInit() {
    this.subscribe([this.accountsChanges, this.accountUrlChanges]);
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
  }

}
