import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-about-accounts',
  templateUrl: './about-accounts.component.html',
  styleUrls: ['./about-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutAccountsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
