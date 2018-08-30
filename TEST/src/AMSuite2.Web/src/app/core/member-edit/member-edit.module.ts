import { NgModule } from '@angular/core';

import { MemberEditRoutingModule } from './member-edit-routing.module';
import { MemberEditComponent } from './member-edit.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MemberEditRoutingModule,
  ],
  declarations: [
    MemberEditComponent,
    MemberFormComponent,
    UserGroupsComponent,
    UserRolesComponent,
  ]
})
export class MemberEditModule { }
