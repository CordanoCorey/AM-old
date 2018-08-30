import { Component, OnInit } from '@angular/core';
import { HttpActions } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';

import { EmailItem } from './email.model';
import { EmailActions, EmailItemActions } from './email.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent extends SmartComponent implements OnInit {

  routeName = 'email';

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

  send() {
  }

}
