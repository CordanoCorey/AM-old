import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-detail-routing.module';
import { AccountDetailComponent } from './account-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule,
  ],
  declarations: [
    AccountDetailComponent,
  ]
})
export class AccountDetailModule { }
