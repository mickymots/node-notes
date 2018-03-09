import { Component, Input, OnInit, Injector } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'email',
  template: `
  <div class="form-group">
    <label for="{{idRef || 'email'}}" [class.required]="required" class="control-label">
                     {{ label }}
    </label>
    <app-error-msg [msg]="errorMessage"></app-error-msg> 
    <input type="text"          
            class="form-control" [attr.readonly]="readonly"
            [formControl]="childControl" name="{{idRef || 'email'}}" id="{{idRef || 'email'}}" [required]="required"/> 

  </div>   
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EmailComponent,
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: EmailComponent, multi: true }
  ]
})
export class EmailComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.EMAIL),
    label: LABELS.EMAIL
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
