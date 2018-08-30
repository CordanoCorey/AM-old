import { Component, OnInit, Input, ViewChild, OnChanges, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { build, Tree, TreeItem } from '@caiu/core';
import { AccordionComponent } from '@caiu/common';
import { HttpActions } from '@caiu/http';
import { RouterState, RouterActions, routeNameSelector } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Agenda } from '../agendas/agendas.model';
import { AgendasActions, agendaSelector, AgendaActions, agendaIdSelector } from '../agendas/agendas.reducer';
import { AgendaItem, AgendaItems } from '../agenda-items/agenda-items.model';
import { AgendaItemsActions, agendaIdItemsSelector } from '../agenda-items/agenda-items.reducer';
import { activeAccountUrlSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { routeSelector, currentUserSelector } from '../../shared/selectors';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'am-agenda-treeview',
  templateUrl: './agenda-treeview.component.html',
  styleUrls: ['./agenda-treeview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      state('show', style({})),
      state('hide', style({ transform: 'rotate(180deg)' })),
      transition('show <=> hide', [
        animate('300ms ease-out')
      ])
    ]),
    trigger('toggleQuickItem', [
      state('show', style({ height: '50px' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class AgendaTreeviewComponent extends SmartComponent implements OnInit, OnChanges {

  @Input() agenda: Agenda = new Agenda();
  @Input() activeId = 0;
  @Input() opened = false;
  @Input() tree: Tree<AgendaItem>;
  @ViewChild(AccordionComponent) accordion: AccordionComponent;
  accountUrl = '';
  accountUrl$: Observable<string>;
  active$: Observable<boolean>;
  activeId$: Observable<number>;
  agenda$: Observable<Agenda>;
  agendaId$: Observable<number>;
  editing = false;
  editing$: Observable<boolean>;
  items: TreeItem<AgendaItem>[] = [];
  route$: Observable<RouterState>;
  routeName$: Observable<string>;
  showQuickItem = false;

  constructor(public store: Store<any>) {
    super(store);
    this.accountUrl$ = activeAccountUrlSelector(this.store);
    this.agendaId$ = agendaIdSelector(this.store);
    this.route$ = routeSelector(this.store);
    this.routeName$ = routeNameSelector(this.store);
    this.active$ = this.agendaId$.map(id => id === this.activeId);
    this.activeId$ = Observable.of(0);
    this.agenda$ = agendaSelector(this.store);
    this.editing$ = this.routeName$.map(routeName => routeName === 'agenda-item-edit');
  }

  get activeIdChanges(): Subscription {
    return this.activeId$.subscribe(id => {
      if (id === this.agendaId) { // this treeview is active
        this.open();
      } else {
        this.close();
      }
    });
  }

  get agendaId(): number {
    return this.agenda.id;
  }

  get agendaItems(): AgendaItem[] {
    return this.agenda.agendaItems;
  }

  get agendaItemsLink(): string {
    return `/${this.agendaLink}/agendaitems`;
  }

  get agendaLink(): string {
    return `${this.agendasLink}/${this.agendaId}`;
  }

  get agendasLink(): string {
    return `/${this.accountUrl}/meetings/${this.meetingId}/agendas`;
  }

  get meetingId(): number {
    return this.agenda.meetingId;
  }

  get newItemLink(): string {
    return `/${this.accountUrl}/meetings/${this.meetingId}/agendas/${this.agendaId}/agendaitems/0/edit`;
  }

  get next(): AgendaItem {
    return this.tree.next.item;
  }

  get nextId(): number {
    return this.tree.nextId;
  }

  get previous(): AgendaItem {
    return this.tree.previous.item;
  }

  get previousId(): number {
    return this.tree.previousId;
  }

  get treeItems(): TreeItem<AgendaItem>[] {
    return this.tree.orderedItems;
  }

  activate() {
    this.dispatch(AgendasActions.activate(this.agendaId));
    this.addSubscription(this.editing$.subscribe(x => {
      this.editing = x;
    }));
  }

  close() {
    this.accordion.close();
    this.opened = false;
  }

  open() {
    this.opened = true;
  }

  toggle() {
    this.opened = !this.opened;
  }

  ngOnInit() {
    const agendaId = this.agendaId;
    this.tree = AgendaItems.BuildTree(this.agendaItems);
  }

  ngOnChanges() {
    if (this.items.length === 0 && this.treeItems.length && this.treeItems.length > 0) {
      this.items = this.treeItems;
    }
  }

  onStart(e: any) {
  }

  onDone(e: any) {
    if (this.opened) {
      this.accordion.open();
    } else {
      this.accordion.close();
    }
  }

  goUp() {
    const previous = this.previous;
    if (previous.id !== 0) {
      this.dispatch(RouterActions.navigate(this.getAgendaItemLink(previous.agendaId, previous.id)));
    }
  }

  goDown() {
    const next = this.next;
    if (next.id !== 0) {
      this.dispatch(RouterActions.navigate(this.getAgendaItemLink(next.agendaId, next.id)));
    }
  }

  getAgendaItemLink(agendaId: number, agendaItemId: number): string {
    const baseUrl = `${this.agendasLink}/${agendaId}/agendaitems/${agendaItemId}`;
    return this.editing ? `${baseUrl}/edit` : baseUrl;
  }

  clickNewItem() {
    this.dispatch(RouterActions.navigate(this.newItemLink));
  }

  clickQuickItem() {
    this.showQuickItem = !this.showQuickItem;
  }

  addQuickItem() {
    this.showQuickItem = false;
  }

  clearQuickItem() {
    this.showQuickItem = false;
  }

  trackTreeItem(index, item) {
    return item.id;
  }

  addAgendaItem(agendaItem: AgendaItem) {
    this.dispatch(HttpActions.post(`agendas/${agendaItem.agendaId}/agendaitems`, AgendaItemsActions.POST));
  }

  updateAgenda(agenda: Agenda) {
    this.dispatch(HttpActions.post(`agendas/${agenda.id}`, AgendaActions.PUT));
  }
}
