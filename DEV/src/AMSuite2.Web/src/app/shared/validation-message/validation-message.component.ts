import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'am-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() message = '';
  @Input() show = false;

  constructor() { }

  get showMessage(): boolean {
    return this.show && this.message !== '';
  }

  ngOnInit() {
  }

}
