import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Route, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { DialogModel, DialogAction } from '@caiu/common';
import { build } from '@caiu/core';

import { BinComponent } from './bin.component';
import { Observable } from '../../shared/observable';

@Injectable()
export class BinResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'close', label: 'Close', primary: true })
    ];
    return Observable.of(build(DialogModel, { title: 'Bin', width: '1000px', actions }));
  }
}

export const BinRoute: Route = {
  path: 'bin',
  outlet: 'popup',
  component: BinComponent,
  data: { routeName: 'bin', routeLabel: 'Bin' },
  resolve: {
    dialog: BinResolver
  }
};

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BinResolver]
})
export class BinRoutingModule { }
