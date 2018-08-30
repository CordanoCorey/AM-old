import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { BinItem, BinItemOptions } from '../bin.model';
import { Attachment } from '../../../document-manager/attachments/attachments.model';

@Component({
  selector: 'am-bin-item',
  templateUrl: './bin-item.component.html',
  styleUrls: ['./bin-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinItemComponent implements OnChanges {

  @Input() binItem: BinItem = new BinItem();
  @Input() options: BinItemOptions = new BinItemOptions();

  constructor() { }

  get attachments(): Attachment[] {
    return this.binItem.attachments.toArray();
  }

  get binItemDescription(): string {
    return this.binItem.description;
  }

  get binItemMinutes(): string {
    return this.binItem.minutes;
  }

  get binItemName(): string {
    return this.binItem.name;
  }

  get binItemNotes(): string {
    return this.binItem.notes;
  }

  get showAttachments(): boolean {
    return this.binItem.hasAttachments && this.options.copyAttachments;
  }

  get showDescription(): boolean {
    return this.options.copyDescription;
  }

  get showMinutes(): boolean {
    return this.binItem.hasMinutes && this.options.copyMinutes;
  }

  get showNotes(): boolean {
    return this.binItem.hasNotes && this.options.copyNotes;
  }

  ngOnChanges() {
  }

}
