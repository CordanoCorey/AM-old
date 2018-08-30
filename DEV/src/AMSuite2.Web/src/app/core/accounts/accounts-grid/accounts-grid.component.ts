import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Grid, GridColumn, StyleModel, SortDescriptor } from '@caiu/common';

import { Accounts, AccountRow } from '../accounts.model';

@Component({
  selector: 'am-accounts-grid',
  templateUrl: './accounts-grid.component.html',
  styleUrls: ['./accounts-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class AccountsGridComponent implements OnInit {

  @Input() accounts: Accounts = new Accounts();
  btnStyle: StyleModel = new StyleModel();
  private _sort: SortDescriptor[] = [
    Grid.BuildSort('accountName', 'asc')
  ];

  constructor() { }

  get grid(): Grid<AccountRow> {
    return Grid.Build<AccountRow>(this.accounts.toArray().map(account => new AccountRow(account)));
  }

  get actionsColumn(): GridColumn<any> {
    return new GridColumn('actions', 'Actions');
  }

  get nameColumn(): GridColumn<string> {
    return new GridColumn<string>('accountName', 'Account Name');
  }

  get statusColumn(): GridColumn<string> {
    return new GridColumn<string>('accountStatus', 'Status');
  }

  get urlColumn(): GridColumn<string> {
    return new GridColumn<string>('accountUrl', 'URL');
  }

  get sort(): SortDescriptor[] {
    return this._sort;
  }

  set sort(value: SortDescriptor[]) {
    this._sort = value;
  }

  ngOnInit() {
    if (!this.btnStyle.paddingTop) {
      this.btnStyle.paddingTop = 1;
    }
    if (!this.btnStyle.paddingBottom) {
      this.btnStyle.paddingBottom = 1;
    }
    if (!this.btnStyle.paddingRight) {
      this.btnStyle.paddingRight = 6;
    }
    if (!this.btnStyle.paddingLeft) {
      this.btnStyle.paddingLeft = 6;
    }
  }

}
