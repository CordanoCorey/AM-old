import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { AgendaItemComponent } from './agenda-item.component';

const AgendaItemRoute: Route = {
  path: '',
  component: AgendaItemComponent,
  data: { routeName: 'agenda-item', routeLabel: 'Agenda Item' }
};

const routes: Routes = [AgendaItemRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaItemRoutingModule { }
