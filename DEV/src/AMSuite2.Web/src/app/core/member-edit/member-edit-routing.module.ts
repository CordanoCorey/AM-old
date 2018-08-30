import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { MemberEditComponent } from './member-edit.component';

export const MemberEditRoute: Route = {
  path: '',
  component: MemberEditComponent,
  data: { routeName: 'member-edit', routeLabel: 'Edit Member' }
};

const routes: Routes = [MemberEditRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MemberEditRoutingModule { }
