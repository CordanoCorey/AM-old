import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { EmailComponent } from './email.component';

export const EmailRoute: Route = {
  path: '',
  component: EmailComponent,
  data: { routeName: 'email', routeLabel: 'Email' }
};

const routes: Routes = [EmailRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmailRoutingModule { }
