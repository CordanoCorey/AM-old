import { Component, OnChanges, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';

import { AgendaItemNotes, NotesEdit } from '../notes.model';

@Component({
  selector: 'am-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesFormComponent extends FormComponent {

  @Input() notes: AgendaItemNotes = new AgendaItemNotes();
  @ModelControl<NotesEdit>(new NotesEdit()) form: FormGroup;
  @Output() changes = new EventEmitter<AgendaItemNotes>();
  modelKey = 'notes';
  modelChanges = [];

  constructor() {
    super();
  }

  get valueOut(): AgendaItemNotes {
    return NotesEdit.BuildNotes(this.notes, this.form.value);
  }

  get formModel(): FormModel<NotesEdit> {
    return new FormModel(this.model);
  }

  get valueIn(): NotesEdit {
    return this.formModel.value;
  }

  get model(): NotesEdit {
    return new NotesEdit(this.notes);
  }

  onChanges() {
    this.changes.emit(this.valueOut);
  }

}
