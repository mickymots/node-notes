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
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import { ReferenceDataService } from '@itmp/arch';

@Component({
  selector: 'specialist-business-area',
  templateUrl: './specialist-business-area.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SpecialistBusinessAreaComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SpecialistBusinessAreaComponent,
      multi: true
    }
  ]
})
export class SpecialistBusinessAreaComponent extends BaseComponent
  implements OnInit, Validator {
  data: any;
  config = {
    id: this.camelize(LABELS.SPECIALIST_BUSINESS_AREA),
    label: LABELS.SPECIALIST_BUSINESS_AREA,
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
    this.getSpecialistBusinessArea();
  }

  getSpecialistBusinessArea() {
    this.referenceDataService.getRefData('BUSINESS_').subscribe(data => {
      this.data = data;
    });
  }
}
