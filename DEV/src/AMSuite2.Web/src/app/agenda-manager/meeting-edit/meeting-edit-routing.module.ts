import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingEditComponent } from './meeting-edit.component';

export const MeetingEditRoute = {
  path: '',
  component: MeetingEditComponent,
  data: { routeName: 'meeting-edit', routeLabel: 'Edit Meeting' },
  children: [
    {
      path: 'agendas/:agendaId',
      loadChildren: 'app/agenda-manager/agenda-edit/agenda-edit.module#AgendaEditModule'
    }
  ]
};

const routes: Routes = [MeetingEditRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MeetingEditRoutingModule { }
