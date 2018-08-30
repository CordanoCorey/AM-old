import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { AgendaItemMinutes } from '../minutes.model';

@Component({
  selector: 'am-minutes-preview',
  templateUrl: './minutes-preview.component.html',
  styleUrls: ['./minutes-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinutesPreviewComponent {

  @Input() minutes: AgendaItemMinutes = new AgendaItemMinutes();

  constructor() { }

  get html(): string {
    return this.minutes.minutes;
  }

}
