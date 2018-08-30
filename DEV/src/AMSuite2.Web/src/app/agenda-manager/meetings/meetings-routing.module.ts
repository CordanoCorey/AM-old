import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { MeetingsComponent } from './meetings.component';

export const MeetingsRoute: Route = {
  path: '',
  data: { routeName: 'meetings', routeLabel: 'Meetings' },
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: MeetingsComponent,
    },
  ]
};

const routes: Routes = [MeetingsRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MeetingsRoutingModule { }
