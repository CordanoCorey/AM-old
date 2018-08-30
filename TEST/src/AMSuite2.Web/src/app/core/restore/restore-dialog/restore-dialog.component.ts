import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { DialogModel, DialogAction } from '@caiu/common';
import { build } from '@caiu/core';
import { HttpActions } from '@caiu/http';

@Component({
  selector: 'am-restore-dialog',
  templateUrl: './restore-dialog.component.html',
  styleUrls: ['./restore-dialog.component.scss']
})
export class RestoreDialogComponent {

  constructor(public dialogRef: MdDialogRef<RestoreDialogComponent>) {
  }

  get dialog(): DialogModel {
    const actions = [
      build(DialogAction, { value: 'yes', label: 'Yes', primary: true }),
      build(DialogAction, { value: 'no', label: 'No', primary: false })
    ];
    return build(DialogModel, { title: 'Restore Confirmation', actions });
  }

}
