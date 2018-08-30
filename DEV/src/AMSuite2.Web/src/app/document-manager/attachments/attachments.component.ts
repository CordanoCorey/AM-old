import { Component, OnInit, Input } from '@angular/core';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';

import { AttachmentsActions, Attachment } from './attachments.model';
import { CurrentUser } from '../../shared/models';

@Component({
  selector: 'am-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent extends SmartComponent implements OnInit {

  @Input() removeAction = AttachmentsActions.REMOVE;
  @Input() uploadAction = AttachmentsActions.ADD;
  @Input() uploadUrl = '';

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

  upload(files: any[]) {
    const payload = new FormData();
    files.forEach(f => {
      payload.append('file', f);
    });
    this.addAttachment(build(Attachment, payload));
  }

  addAttachment(attachment: Attachment) {
    this.dispatch(HttpActions.post(`${this.uploadUrl}/attachments`, attachment, this.uploadAction));
  }

  deleteAttachment(attachmentId: number) {
    this.dispatch(HttpActions.delete(`${this.uploadUrl}/attachments/${attachmentId}`, attachmentId, this.removeAction));
  }

  updateAttachments(attachments: Attachment[]) {
    this.dispatch(HttpActions.post(`${this.uploadUrl}/attachments`, attachments, this.uploadAction));
  }

}
