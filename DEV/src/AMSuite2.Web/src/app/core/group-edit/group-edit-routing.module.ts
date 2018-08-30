import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { GroupEditComponent } from './group-edit.component';

export const GroupEditRoute: Route = {
  path: '',
  component: GroupEditComponent,
  data: { routeName: 'group-edit', routeLabel: 'Edit Group' }
};

const routes: Routes = [GroupEditRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GroupEditRoutingModule { }
