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
  activatedRouteName = '';
  agendaId = 0;
  agendaItemId = 0;
  agendas: Agenda[] = [];
  meetingId = 0;
  routeName = 'meeting';
  showDetails = true;
  viewMode = '';

  constructor(public store: Store<any>) {
    super(store);
  }

  get activatedRoute$(): Observable<string> {
    return activatedRouteSelector(this.store);
  }

  get activeAgendaId$(): Observable<number> {
    return this.agendas$.map(agendas => this.activeAgendaId).distinctUntilChanged();
  }

  get activeAgendaId(): number {
    return this.hasActiveAgenda ? this.agendaId : this.defaultAgendaId;
  }

  get agendaIds(): number[] {
    return this.agendas.map(agenda => agenda.id);
  }

  get agendas$(): Observable<Agenda[]> {
    return this.meeting$.map(meeting => meeting.agendas);
  }

  get agendasChanges(): Subscription {
    return this.agendas$.subscribe(agendas => {
      this.agendas = agendas;
    });
  }

  get agendaId$(): Observable<number> {
    return agendaIdSelector(this.store);
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get agendaItemId$(): Observable<number> {
    return activeAgendaItemIdSelector(this.store);
  }

  get agendaItemIdChanges(): Subscription {
    return this.agendaItemId$.subscribe(id => {
      this.agendaItemId = id;
    });
  }

  get agendaItems$(): Observable<AgendaItem[]> {
    return this.agendaId$.mergeMap(agendaId => agendaIdItemsSelector(this.store, agendaId));
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

  get meeting$(): Observable<Meeting> {
    return meetingSelector(this.store);
  }

  get meetingId$(): Observable<number> {
    return meetingIdSelector(this.store);
  }

  get meetingIdChanges(): Subscription {
    return this.meetingId$.subscribe(id => {
      this.meetingId = id;
      this.getMeeting(this.meetingId);
    });
  }

  get routerEvents$(): Observable<any> {
    return Observable.combineLatest(this.activatedRoute$, this.activeAgendaId$, (route, agendaId) => {
      return { route, agendaId };
    });
  }

  get routerChanges(): Subscription {
    return this.routerEvents$.subscribe(e => {
      this.loadAgenda(e.route, e.agendaId);
    });
  }

  get showEdit$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showEmailGroup$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showSendEmail$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showAgenda$(): Observable<boolean> {
    return this.activatedRoute$.map(route => route === 'agenda' || route === 'meeting');
  }

  get showDetails$(): Observable<boolean> {
    return agendaToggleSelector(this.store);
  }

  get showDetailsChanges(): Subscription {
    return this.showDetails$.subscribe(show => {
      this.showDetails = show;
    });
  }

  get tree$(): Observable<Tree<AgendaItem>> {
    return this.agendaItemId$.withLatestFrom(this.agendaItems$.map(items => AgendaItems.BuildTree(items)),
      (agendaItemId: number, tree: Tree<AgendaItem>) => {
        tree.activeId = agendaItemId;
        return tree;
      });
  }

  get showSlideshow(): boolean {
    return this.viewMode === 'slideshow';
  }

  get showViewMode(): boolean {
    return false;
  }

  get toggleText(): Observable<string> {
    return this.showDetails$.map(showDetails => showDetails ? 'hide details' : 'show details');
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
