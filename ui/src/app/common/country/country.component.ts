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
import { REGEX } from './../../base/regex';

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CountryComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: CountryComponent, multi: true }
  ]
})
export class CountryComponent extends BaseComponent
  implements OnInit, Validator {
  data: any;
  config = {
    id: this.camelize(LABELS.COUNTRY),
    label: LABELS.COUNTRY,
    pattern: REGEX.ALPHANUMERIC
  };
  @Input() workOnIds: boolean = true;
  constructor(
    public referenceDataService: ReferenceDataService,
    _injector: Injector
  ) {
    super(_injector);
  }
  ngOnInit() {
    this.setup(this.config);
    this.getCountries();
  }

  getCountries() {
    let countryList = this.referenceDataService
      .getRefData('COUNTRY_')
      .subscribe(countries => {
        let arr = [];
        countries.map(item => {
          if (item.values && item.values.indexOf('|') > 0) {
            let valArr = item.values.split('|');
            arr.push({ id: item.id, values: valArr[0] });
          } else arr.push({ id: item.id, values: item.values });
        });
        this.data = arr;
      });
  }
}
