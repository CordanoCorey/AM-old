import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';

import { AgendaItemMinutes, MinutesEdit } from '../minutes.model';
import { AgendaItem } from '../../agenda-items/agenda-items.model';

@Component({
  selector: 'am-minutes-form',
  templateUrl: './minutes-form.component.html',
  styleUrls: ['./minutes-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinutesFormComponent extends FormComponent {

  @Input() agendaItem: AgendaItem = new AgendaItem();
  @ModelControl<MinutesEdit>(new MinutesEdit()) form: FormGroup;
  @Output() changes = new EventEmitter<AgendaItemMinutes>();
  modelKey = 'agendaItem';
  modelChanges = [];

  constructor() {
    super();
  }

  get agendaItemId(): number {
    return this.agendaItem.id;
  }

  get elementId(): string {
    return `editor${this.agendaItemId}`;
  }

  get formModel(): FormModel<MinutesEdit> {
    return new FormModel(this.model);
  }

  get valueIn(): MinutesEdit {
    return this.formModel.value;
  }

  get minutes(): AgendaItemMinutes {
    return new AgendaItemMinutes();
  }

  get model(): MinutesEdit {
    return new MinutesEdit(this.minutes);
  }

  get valueOut(): AgendaItemMinutes {
    return MinutesEdit.BuildMinutes(this.minutes, this.form.value);
  }

  onChanges() {
    this.changes.emit(this.valueOut);
  }

}
