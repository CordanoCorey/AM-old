import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-heading-login',
  template: `
    <div class="login-header">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .login-heading { 
      font-size: 1.4em; 
      text-align: left; 
      padding: 0.5em; 
      float: left; 
    }
  `]
})
export class HeadingLoginComponent {

  constructor() { }

}
