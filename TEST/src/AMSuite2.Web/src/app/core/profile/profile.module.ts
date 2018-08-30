import { NgModule } from '@angular/core';
import { CustomStoreModule } from '@caiu/store';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AccountGroupsComponent } from './account-groups/account-groups.component';
import { JoinAccountComponent } from './join-account/join-account.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    AccountGroupsComponent,
    UserAccountsComponent,
    ProfileFormComponent,
    JoinAccountComponent
  ]
})
export class ProfileModule { }
