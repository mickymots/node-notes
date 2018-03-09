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
import { LABELS } from './../../base/labels';
@Component({
  selector: 'country-of-residence',
  template: `
  <div class="form-group">
     <label for="countryofresidence" class="control-label">
                     {{ label }}
            </label> 
               <select name ="countryofresidence" [class]="cssClass || 'form-control'" [formControl]="childControl"                        
            class="form-control" [required]="required">
          <option value="" >Please Select...</option>
          <option *ngFor="let item of data" value="{{ item.name }}">{{ item.name }}</option>
  </select>
  <app-error-msg [msg]="errorMessage"></app-error-msg>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CountryOfResidenceComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CountryOfResidenceComponent,
      multi: true
    }
  ]
})
export class CountryOfResidenceComponent extends BaseComponent
  implements OnInit, Validator {
  data: any;
  config = {
    id: this.camelize(LABELS.COUNTRY_OF_RESIDENCE),
    label: LABELS.COUNTRY_OF_RESIDENCE
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
    this.getNationalityTypes();
  }

  getNationalityTypes() {
    this.data = [
      { id: 1, name: 'Brazil' },
      { id: 2, name: 'Israel' },
      { id: 3, name: 'US' },
      { id: 4, name: 'Japan' },
      { id: 5, name: 'Britain' }
    ];
  }
}
