import { Component, OnInit, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';

@Component({
  selector: 'child-dob-date',
  templateUrl: `./child-dob-date.component.html`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChildDOBDateComponent,
      multi: true
    }
  ]
})
export class ChildDOBDateComponent extends BaseComponent {
  //value: Date;

  constructor(_injector: Injector) {
    super(_injector);
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\/\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
