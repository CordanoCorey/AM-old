import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { CurrentUserComponent } from './current-user.component';
import { CurrentUserDialogComponent } from './current-user-dialog/current-user-dialog.component';
import { CurrentUserAccountsComponent } from './current-user-accounts/current-user-accounts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdButtonModule,
    MdIconModule,
  ],
  declarations: [
    CurrentUserComponent,
    CurrentUserDialogComponent,
    CurrentUserAccountsComponent,
  ],
  exports: [
    CurrentUserComponent,
  ]
})
export class CurrentUserModule { }
