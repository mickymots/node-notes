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

@Component({
  selector: 'child-forename',
  templateUrl: `./child-forename.component.html`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChildForenameComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: ChildForenameComponent, multi: true }
  ]
})
export class ChildForenameComponent extends BaseComponent
  implements Validator, OnInit {
  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setupValidation();
  }

  setupValidation() {
    let validations = [];
    if (this.required) {
      validations.push(Validators.required);
    }
    validations.push(Validators.pattern(/^([^0-9@]*)$/));
    this.childControl.setValidators(validations);
  }
}
