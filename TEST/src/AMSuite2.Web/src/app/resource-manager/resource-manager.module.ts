import { NgModule } from '@angular/core';
import { ResourceManagerRoutingModule } from './resource-manager-routing.module';
import { ResourceManagerComponent } from './resource-manager.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ResourceManagerRoutingModule
  ],
  declarations: [ResourceManagerComponent]
})
export class ResourceManagerModule { }
