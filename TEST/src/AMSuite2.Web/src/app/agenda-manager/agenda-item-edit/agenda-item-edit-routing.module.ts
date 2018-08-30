import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { AgendaItemEditComponent } from './agenda-item-edit.component';
import { AgendaItemIdGuard } from '../agenda-items/agenda-items-routing.module';

const AgendaItemEditRoute: Route = {
  path: '',
  component: AgendaItemEditComponent,
  // canActivate: [AgendaItemIdGuard]
};

const routes: Routes = [AgendaItemEditRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaItemEditRoutingModule { }
