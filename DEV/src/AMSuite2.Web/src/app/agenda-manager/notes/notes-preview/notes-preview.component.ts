import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { AgendaItemNotes } from '../notes.model';

@Component({
  selector: 'am-notes-preview',
  templateUrl: './notes-preview.component.html',
  styleUrls: ['./notes-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesPreviewComponent {

  @Input() notes: AgendaItemNotes = new AgendaItemNotes();

  constructor() { }

  get html(): string {
    return this.notes.notes;
  }

}
