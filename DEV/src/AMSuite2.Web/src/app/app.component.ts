import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
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
import { HOURS, MINUTES_BY_5, MINUTES_BY_15 } from './shared/lookup';
import { Observable } from './shared/observable';
import { environment } from '../environments/environment';

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
    public dialog: MatDialog) {
  }

  get dialogOpen(): boolean {
    return this.currentUrl.indexOf('popup:') !== -1;
  }

  get environment(): string {
    return environment.name;
  }

  get localStorageActions(): string[] {
    return [
      UserActions.LOGIN_SUCCESS,
      // AccountsActions.GET,
      AccountsActions.ACTIVATE,
      AccountsActions.ACTIVATE_URL,
      AccountsActions.ACTIVATE_AND_REDIRECT,
      LookupActions.ADD_KEYS,
    ];
  }

  get localStorageMapper(): (s: any) => any {
    return state => { };
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

  get sessionStorageActions(): string[] {
    return [];
  }

  get sessionStorageMapper(): (s: any) => any {
    return state => { };
  }

  get showDialog(): boolean {
    return this.popups.length > 0;
  }

  get showMonitor(): boolean {
    return this.environment === 'LOCAL' || this.environment === 'DEV';
  }

  ngOnInit() {
    this.loadConfiguration();
    this.initStorage();
    this.getAccounts();
    this.initLookup();
    this.initRouting();
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

  initLookup() {
    this.lookup.load(this.lookupKeys, this.lookupValues);
  }

  initRouting() {
    this.router.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects;
        this.onNavigationEnd(e);
      }
    });
  }

  initStorage() {
    this.storage.init(this.localStorageMapper, this.sessionStorageMapper, this.localStorageActions, this.sessionStorageActions);
  }

  loadConfiguration() {
    this.store.dispatch(ConfigActions.initialize(environment));
  }

}
