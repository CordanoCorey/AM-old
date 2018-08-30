import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AccordionComponent } from '@caiu/common';
import { SmartComponent, Store } from '@caiu/store';

import { CurrentUser } from '../../shared/models';
import { AgendaItemMinutes } from '../minutes/minutes.model';
import { HttpActions } from '@caiu/http';
import { MinutesActions } from '../minutes/minutes.reducer';
import { AgendaItemNotes } from './notes.model';
import { NotesActions } from './notes.reducer';

@Component({
  selector: 'am-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [
    trigger('toggle', [
      state('show', style({})),
      state('hide', style({ transform: 'rotate(180deg)' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class NotesComponent extends SmartComponent implements OnInit {

  @Input() opened = false;
  @Input() type: 'minutes' | 'notes' = 'notes';
  @Input() next = '/';
  @Input() previous = '/';
  @ViewChild(AccordionComponent) accordion: AccordionComponent;

  constructor(public store: Store<any>) {
    super(store);
  }

  get editorDisplay(): string {
    return this.opened ? 'block' : 'none';
  }

  get openedMinutes(): boolean {
    return this.opened && this.showMinutes;
  }

  get openedNotes(): boolean {
    return this.opened && this.showNotes;
  }

  get showMinutes(): boolean {
    return this.type === 'minutes';
  }

  get showNotes(): boolean {
    return this.type === 'notes';
  }

  ngOnInit() {
  }

  close() {
    this.accordion.close();
    this.opened = false;
  }

  open() {
    this.accordion.open();
    this.opened = true;
  }

  toggle() {
    this.opened = !this.opened;
    if (this.opened) {
      this.accordion.open();
    } else {
      this.accordion.close();
    }
  }

  onChanges() {
  }

  onStart(e: any) {
  }

  onDone(e: any) {
    if (this.opened) {
      this.accordion.open();
    } else {
      this.accordion.close();
    }
  }

  onClickNotes(e: any) {
    e.stopPropagation();
    this.type = 'notes';
    if (!this.opened) {
      this.open();
    }
  }

  onClickMinutes(e: any) {
    e.stopPropagation();
    this.type = 'minutes';
    if (!this.opened) {
      this.open();
    }
  }

  addMinutes(minutes: AgendaItemMinutes) {
    this.dispatch(HttpActions.post(`agendaItems/${minutes.agendaItemId}/minutes`, minutes, MinutesActions.POST));
  }

  addNotes(notes: AgendaItemNotes) {
    this.dispatch(HttpActions.post(`agendaItems/${notes.agendaItemId}/notes`, notes, NotesActions.POST));
  }

  deleteMinutes(id: number) {
    this.dispatch(HttpActions.delete(`agendaItems/${id}/minutes`, id, MinutesActions.DELETE));
  }

  deleteNotes(id: number) {
    this.dispatch(HttpActions.delete(`agendaItems/${id}/notes`, id, NotesActions.DELETE));
  }

  updateMinutes(minutes: AgendaItemMinutes) {
    this.dispatch(HttpActions.put(`minutes/${minutes.id}`, minutes, MinutesActions.PUT));
  }

  updateNotes(notes: AgendaItemNotes) {
    this.dispatch(HttpActions.put(`notes/${notes.id}`, notes, NotesActions.PUT));
  }

}
