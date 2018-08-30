import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NavigationEnd, ActivatedRoute, Event, } from '@angular/router';
import { DialogModel } from '@caiu/common';
import { build } from '@caiu/core';
import { HttpService, HttpActions, LookupActions, LookupService, Lookup, LookupValue } from '@caiu/http';
import { RouterService, RouterActions, } from '@caiu/router';
import { StorageService } from '@caiu/storage';
import { Store } from '@caiu/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { AppModel } from './app.model';
import { AccountsActions } from './core/accounts/accounts.reducer';
import { ConfigActions, AppActions, UserActions } from './shared/actions';
import { DialogRouteComponent } from './shared/dialog-route/dialog-route.component';
import { Observable } from './shared/observable';
import { environment } from '../environments/environment';

const HOURS = [
  build(LookupValue, { name: '0', value: 0 }),
  build(LookupValue, { name: '1', value: 1 }),
  build(LookupValue, { name: '2', value: 2 }),
  build(LookupValue, { name: '3', value: 3 }),
  build(LookupValue, { name: '4', value: 4 }),
  build(LookupValue, { name: '5', value: 5 }),
  build(LookupValue, { name: '6', value: 6 }),
  build(LookupValue, { name: '7', value: 7 }),
  build(LookupValue, { name: '8', value: 8 }),
  build(LookupValue, { name: '9', value: 9 }),
  build(LookupValue, { name: '10', value: 10 }),
  build(LookupValue, { name: '12', value: 11 }),
  build(LookupValue, { name: '12', value: 12 })
];
const MINUTES_BY_5 = [
  build(LookupValue, { name: '00', value: 0 }),
  build(LookupValue, { name: '05', value: 5 }),
  build(LookupValue, { name: '10', value: 10 }),
  build(LookupValue, { name: '15', value: 15 }),
  build(LookupValue, { name: '20', value: 20 }),
  build(LookupValue, { name: '25', value: 25 }),
  build(LookupValue, { name: '30', value: 30 }),
  build(LookupValue, { name: '35', value: 35 }),
  build(LookupValue, { name: '40', value: 40 }),
  build(LookupValue, { name: '45', value: 45 }),
  build(LookupValue, { name: '50', value: 50 }),
  build(LookupValue, { name: '55', value: 55 })
];
const MINUTES_BY_15 = [
  build(LookupValue, { name: '00', value: 0 }),
  build(LookupValue, { name: '15', value: 15 }),
  build(LookupValue, { name: '30', value: 30 }),
  build(LookupValue, { name: '45', value: 45 })
];

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  activatedRoutes: ActivatedRoute[] = [];
  currentUrl = '/';
  dialogRef: Subscription;
  routeData: Subscription;
  routeName = 'app';

  constructor(
    public lookup: LookupService,
    public router: RouterService,
    public store: Store<any>,
    public http: HttpService,
    public storage: StorageService,
    public dialog: MdDialog) {
  }

  get dialogOpen(): boolean {
    return this.currentUrl.indexOf('popup:') !== -1;
  }

  get environment(): string {
    return environment.name;
  }

  get lookupKeys(): string[] {
    return [
      'AccountStatuses',
      'DateRanges',
      'GroupRoles',
      'NotificationStatuses',
      'NotificationTypes',
      'Outlines',
      'UserRoles',
      'VoteAnswers',
    ];
  }

  get lookupValues(): Lookup[] {
    return [
      build(Lookup, { key: 'Hours', values: HOURS }),
      build(Lookup, { key: 'MinutesBy5', values: MINUTES_BY_5 }),
      build(Lookup, { key: 'MinutesBy15', values: MINUTES_BY_15 }),
    ];
  }

  get popup(): ActivatedRoute {
    return this.popups.length > 0 ? this.popups[0] : null;
  }

  get popups(): ActivatedRoute[] {
    return this.router.activatedRoute.children.filter(x => x.outlet === 'popup');
  }

  get showDialog(): boolean {
    return this.popups.length > 0;
  }

  get showMonitor(): boolean {
    return this.environment === 'LOCAL' || this.environment === 'DEV';
  }

  ngOnInit() {
    this.storage.localStorageActions = [
      UserActions.LOGIN_SUCCESS,
      // AccountsActions.GET,
      AccountsActions.ACTIVATE,
      AccountsActions.ACTIVATE_URL,
      AccountsActions.ACTIVATE_AND_REDIRECT,
      LookupActions.ADD_KEYS,
    ];
    this.initStore();
    this.loadConfiguration();
    this.getAccounts();
    this.lookup.load(this.lookupKeys, this.lookupValues);
    this.router.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects;
        this.onNavigationEnd(e);
      }
    });
  }

  onNavigationEnd(e: NavigationEnd): void {
    if (this.routeData && this.routeData.unsubscribe) {
      this.routeData.unsubscribe();
    }
    if (this.popup && this.popup.data) {
      this.routeData = this.popup.data.subscribe(x => {
        const dialog = <DialogModel>x['dialog'] || new DialogModel();
        if (this.showDialog) {
          dialog.config.disableClose = true;
          this.openDialog(dialog.config);
        }
      });
    } else {
      this.routeData = null;
    }
  }

  onActivate(component: any) {
    this.store.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
    this.store.dispatch(RouterActions.activate(this.routeName));
  }

  openDialog(config: any) {
    const dialogRef = this.dialog.open(DialogRouteComponent, config);
    this.dialogRef = dialogRef.afterClosed().subscribe(result => {
      this.closeDialog(result);
    });
  }

  closeDialog(e: any) {
    this.dialogRef.unsubscribe();
    this.router.navigate([{ outlets: { popup: null } }]);
  }

  getAccounts() {
    this.store.dispatch(HttpActions.get('accounts', AccountsActions.GET));
  }

  loadConfiguration() {
    this.store.dispatch(ConfigActions.initialize(environment));
  }

  initStore() {
    const s = localStorage.getItem('AMSUITE_STORE');
    const state = s ? JSON.parse(s) : {};
    this.store.dispatch(AppActions.initStore(state));
  }

}
