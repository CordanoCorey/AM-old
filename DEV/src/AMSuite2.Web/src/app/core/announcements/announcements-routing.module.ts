import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { AnnouncementsComponent } from './announcements.component';

const announcementRoutes = [
  {
    path: ':announcementId',
    pathMatch: 'full',
    redirectTo: ':announcementId/edit'
  },
  {
    path: ':announcementId/edit',
    loadChildren: 'app/core/announcement-edit/announcement-edit.module#AnnouncementEditModule'
  },
];

export const AnnouncementsRoute: Route = {
  path: '',
  component: AnnouncementsComponent,
  data: { routeName: 'announcements', routeLabel: 'Announcements' },
  children: [
    ...announcementRoutes
  ]
};

const routes: Routes = [AnnouncementsRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AnnouncementsRoutingModule { }
