import { NgModule } from '@angular/core';

import { MeetingsWidgetComponent } from './meetings-widget.component';
import { MeetingsModule } from '../meetings/meetings.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MeetingsModule,
  ],
  declarations: [MeetingsWidgetComponent],
  exports: [MeetingsWidgetComponent]
})
export class MeetingsWidgetModule { }
