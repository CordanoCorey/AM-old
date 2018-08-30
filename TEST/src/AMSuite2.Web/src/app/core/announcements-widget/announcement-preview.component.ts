import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Announcement } from '../announcements/announcements.model';

@Component({
  selector: 'am-announcement-preview',
  templateUrl: './announcement-preview.component.html',
  styleUrls: ['./announcement-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnouncementPreviewComponent implements OnInit {

  @Input() announcement: Announcement = new Announcement();

  constructor() { }

  ngOnInit() {
  }

}
