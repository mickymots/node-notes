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
import { LABELS } from './../../base/labels';

@Component({
  selector: 'city',
  templateUrl: './city.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CityComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: CityComponent, multi: true }
  ]
})
export class CityComponent extends BaseComponent implements OnInit, Validator {
  data: any;
  config = {
    id: this.camelize(LABELS.CITY),
    label: LABELS.CITY
  };

  constructor(
    public referenceDataService: ReferenceDataService,
    _injector: Injector
  ) {
    super(_injector);
  }
  ngOnInit() {
    this.setup(this.config);
  }
}
