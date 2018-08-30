import { NgModule } from '@angular/core';

import { GroupEditRoutingModule } from './group-edit-routing.module';
import { GroupEditComponent } from './group-edit.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupMembersComponent } from './group-members/group-members.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    GroupEditRoutingModule,
  ],
  declarations: [
    GroupEditComponent,
    GroupFormComponent,
    GroupMembersComponent,
  ]
})
export class GroupEditModule { }
