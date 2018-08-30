import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { DialogAction, DialogModel } from '@caiu/common';
import { build, throwNotImplementedException } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { DumbComponent, Store } from '@caiu/store';

import { Announcement } from '../announcements/announcements.model';
import { CurrentUser } from '../../shared/models';

@Component({
  selector: 'am-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent extends DumbComponent implements OnInit {

  constructor( @Inject(MD_DIALOG_DATA) public announcement: Announcement) {
    super();
  }

  get actions(): DialogAction[] {
    return [
      // build(DialogAction, { value: null, label: 'Close' }),
    ];
  }

  get dialog(): DialogModel {
    return build(DialogModel, {
      title: this.title,
      actions: this.actions
    });
  }

  get title(): string {
    return 'ANNOUNCEMENT';
  }

  ngOnInit() {
  }

  get announcementId(): number {
    return 0;
  }

}
