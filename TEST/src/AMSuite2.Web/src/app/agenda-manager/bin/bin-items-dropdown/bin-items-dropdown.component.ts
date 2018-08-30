import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { str2int } from '@caiu/core';

import { Bin, BinItem } from '../bin.model';

@Component({
  selector: 'am-bin-items-dropdown',
  templateUrl: './bin-items-dropdown.component.html',
  styleUrls: ['./bin-items-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinItemsDropdownComponent implements OnChanges {

  @Input() activeId = 0;
  @Input() binItems: BinItem[] = [];
  @Output() changeBinItem = new EventEmitter<number>();
  control: AbstractControl;

  constructor(public fb: FormBuilder) {
  }

  get firstBinItemId(): number {
    return this.hasBinItems ? this.binItems[0].id : 0;
  }

  get hasBinItems(): boolean {
    return this.binItems.length > 0;
  }

  get hasBinItemId(): boolean {
    return this.binItems.findIndex(item => item.id === this.activeId) !== -1;
  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.control = this.fb.control([0]);
    this.control.valueChanges.subscribe(id => {
      // console.log('Account ID:\t', id);
      this.changeBinItem.emit(str2int(id.toString()));
    });
  }

}
