import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { build } from '@caiu/core';
import { DialogModel, DialogAction } from '@caiu/common';
import { RouterActions, RouterService } from '@caiu/router';
import { Store, SmartComponent } from '@caiu/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DialogRoute } from './dialog-route.model';
import { CurrentUser } from '../models';
import { Observable } from '../observable';

@Component({
  selector: 'am-dialog-route',
  templateUrl: './dialog-route.component.html',
  styleUrls: ['./dialog-route.component.scss']
})
export class DialogRouteComponent extends SmartComponent implements OnInit {

  @ContentChild('outlet') outlet;
  dialog$: BehaviorSubject<DialogModel> = new BehaviorSubject<DialogModel>(new DialogModel());
  routeName = 'dialog';

  constructor(
    public store: Store<any>,
    public dialog: MatDialog,
    public router: RouterService) {
    super(store);
  }

  ngOnInit() {
  }

  onActivate(component: any) {
    this.dispatch(RouterActions.activate(component.routeName, this.routeName));
    this.dialog$.next(build(DialogModel, {
      title: component.title,
      actions: component.actions
    }));
  }

  onDeactivate(e: any) {
    this.dispatch(RouterActions.activate(this.routeName));
  }

}
