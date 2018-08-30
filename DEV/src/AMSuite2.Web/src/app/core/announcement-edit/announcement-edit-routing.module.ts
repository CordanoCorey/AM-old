import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementEditComponent } from './announcement-edit.component';

export const AnnouncementEditRoute = {
  path: '',
  component: AnnouncementEditComponent,
  data: { routeName: 'announcement-edit', routeLabel: 'Edit Announcement' }
};

const routes: Routes = [AnnouncementEditRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AnnouncementEditRoutingModule { }
