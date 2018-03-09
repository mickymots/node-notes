import { Component, Input, OnInit, Injector } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'postcode',
  templateUrl: `./app-postcode.component.html`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AppPostcodeComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: AppPostcodeComponent, multi: true }
  ]
})
export class AppPostcodeComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.POSTCODE),
    label: LABELS.POSTCODE
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
