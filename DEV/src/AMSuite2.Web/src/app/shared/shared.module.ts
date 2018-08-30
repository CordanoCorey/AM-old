import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatTabsModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CommonModule, AccordionModule, DatepickerModule, DaterangeModule, DialogModule, EditorModule, FileUploadModule, GridModule } from '@caiu/common';
import { ErrorsModule } from '@caiu/errors';
import { FormsModule } from '@caiu/forms';

import { ArrowsUpDownComponent } from './arrows-up-down/arrows-up-down.component';
import { AuditInfoComponent } from './audit-info/audit-info.component';
import { BannerComponent } from './banner/banner.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { FooterLoginComponent } from './footer-login/footer-login.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { HeadingLoginComponent } from './header-login/heading-login.component';
import { LogoComponent } from './logo/logo.component';
import { PanelsModule } from './panels/panels.module';
import { TestRoutesComponent } from './test-routes/test-routes.component';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { ValidationRequiredComponent } from './validation-required/validation-required.component';
import { WidgetComponent } from './widget/widget.component';
import { WidgetModule } from './widget/widget.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorsModule,
    MatInputModule,
    MatTabsModule,
    AccordionModule,
    DatepickerModule,
    DaterangeModule,
    EditorModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    GridModule,
    PanelsModule,
    WidgetModule,
  ],
  declarations: [
    ArrowsUpDownComponent,
    AuditInfoComponent,
    BannerComponent,
    ContactSupportComponent,
    FooterLoginComponent,
    HeaderLoginComponent,
    HeadingLoginComponent,
    LogoComponent,
    TestRoutesComponent,
    ValidationMessageComponent,
    ValidationRequiredComponent,
  ],
  exports: [
    MatInputModule,
    MatTabsModule,
    CommonModule,
    DatepickerModule,
    DaterangeModule,
    DialogModule,
    EditorModule,
    ErrorsModule,
    FormsModule,
    GridModule,
    PanelsModule,
    RouterModule,
    WidgetModule,
    AccordionModule,
    ArrowsUpDownComponent,
    AuditInfoComponent,
    BannerComponent,
    ContactSupportComponent,
    FileUploadModule,
    FooterLoginComponent,
    HeaderLoginComponent,
    HeadingLoginComponent,
    LogoComponent,
    TestRoutesComponent,
    ValidationMessageComponent,
    ValidationRequiredComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
