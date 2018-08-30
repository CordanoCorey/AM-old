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
import { currentAccountSelector, currentAccountIdSelector, activeAccountUrlSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector, currentUserIdSelector } from '../../shared/selectors';

@Component({
  selector: 'am-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent extends SmartComponent implements OnInit {

  account$: Observable<Account>;
  accountId = 0;
  accountId$: Observable<number>;
  accountUrl$: Observable<string>;
  announcements$: Observable<Announcement[]>;
  announcementsLink$: Observable<string>;
  count$: Observable<number>;
  editing$: Observable<boolean>;
  newAnnouncementLink$: Observable<string>;
  route$: Observable<string>;
  routeName = 'announcements';
  userId = 0;
  userId$: Observable<number>;

  constructor(public store: Store<any>) {
    super(store);
    this.account$ = currentAccountSelector(this.store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.announcements$ = announcementsSelector(this.store).map(announcements => announcements.toArray());
    this.route$ = activatedRouteSelector(this.store);
    this.announcementsLink$ = this.accountUrl$.map(url => `/${url}/announcements`);
    this.count$ = this.announcements$.map(announcements => announcements.length);
    this.editing$ = this.route$.map(route => route === 'announcement-edit');
    this.newAnnouncementLink$ = this.accountUrl$.map(url => `/${url}/announcements/0/edit`);
    this.userId$ = currentUserIdSelector(this.store);
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      if (this.accountId) {
        this.getAccountAnnouncements(this.accountId);
      }
    });
  }

  get showAudit(): boolean {
    return false;
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
