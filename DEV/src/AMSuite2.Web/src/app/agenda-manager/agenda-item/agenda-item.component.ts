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

  agendaItem$: Observable<AgendaItem>;
  agendaItemId = 0;
  agendaItemId$: Observable<number>;
  agendaItemDescription$: Observable<string>;
  agendaItemName$: Observable<string>;
  routeName = 'agenda-item';
  showAttachments$: Observable<boolean>;
  showBottomPane$: Observable<boolean>;
  showMinutes$: Observable<boolean>;
  showNotes$: Observable<boolean>;
  showVote$: Observable<boolean>;
  showVotes$: Observable<boolean>;

  constructor(public store: Store<any>) {
    super(store);
    this.agendaItem$ = agendaItemSelector(this.store);
    this.agendaItemDescription$ = this.agendaItem$.map(ai => ai.description);
    this.agendaItemId$ = activeAgendaItemIdSelector(this.store);
    this.agendaItemName$ = this.agendaItem$.map(ai => ai.name);
    this.showAttachments$ = Observable.of(false);
    this.showMinutes$ = Observable.of(true);
    this.showNotes$ = Observable.of(true);
    this.showBottomPane$ = Observable.combineLatest(this.showMinutes$, this.showNotes$,
      (showMinutes, showNotes) => showMinutes || showNotes);
    this.showVote$ = Observable.of(false);
    this.showVotes$ = Observable.of(true);
  }

  get agendaItemIdChanges(): Subscription {
    return this.agendaItemId$.subscribe(id => {
      this.agendaItemId = id;
    });
  }

  ngOnInit() {
    this.subscribe([this.agendaItemIdChanges]);
    this.dispatch(AgendasActions.toggle(false));
  }

  getAgendaItem(agendaItemId: number) {
    this.dispatch(HttpActions.get(`agendaitems/${agendaItemId}`, AgendaItemActions.GET));
  }

}
