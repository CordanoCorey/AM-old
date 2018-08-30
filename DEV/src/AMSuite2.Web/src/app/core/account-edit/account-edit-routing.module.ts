import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { AccountEditComponent } from './account-edit.component';

export const AccountEditRoute: Route = {
  path: '',
  component: AccountEditComponent,
  data: { routeName: 'account-edit', routeLabel: 'Account Edit' }
};

const routes: Routes = [AccountEditRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountEditRoutingModule { }
