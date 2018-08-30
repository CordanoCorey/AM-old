import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'am-validation-required',
  templateUrl: './validation-required.component.html',
  styleUrls: ['./validation-required.component.scss']
})
export class ValidationRequiredComponent implements OnInit {

  @Input() show = false;

  constructor() { }

  ngOnInit() {
  }

}
