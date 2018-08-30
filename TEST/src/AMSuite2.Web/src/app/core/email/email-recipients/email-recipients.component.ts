import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { EmailRecipientComponent } from '../email-recipient/email-recipient.component';

export const RECIPIENTS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmailRecipientComponent),
  multi: true
};

@Component({
  selector: 'am-email-recipients',
  templateUrl: './email-recipients.component.html',
  styleUrls: ['./email-recipients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RECIPIENTS_ACCESSOR]
})
export class EmailRecipientsComponent implements ControlValueAccessor {

  private onModelChange: Function;
  private onTouch: Function;

  value: string;
  focused: string;

  constructor() { }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  onChange(value: string) {
    this.value = value;
    this.onModelChange(value);
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    this.onTouch();
  }

}
