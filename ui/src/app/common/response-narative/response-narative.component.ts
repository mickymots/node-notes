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
  selector: 'response-narative',
  template: `<div class="form-group">
    <label for="crn" class="control-label">{{label}}</label>
    <app-error-msg [msg]="errorMessage"></app-error-msg>
    <input [class]="cssClass || 'form-control'" name="crn" type="text" [formControl]="childControl" [required]="required">
</div>`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResponseNarativeComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ResponseNarativeComponent,
      multi: true
    }
  ]
})
export class ResponseNarativeComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.RESPONSE_NARATIVE),
    label: LABELS.RESPONSE_NARATIVE,
    pattern: REGEX.ALPHANUMERIC_SPECIAL
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
