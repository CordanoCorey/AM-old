import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { AccountsComponent } from './accounts.component';

export const AccountsRoute: Route = {
  path: '',
  component: AccountsComponent,
  data: { routeName: 'accounts', routeLabel: 'Accounts' }
};

const routes: Routes = [AccountsRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountsRoutingModule { }
