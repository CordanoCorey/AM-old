import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Route, CanActivate } from '@angular/router';
import { DialogModel, DialogAction } from '@caiu/common';
import { build, str2int } from '@caiu/core';
import { Store } from '@caiu/store';

import { AnnouncementComponent } from './announcement.component';
import { AnnouncementsActions } from '../announcements/announcements.reducer';
import { Observable } from '../../shared/observable';

@Injectable()
export class AnnouncementIdGuard implements CanActivate {

  constructor(private store: Store<any>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const id = str2int(route.params['announcementId']);
    this.store.dispatch(AnnouncementsActions.activate(id));
    return Observable.of(true);
  }
}

@Injectable()
export class AnnouncementResolver implements Resolve<DialogModel> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DialogModel> {
    const actions = [
      build(DialogAction, { value: 'close', label: 'Close', primary: true })
    ];
    return Observable.of(build(DialogModel, { title: 'Announcement', height: 600, width: 800, actions }));
  }
}

export const AnnouncementRoute: Route = {
  path: 'announcement',
  outlet: 'popup',
  component: AnnouncementComponent,
  canActivate: [AnnouncementIdGuard],
  resolve: {
    dialog: AnnouncementResolver
  }
};

const routes: Routes = [AnnouncementRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AnnouncementIdGuard, AnnouncementResolver]
})
export class AnnouncementRoutingModule { }
