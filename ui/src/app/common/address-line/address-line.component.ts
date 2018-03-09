import { Component, OnInit, Input, Injector } from '@angular/core';
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
import { ComponentConfig } from "../../base/component-config";

@Component({
  selector: 'address-line',
  templateUrl: './address-line.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressLineComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: AddressLineComponent, multi: true }
  ]
})
export class AddressLineComponent extends BaseComponent implements OnInit {
  @Input() inputConfig: ComponentConfig;
  @Input() form: FormGroup;
  
  config = {
    id: this.camelize(LABELS.LINE),
    label: LABELS.LINE,
    pattern: REGEX.ALPHANUMERIC
  };

  ngOnInit() {
    if (this.inputConfig) {
      console.log(this.inputConfig);
      this.setup(this.inputConfig);
     
    }
    else{
      this.setup(this.config);
    }
  }

  constructor(_injector: Injector) {
    super(_injector);
  }
}
