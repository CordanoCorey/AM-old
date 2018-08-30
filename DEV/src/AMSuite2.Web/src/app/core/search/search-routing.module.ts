import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';

export const SearchRoute = {
  path: '',
  component: SearchComponent,
  data: { routeName: 'search', routeLabel: 'Search' }
};

const routes: Routes = [SearchRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SearchRoutingModule { }
