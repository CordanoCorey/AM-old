import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { build } from '@caiu/core';

import { Agenda } from '../../agendas/agendas.model';
import { Meeting } from '../../meeting/meeting.model';

@Component({
  selector: 'am-meeting-panel',
  templateUrl: './meeting-panel.component.html',
  styleUrls: ['./meeting-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingPanelComponent implements OnInit {

  @Input() meeting: Meeting = new Meeting();
  @Input() accountUrl = '';

  get agendas(): Agenda[] {
    return this.meeting.agendas;
  }

  get newAgendaLink(): string {
    return `/${this.accountUrl}/meetings/${this.meetingId}/edit/agendas/0`;
  }

  get hasAgendas(): boolean {
    return this.hasId && this.agendas.length > 0;
  }

  get hasId(): boolean {
    return this.meeting.id !== 0;
  }

  get meetingId(): number {
    return this.meeting.id;
  }

  get meetingName(): string {
    return this.meeting.name;
  }

  get templatesLink(): any {
    return [`/`, { outlets: { popup: 'templates' } }];
  }

  constructor() { }

  ngOnInit() {
  }

}
