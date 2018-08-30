import { NgModule } from '@angular/core';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchFiltersComponent } from './search-filters/search-filters.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchTipsComponent } from './search-tips/search-tips.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SearchRoutingModule,
  ],
  declarations: [
    SearchComponent,
    SearchTipsComponent,
    SearchFiltersComponent,
    SearchResultsComponent,
    SearchResultComponent,
  ]
})
export class SearchModule { }
