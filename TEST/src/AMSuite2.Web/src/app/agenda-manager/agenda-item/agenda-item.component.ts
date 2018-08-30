import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { AgendaItem } from '../agenda-items/agenda-items.model';
import { AgendaItemsActions, AgendaItemActions, agendaItemSelector, activeAgendaItemIdSelector } from '../agenda-items/agenda-items.reducer';
import { AgendasActions } from '../agendas/agendas.reducer';
import { BinActions } from '../bin/bin.reducer';
import { Attachment } from '../../document-manager/attachments/attachments.model';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-agenda-item',
  templateUrl: './agenda-item.component.html',
  styleUrls: ['./agenda-item.component.scss']
})
export class AgendaItemComponent extends SmartComponent implements OnInit {

  agendaItemId = 0;
  routeName = 'agenda-item';

  constructor(public store: Store<any>) {
    super(store);
  }

  get agendaItem$(): Observable<AgendaItem> {
    return agendaItemSelector(this.store);
  }

  get agendaItemId$(): Observable<number> {
    return activeAgendaItemIdSelector(this.store);
  }

  get agendaItemIdChanges(): Subscription {
    return this.agendaItemId$.subscribe(id => {
      this.agendaItemId = id;
    });
  }

  get agendaItemDescription$(): Observable<string> {
    return this.agendaItem$.map(ai => ai.description);
  }

  get agendaItemName$(): Observable<string> {
    return this.agendaItem$.map(ai => ai.name);
  }

  get showAttachments$(): Observable<boolean> {
    return Observable.of(false);
  }

  get showBottomPane$(): Observable<boolean> {
    return Observable.combineLatest(this.showMinutes$, this.showNotes$,
      (showMinutes, showNotes) => showMinutes || showNotes);
  }

  get showMinutes$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showNotes$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showVote$(): Observable<boolean> {
    return Observable.of(false);
  }

  get showVotes$(): Observable<boolean> {
    return Observable.of(true);
  }

  ngOnInit() {
    this.subscribe([this.agendaItemIdChanges]);
    this.dispatch(AgendasActions.toggle(false));
  }

  getAgendaItem(agendaItemId: number) {
    this.dispatch(HttpActions.get(`agendaitems/${agendaItemId}`, AgendaItemActions.GET));
  }

}
