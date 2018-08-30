import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { AccountDetailComponent } from './account-detail.component';

export const AccountRoute: Route = {
  path: '',
  component: AccountDetailComponent
};

const routes: Routes = [AccountRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountRoutingModule { }
