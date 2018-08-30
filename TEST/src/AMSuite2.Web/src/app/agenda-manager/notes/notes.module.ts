import { NgModule } from '@angular/core';

import { NotesComponent } from './notes.component';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { NotesPreviewComponent } from './notes-preview/notes-preview.component';
import { MinutesModule } from '../minutes/minutes.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MinutesModule,
  ],
  declarations: [
    NotesComponent,
    NotesFormComponent,
    NotesPreviewComponent,
  ],
  exports: [
    NotesComponent,
    NotesPreviewComponent,
  ]
})
export class NotesModule { }
