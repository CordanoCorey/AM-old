import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { DialogModel, DialogAction } from '@caiu/common';
import { build } from '@caiu/core';

import { EmailItemComponent } from './email-item.component';
import { Observable } from '../../shared/observable';

@Injectable()
export class EmailItemResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'close', label: 'Close', color: 'accent' }),
      build(DialogAction, { value: 'send', label: 'Send', color: 'accent' })
    ];
    return Observable.of(build(DialogModel, { title: 'EmailItem', width: '1000px', actions }));
  }
}

export const EmailItemRoute: Route = {
  path: 'email',
  outlet: 'popup',
  component: EmailItemComponent,
  resolve: {
    dialog: EmailItemResolver
  }
};

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    EmailItemResolver,
  ]
})
export class EmailItemRoutingModule { }
