import { Component, OnInit } from '@angular/core';
import { HttpActions } from '@caiu/http';
import { Store } from '@caiu/store';

import { CurrentUser } from '../../shared/models';

@Component({
  selector: 'am-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
