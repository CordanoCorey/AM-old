import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { TreeItem } from '@caiu/core';

import { AgendaItem } from '../agenda-items/agenda-items.model';

@Component({
  selector: 'am-agenda-tree-item',
  templateUrl: './agenda-tree-item.component.html',
  styleUrls: ['./agenda-tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaTreeItemComponent implements OnInit {

  @Input() treeItem: TreeItem<AgendaItem> = AgendaItem.TreeItem;
  @Input() editing = false;
  @Input() odd: boolean;
  @Input() even: boolean;
  @Input() last: boolean;
  @Input() index = 0;

  constructor() { }

  get agendaItem(): AgendaItem {
    return this.treeItem.item;
  }

  get agendaId(): number {
    return this.agendaItem.agendaId;
  }

  get agendaItemId(): number {
    return this.agendaItem.id;
  }

  get agendaItemLink(): string {
    const itemLink = `agendas/${this.agendaId}/agendaitems/${this.agendaItemId}`;
    // return this.editing ? `${itemLink}/edit` : itemLink;
    return itemLink;
  }

  get label(): string {
    return this.agendaItem.name;
  }

  get order(): number {
    return this.treeOrder === 0 ? this.treeItem.order : this.treeOrder;
  }

  get treeOrder(): number {
    return this.treeItem.treeOrder;
  }

  get hasAttachments(): boolean {
    return true;
  }

  get hasNotes(): boolean {
    return true;
  }

  get isChild(): boolean {
    return !this.isParent;
  }

  get isParent(): boolean {
    return !(this.parentId);
  }

  get isPrivate(): boolean {
    return true;
  }

  get isSuggestion(): boolean {
    return false;
  }

  get parentId(): number {
    return this.agendaItem.parentId;
  }

  ngOnInit() {
  }

}
