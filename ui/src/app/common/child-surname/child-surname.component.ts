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
  selector: 'child-surname',
  template: `
  <div class="form-group">
    <label for="child-forename" class="control-label">
                     {{ label || 'Child Surname' }}
    </label>
    <app-error-msg [msg]="errorMessage"></app-error-msg> 
    <input type="text"          
            class="{{cssClass || 'form-control'}}"
            [formControl]="childControl" name="child-surname" [required]="required"/>  
  </div>   
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChildSurnameComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: ChildSurnameComponent, multi: true }
  ]
})
export class ChildSurnameComponent extends BaseComponent
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

  // validate(ctrl) {
  //    return this.errorMessage;
  // }

  // get errorMessage() {
  //    if (this.childControl.hasError("pattern")) {
  //        return {message:"Child surname has errrors"};
  //     }
  //     return null;
  // }
}
