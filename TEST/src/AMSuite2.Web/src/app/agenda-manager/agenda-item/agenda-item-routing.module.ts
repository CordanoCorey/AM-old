import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { AgendaItemComponent } from './agenda-item.component';
import { AgendaItemIdGuard } from '../agenda-items/agenda-items-routing.module';

const AgendaItemRoute: Route = {
  path: '',
  component: AgendaItemComponent,
  // canActivate: [AgendaItemIdGuard]
};

const routes: Routes = [AgendaItemRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaItemRoutingModule { }
