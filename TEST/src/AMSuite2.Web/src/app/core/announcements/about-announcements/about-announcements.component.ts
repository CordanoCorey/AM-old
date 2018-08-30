import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-about-announcements',
  templateUrl: './about-announcements.component.html',
  styleUrls: ['./about-announcements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutAnnouncementsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
