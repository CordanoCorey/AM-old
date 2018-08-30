import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-about-members',
  templateUrl: './about-members.component.html',
  styleUrls: ['./about-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMembersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
