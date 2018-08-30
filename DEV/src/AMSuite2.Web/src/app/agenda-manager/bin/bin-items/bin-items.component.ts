import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { BinItem, Bin, BinItemOptions } from '../bin.model';
import { Account } from '../../../account/account.model';

@Component({
  selector: 'am-bin-items',
  templateUrl: './bin-items.component.html',
  styleUrls: ['./bin-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinItemsComponent {

  @Input() accounts: Account[] = [];
  @Input() activeId = 0;
  @Input() binItem: BinItem = new BinItem();
  @Input() binItems: BinItem[] = [];
  @Output() changeAccount = new EventEmitter<number>();
  @Output() changeBinItem = new EventEmitter<number>();
  @Output() changeOptions = new EventEmitter<BinItemOptions>();

  constructor() { }

  onChangeAccount(id: number) {
    this.changeAccount.emit(id);
  }

  onChangeBinItem(id: number) {
    this.changeBinItem.emit(id);
  }

  onOptionsChange(options: any) {
    this.changeOptions.emit(options);
  }

}
