import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException } from '@caiu/core';
import { FormModel } from '@caiu/forms';
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
import { currentUserSelector } from '../../shared/selectors';

@Component({
  selector: 'am-agenda-item-edit',
  templateUrl: './agenda-item-edit.component.html',
  styleUrls: ['./agenda-item-edit.component.scss']
})
export class AgendaItemEditComponent extends SmartComponent implements OnInit {

  agendaItemId = 0;
  routeName = 'agenda-item-edit';

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
    return this.agendaItem$.map(ai => ai.description).distinctUntilChanged();
  }

  get agendaItemName$(): Observable<string> {
    return this.agendaItem$.map(ai => ai.name).distinctUntilChanged();
  }

  get editMode$(): Observable<boolean> {
    return this.agendaItem$.map(model => false);
  }

  get user$(): Observable<CurrentUser> {
    return currentUserSelector(this.store);
  }

  get userCanEdit$(): Observable<boolean> {
    return this.user$.map(model => true);
  }

  get userHasBin$(): Observable<boolean> {
    return this.user$.map(model => true);
  }

  ngOnInit() {
    this.subscribe([this.agendaItemIdChanges]);
    this.dispatch(AgendasActions.toggle(false));
  }

  addAgendaItem(agendaItem: AgendaItem) {
    this.dispatch(HttpActions.post(`agendaitems`, agendaItem, AgendaItemsActions.POST));
  }

  getAgendaItem(agendaItemId: number) {
    this.dispatch(HttpActions.get(`agendaitems/${agendaItemId}`, AgendaItemActions.GET));
  }

  updateAgendaItem(agendaItem: AgendaItem) {
    this.dispatch(HttpActions.put(`agendaitems/${agendaItem.id}`, agendaItem, AgendaItemActions.PUT));
  }

}
