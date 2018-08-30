import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RestoreComponent } from './restore.component';

const RestoreRoute: Route = {
  path: '',
  component: RestoreComponent,
  data: { routeName: 'restore', routeLabel: 'Restore' }
};

const routes: Routes = [RestoreRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RestoreRoutingModule { }
