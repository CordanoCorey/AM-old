import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DialogModel, DialogAction } from '@caiu/common';
import { build } from '@caiu/core';

import { PrintComponent } from './print.component';
import { Observable } from '../../shared/observable';

@Injectable()
export class PrintResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'close', label: 'Close', primary: true })
    ];
    return Observable.of(build(DialogModel, { title: 'Print', width: '1000px', actions }));
  }
}

export const PrintRoute: Route = {
  path: 'print',
  outlet: 'popup',
  component: PrintComponent,
  resolve: {
    dialog: PrintResolver
  }
};

const routes: Routes = [PrintRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PrintResolver]
})
export class PrintRoutingModule { }
