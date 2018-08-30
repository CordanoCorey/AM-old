import { AnnouncementComponent } from '../announcement/announcement.component';
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
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

  announcementId = 0;
  dialogRef: Subscription;
  routeName = 'announcement-edit';

  constructor(
    public store: Store<any>,
    public dialog: MdDialog,
    public events: EventsService) {
    super(store);
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get announcement$(): Observable<Announcement> {
    return announcementSelector(this.store);
  }

  get announcementId$(): Observable<number> {
    return routeParamSelector(this.store, 'announcementId');
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

  get cancelLink$(): Observable<string> {
    return this.accountUrl$.map(url => `/${url}/announcements`);
  }

  get groups$(): Observable<Group[]> {
    return adminGroupsSelector(this.store);
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
