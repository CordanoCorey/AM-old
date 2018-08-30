import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaEditComponent } from './agenda-edit.component';
import { AgendaIdGuard } from '../agendas/agendas-routing.module';

export const AgendaEditRoute = {
  path: '',
  canActivate: [AgendaIdGuard],
  component: AgendaEditComponent,
  data: { routeName: 'agenda-edit', routeLabel: 'Edit Agenda' }
};

const routes: Routes = [AgendaEditRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaEditRoutingModule { }
