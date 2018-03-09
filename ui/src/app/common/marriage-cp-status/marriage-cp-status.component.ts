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
  selector: 'marriage-cp-status',
  templateUrl: './marriage-cp-status.componenet.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MarriageCpStatusComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: MarriageCpStatusComponent,
      multi: true
    }
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
export class MarriageCpStatusComponent extends BaseComponent
  implements OnInit, Validator {
  data: any;
  config = {
    id: this.camelize(LABELS.MARRIAGE_CP_STATUS),
    label: LABELS.MARRIAGE_CP_STATUS,
    pattern: REGEX.ALPHANUMERIC
  };

  constructor(
    public referenceDataService: ReferenceDataService,
    _injector: Injector
  ) {
    super(_injector);
  }
  ngOnInit() {
    this.setup(this.config);
    this.getMarriageCPStatus();
  }

  getMarriageCPStatus() {
    this.referenceDataService.getRefData('MARRSTAT').subscribe(data => {
      this.data = data;
    });
  }
}
