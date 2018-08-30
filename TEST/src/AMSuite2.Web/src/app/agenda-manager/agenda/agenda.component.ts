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

  agendaId = 0;
  opened: boolean[] = [];
  route = '';
  routeName = 'agenda';

  constructor(public store: Store<any>) {
    super(store);
  }

  get agendaActive$(): Observable<boolean> {
    return this.route$.map(route => route === 'agenda');
  }

  get agenda$(): Observable<Agenda> {
    return agendaSelector(this.store);
  }

  get agendaId$(): Observable<number> {
    return this.agenda$.map(agenda => agenda.id);
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get agendaItems$(): Observable<AgendaItem[]> {
    return this.agenda$.map(agenda => agenda.agendaItems);
  }

  get agendaName$(): Observable<string> {
    return this.agenda$.map(agenda => agenda.name);
  }

  get groupName$(): Observable<string> {
    return this.agenda$.map(agenda => agenda.groupName);
  }

  get route$(): Observable<string> {
    return activatedRouteSelector(this.store);
  }

  get routeChanges(): Subscription {
    return this.route$.subscribe(route => {
      this.route = route;
    });
  }

  get showAddTemplate$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showArrow$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showEdit$(): Observable<boolean> {
    return Observable.of(true);
  }

  get subtreeItems$(): Observable<TreeItem<AgendaItem>[][]> {
    return this.tree$.map(tree => tree.subtreeItems);
  }

  get tree$(): Observable<Tree<AgendaItem>> {
    return this.agendaItems$.map(items => AgendaItems.BuildTree(items));
  }

  get treeItems$(): Observable<TreeItem<AgendaItem>[]> {
    return this.tree$.map(tree => tree.orderedItems);
  }

  get visibility$(): Observable<string> {
    return this.agenda$.map(agenda => agenda.visibility);
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
