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
  activeId$: Observable<number>;
  agendaId$: Observable<number>;
  agendaItem$: Observable<AgendaItem>;
  agendaItems$: Observable<AgendaItem[]>;
  binLink$: Observable<string>;
  editing$: Observable<boolean>;
  editLink$: Observable<string>;
  emailLink$: Observable<string>;
  mode$: Observable<'view' | 'edit'>;
  route$: Observable<string>;
  routeName = 'agenda-items';
  showBottomPane$: Observable<boolean>;
  showMinutes$: Observable<boolean>;
  showNotes$: Observable<boolean>;
  user$: Observable<CurrentUser>;
  userCanEdit$: Observable<boolean>;
  userHasBin$: Observable<boolean>;

  constructor(public store: Store<any>) {
    super(store);
    this.activeId$ = activeAgendaItemIdSelector(this.store);
    this.agendaId$ = agendaIdSelector(this.store);
    this.route$ = activatedRouteSelector(this.store);
    this.user$ = currentUserSelector(this.store);
    this.binLink$ = Observable.of('');
    this.editLink$ = Observable.of('');
    this.emailLink$ = Observable.of('');
    this.mode$ = this.route$.map(route => route === 'agenda-item-edit' ? 'edit' : 'view');
    this.editing$ = this.mode$.map(mode => mode === 'edit');
    this.agendaItems$ = this.agendaId$.mergeMap(agendaId => agendaIdItemsSelector(this.store, agendaId));
    this.agendaItem$ = this.agendaItems$.map(items => {
      const item = items.find(agendaItem => agendaItem.id === this.activeId);
      return item ? build(AgendaItem, item) : new AgendaItem();
    });
    this.userCanEdit$ = this.user$.map(model => true).distinctUntilChanged();
    this.userHasBin$ = this.user$.map(model => true).distinctUntilChanged();
    this.showMinutes$ = Observable.of(true);
    this.showNotes$ = Observable.of(true);
    this.showBottomPane$ = Observable.combineLatest(this.showMinutes$, this.showNotes$,
      (showMinutes, showNotes) => showMinutes || showNotes);
  }

  get activeIdChanges(): Subscription {
    return this.activeId$.subscribe(id => {
      this.activeId = id;
    });
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
