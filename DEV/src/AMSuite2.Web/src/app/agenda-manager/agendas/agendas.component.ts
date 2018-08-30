import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { RouterActions } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { Agendas, Agenda } from './agendas.model';
import { meetingAgendasSelector, agendaToggleSelector } from './agendas.reducer';
import { agendaIdSelector } from '../agendas/agendas.reducer';
import { activeAgendaItemIdSelector } from '../agenda-items/agenda-items.reducer';
import { meetingIdSelector } from '../meetings/meetings.reducer';
import { TemplateDialogComponent } from '../templates/template-dialog/template-dialog.component';
import { TemplatesActions } from '../templates/templates.reducer';
import { activeAccountUrlSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector } from '../../shared/selectors';

@Component({
  selector: 'am-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.scss'],
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
export class AgendasComponent extends SmartComponent implements OnInit {

  accountUrl = '';
  accountUrl$: Observable<string>;
  activeId = 0;
  activeId$: Observable<number>;
  activeIndex = 0;
  agenda: Agenda = new Agenda();
  agendaId = 0;
  agendaId$: Observable<number>;
  agendas = [];
  agendas$: Observable<Agenda[]>;
  detailsSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  meetingId = 0;
  meetingId$: Observable<number>;
  route$: Observable<string>;
  routeName = 'agendas';
  showAddTemplate$: Observable<boolean>;
  showAgenda$: Observable<boolean>;
  showDetails$: Observable<boolean>;
  showEdit$: Observable<boolean>;

  constructor(
    public store: Store<any>,
    public dialog: MatDialog) {
    super(store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.activeId$ = activeAgendaItemIdSelector(this.store);
    this.agendaId$ = agendaIdSelector(this.store);
    this.meetingId$ = meetingIdSelector(this.store);
    this.route$ = activatedRouteSelector(this.store);
    this.showAgenda$ = agendaToggleSelector(this.store);
    this.agendas$ = this.meetingId$.mergeMap(id => meetingAgendasSelector(this.store, id));
    this.showAddTemplate$ = Observable.of(true);
    this.showDetails$ = this.detailsSubject$.asObservable().distinctUntilChanged();
    this.showEdit$ = Observable.of(true);
  }

  get activeIdChanges(): Subscription {
    return this.activeId$.subscribe(id => {
      this.activeId = id;
    });
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get agendasChanges(): Subscription {
    return this.agendas$.subscribe(agendas => {
      this.agendas = agendas;
      this.activeIndex = this.getActiveIndex(this.agendas);
      this.agenda = agendas.find(agenda => agenda.id === this.activeId) || new Agenda();
    });
  }

  get groupName(): string {
    return this.agenda.groupName;
  }

  get routeChanges(): Subscription {
    return this.route$.subscribe(route => {
      this.detailsSubject$.next(route === 'agenda');
    });
  }

  get showAgendaChanges(): Subscription {
    return this.showAgenda$.subscribe(showAgenda => {
      this.detailsSubject$.next(showAgenda);
    });
  }

  get visibility(): string {
    return this.agenda.visibility;
  }

  get editLink(): string {
    return `/${this.accountUrl}/meetings/${this.meetingId}/edit/agendas/${this.agendaId}`;
  }

  ngOnInit() {
    this.subscribe([this.activeIdChanges, this.agendaIdChanges, this.agendasChanges, this.routeChanges, this.showAgendaChanges]);
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName));
  }

  onDeactivate(e: any) {
  }

  getAgendaLink(agendaId: number) {
    return `/${this.accountUrl}/meetings/${this.meetingId}/agendas/${agendaId}`;
  }

  isActive(agendaId: number) {
    return agendaId === this.agendaId;
  }

  getActiveIndex(agendas: Agenda[]): number {
    return agendas.findIndex(agenda => agenda.id === this.agendaId);
  }

  clickTemplate() {
    this.openDialog(TemplateDialogComponent, { width: '600px' });
  }

  /**
   * Override closeDialog method
   * @param result template name
   */
  closeDialog(result: any) {
    this.saveTemplate(this.agenda.buildTemplate(result));
    super.closeDialog(result);
  }

  saveTemplate(agenda: Agenda) {
    this.dispatch(HttpActions.post(`templates`, agenda, TemplatesActions.POST));
  }

}
