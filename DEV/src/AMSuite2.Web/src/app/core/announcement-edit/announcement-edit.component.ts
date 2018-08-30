import { AnnouncementComponent } from '../announcement/announcement.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { throwNotImplementedException, toInt } from '@caiu/core';
import { EventsService } from '@caiu/events';
import { HttpActions } from '@caiu/http';
import { routeParamSelector } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Announcement } from '../announcements/announcements.model';
import { AnnouncementsActions, AnnouncementActions, announcementSelector } from '../announcements/announcements.reducer';
import { Group } from '../groups/groups.model';
import { GroupsActions, adminGroupsSelector } from '../groups/groups.reducer';
import { activeAccountUrlSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.scss']
})
export class AnnouncementEditComponent extends SmartComponent implements OnInit {

  accountUrl$: Observable<string>;
  announcement$: Observable<Announcement>;
  announcementId = 0;
  announcementId$: Observable<number>;
  cancelLink$: Observable<string>;
  groups$: Observable<Group[]>
  routeName = 'announcement-edit';

  constructor(
    public store: Store<any>,
    public dialog: MatDialog,
    public events: EventsService) {
    super(store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.announcement$ = announcementSelector(this.store);
    this.announcementId$ = routeParamSelector(this.store, 'announcementId');
    this.cancelLink$ = this.accountUrl$.map(url => `/${url}/announcements`);
    this.groups$ = adminGroupsSelector(this.store);
  }

  get announcementIdChanges(): Subscription {
    return this.announcementId$.subscribe(id => {
      this.announcementId = toInt(id);
      this.dispatch(AnnouncementsActions.activate(this.announcementId));
      if (this.announcementId) {
        this.getAnnouncement(this.announcementId);
      }
    });
  }

  get message(): string {
    return this.inErrorState ? `An error has occurred. Please try again later.`
      : this.inSuccessState ? `Announcement updated successfully!` : '';
  }

  ngOnInit() {
    this.subscribe([this.announcementIdChanges]);
    this.getAdministratorGroups();
  }

  preview(announcement: Announcement) {
    this.openDialog(AnnouncementComponent, { data: announcement, width: '1000px' });
  }

  addAnnouncement(announcement: Announcement) {
    const action = HttpActions.post(`announcements`, announcement, AnnouncementsActions.POST);
    this.addSubscription(this.events.dispatch(action).subscribe(e => {
      this.flashSuccessMessage();
    }));
  }

  getAdministratorGroups() {
    this.dispatch(HttpActions.get(`groups/admin`, GroupsActions.GET));
  }

  getAnnouncement(announcementId: number) {
    this.dispatch(HttpActions.get(`announcements/${announcementId}`, AnnouncementActions.GET));
  }

  updateAnnouncement(announcement: Announcement) {
    const action = HttpActions.put(`announcements/${announcement.id}`, announcement, AnnouncementActions.PUT);
    this.addSubscription(this.events.dispatch(action).subscribe(e => {
      this.flashSuccessMessage();
    }));
  }

}
