import { Component, OnInit } from '@angular/core';
import { DialogModel, DialogAction } from '@caiu/common';
import { build } from '@caiu/core';
import { Store, SmartComponent } from '@caiu/store';

import { File } from './files.model';
import { CurrentUser } from '../../shared/models';
import { HttpActions } from '@caiu/http';
import { FileActions } from './file.reducer';
import { FilesActions } from './files.reducer';

@Component({
  selector: 'am-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent extends SmartComponent implements OnInit {

  constructor(public store: Store<any>) {
    super(store);
  }

  get dialogModel(): DialogModel {
    const actions = [
      build(DialogAction, { value: 'no', label: 'No', primary: false }),
      build(DialogAction, { value: 'yes', label: 'Yes', primary: true }),
      build(DialogAction, { value: 'maybe', label: 'Maybe', primary: true })
    ];
    return build(DialogModel, { title: 'Files Dialog', actions });
  }

  ngOnInit() {
  }

  addFile(file: File) {
    this.dispatch(HttpActions.post(`files`, file, FilesActions.POST));
  }

  deleteFile(fileId: number) {
    this.dispatch(HttpActions.delete(`files/${fileId}`, fileId, FileActions.DELETE));
  }

  getFiles() {
    this.dispatch(HttpActions.get(`files`, FilesActions.GET));
  }

  getFile(fileId: number) {
    this.dispatch(HttpActions.get(`files/${fileId}`, FileActions.GET));
  }

  updateFile(file: File) {
    this.dispatch(HttpActions.put(`files/${file.id}`, file, FileActions.PUT));
  }

}
