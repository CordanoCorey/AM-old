import { NgModule } from '@angular/core';

import { AttachmentsRoutingModule } from './attachments-routing.module';
import { AttachmentsComponent } from './attachments.component';
import { AttachmentPreviewComponent } from './attachment-preview/attachment-preview.component';
import { AttachmentsUploadComponent } from './attachments-upload/attachments-upload.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AttachmentsRoutingModule
  ],
  declarations: [
    AttachmentsComponent,
    AttachmentsUploadComponent,
    AttachmentPreviewComponent,
  ],
  exports: [
    AttachmentsComponent,
    AttachmentsUploadComponent,
    AttachmentPreviewComponent,
  ]
})
export class AttachmentsModule { }
