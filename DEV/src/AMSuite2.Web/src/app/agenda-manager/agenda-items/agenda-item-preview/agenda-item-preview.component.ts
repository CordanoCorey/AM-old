import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { AgendaItem } from '../agenda-items.model';
import { AgendaItemMinutes } from '../../minutes/minutes.model';
import { AgendaItemNotes } from '../../notes/notes.model';
import { Votes } from '../../votes/votes.model';
import { Attachment } from '../../../document-manager/attachments/attachments.model';

@Component({
  selector: 'am-agenda-item-preview',
  templateUrl: './agenda-item-preview.component.html',
  styleUrls: ['./agenda-item-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaItemPreviewComponent {

  @Input() agendaItem: AgendaItem = new AgendaItem();

  constructor() { }

  get agendaItemDescription(): string {
    return this.agendaItem.description;
  }

  get agendaItemName(): string {
    return this.agendaItem.name;
  }

  get attachments(): Attachment[] {
    return this.agendaItem.attachments;
  }

  get minutes(): AgendaItemMinutes {
    return this.agendaItem.minutes;
  }

  get notes(): AgendaItemNotes {
    return this.agendaItem.notes;
  }

  get votes(): Votes {
    return this.agendaItem.votes;
  }

}
