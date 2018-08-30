import { NgModule } from '@angular/core';

import { AccountInfoRoutingModule } from './account-info-routing.module';
import { AccountInfoComponent } from './account-info.component';
import { AboutAccountInfoComponent } from './about-account-info/about-account-info.component';
import { AccountInfoFormComponent } from './account-info-form/account-info-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AccountInfoRoutingModule,
  ],
  declarations: [
    AccountInfoComponent,
    AboutAccountInfoComponent,
    AccountInfoFormComponent,
  ]
})
export class AccountInfoModule { }
