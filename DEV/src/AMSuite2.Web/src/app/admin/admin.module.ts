import { NgModule } from '@angular/core';
import { build } from '@caiu/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderModule } from '../core/header/header.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HeaderModule,
    AdminRoutingModule,
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
