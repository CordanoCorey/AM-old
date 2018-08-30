import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
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

  dashboard$: Observable<Dashboard>;
  hasMessage$: Observable<boolean>;
  routeName = 'dashboard';

  constructor(
    public store: Store<any>,
    public dialog: MatDialog) {
    super(store);
    this.dashboard$ = dashboardSelector(this.store);
    this.hasMessage$ = Observable.of(false);
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('dashboard'));
  }

  onDrop() {
  }

}
