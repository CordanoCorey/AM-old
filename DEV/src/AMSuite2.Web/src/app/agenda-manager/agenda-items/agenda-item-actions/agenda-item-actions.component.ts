import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

import { AgendaItem } from '../../agenda-items/agenda-items.model';

@Component({
  selector: 'am-agenda-item-actions',
  templateUrl: './agenda-item-actions.component.html',
  styleUrls: ['./agenda-item-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaItemActionsComponent {

  @Input() agendaItem: AgendaItem = new AgendaItem();
  @Input() editing = false;
  @Input() userCanEdit = false;
  @Input() userHasBin = false;
  @Input() showRight = true;
  @Output() copyToBin = new EventEmitter<AgendaItem>();
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  get agendaItemId() {
    return this.agendaItem.id;
  }

  get hasId(): boolean {
    return !(this.agendaItemId === 0);
  }

  get isSuggestion(): boolean {
    return this.agendaItem.isSuggestion;
  }

  get binLink(): any[] {
    return [`/`, { outlets: { popup: 'bin' } }];
  }

  get editLink(): any[] {
    return [`../`, this.agendaItemId];
  }

  get emailLink(): any[] {
    return [`/`, { outlets: { popup: 'email' } }];
  }

  get showCopyFromBin(): boolean {
    return !this.hasId && !this.isSuggestion;
  }

  get showCopyToBin(): boolean {
    return this.hasId && !this.isSuggestion;
  }

  get showDelete(): boolean {
    return this.editing && this.hasId && !this.isSuggestion;
  }

  get showEdit(): boolean {
    return !this.editing && this.userCanEdit;
  }

  get showEmail(): boolean {
    return !this.editing || (this.hasId && !this.isSuggestion);
  }

  get showSuggestions(): boolean {
    return this.isSuggestion;
  }

  onCopyToBin() {
    this.copyToBin.emit(this.agendaItem);
  }

  onDelete() {
    this.delete.emit(this.agendaItemId);
  }

}
