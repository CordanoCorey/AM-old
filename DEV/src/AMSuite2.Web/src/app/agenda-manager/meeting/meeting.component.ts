import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { throwNotImplementedException, Tree, inArray } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { RouterActions } from '@caiu/router';
import { SmartComponent, Store } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Meeting } from './meeting.model';
import { meetingSelector } from './meeting.reducer';
import { Agenda } from '../agendas/agendas.model';
import { AgendasActions, agendaToggleSelector, agendaIdSelector } from '../agendas/agendas.reducer';
import { AgendaItem, AgendaItems } from '../agenda-items/agenda-items.model';
import { agendaIdItemsSelector, activeAgendaItemIdSelector } from '../agenda-items/agenda-items.reducer';
import { meetingIdSelector, MeetingActions } from '../meetings/meetings.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector } from '../../shared/selectors';

@Component({
  selector: 'am-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  animations: [
    trigger('toggle', [
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class MeetingComponent extends SmartComponent implements OnInit {

  accountUrl = '';
  activatedRoute$: Observable<string>;
  activatedRouteName = '';
  activeAgendaId$: Observable<number>;
  agendaId = 0;
  agendaId$: Observable<number>;
  agendaItemId = 0;
  agendaItemId$: Observable<number>;
  agendaItems$: Observable<AgendaItem[]>;
  agendas: Agenda[] = [];
  agendas$: Observable<Agenda[]>;
  meeting$: Observable<Meeting>;
  meetingId = 0;
  meetingId$: Observable<number>;
  routeName = 'meeting';
  routerEvents$: Observable<any>;
  showAgenda$: Observable<boolean>;
  showDetails = true;
  showDetails$: Observable<boolean>;
  showEdit$: Observable<boolean>;
  showEmailGroup$: Observable<boolean>;
  showSendEmail$: Observable<boolean>;
  toggleText$: Observable<string>;
  tree$: Observable<Tree<AgendaItem>>;
  viewMode = '';

  constructor(public store: Store<any>) {
    super(store);
    this.activatedRoute$ = activatedRouteSelector(this.store);
    this.agendaId$ = agendaIdSelector(this.store);
    this.agendaItemId$ = activeAgendaItemIdSelector(this.store);
    this.meeting$ = meetingSelector(this.store);
    this.meetingId$ = meetingIdSelector(this.store);
    this.showDetails$ = agendaToggleSelector(this.store);
    this.activeAgendaId$ = this.agendas$.map(agendas => this.activeAgendaId).distinctUntilChanged();
    this.agendas$ = this.meeting$.map(meeting => meeting.agendas);
    this.agendaItems$ = this.agendaId$.mergeMap(agendaId => agendaIdItemsSelector(this.store, agendaId));
    this.routerEvents$ = Observable.combineLatest(this.activatedRoute$, this.activeAgendaId$, (route, agendaId) => ({ route, agendaId }));
    this.showAgenda$ = this.activatedRoute$.map(route => route === 'agenda' || route === 'meeting');
    this.showEdit$ = Observable.of(true);
    this.showEmailGroup$ = Observable.of(true);
    this.showSendEmail$ = Observable.of(true);
    this.toggleText$ = this.showDetails$.map(showDetails => showDetails ? 'hide details' : 'show details');
    this.tree$ = this.agendaItemId$.withLatestFrom(this.agendaItems$.map(items => AgendaItems.BuildTree(items)),
      (agendaItemId: number, tree: Tree<AgendaItem>) => {
        tree.activeId = agendaItemId;
        return tree;
      });
  }

  get activeAgendaId(): number {
    return this.hasActiveAgenda ? this.agendaId : this.defaultAgendaId;
  }

  get agendaIds(): number[] {
    return this.agendas.map(agenda => agenda.id);
  }

  get agendasChanges(): Subscription {
    return this.agendas$.subscribe(agendas => {
      this.agendas = agendas;
    });
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get agendaItemIdChanges(): Subscription {
    return this.agendaItemId$.subscribe(id => {
      this.agendaItemId = id;
    });
  }

  get defaultAgendaId(): number {
    return this.hasAgendas ? this.agendaIds[0] : 0;
  }

  get hasActiveAgenda(): boolean {
    return inArray(this.agendaIds, this.agendaId);
  }

  get hasAgenda(): boolean {
    return !(this.activeAgendaId === 0);
  }

  get hasAgendas(): boolean {
    return this.agendas.length > 0;
  }

  get meetingIdChanges(): Subscription {
    return this.meetingId$.subscribe(id => {
      this.meetingId = id;
      this.getMeeting(this.meetingId);
    });
  }

  get routerChanges(): Subscription {
    return this.routerEvents$.subscribe(e => {
      this.loadAgenda(e.route, e.agendaId);
    });
  }

  get showDetailsChanges(): Subscription {
    return this.showDetails$.subscribe(show => {
      this.showDetails = show;
    });
  }

  get showSlideshow(): boolean {
    return this.viewMode === 'slideshow';
  }

  get showViewMode(): boolean {
    return false;
  }

  ngOnInit() {
    this.subscribe([this.agendaIdChanges, this.agendaItemIdChanges, this.meetingIdChanges, this.routerChanges, this.showDetailsChanges]);
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
  }

  onDeactivate(e: any) {
  }

  loadAgenda(route: string, agendaId: number) {
    if (this.activatedRouteName === 'meeting' && this.hasAgenda) {
      this.dispatch(RouterActions.navigate(`/${this.accountUrl}/meetings/${this.meetingId}/agendas/${this.activeAgendaId}`));
    }
  }

  changeViewMode(mode: string) {
    this.viewMode = mode;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
    this.dispatch(AgendasActions.toggle(this.showDetails));
  }

  getMeeting(meetingId: number) {
    this.dispatch(HttpActions.get(`meetings/${meetingId}`, MeetingActions.GET));
  }

}
