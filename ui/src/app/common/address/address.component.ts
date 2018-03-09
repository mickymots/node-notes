import { Component, Input, Injector } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  NG_VALIDATORS,
  Validators,
  Validator,
  ValidationErrors
} from '@angular/forms';
import { BaseGroupComponent } from '../../base/base.group.component';
import { LABELS } from '../../base/labels';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: AddressComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: AddressComponent, multi: true }
  ]
})
export class AddressComponent extends BaseGroupComponent implements Validator {
  @Input() columnLayout;
  @Input() readonly;
  @Input() line1Label: string = LABELS.LINE1;
  @Input() line2Label: string = LABELS.LINE2;
  @Input() line3Label: string = LABELS.LINE3;
  @Input() line4Label: string = LABELS.LINE4;
  @Input() line5Label: string = LABELS.LINE5;
  @Input() postcodeLabel: string = LABELS.POSTCODE;
  errors: any[] = [];
  constructor(fb: FormBuilder, _injector: Injector) {
    super(_injector);
    this.formGroup = fb.group({
      line1: [''],
      line2: [''],
      line3: [''],
      line4: [''],
      line5: [''],
      postcode: ['']
    });
  }

  updateForm($event) {
    this.formGroup.setValue({
      line1: $event.line1,
      line2: $event.line2,
      line3: $event.line3,
      line4: $event.line4,
      line5: $event.line5,
      postcode: $event.postcode
    });
  }

  validate(ctrl) {
    this.errors = null;
    let temp = [];
    if (this.formGroup.get('line1').errors)
      temp.push(this.formGroup.get('line1').errors);
    if (this.formGroup.get('line2').errors)
      temp.push(this.formGroup.get('line2').errors);
    if (this.formGroup.get('line3').errors)
      temp.push(this.formGroup.get('line3').errors);
    if (this.formGroup.get('line4').errors)
      temp.push(this.formGroup.get('line4').errors);
    if (this.formGroup.get('postcode').errors)
      temp.push(this.formGroup.get('postcode').errors);
    this.errors = temp;
    return this.errors;
  }
}
