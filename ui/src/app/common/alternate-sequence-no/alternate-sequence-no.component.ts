import { Component, Input, OnInit, Injector } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validators,
  Validator
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'alternate-seq-no',
  templateUrl: `./alternate-sequence-no.component.html`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AlternateSequenceNoComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AlternateSequenceNoComponent,
      multi: true
    }
  ]
})
export class AlternateSequenceNoComponent extends BaseComponent
  implements OnInit, Validator {
  config = {
    id: this.camelize(LABELS.ALTERNATE_SEQ_NUM),
    label: LABELS.ALTERNATE_SEQ_NUM,
    pattern: REGEX.ALPHANUMERIC
  };

  ngOnInit() {
    this.setup(this.config);
  }

  constructor(_injector: Injector) {
    super(_injector);
  }
}
