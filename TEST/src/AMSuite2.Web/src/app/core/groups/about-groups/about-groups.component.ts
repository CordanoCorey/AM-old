import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'am-about-groups',
  templateUrl: './about-groups.component.html',
  styleUrls: ['./about-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutGroupsComponent {

  @Input() accountUrl = '';

  constructor() { }

  get membersLink(): string {
    return `/${this.accountUrl}/members`;
  }

}
