import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DialogAction } from '@caiu/common';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { RouterState } from '@caiu/router';
import { SmartComponent, Store } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { BinItem, Bin, BinItemOptions } from './bin.model';
import { BinActions, binSelector, binAgendaIdSelector, binDisplayOrderSelector, activeBinItemIdSelector } from './bin.reducer';
import { AgendaItemsActions } from '../agenda-items/agenda-items.reducer';
import { Account, AccountMember } from '../../account/account.model';
import { userAccountsSelector } from '../../core/accounts/accounts.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { routeSelector } from '../../shared/selectors';

@Component({
  selector: 'am-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BinComponent extends SmartComponent implements OnInit {

  accountId = 0;
  accounts$: Observable<Account[]>;
  activeId$: Observable<number>;
  agendaId = 0;
  agendaId$: Observable<number>;
  bin$: Observable<Bin>;
  binItem: BinItem = new BinItem();
  binItem$: Observable<BinItem>;
  binItemOptions: BinItemOptions = new BinItemOptions();
  binItems$: Observable<BinItem[]>;
  count$: Observable<number>;
  displayOrder = 0;
  displayOrder$: Observable<number>;
  firstBinItemId = 0;
  firstBinItemId$: Observable<number>;
  hasBinItemId = false;
  hasBinItemId$: Observable<boolean>;
  hasBinItems = false;
  hasBinItems$: Observable<boolean>;
  route$: Observable<RouterState>;
  userAccounts$: Observable<AccountMember[]>;

  constructor(public store: Store<any>, public templateRef: ViewContainerRef) {
    super(store);
    this.activeId$ = activeBinItemIdSelector(this.store);
    this.agendaId$ = binAgendaIdSelector(this.store);
    this.bin$ = binSelector(this.store);
    this.displayOrder$ = binDisplayOrderSelector(this.store);
    this.route$ = routeSelector(this.store);
    this.userAccounts$ = userAccountsSelector(this.store);
    this.accounts$ = this.userAccounts$.map(members => members.map(member => member.account));
    this.binItem$ = this.bin$.map(bin => build(BinItem, bin.active));
    this.binItems$ = this.bin$.map(bin => this.accountId === 0 ? bin.toArray()
      : bin.toArray().filter(item => item.accountId === this.accountId));
    this.count$ = this.bin$.map(bin => bin.count);
    this.firstBinItemId$ = this.hasBinItems$.withLatestFrom(this.binItems$, (hasItems, items) => hasItems ? items[0].id : 0).distinctUntilChanged();
    this.hasBinItemId$ = this.activeId$.withLatestFrom(this.binItems$, (id, items) => items.findIndex(item => item.id === id) !== -1).distinctUntilChanged();
    this.hasBinItems$ = this.count$.map(count => count > 0).distinctUntilChanged();
  }

  get firstBinItemIdChanges(): Subscription {
    return this.firstBinItemId$.subscribe(x => {
      this.firstBinItemId = x;
    });
  }

  get hasBinItemIdChanges(): Subscription {
    return this.hasBinItemId$.subscribe(x => {
      this.hasBinItemId = x;
    });
  }

  get hasBinItemsChanges(): Subscription {
    return this.hasBinItems$.subscribe(x => {
      this.hasBinItems = x;
    });
  }

  get agendaIdChanges(): Subscription {
    return this.agendaId$.subscribe(id => {
      this.agendaId = id;
    });
  }

  get displayOrderChanges(): Subscription {
    return this.displayOrder$.subscribe(order => {
      this.displayOrder = order;
    });
  }

  get actions(): DialogAction[] {
    return [
      build(DialogAction, { value: 'add', label: 'Add', color: 'accent' }),
      build(DialogAction, { value: 'delete', label: 'Delete', color: 'warn' }),
      build(DialogAction, { value: 'cancel', label: 'Cancel', color: 'primary' })
    ];
  }

  get title(): string {
    return 'Bin';
  }

  ngOnInit() {
    this.subscribe([this.firstBinItemIdChanges, this.hasBinItemIdChanges, this.hasBinItemsChanges]);
    if (!this.hasBinItemId && this.hasBinItems) {
      this.activateBinItem(this.firstBinItemId);
    }
  }

  changeAccount(id: number) {
    this.binItemOptions = new BinItemOptions();
    this.accountId = id;
  }

  activateBinItem(id: number) {
    this.binItemOptions = new BinItemOptions();
    this.dispatch(BinActions.activate(id));
  }

  changeOptions(options: BinItemOptions) {
    this.binItemOptions = options;
  }

  getBinItems() {
    this.dispatch(HttpActions.get(`binitems`, BinActions.GET));
  }

  addAgendaItem(binItem: BinItem) {
    const agendaItem = binItem.buildAgendaItem(this.agendaId, this.displayOrder, this.binItemOptions);
    this.dispatch(HttpActions.post(`binitems`, agendaItem, AgendaItemsActions.POST));
  }

  deleteBinItem(binItemId) {
    this.dispatch(HttpActions.delete(`binItems/${binItemId}`, binItemId, BinActions.DELETE));
  }

}
