import { NgModule } from '@angular/core';

import { AccountEditRoutingModule } from './account-edit-routing.module';
import { AccountEditComponent } from './account-edit.component';
import { AboutAccountsComponent } from './about-accounts/about-accounts.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountAdminFormComponent } from './account-admin-form/account-admin-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AccountEditRoutingModule,
  ],
  declarations: [
    AccountEditComponent,
    AboutAccountsComponent,
    AccountFormComponent,
    AccountAdminFormComponent,
  ]
})
export class AccountEditModule { }
