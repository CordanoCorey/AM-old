import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { throwNotImplementedException } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';

import { Announcement } from '../announcements/announcements.model';
import { AnnouncementsActions, announcementsSelector } from '../announcements/announcements.reducer';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { Subscription } from 'rxjs/Subscription';
import { currentUserIdSelector } from '../../shared/selectors';
import { currentAccountIdSelector } from '../../account/account.reducer';

@Component({
  selector: 'am-announcements-widget',
  templateUrl: './announcements-widget.component.html',
  styleUrls: ['./announcements-widget.component.scss']
})
export class AnnouncementsWidgetComponent extends SmartComponent implements OnInit {

  accountId = 0;
  dialogRef: Subscription;
  userId = 0;

  constructor(
    public store: Store<any>,
    public dialog: MdDialog) {
    super(store);
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

  get announcements$(): Observable<Announcement[]> {
    return announcementsSelector(this.store).map(announcements => announcements.toArray());
  }

  get empty$(): Observable<boolean> {
    return this.announcements$.map(announcements => announcements.length === 0);
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

  open(announcement: Announcement) {
    this.openDialog(AnnouncementComponent, { data: announcement, width: '1000px' });
  }

  getAccountAnnouncements(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/announcements`, AnnouncementsActions.GET));
  }

  getUserAnnouncements(userId: number) {
    this.dispatch(HttpActions.get(`users/${userId}/announcements`, AnnouncementsActions.GET));
  }

}
