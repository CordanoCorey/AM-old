import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { throwNotImplementedException } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';

import { NotificationComponent } from '../notifications/notification.component';
import { Notification } from '../notifications/notifications.model';
import { NotificationsActions, notificationsSelector, NotificationActions } from '../notifications/notifications.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-notifications-widget',
  templateUrl: './notifications-widget.component.html',
  styleUrls: ['./notifications-widget.component.scss']
})
export class NotificationsWidgetComponent extends SmartComponent implements OnInit {

  constructor(
    public store: Store<any>,
    public dialog: MdDialog) {
    super(store);
  }

  get empty$(): Observable<boolean> {
    return Observable.of(true);
  }

  get loading$(): Observable<boolean> {
    return Observable.of(false);
  }

  get notifications$(): Observable<Notification[]> {
    return notificationsSelector(this.store).map(x => x.toArray());
  }

  ngOnInit() {
  }

  openDialog() {
    const config = { width: '1000px' };
    const dialogRef = this.dialog.open(NotificationComponent, config);
    this.dialogRef = dialogRef.afterClosed().subscribe(result => {
      this.closeDialog(result);
    });
  }

  closeDialog(e: any) {
    this.dialogRef.unsubscribe();
  }

  deleteNotification(id: number) {
    this.dispatch(HttpActions.delete(`notifications/${id}`, id, NotificationActions.DELETE));
  }

  getNotifications() {
    this.dispatch(HttpActions.get(`notifications`, NotificationsActions.GET));
  }

  updateNotification(notification: Notification) {
    this.dispatch(HttpActions.put(`notifications/${notification.id}`, notification, NotificationActions.PUT));
  }

}
