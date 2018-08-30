import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-about-meetings',
  templateUrl: './about-meetings.component.html',
  styleUrls: ['./about-meetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMeetingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
