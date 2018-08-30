import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Attachment } from '../attachments.model';

@Component({
  selector: 'am-attachment-preview',
  templateUrl: './attachment-preview.component.html',
  styleUrls: ['./attachment-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttachmentPreviewComponent {

  @Input() attachment: Attachment = new Attachment();

  constructor() { }

  get attachmentLink(): string {
    return '';
  }

  get attachmentName(): string {
    return this.attachment.name;
  }

  get isDefault(): boolean {
    return !(this.isDoc || this.isPdf || this.isXls);
  }

  get isDoc(): boolean {
    return this.attachment.fileExtension === '.doc' || this.attachment.fileExtension === '.docx';
  }

  get isPdf(): boolean {
    return this.attachment.fileExtension === '.pdf';
  }

  get isXls(): boolean {
    return this.attachment.fileExtension === '.xls' || this.attachment.fileExtension === '.xlsx';
  }

}
