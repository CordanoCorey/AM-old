import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'am-about-account-info',
  templateUrl: './about-account-info.component.html',
  styleUrls: ['./about-account-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutAccountInfoComponent {

  @Input() accountUrl = '';

  constructor() { }

  get accountLink(): string {
    return `/${this.accountUrl}`;
  }

}
