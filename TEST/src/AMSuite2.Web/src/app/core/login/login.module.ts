import { NgModule } from '@angular/core';
import { build } from '@caiu/core';
import { EffectsModule } from '@caiu/effects';
import { CustomStoreModule, Store } from '@caiu/store';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
  ],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule { }
