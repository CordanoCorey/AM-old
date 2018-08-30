import { NgModule, Injectable } from '@angular/core';
import { Routes, Router, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { CustomStore } from '@caiu/store';

import { DashboardComponent } from './dashboard.component';
import { Dashboard } from './dashboard.model';
import { AuthenticatedGuard } from '../../app-routing.module';
import { Observable } from '../../shared/observable';

export const DashboardRoute: Route = {
  path: '',
  component: DashboardComponent,
  data: { routeName: 'dashboard', routeLabel: 'Dashboard' }
  // canActivate: [AuthenticatedGuard]
};

const routes: Routes = [
  DashboardRoute,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule { }
