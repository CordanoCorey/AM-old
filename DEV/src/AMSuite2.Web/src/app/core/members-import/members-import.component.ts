import { Component, OnInit } from '@angular/core';
import { throwNotImplementedException } from '@caiu/core';
import { Store, SmartComponent } from '@caiu/store';

import { CurrentUser } from '../../shared/models';

@Component({
  selector: 'am-members-import',
  templateUrl: './members-import.component.html',
  styleUrls: ['./members-import.component.scss']
})
export class MembersImportComponent extends SmartComponent implements OnInit {

  routeName = 'members-import';

  constructor(public store: Store<any>) {
    super(store);
  }

  ngOnInit() {
  }

  getAccountMembers() {
    throwNotImplementedException();
  }

  updateGroupMembers() {
    throwNotImplementedException();
  }

}
