import { Options } from 'ts-node/dist';
import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent, ModelControl } from '@caiu/forms';
import { Subscription } from 'rxjs/Subscription';

import { BinItemOptions, BinItem } from '../bin.model';
import { build } from '@caiu/core';

@Component({
  selector: 'am-bin-item-options',
  templateUrl: './bin-item-options.component.html',
  styleUrls: ['./bin-item-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinItemOptionsComponent extends FormComponent implements OnInit {

  @Input() binItem: BinItem = new BinItem();
  @Output() changeOptions = new EventEmitter<BinItemOptions>();
  @ModelControl<BinItemOptions>(new BinItemOptions()) form: FormGroup;
  modelKey = 'binItem';
  modelChanges = ['id'];

  constructor() {
    super();
  }

  get valueIn(): BinItemOptions {
    return new BinItemOptions();
  }

  get valueOut(): BinItemOptions {
    return build(BinItemOptions, { options: this.form.value });
  }

  get valueChanges(): Subscription {
    return this.form.valueChanges.subscribe(options => {
      this.changeOptions.emit(options);
    });
  }

  ngOnInit() {
    this.subscribe([this.valueChanges]);
  }
}
