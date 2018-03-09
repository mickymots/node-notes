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
  selector: 'efe-voucher-code',
  template: `
  <div class="form-group">
    <label for="efe-voucher-code" class="control-label">
                     {{ label }}
    </label>
    <app-error-msg [msg]="errorMessage"></app-error-msg>
    <input type="text"          
            class="{{cssClass || 'form-control'}}"
            [formControl]="childControl" name="efe-voucher-code" [required]="required"/>  
  </div>   
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EFEVoucherCodeComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: EFEVoucherCodeComponent,
      multi: true
    }
  ]
})
export class EFEVoucherCodeComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.EFE_VOUCHER_CODE),
    label: LABELS.EFE_VOUCHER_CODE,
    pattern: REGEX.NUMERIC
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
