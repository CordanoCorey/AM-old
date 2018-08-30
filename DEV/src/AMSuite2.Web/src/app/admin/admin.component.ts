import { Component, OnInit } from '@angular/core';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { RouterActions } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';

import { Admin } from './admin.model';
import { userAccountsSelector, AccountsActions } from '../core/accounts/accounts.reducer';
import { AccountActions, AppActions } from '../shared/actions';
import { CurrentUser } from '../shared/models';
import { Observable } from '../shared/observable';
import { currentUserSelector } from '../shared/selectors';
import { Tabs } from '../shared/tabs/tabs.model';
import { TabsActions } from '../shared/tabs/tabs.reducer';
import { TabsHelper } from '../shared/tabs/tabs-helper';

@Component({
  selector: 'am-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends SmartComponent implements OnInit {

  routeName = 'admin';

  constructor(store: Store<any>) {
    super(store);
  }

  get tabs(): Tabs {
    return TabsHelper.BuildAdminTabs();
  }

  ngOnInit() {
    this.dispatch(AccountsActions.activateUrl('admin'));
    this.dispatch(TabsActions.updateTabs(this.tabs));
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
    this.dispatch(RouterActions.activate(this.routeName));
  }

}
