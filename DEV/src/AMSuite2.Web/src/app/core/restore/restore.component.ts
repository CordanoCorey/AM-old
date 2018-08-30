import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { RestoreDialogComponent } from './restore-dialog/restore-dialog.component';
import { Account } from '../../account/account.model';
import { currentAccountSelector, currentAccountIdSelector } from '../../account/account.reducer';
import { Agenda } from '../../agenda-manager/agendas/agendas.model';
import { AgendasActions, deletedAgendasSelector, AgendaActions } from '../../agenda-manager/agendas/agendas.reducer';
import { Meeting } from '../../agenda-manager/meeting/meeting.model';
import { MeetingsActions, MeetingActions, deletedMeetingsSelector } from '../../agenda-manager/meetings/meetings.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { TabsActions } from '../../shared/tabs/tabs.reducer';

@Component({
  selector: 'am-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent extends SmartComponent implements OnInit {

  account$: Observable<Account>;
  accountId = 0;
  accountId$: Observable<number>;
  accountName$: Observable<string>;
  agendas$: Observable<Agenda[]>;
  meetings$: Observable<Meeting[]>;
  routeName = 'restore';

  constructor(public store: Store<any>, public dialog: MatDialog) {
    super(store);
    this.account$ = currentAccountSelector(this.store);
    this.accountId$ = currentAccountIdSelector(this.store);
    this.accountName$ = this.account$.map(account => account.name);
    this.agendas$ = this.accountId$.mergeMap(id => deletedAgendasSelector(this.store, id));
    this.meetings$ = this.accountId$.mergeMap(id => deletedMeetingsSelector(this.store, id));
  }

  get accountIdChanges(): Subscription {
    return this.accountId$.subscribe(id => {
      this.accountId = id;
      this.changeAccount();
    });
  }

  ngOnInit() {
    this.dispatch(TabsActions.activate('restore'));
    this.subscribe([this.accountIdChanges]);
  }

  changeAccount() {
    if (this.accountId !== 0) {
      this.getDeletedMeetings(this.accountId);
      this.getDeletedAgendas(this.accountId);
    }
  }

  openAgendaDialog(agenda: Agenda) {
    const dialogRef = this.dialog.open(RestoreDialogComponent, {
      height: '240px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.restoreAgenda(agenda);
      }
    });
  }

  openMeetingDialog(meeting: Meeting) {
    const dialogRef = this.dialog.open(RestoreDialogComponent, {
      height: '240px',
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.restoreMeeting(meeting);
      }
    });
  }

  getDeletedAgendas(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/agendas/deleted`, AgendasActions.GET));
  }

  getDeletedMeetings(accountId: number) {
    this.dispatch(HttpActions.get(`accounts/${accountId}/meetings/deleted`, MeetingsActions.GET));
  }

  restoreAgenda(agenda: Agenda) {
    const body = build(Agenda, agenda, { markedForDelete: null });
    this.dispatch(HttpActions.put(`agendas/${agenda.id}`, body, AgendaActions.PUT));
  }

  restoreMeeting(meeting: Meeting) {
    const body = build(Meeting, meeting, { markedForDelete: null });
    this.dispatch(HttpActions.put(`meetings/${meeting.id}`, body, MeetingActions.PUT));
  }

}
