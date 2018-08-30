import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { MembersComponent } from './members.component';

export const MembersRoute: Route = {
  path: '',
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: MembersComponent
    },
    {
      path: 'import',
      loadChildren: 'app/core/members-import/members-import.module#MembersImportModule'
    },
    {
      path: ':memberId/edit',
      loadChildren: 'app/core/member-edit/member-edit.module#MemberEditModule'
    },
  ]
};

const routes: Routes = [MembersRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MembersRoutingModule { }
