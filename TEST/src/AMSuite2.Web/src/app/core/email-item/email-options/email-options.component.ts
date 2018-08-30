import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { build } from '@caiu/core';

import { EmailOptions } from '../email-item.model';

@Component({
  selector: 'am-email-options',
  templateUrl: './email-options.component.html',
  styleUrls: ['./email-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailOptionsComponent {

  @Output() changes = new EventEmitter<EmailOptions>();
  convertAttachments = false;
  showAttachments = false;
  showDescriptions = false;
  showMinutes = false;
  showNotes = false;
  showPreview = false;
  showVotes = false;

  constructor() { }

  get options(): EmailOptions {
    return build(EmailOptions, {
      convertAttachments: false,
      hasAttachments: false,
      hasDescriptions: false,
      hasMinutes: false,
      hasNotes: false,
      hasPreview: false,
      hasVotes: false
    });
  }

  get previewLinkText(): string {
    return this.showPreview ? 'hide preview' : 'show preview';
  }

  onChanges() {
    this.changes.emit(this.options);
  }

  changeConvertAttachments(value: boolean) {
    this.convertAttachments = value;
    this.onChanges();
  }

  toggleAttachments() {
    this.showAttachments = !this.showAttachments;
    this.onChanges();
  }

  toggleDescriptions() {
    this.showDescriptions = !this.showDescriptions;
    this.onChanges();
  }

  toggleMinutes() {
    this.showMinutes = !this.showMinutes;
    this.onChanges();
  }

  toggleNotes() {
    this.showNotes = !this.showNotes;
    this.onChanges();
  }

  togglePreview() {
    this.showPreview = !this.showPreview;
    this.onChanges();
  }

  toggleVotes() {
    this.showVotes = !this.showVotes;
    this.onChanges();
  }

}
