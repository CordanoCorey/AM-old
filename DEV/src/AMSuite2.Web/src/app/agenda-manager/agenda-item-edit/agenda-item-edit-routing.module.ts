import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { AgendaItemEditComponent } from './agenda-item-edit.component';

const AgendaItemEditRoute: Route = {
  path: '',
  component: AgendaItemEditComponent,
  data: { routeName: 'agenda-item-edit', routeLabel: 'Edit Agenda Item' }
};

const routes: Routes = [AgendaItemEditRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaItemEditRoutingModule { }
