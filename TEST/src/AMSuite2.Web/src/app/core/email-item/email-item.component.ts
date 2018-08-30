import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DialogAction } from '@caiu/common';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';

import { EmailItem } from '../email/email.model';
import { EmailItemActions, EmailActions, emailItemSelector } from '../email/email.reducer';
import { GroupMembersActions } from '../members/members.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-email-item',
  templateUrl: './email-item.component.html',
  styleUrls: ['./email-item.component.scss'],
  animations: [
    trigger('toggle', [
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class EmailItemComponent extends SmartComponent implements OnInit {

  activeId = 0;
  routeName = 'email-item';

  constructor(public store: Store<any>) {
    super(store);
  }

  get actions(): DialogAction[] {
    return [
      build(DialogAction, { value: null, label: 'Close' }),
      build(DialogAction, { value: 'send', label: 'Send', color: 'accent' }),
    ];
  }

  get title(): string {
    return 'Email';
  }

  get emailItem$(): Observable<EmailItem> {
    return emailItemSelector(this.store);
  }

  get showEmailSent$(): Observable<boolean> {
    return Observable.of(false);
  }

  ngOnInit() {
  }

  addEmail(emailItem: EmailItem) {
    this.dispatch(HttpActions.post(`email`, emailItem, EmailActions.POST));
  }

  getGroupMembers(groupId: number) {
    this.dispatch(HttpActions.get(`groups/${groupId}/members`, GroupMembersActions.GET));
  }

}
