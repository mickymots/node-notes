import { Component, Input, OnInit, Injector } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'phone-number',
  templateUrl: './phone-number.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneNumberComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: PhoneNumberComponent, multi: true }
  ]
})
export class PhoneNumberComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.PHONE_NUMBER),
    label: LABELS.PHONE_NUMBER
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
