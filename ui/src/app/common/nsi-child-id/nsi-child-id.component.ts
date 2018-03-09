import {
  Component,
  OnInit,
  forwardRef,
  Input,
  OnChanges,
  Injector
} from '@angular/core';
import {
  FormControl,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { BaseComponent } from './../../base/base.component';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'nsi-child-id',
  template: `<div class="form-group">
    <label for="NSI" class="control-label">{{label}}</label>
    <app-error-msg [msg]="errorMessage"></app-error-msg>
    <input [class]="cssClass || 'form-control'" name="NSI" type="text" [formControl]="childControl" [required]="required">
</div>`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NSIChildIDComponent),
      multi: true
    },
    { provide: NG_VALIDATORS, useExisting: NSIChildIDComponent, multi: true }
  ]
})
export class NSIChildIDComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.NSI_CHILD_ID),
    label: LABELS.NSI_CHILD_ID,
    pattern: REGEX.ALPHANUMERIC
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
