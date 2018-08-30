import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'am-email-recipient',
  templateUrl: './email-recipient.component.html',
  styleUrls: ['./email-recipient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailRecipientComponent {

  @Input() email = '';
  @Input() userName = '';

  constructor() { }

}
