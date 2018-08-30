import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { str2int } from '@caiu/core';
import { Store } from '@caiu/store';

import { MeetingsActions } from './meetings/meetings.reducer';
import { Observable } from '../shared/observable';

@Injectable()
export class MeetingIdGuard implements CanActivate {

  constructor(private store: Store<any>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const id = str2int(route.params['meetingId']);
    this.store.dispatch(MeetingsActions.activate(id));
    return Observable.of(true);
  }
}

export const routes = [
  {
    path: 'meetings/:meetingId/edit',
    canActivate: [MeetingIdGuard],
    loadChildren: 'app/agenda-manager/meeting-edit/meeting-edit.module#MeetingEditModule'
  },
  {
    path: 'meetings/:meetingId',
    canActivate: [MeetingIdGuard],
    loadChildren: 'app/agenda-manager/meeting/meeting.module#MeetingModule'
  },
  {
    path: 'meetings',
    loadChildren: 'app/agenda-manager/meetings/meetings.module#MeetingsModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MeetingIdGuard]
})
export class AgendaManagerRoutingModule { }
