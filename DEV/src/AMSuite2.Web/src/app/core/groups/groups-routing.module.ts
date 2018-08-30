import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { GroupsComponent } from './groups.component';

const groupRoutes = [
  {
    path: ':groupId',
    pathMatch: 'full',
    redirectTo: ':groupId/edit'
  },
  {
    path: ':groupId/edit',
    loadChildren: 'app/core/group-edit/group-edit.module#GroupEditModule'
  },
];

export const GroupsRoute: Route = {
  path: '',
  component: GroupsComponent,
  data: { routeName: 'groups', routeLabel: 'Groups' },
  children: [
    ...groupRoutes
  ]
};

const routes: Routes = [GroupsRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GroupsRoutingModule { }
