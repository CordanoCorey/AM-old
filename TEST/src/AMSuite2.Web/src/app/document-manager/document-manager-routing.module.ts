import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const documentManagerRoutes = [
  {
    path: 'files',
    pathMatch: 'full',
    loadChildren: 'app/document-manager/files/files.module#FilesModule'
  },
];

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DocumentManagerRoutingModule { }
