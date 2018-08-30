import { NgModule } from '@angular/core';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { AccountsGridComponent } from './accounts-grid/accounts-grid.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AccountsRoutingModule,
  ],
  declarations: [
    AccountsComponent,
    AccountsGridComponent,
  ]
})
export class AccountsModule { }
