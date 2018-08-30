import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Route } from '@angular/router';
import { DialogModel, DialogAction } from '@caiu/common';
import { build, str2int } from '@caiu/core';
import { Store } from '@caiu/store';

import { TemplatesComponent } from './templates.component';
import { TemplatesActions } from './templates.reducer';
import { Observable } from '../../shared/observable';

@Injectable()
export class TemplateIdGuard implements CanActivate {

  constructor(private store: Store<any>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const id = str2int(route.params['announcementId']);
    this.store.dispatch(TemplatesActions.activate(id));
    return Observable.of(true);
  }
}

@Injectable()
export class TemplateManagerResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'yes', label: 'Yes', primary: true }),
      build(DialogAction, { value: 'no', label: 'No', primary: false })
    ];
    return Observable.of(build(DialogModel, { title: 'Template Manager', width: '1000px', actions }));
  }
}

@Injectable()
export class TemplateDialogResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'yes', label: 'Yes', primary: true }),
      build(DialogAction, { value: 'no', label: 'No', primary: false })
    ];
    return Observable.of(build(DialogModel, { title: 'Template Manager', width: '1200px', actions }));
  }
}

export const TemplateManagerRoute: Route = {
  path: 'templates',
  outlet: 'popup',
  data: { routeName: 'template-manager', routeLabel: 'Template Manager' },
  component: TemplatesComponent,
  resolve: {
    dialog: TemplateManagerResolver
  }
};

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TemplateDialogResolver, TemplateManagerResolver]
})
export class TemplatesRoutingModule { }
