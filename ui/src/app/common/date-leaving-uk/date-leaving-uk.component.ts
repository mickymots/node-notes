import { Component, OnInit, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';

@Component({
  selector: 'date-leaving-uk',
  template: ` 
  <div class="form-group"> 
     <label for="date-leaving-uk" class="control-label">
                     {{ label || 'Date of Leaving UK' }}
     </label>
     <p style="z-index:100;">
    <!--<p-calendar name="date-leaving-uk" dateFormat="dd/mm/yy" [required]=required dataType="string" [formControl]="childControl" (keypress)="_keyPress($event)"></p-calendar>-->
     </p>
     <app-error-msg [msg]="errorMessage"></app-error-msg>     
  </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateLeavingUKComponent,
      multi: true
    }
  ]
})
export class DateLeavingUKComponent extends BaseComponent {
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

  ngOnInit() {
    this.setupValidation();
  }

  setupValidation() {
    let validations = [];
    if (this.required) {
      validations.push(Validators.required);
    }
    this.childControl.setValidators(validations);
  }
}
