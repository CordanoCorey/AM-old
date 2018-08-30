import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { HeaderModule } from '../core/header/header.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    AccountRoutingModule,
  ],
  declarations: [AccountComponent],
  providers: []
})
export class AccountModule { }
