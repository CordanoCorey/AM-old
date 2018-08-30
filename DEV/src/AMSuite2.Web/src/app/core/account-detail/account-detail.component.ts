import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { throwNotImplementedException } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Account } from '../../account/account.model';
import { currentAccountSelector } from '../../account/account.reducer';
import { fileToBinary } from '../../document-manager/files/files.model';
import { AccountActions } from '../../shared/actions';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { Tabs, Tab } from '../../shared/tabs/tabs.model';
import { TabsActions } from '../../shared/tabs/tabs.reducer';

@Component({
  selector: 'am-account',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent extends SmartComponent implements OnInit {

  @ViewChild('logo') logo;
  account$: Observable<Account>;
  accountId = 0;
  accountUrl = '';
  description = '';
  routeName = 'account-detail';
  src = '';

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = currentAccountSelector(this.store);
  }

  get accountChanges(): Subscription {
    return this.account$.subscribe(account => {
      this.accountId = account.id;
      this.accountUrl = account.url;
      this.description = account.description;
      this.src = fileToBinary(account.logo);
    });
  }

  get tabsOrder(): string[] {
    return ['dashboard', 'meetings', 'search'];
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('dashboard', this.tabsOrder));
    this.subscribe([this.accountChanges]);
  }

  getAccount(accountId: number): void {
    this.dispatch(HttpActions.get(`accounts/${accountId}`, AccountActions.GET));
  }

}
