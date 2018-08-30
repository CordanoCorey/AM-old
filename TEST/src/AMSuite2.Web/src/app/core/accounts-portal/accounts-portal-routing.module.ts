import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { AccountsPortalComponent } from './accounts-portal.component';

export const AccountsPortalRoute: Route = {
  path: '',
  component: AccountsPortalComponent
};

const routes: Routes = [AccountsPortalRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountsPortalRoutingModule { }
