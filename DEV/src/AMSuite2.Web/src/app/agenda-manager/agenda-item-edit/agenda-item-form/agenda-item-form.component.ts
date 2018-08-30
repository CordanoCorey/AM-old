import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { hasChanged } from '@caiu/core';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';

import { AgendaItemEdit } from '../agenda-item-edit.model';
import { AgendaItem } from '../../agenda-items/agenda-items.model';

@Component({
  selector: 'am-agenda-item-form',
  templateUrl: './agenda-item-form.component.html',
  styleUrls: ['./agenda-item-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaItemFormComponent extends FormComponent {

  @Input() agendaItem: AgendaItem = new AgendaItem();
  @Output() add = new EventEmitter<AgendaItem>();
  @Output() update = new EventEmitter<AgendaItem>();
  @ModelControl<AgendaItemEdit>(new AgendaItemEdit()) form: FormGroup;
  modelKey = 'agendaItem';
  modelChanges = ['id', 'name', 'description', 'isPrivate', 'isVotable'];

  constructor() {
    super();
  }

  get formModel(): FormModel<AgendaItemEdit> {
    return new FormModel(this.model);
  }

  get valueIn(): AgendaItemEdit {
    return this.formModel.value;
  }

  get isSuggestion(): boolean {
    return this.agendaItem.isSuggestion;
  }

  get model(): AgendaItemEdit {
    return new AgendaItemEdit(this.agendaItem);
  }

  get valueOut(): AgendaItem {
    return AgendaItemEdit.BuildAgendaItem(this.agendaItem, this.form.value);
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.valueOut) : this.update.emit(this.valueOut);
  }

  onAccept() {
  }

  onReject() {
  }

}
