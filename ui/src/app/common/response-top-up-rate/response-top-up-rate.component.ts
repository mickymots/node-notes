import { Component, Input, OnInit, Injector } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'response-top-up-rate',
  template: `
  <div class="form-group">
    <label for="response-top-up-rate" class="control-label">
                     {{ label }}
    </label>
    <input type="text"          
            class="{{cssClass || 'form-control'}}"
            [formControl]="childControl" name="response-top-up-rate" [required]="required"/>  
    <div *ngFor="let message of errorMessage">
    <app-error-msg [msg]="errorMessage"></app-error-msg> 
    </div>
  </div>   
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ResponseTopUpRateComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ResponseTopUpRateComponent,
      multi: true
    }
  ]
})
export class ResponseTopUpRateComponent extends BaseComponent
  implements OnInit {
  config = {
    id: this.camelize(LABELS.RESPONSE_TOP_UP_RATE),
    label: LABELS.RESPONSE_TOP_UP_RATE,
    pattern: REGEX.NUMERIC
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
