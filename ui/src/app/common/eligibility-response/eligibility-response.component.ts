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
//import { MessageService, ReferenceDataService } from '@itmp/arch';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';

@Component({
  selector: 'eligibility-response',
  template: ` <div class="form-group">
    <label for="eligiblityResponse" class="control-label">{{label}}</label>
    <app-error-msg [msg]="errorMessage"></app-error-msg>
     <input type="text"          
            class="{{cssClass || 'form-control'}}"
            [formControl]="childControl" id="eligiblityResponse" name="eligiblityResponse" [required]="required"/>
</div>`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EligibilityResponseComponent),
      multi: true
    }
  ]
})
export class EligibilityResponseComponent extends BaseComponent
  implements OnInit {
  config = {
    id: this.camelize(LABELS.ELIGIBILITY_RESPONSE),
    label: LABELS.ELIGIBILITY_RESPONSE,
    pattern: REGEX.ALPHANUMERIC_SPECIAL
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
