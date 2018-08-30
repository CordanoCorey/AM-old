import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException } from '@caiu/core';
import { FormModel } from '@caiu/forms';
import { HttpActions } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { Agenda } from '../agendas/agendas.model';
import { AgendasActions, agendaIdSelector, agendaSelector, AgendaActions } from '../agendas/agendas.reducer';
import { Meeting } from '../meeting/meeting.model';
import { activeAccountUrlSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-agenda-edit',
  templateUrl: './agenda-edit.component.html',
  styleUrls: ['./agenda-edit.component.scss']
})
export class AgendaEditComponent extends SmartComponent implements OnInit {

  accountUrl = '';
  agendaId = 0;
  routeName = 'agenda-edit';

  constructor(public store: Store<any>) {
    super(store);
  }

  get accountUrl$(): Observable<string> {
    return activeAccountUrlSelector(this.store);
  }

  get agenda$(): Observable<Agenda> {
    return agendaSelector(this.store);
  }

  get agendaId$(): Observable<number> {
    return agendaIdSelector(this.store);
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get heading$(): Observable<string> {
    return this.agenda$.map(agenda => agenda.id === 0 ? 'Create Agenda' : 'Update Agenda');
  }

  get meeting$(): Observable<Meeting> {
    return this.agenda$.map(agenda => agenda.meeting || new Meeting());
  }

  get message(): string {
    return this.inErrorState ? `An error has occurred. Please try again later.`
      : this.inSuccessState ? `Agenda updated successfully!` : '';
  }

  ngOnInit() {
    this.subscribe([this.agendaIdChanges]);
    if (this.agendaId !== 0) {
      this.getAgenda(this.agendaId);
    }
  }

  getAgenda(agendaId: number) {
    this.dispatch(HttpActions.get(`agendas/${agendaId}`, AgendaActions.GET));
  }

  addAgenda(agenda: Agenda) {
    this.dispatch(HttpActions.post(`agendas`, agenda, AgendasActions.POST));
  }

  deleteAgenda(agendaId: number) {
    this.dispatch(HttpActions.delete(`agendas/${agendaId}`, agendaId, AgendasActions.DELETE));
  }

  updateAgenda(agenda: Agenda) {
    this.dispatch(HttpActions.put(`agendas/${agenda.id}`, agenda, AgendaActions.PUT));
  }

}
