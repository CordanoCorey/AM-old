import { Component, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, OnChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { toInt } from '@caiu/core';
import { DumbComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'am-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserRolesComponent extends DumbComponent implements OnChanges, OnInit {

  @Input() roleId = 0;
  @Input() sysAdmin = false;
  @Output() changeRole = new EventEmitter<number>();
  control: AbstractControl;

  constructor() {
    super();
  }

  get controlValue(): number {
    return this.control ? toInt(this.control.value) : 0;
  }

  get valueChanges(): Subscription {
    return this.control.valueChanges.subscribe(id => {
      if (toInt(id) !== this.roleId) { // only emit if value has changed in model
        this.changeRole.emit(toInt(id));
      }
    });
  }

  ngOnChanges() {
    if (this.roleId !== this.controlValue && this.control && this.control.setValue) {
      this.control.setValue(this.roleId.toString());
    }
  }

  ngOnInit() {
    this.control = new FormControl(this.roleId.toString());
    this.subscribe([this.valueChanges]);
  }

}
