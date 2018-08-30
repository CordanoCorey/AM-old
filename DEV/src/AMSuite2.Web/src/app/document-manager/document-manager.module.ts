import { NgModule } from '@angular/core';
import { DocumentManagerRoutingModule } from './document-manager-routing.module';
import { DocumentManagerComponent } from './document-manager.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    DocumentManagerRoutingModule
  ],
  declarations: [DocumentManagerComponent]
})
export class DocumentManagerModule { }
