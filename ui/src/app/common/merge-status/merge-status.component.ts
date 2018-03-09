import { Component, OnInit, Input, Injector } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  Validators,
  FormGroup
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { ReferenceDataService } from '@itmp/arch';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'merge-status',
  templateUrl: './merge-status.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MergeStatusComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: MergeStatusComponent, multi: true }
  ],
  styles: [
    `
      label.required:after {
        content: " *";
        color: red;
      }
    `
  ]
})
export class MergeStatusComponent extends BaseComponent
  implements OnInit, Validator {
  data: any;
  config = {
    id: this.camelize(LABELS.MERGE_STATUS),
    label: LABELS.MERGE_STATUS,
    pattern: REGEX.ALPHANUMERIC
  };

  ngOnInit() {
    this.setup(this.config);
    this.getMergestatus();
  }

  constructor(
    public referenceDataService: ReferenceDataService,
    _injector: Injector
  ) {
    super(_injector);
  }

  getMergestatus() {
    this.data = [
      { id: '00000000', values: 'INPROGRESS' },
      { id: '00000001', values: 'NOT MERGED' }
    ];
  }
}
