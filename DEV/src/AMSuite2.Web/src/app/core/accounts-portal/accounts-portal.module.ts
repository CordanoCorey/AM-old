import { NgModule } from '@angular/core';

import { AccountsPortalRoutingModule } from './accounts-portal-routing.module';
import { AccountsPortalComponent } from './accounts-portal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AccountsPortalRoutingModule,
  ],
  declarations: [AccountsPortalComponent]
})
export class AccountsPortalModule { }
