import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'am-audit-info',
  templateUrl: './audit-info.component.html',
  styleUrls: ['./audit-info.component.scss']
})
export class AuditInfoComponent implements OnInit {

  @Input() createdBy = '';
  @Input() modifiedBy = '';
  constructor() { }

  ngOnInit() {
  }

}
