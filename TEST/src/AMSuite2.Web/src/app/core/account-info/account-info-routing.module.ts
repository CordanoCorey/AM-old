import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountInfoComponent } from './account-info.component';

export const AccountInfoRoute = {
  path: '',
  component: AccountInfoComponent
};

const routes: Routes = [AccountInfoRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AccountInfoRoutingModule { }
