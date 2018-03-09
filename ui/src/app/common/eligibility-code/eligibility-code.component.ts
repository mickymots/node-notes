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
import { REGEX } from './../../base/regex';
import { LABELS } from './../../base/labels';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'eligibility-code',
  template: ` <div class="form-group">
    <label for="eligiblitycode" class="control-label">{{label}}</label>
    <app-error-msg [msg]="errorMessage"></app-error-msg>
      <input type="text"          
            class="{{cssClass || 'form-control'}}"
            [formControl]="childControl" name="eligiblitycode" [required]="required"/>  
</div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EligibilityCodeComponent),
      multi: true
    }
  ]
})
export class EligibilityCodeComponent extends BaseComponent implements OnInit {
  config = {
    id: this.camelize(LABELS.ELIGIBILITY_CODE),
    label: LABELS.ELIGIBILITY_CODE,
    pattern: REGEX.NUMERIC
  };

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit() {
    this.setup(this.config);
  }
}
