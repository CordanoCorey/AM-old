import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { Header } from './header.model';
import { CurrentUserModule } from '../../shared/current-user/current-user.module';
import { TabsModule } from '../../shared/tabs/tabs.module';
import { SearchWidgetModule } from '../../core/search-widget/search-widget.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CurrentUserModule,
    TabsModule,
    SearchWidgetModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
