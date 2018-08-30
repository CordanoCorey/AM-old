import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'am-search-tips',
  templateUrl: './search-tips.component.html',
  styleUrls: ['./search-tips.component.scss']
})
export class SearchTipsComponent implements OnInit {

  @Input() show: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
