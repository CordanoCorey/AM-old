import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { RouterActions } from '@caiu/router';
import { provideCustomStoreAsync, SmartComponent, Store } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Announcement } from './announcements.model';
import { AnnouncementsActions, announcementsSelector } from './announcements.reducer';
import { GroupsActions } from '../groups/groups.reducer';
import { Account } from '../../account/account.model';
import { currentAccountSelector, currentAccountIdSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector, currentUserIdSelector } from '../../shared/selectors';

@Component({
  selector: 'am-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent extends SmartComponent implements OnInit {

  accountId = 0;
  routeName = 'announcements';
  userId = 0;

  constructor(public store: Store<any>) {
    super(store);
  }

  get account$(): Observable<Account> {
    return currentAccountSelector(this.store);
  }

  get accountId$(): Observable<number> {
    return currentAccountIdSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      if (this.accountId) {
        this.getAccountAnnouncements(this.accountId);
      }
    });
  }

  get accountUrl$(): Observable<string> {
    return this.account$.map(account => account.url);
  }

  get announcements$(): Observable<Announcement[]> {
    return announcementsSelector(this.store).map(announcements => announcements.toArray());
  }

  get announcementsLink$(): Observable<string> {
    return this.accountUrl$.map(url => `/${url}/announcements`);
  }

  get count$(): Observable<number> {
    return this.announcements$.map(announcements => announcements.length);
  }

  get editing$(): Observable<boolean> {
    return this.route$.map(route => route === 'announcement-edit');
  }

  get newAnnouncementLink$(): Observable<string> {
    return this.accountUrl$.map(url => `/${url}/announcements/0/edit`);
  }

  get route$(): Observable<string> {
    return activatedRouteSelector(this.store);
  }

  get showAudit(): boolean {
    return false;
  }

  get userId$(): Observable<number> {
    return currentUserIdSelector(this.store);
  }

  get userIdChanges(): Subscription {
    return this.userId$.subscribe(id => {
      this.userId = id;
      if (this.userId) {
        this.getUserAnnouncements(this.userId);
      }
    });
  }

  ngOnInit() {
    this.subscribe([this.accountIdChanges, this.userIdChanges]);
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
    this.dispatch(RouterActions.activate(this.routeName));
  }

  getAccountAnnouncements(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/announcements`, AnnouncementsActions.GET));
  }

  getUserAnnouncements(userId: number) {
    this.dispatch(HttpActions.get(`users/${userId}/announcements`, AnnouncementsActions.GET));
  }

}
