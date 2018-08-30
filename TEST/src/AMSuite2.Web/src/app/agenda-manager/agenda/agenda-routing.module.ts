import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { str2int } from '@caiu/core';
import { Store } from '@caiu/store';

import { AgendaComponent } from './agenda.component';
import { AgendaIdGuard } from '../agendas/agendas-routing.module';
import { AgendasActions } from '../agendas/agendas.reducer';
import { Observable } from '../../shared/observable';

export const AgendaRoute: Route = {
  path: '',
  canActivate: [AgendaIdGuard],
  component: AgendaComponent,
  children: [
    {
      path: 'agendaitems',
      loadChildren: 'app/agenda-manager/agenda-items/agenda-items.module#AgendaItemsModule'
    },
  ]
};

const routes: Routes = [AgendaRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
