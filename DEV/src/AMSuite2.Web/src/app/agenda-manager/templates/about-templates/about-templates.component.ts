import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-about-templates',
  templateUrl: './about-templates.component.html',
  styleUrls: ['./about-templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutTemplatesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
