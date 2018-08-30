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
  agendaId = 0;
  binItem: BinItem = new BinItem();
  binItemOptions: BinItemOptions = new BinItemOptions();
  displayOrder = 0;
  firstBinItemId = 0;
  hasBinItemId = false;
  hasBinItems = false;

  constructor(public store: Store<any>, public templateRef: ViewContainerRef) {
    super(store);
  }

  get accounts$(): Observable<Account[]> {
    return this.userAccounts$.map(members => members.map(member => member.account));
  }

  get activeId$(): Observable<number> {
    return activeBinItemIdSelector(this.store);
  }

  get agendaId$(): Observable<number> {
    return binAgendaIdSelector(this.store);
  }

  get bin$(): Observable<Bin> {
    return binSelector(this.store);
  }

  get binItem$(): Observable<BinItem> {
    return this.bin$.map(bin => build(BinItem, bin.active));
  }

  get binItems$(): Observable<BinItem[]> {
    return this.bin$.map(bin => this.accountId === 0 ? bin.toArray()
      : bin.toArray().filter(item => item.accountId === this.accountId));
  }

  get count$(): Observable<number> {
    return this.bin$.map(bin => bin.count);
  }

  get displayOrder$(): Observable<number> {
    return binDisplayOrderSelector(this.store);
  }

  get firstBinItemId$(): Observable<number> {
    return this.hasBinItems$.withLatestFrom(this.binItems$, (hasItems, items) => {
      return hasItems ? items[0].id : 0;
    }).distinctUntilChanged();
  }

  get firstBinItemIdChanges(): Subscription {
    return this.firstBinItemId$.subscribe(x => {
      this.firstBinItemId = x;
    });
  }

  get hasBinItemId$(): Observable<boolean> {
    return this.activeId$.withLatestFrom(this.binItems$, (id, items) => {
      return items.findIndex(item => item.id === id) !== -1;
    }).distinctUntilChanged();
  }

  get hasBinItemIdChanges(): Subscription {
    return this.hasBinItemId$.subscribe(x => {
      this.hasBinItemId = x;
    });
  }

  get hasBinItems$(): Observable<boolean> {
    return this.count$.map(count => count > 0).distinctUntilChanged();
  }

  get hasBinItemsChanges(): Subscription {
    return this.hasBinItems$.subscribe(x => {
      this.hasBinItems = x;
    });
  }

  get route$(): Observable<RouterState> {
    return routeSelector(this.store);
  }

  get userAccounts$(): Observable<AccountMember[]> {
    return userAccountsSelector(this.store);
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
    // this.getBinItems();
    // this.route$.subscribe(r => console.log(r));
    // this.activeId$.subscribe(r => console.log(r));
    // this.bin$.subscribe(r => console.log(r));
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
