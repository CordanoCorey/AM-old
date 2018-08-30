import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-bin-empty',
  templateUrl: './bin-empty.component.html',
  styleUrls: ['./bin-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinEmptyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
