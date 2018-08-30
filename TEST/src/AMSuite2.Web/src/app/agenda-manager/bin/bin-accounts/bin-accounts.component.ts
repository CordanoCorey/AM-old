import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { str2int } from '@caiu/core';

import { Account } from '../../../account/account.model';

@Component({
  selector: 'am-bin-accounts',
  templateUrl: './bin-accounts.component.html',
  styleUrls: ['./bin-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinAccountsComponent {

  @Input() accounts: Account[] = [];
  @Output() changeAccount = new EventEmitter<number>();
  control: AbstractControl;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
    this.control = this.fb.control([0]);
    this.control.valueChanges.subscribe(id => {
      // console.log('Account ID:\t', id);
      this.changeAccount.emit(str2int(id.toString()));
    });
  }

}
