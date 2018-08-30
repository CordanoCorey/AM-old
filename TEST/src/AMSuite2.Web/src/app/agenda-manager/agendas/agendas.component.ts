import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MdDialog } from '@angular/material';
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
  activeId = 0;
  activeIndex = 0;
  agenda: Agenda = new Agenda();
  agendaId = 0;
  agendas = [];
  detailsSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  dialogRef: Subscription;
  meetingId = 0;
  routeName = 'agendas';

  constructor(
    public store: Store<any>,
    public dialog: MdDialog) {
    super(store);
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get activeId$(): Observable<number> {
    return activeAgendaItemIdSelector(this.store);
  }

  get activeIdChanges(): Subscription {
    return this.activeId$.subscribe(id => {
      this.activeId = id;
    });
  }

  get agendas$(): Observable<Agenda[]> {
    return this.meetingId$.mergeMap(id => meetingAgendasSelector(this.store, id));
  }

  get agendaId$(): Observable<number> {
    return agendaIdSelector(this.store);
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

  get meetingId$(): Observable<number> {
    return meetingIdSelector(this.store);
  }

  get route$(): Observable<string> {
    return activatedRouteSelector(this.store);
  }

  get routeChanges(): Subscription {
    return this.route$.subscribe(route => {
      this.detailsSubject$.next(route === 'agenda');
    });
  }

  get showAddTemplate$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showAgenda$(): Observable<boolean> {
    return agendaToggleSelector(this.store);
  }

  get showAgendaChanges(): Subscription {
    return this.showAgenda$.subscribe(showAgenda => {
      this.detailsSubject$.next(showAgenda);
    });
  }

  get showDetails$(): Observable<boolean> {
    return this.detailsSubject$.asObservable().distinctUntilChanged();
  }

  get showEdit$(): Observable<boolean> {
    return Observable.of(true);
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
    this.openDialog({ width: '600px' });
  }

  openDialog(config: any) {
    const dialogRef = this.dialog.open(TemplateDialogComponent, config);
    this.dialogRef = dialogRef.afterClosed().subscribe(result => {
      this.closeDialog(result);
    });
  }

  closeDialog(templateName: string) {
    this.saveTemplate(this.agenda.buildTemplate(templateName));
    this.dialogRef.unsubscribe();
  }

  saveTemplate(agenda: Agenda) {
    this.dispatch(HttpActions.post(`templates`, agenda, TemplatesActions.POST));
  }

}
