import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { hasChanged } from '@caiu/core';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';

import { AgendaEdit } from '../agenda-edit.model';
import { Agenda } from '../../agendas/agendas.model';

@Component({
  selector: 'am-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AgendaFormComponent extends FormComponent {

  @Input() accountUrl = '';
  @Input() agenda: Agenda = new Agenda();
  @Output() add: EventEmitter<Agenda> = new EventEmitter<Agenda>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() update: EventEmitter<Agenda> = new EventEmitter<Agenda>();
  @ModelControl<AgendaEdit>(new AgendaEdit()) form: FormGroup;
  modelKey = 'agenda';
  modelChanges = ['id', 'name', 'description', 'displayName', 'securityStatusId', 'timeframeId'];

  constructor() {
    super();
  }

  get agendaId(): number {
    return this.agenda.id;
  }

  get agendaName(): AbstractControl {
    return this.form.get('agendaName');
  }

  get formModel(): FormModel<AgendaEdit> {
    return new FormModel(this.model);
  }

  get valueIn(): AgendaEdit {
    return this.formModel.value;
  }

  get meetingsLink(): string {
    return `/${this.accountUrl}/meetings`;
  }

  get mode(): 'add' | 'edit' {
    return this.agendaId === 0 ? 'add' : 'edit';
  }

  get model(): AgendaEdit {
    return new AgendaEdit(this.agenda);
  }

  get valueOut(): Agenda {
    return AgendaEdit.BuildAgenda(this.agenda, this.form.value);
  }

  get submitText(): string {
    return this.mode === 'edit' ? 'Update Agenda' : 'Create Agenda';
  }

  onDelete() {
    this.delete.emit(this.agendaId);
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.formModel.isAdd ? this.add.emit(this.valueOut) : this.update.emit(this.valueOut);
  }

}
