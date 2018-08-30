import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsavedChangesComponent } from './unsaved-changes.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UnsavedChangesComponent,
  ],
  exports: [
    UnsavedChangesComponent,
  ]
})
export class UnsavedChangesModule { }
