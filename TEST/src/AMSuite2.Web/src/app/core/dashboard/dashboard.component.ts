import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { HttpActions, HttpGetPayload, HttpGet } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Dashboard } from './dashboard.model';
import { DashboardActions, dashboardSelector } from './dashboard.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { Tabs, Tab } from '../../shared/tabs/tabs.model';
import { TabsActions } from '../../shared/tabs/tabs.reducer';

@Component({
  selector: 'am-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends SmartComponent implements OnInit {

  routeName = 'dashboard';

  constructor(
    public store: Store<any>,
    public dialog: MdDialog) {
    super(store);
  }

  get dashboard$(): Observable<Dashboard> {
    return dashboardSelector(this.store);
  }

  get hasMessage$(): Observable<boolean> {
    return Observable.of(false);
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('dashboard'));
  }

  onDrop() {
  }

}
