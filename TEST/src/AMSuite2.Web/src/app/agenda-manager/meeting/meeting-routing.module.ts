import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingComponent } from './meeting.component';

export const MeetingRoute = {
  path: '',
  component: MeetingComponent,
  children: [
    {
      path: 'agendas',
      loadChildren: 'app/agenda-manager/agendas/agendas.module#AgendasModule'
    },
  ]
};

const routes: Routes = [MeetingRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MeetingRoutingModule { }
