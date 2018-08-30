import { Component, OnInit } from '@angular/core';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { RouterActions } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { AgendaItem } from './agenda-items.model';
import { agendaIdItemsSelector, AgendaItemActions, activeAgendaItemIdSelector } from './agenda-items.reducer';
import { agendaIdSelector } from '../agendas/agendas.reducer';
import { BinActions } from '../bin/bin.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector, currentUserSelector } from '../../shared/selectors';

@Component({
  selector: 'am-agenda-items',
  templateUrl: './agenda-items.component.html',
  styleUrls: ['./agenda-items.component.scss']
})
export class AgendaItemsComponent extends SmartComponent implements OnInit {

  activeId = 0;
  routeName = 'agenda-items';

  constructor(public store: Store<any>) {
    super(store);
  }

  get mode$(): Observable<'view' | 'edit'> {
    return this.route$.map(route => route === 'agenda-item-edit' ? 'edit' : 'view');
  }

  get route$(): Observable<string> {
    return activatedRouteSelector(this.store);
  }

  get activeId$(): Observable<number> {
    return activeAgendaItemIdSelector(this.store);
  }

  get activeIdChanges(): Subscription {
    return this.activeId$.subscribe(id => {
      this.activeId = id;
    });
  }

  get agendaItems$(): Observable<AgendaItem[]> {
    return this.agendaId$.mergeMap(agendaId => agendaIdItemsSelector(this.store, agendaId));
  }

  get agendaItem$(): Observable<AgendaItem> {
    return this.agendaItems$.map(items => {
      const item = items.find(agendaItem => agendaItem.id === this.activeId);
      return item ? build(AgendaItem, item) : new AgendaItem();
    });
  }

  get agendaId$(): Observable<number> {
    return agendaIdSelector(this.store);
  }

  get binLink$(): Observable<string> {
    return Observable.of('');
  }

  get editLink$(): Observable<string> {
    return Observable.of('');
  }

  get emailLink$(): Observable<string> {
    return Observable.of('');
  }

  get editing$(): Observable<boolean> {
    return this.mode$.map(mode => mode === 'edit');
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

  get user$(): Observable<CurrentUser> {
    return currentUserSelector(this.store);
  }

  get userCanEdit$(): Observable<boolean> {
    return this.user$.map(model => true).distinctUntilChanged();
  }

  get userHasBin$(): Observable<boolean> {
    return this.user$.map(model => true).distinctUntilChanged();
  }

  ngOnInit() {
    this.subscribe([this.activeIdChanges]);
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
  }

  addBinItem(item: AgendaItem) {
    this.dispatch(HttpActions.post(`binitems`, item, BinActions.POST));
  }

  deleteAgendaItem(agendaItemId: number) {
    this.dispatch(HttpActions.delete(`agendaitems/${agendaItemId}`, agendaItemId, AgendaItemActions.DELETE));
  }

}
