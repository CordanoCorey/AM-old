import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { FilesComponent } from './files.component';

export const FilesRoute: Route = {
  path: '',
  component: FilesComponent,
  data: { routeName: 'files', routeLabel: 'Files' }
};

const routes: Routes = [FilesRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FilesRoutingModule { }
