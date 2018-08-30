import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { throwNotImplementedException, build, Tree, TreeItem } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { RouterActions } from '@caiu/router';
import { SmartComponent, Store } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Agenda } from '../agendas/agendas.model';
import { AgendasActions, AgendaActions, agendaSelector } from '../agendas/agendas.reducer';
import { AgendaItem, AgendaItems } from '../agenda-items/agenda-items.model';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector } from '../../shared/selectors';

@Component({
  selector: 'am-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  animations: [
    trigger('toggle', [
      state('*', style({ height: '0px' })),
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ]),
    trigger('rotate', [
      state('show', style({ transform: 'rotate(180deg)' })),
      state('hide', style({})),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class AgendaComponent extends SmartComponent implements OnInit {

  agenda$: Observable<Agenda>;
  agendaActive$: Observable<boolean>;
  agendaId = 0;
  agendaId$: Observable<number>;
  agendaItems$: Observable<AgendaItem[]>;
  agendaName$: Observable<string>;
  groupName$: Observable<string>;
  opened: boolean[] = [];
  route = '';
  route$: Observable<string>;
  routeName = 'agenda';
  showAddTemplate$: Observable<boolean>;
  showArrow$: Observable<boolean>;
  showEdit$: Observable<boolean>;
  subtreeItems$: Observable<TreeItem<AgendaItem>[][]>;
  tree$: Observable<Tree<AgendaItem>>;
  treeItems$: Observable<TreeItem<AgendaItem>[]>;
  visibility$: Observable<string>;

  constructor(public store: Store<any>) {
    super(store);
    this.agenda$ = agendaSelector(this.store);
    this.route$ = activatedRouteSelector(this.store);
    this.agendaActive$ = this.route$.map(route => route === 'agenda');
    this.agendaId$ = this.agenda$.map(agenda => agenda.id);
    this.agendaItems$ = this.agenda$.map(agenda => agenda.agendaItems);
    this.agendaName$ = this.agenda$.map(agenda => agenda.name);
    this.groupName$ = this.agenda$.map(agenda => agenda.groupName);
    this.showAddTemplate$ = Observable.of(true);
    this.showArrow$ = Observable.of(true);
    this.showEdit$ = Observable.of(true);
    this.subtreeItems$ = this.tree$.map(tree => tree.subtreeItems);
    this.tree$ = this.agendaItems$.map(items => AgendaItems.BuildTree(items));
    this.treeItems$ = this.tree$.map(tree => tree.orderedItems);
    this.visibility$ = this.agenda$.map(agenda => agenda.visibility);
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get routeChanges(): Subscription {
    return this.route$.subscribe(route => {
      this.route = route;
    });
  }

  ngOnInit() {
    this.subscribe([this.agendaIdChanges, this.routeChanges]);
    this.showDetails();
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
    this.dispatch(RouterActions.activate(this.routeName));
    this.showDetails();
  }

  isOpened(index: number) {
    return this.opened[index] ? true : false;
  }

  showDetails() {
    if (this.route === 'agenda') {
      this.dispatch(AgendasActions.toggle(true));
    }
  }

  toggle(index: number) {
    if (this.opened[index]) {
      this.opened[index] = false;
    } else {
      this.opened[index] = true;
    }
  }

  getAgenda() {
    this.dispatch(HttpActions.get(`agendas/${this.agendaId}`, AgendaActions.GET));
  }

}
