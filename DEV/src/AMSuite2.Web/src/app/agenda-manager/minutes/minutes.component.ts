import { Component, OnInit } from '@angular/core';
import { DialogAction } from '@caiu/common';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';

import { AgendaItemMinutes } from './minutes.model';
import { MinutesActions } from './minutes.reducer';
import { Agenda } from '../agendas/agendas.model';
import { AgendaItem } from '../agenda-items/agenda-items.model';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-minutes',
  templateUrl: './minutes.component.html',
  styleUrls: ['./minutes.component.scss']
})
export class MinutesComponent extends SmartComponent implements OnInit {

  agenda$: Observable<Agenda>;
  agendaItems: AgendaItem[] = [];
  agendaName$: Observable<string>;
  agendaItems$: Observable<AgendaItem[]>;

  constructor(public store: Store<any>) {
    super(store);
    this.agenda$ = Observable.of(build(Agenda, {
      name: 'Test Agenda',
      agendaItems: [
        build(AgendaItem, { id: 1, name: 'Item 1', parentId: 0, order: 1 }),
        build(AgendaItem, { id: 2, name: 'Item 1.1', parentId: 1, order: 1 }),
        build(AgendaItem, { id: 3, name: 'Item 1.2', parentId: 1, order: 3 }),
        build(AgendaItem, { id: 4, name: 'Item 1.3', parentId: 1, order: 2 }),
        build(AgendaItem, { id: 5, name: 'Item 2', parentId: 0, order: 2 }),
        build(AgendaItem, { id: 6, name: 'Item 2.1', parentId: 5, order: 2 }),
        build(AgendaItem, { id: 7, name: 'Item 2.2', parentId: 5, order: 1 })
      ]
    }));
    this.agendaItems$ = this.agenda$.map(agenda => agenda.agendaItems);
    this.agendaName$ = this.agenda$.map(agenda => agenda.name);
  }

  get actions(): DialogAction[] {
    return [
      build(DialogAction, { value: null, label: 'Close' }),
      build(DialogAction, { value: 'save', label: 'Save' }),
    ];
  }

  get title(): string {
    return 'Minutes';
  }

  ngOnInit() {
    this.agendaItems$.subscribe(x => { this.agendaItems = x; });
  }

  // TODO: account for 1.a, 2.b, etc.
  getTitle(item: AgendaItem): string {
    const parent = item.parentId === 0 ? null : this.agendaItems.find(x => x.id === item.parentId);
    const order = parent ? `${parent.order}.${item.order}` : `${item.order}`;
    return `${order}. ${item.name}`;
  }

  addMinutes(minutes: AgendaItemMinutes) {
    this.dispatch(HttpActions.post(`agendaItems/${minutes.agendaItemId}/minutes`, minutes, MinutesActions.POST));
  }

  deleteMinutes(id: number) {
    this.dispatch(HttpActions.delete(`agendaItems/${id}/minutes`, id, MinutesActions.DELETE));
  }

  updateMinutes(minutes: AgendaItemMinutes) {
    this.dispatch(HttpActions.put(`minutes/${minutes.id}`, minutes, MinutesActions.PUT));
  }

}
