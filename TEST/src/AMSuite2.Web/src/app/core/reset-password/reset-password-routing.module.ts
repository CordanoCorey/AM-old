import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { buildLazyRoute } from '@caiu/router';
import { ResetPasswordComponent } from './reset-password.component';

const ResetPasswordRoute: Route = {
  path: '',
  component: ResetPasswordComponent
};

const routes: Routes = [ResetPasswordRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ResetPasswordRoutingModule { }
