import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintPreviewComponent implements OnInit {

  constructor() { }

  get showAttendance(): boolean {
    return true;
  }

  ngOnInit() {
  }

}
