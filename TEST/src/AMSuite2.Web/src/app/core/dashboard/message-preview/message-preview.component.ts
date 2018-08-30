import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardMessage } from '../dashboard.model';

@Component({
  selector: 'am-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagePreviewComponent {

  @Input() message: DashboardMessage = new DashboardMessage();

  constructor() { }

  get subject(): string {
    return this.message.subject;
  }

}
