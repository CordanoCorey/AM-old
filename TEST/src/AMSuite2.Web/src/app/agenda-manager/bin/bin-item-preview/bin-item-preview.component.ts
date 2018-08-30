import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { BinItem } from '../bin.model';

@Component({
  selector: 'am-bin-item-preview',
  templateUrl: './bin-item-preview.component.html',
  styleUrls: ['./bin-item-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinItemPreviewComponent implements OnInit {

  @Input() binItem: BinItem = new BinItem();

  constructor() { }

  get binItemName(): string {
    return this.binItem.name;
  }

  get hasAttachments(): boolean {
    return this.binItem.hasAttachments;
  }

  get hasNotes(): boolean {
    return this.binItem.hasMinutes || this.binItem.hasNotes;
  }

  get isParent(): boolean {
    return !this.binItem.parentId;
  }

  ngOnInit() {
  }

}
